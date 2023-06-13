import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Icon } from "react-leaflet";
import L from "leaflet";
import NearMe from "@material-ui/icons/NearMe";
import { useSelector, useDispatch } from "react-redux";
import { buttonsActions } from "../store/index.js";
import "./MainMap.css";
import "./MapButtons.css"

const MapButtons = (props) => {
  const userLocation = useSelector((state) => state.userLocation);
  const dispatch = useDispatch();

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Found users position!!", position);
          const { latitude, longitude } = position.coords;
          dispatch(buttonsActions.geolocation({ latitude, longitude }))
          // setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="leaflet-top leaflet-right">
      <div className="leaflet-control-layers leaflet-control" id="buttonss" aria-haspopup="true">
        <div className="buttons_parent_div">
          <div id="geolocationbtn">
            <NearMe  onClick={handleGeolocation}/>
          </div>
          <div  id="OTHER" >
            <NearMe onClick={handleGeolocation}/>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default MapButtons;
