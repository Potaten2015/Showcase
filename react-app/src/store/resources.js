import { async } from "three";

const SET_FONT = "resources/SET_FONT";
const GET_RESOURCES = "resources/GET_RESOURCES";
const SAVE_LOCATION = "resources/SAVE_LOCATION";

const set_font = (font) => {
  return {
    type: SET_FONT,
    payload: font,
  };
};

const get_resources = (resources) => {
  return {
    type: GET_RESOURCES,
    comments: resources.comments,
    geos: resources.geos,
  };
};

const save_location = (location) => {
  return {
    type: SAVE_LOCATION,
    location,
  };
};

export const setFont = (font) => async (dispatch) => {
  dispatch(set_font(font));
  return;
};

export const getResources = () => async (dispatch) => {
  const resources = await fetch("/api/resources");
  const res = await resources.json();
  dispatch(get_resources(res));
  return res;
};

export const submitLogin = (loginFormData) => async (dispatch) => {
  const resources = await fetch("/api/resources/geo", {
    method: "POST",
    body: JSON.stringify(loginFormData),
  });
  const res = await resources.json();
  dispatch(get_resources(res));
  return res;
};

export const saveLocation = (location) => async (dispatch) => {
  let saveLocation = location;
  if (location.latitude) {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
        location.latitude.toString() + "," + location.longitude.toString()
      }&key=AIzaSyAU0ITHF_k-3vhNPtK7xV9bH7ePsGz-1w8`,
      // {
      //   headers: "Access-Control-Allow-Origin: *",
      // },
    );

    saveLocation = await response.json();
    let newerLocation = saveLocation.results.filter((place) => {
      return place.types.includes("locality");
    });

    newerLocation = newerLocation[0].formatted_address
      .split(",")
      .map((theOne) => theOne.trim());
    saveLocation = {
      city: newerLocation[0],
      state: newerLocation[1].trim(),
      latitude: location.latitude,
      longitude: location.longitude,
    };
  }

  // saveLocation = {
  //   city: "Test",
  //   state: "Test",
  //   latitude: 0,
  //   longitude: 0,
  // };

  dispatch(save_location(saveLocation));
  return saveLocation;
};

export const submitComment = ({ content, color, user_id }) => async (
  dispatch,
) => {
  const formData = new FormData();
  formData.append("content", content);
  formData.append("color", color);
  formData.append("user_id", user_id);
  const resources = await fetch("/api/resources/comment", {
    method: "POST",
    body: formData,
  });
  const res = await resources.json();
  dispatch(get_resources(res));
};

const initialState = {
  font: null,
};

const resourcesReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_FONT:
      newState = Object.assign({}, state);
      newState.font = action.payload;
      return newState;
    case GET_RESOURCES:
      newState = Object.assign({}, state);
      newState.comments = action.comments;
      newState.geos = action.geos;
      return newState;
    case SAVE_LOCATION:
      newState = Object.assign({}, state);
      newState.location = {};
      newState.location.latitude = action.location.latitude;
      newState.location.longitude = action.location.longitude;
      newState.location.city = action.location.city
        ? action.location.city
        : null;
      newState.location.state = action.location.state
        ? action.location.state
        : null;

      return newState;
    default:
      return state;
  }
};

export default resourcesReducer;
