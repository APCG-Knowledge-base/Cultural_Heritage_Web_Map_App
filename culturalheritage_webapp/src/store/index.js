import { createSlice, configureStore } from "@reduxjs/toolkit";


const initialState = { userLocation: null, showEGMS:false,showLandcover:false,};

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
  },
});



const store = configureStore(
  {
    reducer:buttonsSlice.reducer
  }
  )
  
export const buttonsActions =  buttonsSlice.actions
export default store;
