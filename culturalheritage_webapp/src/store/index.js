import { createSlice, configureStore } from "@reduxjs/toolkit";


const initialState = { userLocation: null, showEGMS:false,showLandcover:false, cchover:false, lndhover:false, grmhover:false, glctnhover:false, ihover:false, airpoluhover:false };

const buttonsSlice = createSlice({
  name: "buttons",
  initialState: initialState,
  reducers: {
    geolocation(state,action) {
      state.userLocation=action.payload
    },
    egms(state,action) {
      state.showEGMS=action.payload
    },
    land(state,action) {
      state.showLandcover=action.payload
    },

    culthover(state,action) {
      state.cchover= action.payload
    },
    landhover(state,action) {
      state.lndhover= action.payload
    },
    grmotionhover(state,action) {
      state.grmhover= action.payload
    },
    glocationhover(state,action) {
      state.glctnhover= action.payload
    },
    infohover(state,action) {
      state.ihover= action.payload
    },
    airhover(state,action) {
      state.airpoluhover= action.payload
    },
  },
});



const store = configureStore(
  {
    reducer:buttonsSlice.reducer
  }
  )
  
export const buttonsActions =  buttonsSlice.actions
export default store;
