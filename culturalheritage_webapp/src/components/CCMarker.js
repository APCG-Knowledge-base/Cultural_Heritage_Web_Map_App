import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Icon } from "react-leaflet";
import L from "leaflet";
import { useSelector, useDispatch } from "react-redux";
import { buttonsActions } from "../store/index.js";
import { CircleMarker, Popup, Tooltip } from "react-leaflet";
import "./MainMap.css";
import "./MapButtons.css";

const CCMakrer = (props) => {
  return (
    <CircleMarker
      center={[props.ccpoint.y, props.ccpoint.x]}
      radius={10}
      color={props.ccpoint.colorfill}
      fillOpacity={1}
      stroke={true}
      weight={2}
    ></CircleMarker>
  );
};

export default CCMakrer;
