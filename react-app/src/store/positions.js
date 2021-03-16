const SET_PERSPECTIVE = "position/SET_PERSPECTIVE";

const set_perspective = (coords) => {
  return {
    type: SET_PERSPECTIVE,
    payload: coords,
  };
};

export const setPerspective = (coords) => async (dispatch) => {
  dispatch(set_perspective(coords));
  return;
};

const initialState = {
  perspective: null,
};

const positionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PERSPECTIVE:
      const newState = Object.assign({}, state);
      newState["perspective"] = action.payload;
      return newState;
    default:
      return state;
  }
};

export default positionReducer;
