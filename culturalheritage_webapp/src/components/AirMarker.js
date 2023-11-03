import React from "react";
import { CircleMarker, Marker, Popup } from "react-leaflet";
import { useSelector, useDispatch } from "react-redux";
import Leaflet from "leaflet";
import ReactDOMServer from "react-dom/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMuseum,
  faLeaf,
  faGlobe,
  faMonument,
} from "@fortawesome/free-solid-svg-icons";
import { buttonsActions } from "../store/index.js";
import { findEvents } from "../common/util.js";
import "./AirMarker.css"; // Import your custom CSS file

const AirMarker = (props) => {
  const dispatch = useDispatch();


  const iconHTML = ReactDOMServer.renderToString(
    <div className="custom-icon-html">{props.no2point.device_value.toFixed(0)}</div>
  );

  const customMarkerIcon = new Leaflet.DivIcon({
    className: "custom-marker-icon2",
    html: `
\      ${iconHTML}
    `,
  });

  const deviceContent = props.no2point.device_content
    .replace("Station Details", "")
    .trim();

  return (
    <Marker
      position={[props.no2point.y, props.no2point.x]}
      icon={customMarkerIcon}
    >
      <Popup>
        <div dangerouslySetInnerHTML={{ __html: deviceContent }} />
      </Popup>{" "}
    </Marker>
  );
};

export default AirMarker;
