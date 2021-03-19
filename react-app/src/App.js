import React, { useState, useEffect, useRef } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticate, login, logout, signup } from "./store/session";
import {
  getResources,
  setFont,
  saveLocation,
  submitComment,
} from "./store/resources";
import { Environment } from "./components/Environment";
import { Canvas } from "react-three-fiber";
import * as Three from "../node_modules/three/build/three";
import Cooper from "./resources/Cooper Hewitt_Thin_Reversed.json";
import {} from "./components/Forms/";
import {
  PerspectiveCamera,
  OrbitControls,
  PointerLockControls,
  MapControls,
  FlyControls,
  TrackballControls,
} from "@react-three/drei";
import {} from "three/examples/jsm/controls/OrbitControls";

// FOR LOG IN AND SIGN UP
import {
  LoginFormFields,
  SignupFormFields,
} from "./components/Forms/LoginForm";
import { commentFields } from "./components/CommentBoard";

const App = () => {
  // REF VARIABLES

  const dispatch = useDispatch();

  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [gotLocation, setGotLocation] = useState(false);

  const font = useSelector((state) => state.resources.font);
  const comments = useSelector((state) => state.resources.comments);
  const geos = useSelector((state) => state.resources.geos);
  const user = useSelector((state) => state.session.user);
  const location = useSelector((state) => state.resources.location);

  const logoutFunction = (e) => {
    dispatch(logout());
    setLoggedIn(false);
  };

  const loginFunction = async (e) => {
    const user = await dispatch(login(loginFormState)).then((result) => {
      if (!result.errors && result.id) {
        dispatch(getResources());
        setLoggedIn(true);
      } else {
        return result.errors;
      }
    });
  };

  const signupFunction = async (e) => {
    const user = await dispatch(signup(signupFormState)).then((result) => {
      if (!result.errors && result.id) {
        setLoggedIn(true);
      } else {
        return result.errors;
      }
    });
  };

  const submitCommentFunction = async (e) => {
    dispatch(submitComment(commentFormState));
  };

  // Form State Holders
  const starterLogin = {};
  LoginFormFields.forEach((field) => {
    starterLogin[field.fieldName] = "";
  });
  const starterSignup = {};
  SignupFormFields.forEach((field) => {
    starterSignup[field.fieldName] = "";
  });
  const starterComment = {};
  commentFields.forEach((field) => {
    starterComment[field.fieldName] = "";
    console.log(field);
  });
  starterComment["color"] = "white";

  const [loginFormState, setLoginFormState] = useState(starterLogin);
  const [signupFormState, setSignupFormState] = useState(starterSignup);
  const [commentFormState, setCommentFormState] = useState(starterComment);
  let startingSide = null;

  useEffect(() => {
    (async () => {
      const user = await dispatch(authenticate());
      if (user && !user.errors) {
        setAuthenticated(true);
        if (user.id) {
          setLoggedIn(true);
          starterLogin.username = user.username;
          startingSide = "Login";
        }
      }
      const font = new Three.FontLoader().parse(Cooper);
      dispatch(setFont(font)).then(() =>
        dispatch(getResources()).then(() =>
          navigator.geolocation.getCurrentPosition(
            async (location) =>
              await dispatch(saveLocation(location.coords)).then(
                (saveLocation) => {
                  if (saveLocation.city) {
                    setGotLocation(true);
                    setLoaded(true);
                    starterSignup["longitude"] = saveLocation.longitude;
                    starterSignup["latitude"] = saveLocation.latitude;
                    if (saveLocation && saveLocation.city)
                      starterSignup["city"] = saveLocation.city;
                    if (saveLocation && saveLocation.state)
                      starterSignup["state"] = saveLocation.state;
                    console.log("GOT saveLocation", saveLocation);
                  }
                },
              ),
            (error) =>
              dispatch(saveLocation(error.message)).then(() => {
                setLoaded(true);
              }),
          ),
        ),
      );
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      {/* <button onClick={(e) => {}}>Tester</button> */}
      <Switch>
        <Route path="/" authenticated={authenticated}>
          <form className="hidden">
            {LoginFormFields.map((field) => {
              return (
                <input
                  maxLength="16"
                  autoComplete="off"
                  className="hidden"
                  id={"login" + field.fieldName}
                  key={field.fieldName}
                  value={loginFormState[field.fieldName]}
                  placeholder={field.placeholder}
                  type={field["fieldType"]}
                  onChange={(e) => {
                    e.persist();
                    setLoginFormState((prev) => {
                      const newState = Object.assign({}, prev);
                      newState[field.fieldName] = e.target.value;
                      return newState;
                    });
                  }}
                />
              );
            })}
          </form>
          <form className="hidden">
            {SignupFormFields.map((field) => {
              return (
                <input
                  maxLength="16"
                  autoComplete="off"
                  className="hidden"
                  id={"signup" + field.fieldName}
                  key={field.fieldName}
                  value={signupFormState[field.fieldName]}
                  placeholder={field.placeholder}
                  type={field["fieldType"]}
                  onChange={(e) => {
                    e.persist();
                    setSignupFormState((prev) => {
                      const newState = Object.assign({}, prev);
                      newState[field.fieldName] = e.target.value;
                      return newState;
                    });
                  }}
                />
              );
            })}
          </form>
          <form className="hidden">
            {commentFields.map((field) => {
              return (
                <input
                  maxLength={144}
                  autoComplete="off"
                  className="hidden"
                  id={"comment" + field.fieldName}
                  key={field.fieldName}
                  value={commentFormState[field.fieldName]}
                  placeholder={field.placeholder}
                  type={field["fieldType"]}
                  onChange={(e) => {
                    e.persist();
                    setCommentFormState((prev) => {
                      const newState = Object.assign({}, prev);
                      newState[field.fieldName] = e.target.value;
                      return newState;
                    });
                  }}
                />
              );
            })}
          </form>
          <Canvas
            shadowMap
            shadow-mapsize-width={100}
            shadow-mapsize-height={100}
            shadow-camera-far={10}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}>
            <fog attach="fog" args={["hotpink", 45, 100]} />
            <Environment
              authenticated={authenticated}
              loginFormTools={{
                loginFields: LoginFormFields,
                signupFields: SignupFormFields,
                setLoginState: setLoginFormState,
                currentLoginState: loginFormState,
                setSignupState: setSignupFormState,
                currentSignupState: signupFormState,
                login: loginFunction,
                logout: logoutFunction,
                signup: signupFunction,
                loggedIn: loggedIn,
                side: startingSide,
                gotLocation: gotLocation,
              }}
              resources={{
                font: font,
                comments: comments,
                geos: geos,
                gotLocation: gotLocation,
                location: location,
                commentFormState,
                setCommentFormState,
                commentFields,
                submitComment: submitCommentFunction,
              }}
              session={{
                user: user,
              }}
            />
          </Canvas>
        </Route>
      </Switch>
    </>
  );
};

export default App;
