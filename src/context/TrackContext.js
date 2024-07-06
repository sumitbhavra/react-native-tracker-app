import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";

const FETCH_TRACKS = "FETCH_TRACKS";

const trackReducer = (state, action) => {
  switch (action.type) {
    case FETCH_TRACKS:
      return action.payload;
    default:
      return state;
  }
};

const fetchTracks = (dispatch) => async () => {
  const response = await trackerApi.get("/tracks");
  dispatch({
    type: FETCH_TRACKS,
    payload: response.data,
  });
};

const createTrack = (dispatch) => async (name, locations) => {
  try {
    await trackerApi.post("/tracks", {
      name,
      locations,
    });
  } catch (error) {
    console.log(error);
  }
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  {
    fetchTracks,
    createTrack,
  },
  []
);
