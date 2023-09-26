import React from "react";
import { CircleMarker, Marker } from "react-leaflet";
import { useSelector, useDispatch } from "react-redux";
import Leaflet from "leaflet";
import ReactDOMServer from "react-dom/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMuseum,
  faLeaf,
  faMapMarkedAlt,
  faUniversity,
  faColumns,
} from "@fortawesome/free-solid-svg-icons";
import { buttonsActions } from "../store/index.js";

import "./CCMarker.css"; // Import your custom CSS file

const CCMarker = (props) => {
  const dispatch = useDispatch();

  const ccInfoHandler = () => {
    console.log("eo")
    dispatch(buttonsActions.isccinfoopen(true));
  };

  const getIcon = (ccpoint) => {
    if (ccpoint.objecttag[0] === "Monument") {
      return faMuseum;
    }
    if (ccpoint.objecttag[0] === "Archaeological site") {
      return faColumns;
    }
    if (ccpoint.objecttag[0] === "Landscape of natural beauty") {
      return faLeaf;
    }
    if (ccpoint.objecttag[0] === "Historical Place") {
      return faMapMarkedAlt;
    }
    return null;
  };

  const icon = getIcon(props.ccpoint);
  const iconHTML = ReactDOMServer.renderToString(
    <FontAwesomeIcon icon={icon} />
  );


  const customMarkerIcon = new Leaflet.DivIcon({
    className: "custom-marker-icon", // Apply a custom class for styling
    html: iconHTML,
  });

  

  return (
    <>
      <Marker
        position={[props.ccpoint.y, props.ccpoint.x]}
        icon={customMarkerIcon}
        onClick={ccInfoHandler} 
      >
      </Marker>
    </>
  );
};

export default CCMarker;