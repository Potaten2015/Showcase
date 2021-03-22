import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import { TextStandard, TextButton, TextFormField } from "../../TextGeometry/";
import { PointerLockControls, TrackballControls } from "@react-three/drei";
import { logout } from "../../../store/session";

const LoginFormObject = (props) => {
  const mesh = useRef();

  const [enterHovered, setEnterHovered] = useState(false);
  const enterButtonEnter = (e) => setEnterHovered(true);
  const enterButtonLeave = (e) => setEnterHovered(false);

  const [logoutHovered, setLogoutHovered] = useState(false);
  const logoutButtonEnter = (e) => setLogoutHovered(true);
  const logoutButtonLeave = (e) => setLogoutHovered(false);

  const [side, setSide] = useState(
    props.loginFormTools.side ? props.loginFormTools.side : "Signup",
  );

  const loginHoverObject = {};
  props.loginFormTools.loginFields.forEach((field) => {
    loginHoverObject[field.fieldName] = false;
  });
  const [loginHoverState, setLoginHoverState] = useState(loginHoverObject);

  const textFontSize = 0.7;
  const formFontSize = 0.3;
  const fontThickness = 0.1;
  const welcomeBackFontSize = 0.5;
  const smallText = 0.2;

  return (
    <>
      <mesh scale={[4, 4, 4]} {...props} receiveShadow castShadow ref={mesh}>
        <boxBufferGeometry attach="geometry" args={[7, 10, 1]} />
        <meshPhongMaterial attach="material" color={"black"} />
        <TextStandard
          font={props.font}
          size={textFontSize}
          text={"Welcome to"}
          color={"blue"}
          position={[-2.9, 4, 1]}
          thickness={fontThickness}
        />
        <TextStandard
          font={props.font}
          size={textFontSize}
          text={"Taten Knight's"}
          color={"blue"}
          position={[-2.9, 3, 1]}
          thickness={fontThickness}
        />
        <TextStandard
          font={props.font}
          size={textFontSize}
          text={"Virtual Portfolio"}
          color={"blue"}
          position={[-2.9, 2, 1]}
          thickness={fontThickness}
        />

        <TextButton
          font={props.font}
          size={textFontSize}
          onPointerEnter={enterButtonEnter}
          onPointerLeave={enterButtonLeave}
          onClick={
            side == "Login"
              ? props.loginFormTools.login
              : props.loginFormTools.signup
          }
          text={"Enter"}
          color={enterHovered ? "blue" : "white"}
          position={[-2.9, -4, 1]}
          thickness={fontThickness}
          backDropX={0}
        />

        {props.loginFormTools.loggedIn ? (
          <>
            <TextStandard
              font={props.font}
              size={welcomeBackFontSize}
              text={"Howdy!"}
              color={"white"}
              position={[-2.9, 0, 1]}
              thickness={fontThickness}
            />
            <TextButton
              font={props.font}
              size={textFontSize}
              onPointerEnter={logoutButtonEnter}
              onPointerLeave={logoutButtonLeave}
              onClick={props.loginFormTools.logout}
              text={"Logout"}
              color={logoutHovered ? "blue" : "white"}
              position={[0.4, -4, 1]}
              thickness={fontThickness}
              backDropX={0.45}
            />
          </>
        ) : side == "Login" ? (
          <>
            <TextButton
              font={props.font}
              size={textFontSize}
              onPointerEnter={logoutButtonEnter}
              onPointerLeave={logoutButtonLeave}
              onClick={(e) => setSide("Signup")}
              text={"Signup"}
              color={logoutHovered ? "blue" : "white"}
              position={[0.3, -4, 1]}
              thickness={fontThickness}
              backDropX={0.3}
            />
            <TextStandard
              font={props.font}
              size={smallText}
              text={"Login"}
              color={"red"}
              position={[-0.5, 1.5, 1]}
              thickness={fontThickness}
            />
            {props.loginFormTools.loginFields.map((field, index) => (
              <TextFormField
                key={field.fieldName}
                font={props.font}
                size={formFontSize}
                thickness={fontThickness}
                text={
                  props.loginFormTools.currentLoginState[field.fieldName] ||
                  field.placeholder
                }
                position={[-2.9, 0.5 - index * 0.8, 1]}
                onPointerEnter={(e) =>
                  setLoginHoverState((hov) => {
                    const newHov = Object.assign({}, hov);
                    newHov[field.fieldName] = true;
                    return newHov;
                  })
                }
                onPointerLeave={(e) =>
                  setLoginHoverState((hov) => {
                    const newHov = Object.assign({}, hov);
                    newHov[field.fieldName] = false;
                    return newHov;
                  })
                }
                onClick={(e) => {
                  document.getElementById("login" + field.fieldName).focus();
                }}
                onPointerMissed={(e) => {
                  document.getElementById("login" + field.fieldName).blur();
                }}
                color={loginHoverState[field.fieldName] ? "blue" : "white"}
              />
            ))}
          </>
        ) : (
          <>
            <TextStandard
              font={props.font}
              size={smallText}
              text={"Signup"}
              color={"red"}
              position={[-0.5, 1.5, 1]}
              thickness={fontThickness}
            />
            {props.loginFormTools.signupFields.map((field, index) => (
              <TextFormField
                key={field.fieldName}
                font={props.font}
                size={formFontSize}
                thickness={fontThickness}
                text={
                  props.loginFormTools.currentSignupState[field.fieldName] ||
                  field.placeholder
                }
                position={[-2.9, 0.5 - index * 0.8, 1]}
                onPointerEnter={(e) =>
                  setLoginHoverState((hov) => {
                    const newHov = Object.assign({}, hov);
                    newHov[field.fieldName] = true;
                    return newHov;
                  })
                }
                onPointerLeave={(e) =>
                  setLoginHoverState((hov) => {
                    const newHov = Object.assign({}, hov);
                    newHov[field.fieldName] = false;
                    return newHov;
                  })
                }
                onClick={(e) => {
                  document.getElementById("signup" + field.fieldName).focus();
                }}
                onPointerMissed={(e) => {
                  document.getElementById("signup" + field.fieldName).blur();
                }}
                color={loginHoverState[field.fieldName] ? "blue" : "white"}
              />
            ))}
            <TextButton
              font={props.font}
              size={textFontSize}
              onPointerEnter={logoutButtonEnter}
              onPointerLeave={logoutButtonLeave}
              onClick={(e) => setSide("Login")}
              text={"Login"}
              color={logoutHovered ? "blue" : "white"}
              position={[0.3, -4, 1]}
              thickness={fontThickness}
              backDropX={0.07}
            />
          </>
        )}
      </mesh>
    </>
  );
};

export default LoginFormObject;
