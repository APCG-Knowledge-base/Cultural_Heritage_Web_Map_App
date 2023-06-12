import { createSlice, configureStore } from "@reduxjs/toolkit";


const initialState = { userLocation: null };

const buttonsSlice = createSlice({
  name: "buttons",
  initialState: initialState,
  reducers: {
    geolocation(state,action) {
      state.userLocation=action.payload
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
