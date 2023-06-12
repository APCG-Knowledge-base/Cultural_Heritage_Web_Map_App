import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Icon } from "react-leaflet";
import L from "leaflet";
import "./MainMap.css";
import arrow from "../ccccc.png";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { buttonsActions } from "../store/index.js";

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
    <React.Fragment>
      <Button
        id="geolocationbtn"
        variant="contained"
        color="primary"
        onClick={handleGeolocation}
      >
        Get My Location
      </Button>
    </React.Fragment>
  );
};

export default MapButtons;
