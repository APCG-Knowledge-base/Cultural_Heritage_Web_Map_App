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
  faLandmark,
  faBuilding,
  faCompass,
  faBook,
  faChurch,
  faTheaterMasks,
  faScroll,
  faHistory,
  faMap,
  faGlobe,
  faMonument,
} from "@fortawesome/free-solid-svg-icons";
import { buttonsActions } from "../store/index.js";
import { findEvents } from "../common/util.js";
import "./CCMarker.css"; // Import your custom CSS file

const CCMarker = (props) => {
  const dispatch = useDispatch();

  const ccInfoHandler = () => {
    dispatch(buttonsActions.isccinfoopen(true));
    dispatch(buttonsActions.isinfoopen(false));
    dispatch(buttonsActions.userinfoopen(false));
  };

  const monumentHandlerselection = (p) =>{
    // const final_point = findEvents(p)
    dispatch(buttonsActions.monumentselection(p))
  }

  const getIcon = (ccpoint) => {
    if (ccpoint.objecttag[0] === "Ancient buildings") {
      return faMuseum;
    }
    if (ccpoint.objecttag[0] === "Monuments") {
      return faMonument;
    }
    if (ccpoint.objecttag[0] === "Libraries") {
      return faScroll;
    }
    if (ccpoint.objecttag[0] === "Sightseeing") {
      return faMapMarkedAlt;
    }
    if (ccpoint.objecttag[0] === "Religious Buildings") {
      return faChurch;
    }
    if (ccpoint.objecttag[0] === "Museums") {
      return faBuilding;
    }
    if (ccpoint.objecttag[0] === "Theaters") {
      return faTheaterMasks;
    }
    return null;
  };

  const icon = getIcon(props.ccpoint);
  const iconHTML = ReactDOMServer.renderToString(
    <FontAwesomeIcon icon={icon} />
  );


  const customMarkerIcon = new Leaflet.DivIcon({
    className: "custom-marker-icon", // Apply a custom class for styling
    html: `
\      ${iconHTML}
    `,
  });


  return (
      <Marker
        position={[props.ccpoint.y, props.ccpoint.x]}
        icon={customMarkerIcon}
        eventHandlers={{
          click: (e) => {
            monumentHandlerselection(props.ccpoint)
            ccInfoHandler()
          },
        }}
      >
      </Marker>
  );
};

export default CCMarker;