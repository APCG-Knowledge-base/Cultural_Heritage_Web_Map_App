import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  userLocation: null,
  showEGMS: false,
  showLandcover: false,
  isloggedin: false,
  cchover: false,
  lndhover: false,
  grmhover: false,
  glctnhover: false,
  ihover: false,
  airpoluhover: false,
  loginhover: false,
  addeventhover: false,
  userInfo:false,
  userName:"No",
};

const buttonsSlice = createSlice({
  name: "buttons",
  initialState: initialState,
  reducers: {
    geolocation(state, action) {
      state.userLocation = action.payload;
    },
    egms(state, action) {
      state.showEGMS = action.payload;
    },
    land(state, action) {
      state.showLandcover = action.payload;
    },
    logincheck(state, action) {
      state.isloggedin = action.payload;
    },
    userinfoopen(state, action) {
      state.userInfo = action.payload;
    },
    setusername(state, action) {
      state.userName = action.payload;
    },

    culthover(state, action) {
      state.cchover = action.payload;
    },
    landhover(state, action) {
      state.lndhover = action.payload;
    },
    grmotionhover(state, action) {
      state.grmhover = action.payload;
    },
    glocationhover(state, action) {
      state.glctnhover = action.payload;
    },
    infohover(state, action) {
      state.ihover = action.payload;
    },
    airhover(state, action) {
      state.airpoluhover = action.payload;
    },
    loginhover(state, action) {
      state.loginhover = action.payload;
    },
    addeventhover(state, action) {
      state.addeventhover = action.payload;
    },
  },
});

const store = configureStore({
  reducer: buttonsSlice.reducer,
});

export const buttonsActions = buttonsSlice.actions;
export default store;
