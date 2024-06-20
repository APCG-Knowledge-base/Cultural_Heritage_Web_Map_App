import { createSlice, configureStore } from "@reduxjs/toolkit";
import { InitialccpointsKiev } from "../common/util.js";
const initialState = {
  userLocation: null,
  showEGMS: false,
  showLandcover: false,
  isloggedin: false,
  cchover: false,
  showCCinfo: false,
  showObjinfo:false,
  lndhover: false,
  grmhover: false,
  glctnhover: false,
  ihover: false,
  damagebuildhover:false,
  airpoluhover: false,
  loginhover: false,
  addeventhover: false,
  userInfo: false,
  userName: false,
  infoShow: false,
  objectsShow:false,
  transformedData:[],
  no2Show:false,
  no2List:[],
  selectedMonument: {
    title: "-",
    y: "-",
    x: "-",
    objecttag: "-",
    other_tags: "-",
    date: "-",
    imgurl: "-",
    description: "-",
    link: "-",
    colorfill: "-",
    event:[],
  },
  ccpointsKiev : InitialccpointsKiev,

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
    isinfoopen(state, action) {
      state.infoShow = action.payload;
    },
    isccinfoopen(state, action) {
      state.showCCinfo = action.payload;
    },
    isobjinfoopen(state, action) {
      state.showObjinfo = action.payload;
    },
    monumentselection(state, action) {
      state.selectedMonument = action.payload;
    },
    objectSelection(state, action) {
      state.selectedObject = action.payload;
    },
    objregister(state, action) {
      state.objectsShow = action.payload;
    },
    no2(state, action) {
      state.no2Show = action.payload;
    },
    setno2List(state, action) {
      state.no2List = action.payload;
    },
    setTransformeddata(state, action) {
      state.transformedData = action.payload;
    },
    setKievccpoints(state, action) {
      state.ccpointsKiev = action.payload;
    },


    damagehover(state, action) {
      state.damagebuildhover = action.payload;
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
