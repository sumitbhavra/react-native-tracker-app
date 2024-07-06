import createDataContext from "./createDataContext";

const ADD_CURRENT_LOCATION = "ADD_CURRENT_LOCATION";
const ADD_LOCATION = "ADD_LOCATION";
const START_RECORDING = "START_RECORDING";
const STOP_RECORDING = "STOP_RECORDING";
const CHANGE_NAME = "CHANGE_NAME";
const RESET = "RESET";

const locationReducer = (state, action) => {
  switch (action.type) {
    case ADD_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.payload,
      };
    case ADD_LOCATION:
      return {
        ...state,
        locations: [...state.locations, action.payload],
      };
    case START_RECORDING:
      return {
        ...state,
        recording: true,
      };
    case STOP_RECORDING:
      return {
        ...state,
        recording: false,
      };
    case CHANGE_NAME:
      console.log("action.payload", action.payload);
      return {
        ...state,
        name: action.payload,
      };
    case RESET:
      return {
        ...state,
        name: "",
        locations: [],
      };
    default:
      return state;
  }
};

const changeName = (dispatch) => (name) => {
  dispatch({
    type: CHANGE_NAME,
    payload: name,
  });
};

const startRecording = (dispatch) => () => {
  dispatch({
    type: START_RECORDING,
  });
};

const stopRecording = (dispatch) => () => {
  dispatch({
    type: STOP_RECORDING,
  });
};

const addLocation = (dispatch) => {
  return (location, recording) => {
    dispatch({
      type: ADD_CURRENT_LOCATION,
      payload: location,
    });
    if (recording) {
      dispatch({
        type: ADD_LOCATION,
        payload: location,
      });
    }
  };
};

const reset = (dispatch) => {
  return () => {
    dispatch({
      type: RESET,
    });
  };
};

export const { Context, Provider } = createDataContext(
  locationReducer,
  {
    startRecording,
    stopRecording,
    addLocation,
    changeName,
    reset,
  },
  {
    name: "",
    recording: false,
    locations: [],
    currentLocation: null,
  }
);
