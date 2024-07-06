import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import * as RootNavigation from "../navigationRef";

const ADD_ERROR = "ADD_ERROR";
const IS_LOADING = "IS_LOADING";
const SIGN_OUT = "SIGN_OUT";
const SIGN_IN = "SIGN_IN";
const CLEAR_ERROR_MESSAGE = "CLEAR_ERROR_MESSAGE";

const authReducer = (state, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, token: action.payload, isLoading: false };
    case SIGN_OUT:
      return { ...state, token: "", isLoading: false };
    case ADD_ERROR:
      return { errorMessage: "", errorMessage: action.payload };
    case CLEAR_ERROR_MESSAGE:
      return { ...state, errorMessage: "" };
    case IS_LOADING: {
      return { ...state, isLoading: action.payload };
    }
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => {
  return async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch({ type: SIGN_IN, payload: token });

      // navigate user to tracklist ?
    }
    // return RootNavigation.navigate("Signup");
    dispatch({ type: IS_LOADING, payload: false });
  };
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: CLEAR_ERROR_MESSAGE });
};

const signup =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      dispatch({ type: IS_LOADING, payload: true });
      const resp = await trackerApi.post("/signup", {
        email,
        password,
      });
      await AsyncStorage.setItem("token", resp.data.token);
      dispatch({ type: SIGN_IN, payload: resp.data.token });
    } catch (error) {
      dispatch({
        type: ADD_ERROR,
        payload: "something went wrong with sign up",
      });
    } finally {
      dispatch({ type: IS_LOADING, payload: false });
    }
  };

const signin = (dispatch) => {
  return async ({ email, password }) => {
    try {
      dispatch({ type: IS_LOADING, payload: true });
      const resp = await trackerApi.post("/signin", {
        email,
        password,
      });
      await AsyncStorage.setItem("token", resp.data.token);
      dispatch({ type: SIGN_IN, payload: resp.data.token });
    } catch (error) {
      dispatch({
        type: ADD_ERROR,
        payload: "something went wrong with sign in",
      });
    } finally {
      dispatch({ type: IS_LOADING, payload: false });
    }
  };
};

const signout = (dispatch) => {
  return async () => {
    dispatch({ type: IS_LOADING, payload: true });
    await AsyncStorage.removeItem("token");
    dispatch({ type: SIGN_OUT });
    dispatch({ type: IS_LOADING, payload: false });
  };
};

const toggleLoading = (dispatch) => {
  return (value) => {
    dispatch({ type: IS_LOADING, payload: value });
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage, tryLocalSignin, toggleLoading },
  { token: null, errorMessage: "", isLoading: true }
);
