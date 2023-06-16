import logo from "./logo.svg";
import "./App.css";
import MainMap from "./components/MainMap.js";
import React from "react";
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';

function App() {
  return (
      <MainMap />
  )
}

export default App;
