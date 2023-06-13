import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Icon } from "react-leaflet";
import L from "leaflet";
import NearMe from "@material-ui/icons/NearMe";
import LayersIcon from "@material-ui/icons/Layers";
import MuseumIcon from "@material-ui/icons/Museum";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBiohazard, faRadiation } from "@fortawesome/free-solid-svg-icons";
import AirIcon from "@material-ui/icons/Cloud";
import { useSelector, useDispatch } from "react-redux";
import { buttonsActions } from "../store/index.js";
import "./MainMap.css";
import "./MapButtons.css";

const MapButtons = (props) => {
  const userLocation = useSelector((state) => state.userLocation);
  const dispatch = useDispatch();

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Found users position!!", position);
          const { latitude, longitude } = position.coords;
          dispatch(buttonsActions.geolocation({ latitude, longitude }));
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
    <div className="buttons_parent_div">
      <div id="infobtn">
        <InfoOutlinedIcon />
      </div>
      <div id="geolocationbtn" onClick={handleGeolocation}>
        <NearMe />
      </div>
      <div id="ccbtn">
        <MuseumIcon />
      </div>
      <div id="airbtn">
        <AirIcon />
      </div>
      <div id="radiationbtn">
        <FontAwesomeIcon icon={faRadiation} size="2x" />
      </div>
    </div>
  );
};

export default MapButtons;
