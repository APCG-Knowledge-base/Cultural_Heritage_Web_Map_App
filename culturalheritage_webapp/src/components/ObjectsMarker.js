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
import "./ObjectsMarker.css"; // Import your custom CSS file
import axios from "axios";

const ObjectsMarker = (props) => {
  const dispatch = useDispatch();

  const objInfoHandler = () => {
    dispatch(buttonsActions.isobjinfoopen(true));
    dispatch(buttonsActions.isccinfoopen(false));
    dispatch(buttonsActions.isinfoopen(false));
    dispatch(buttonsActions.userinfoopen(false));
  };

  const objHandlerSelection = (obj) =>{
    // const final_point = findEvents(p)
    dispatch(buttonsActions.objectSelection(obj))
  }

  const decodeUnicode = (obj) => {
    if (typeof obj === 'string') {
      return decodeURIComponent(JSON.parse('"' + obj.replace(/\"/g, '\\"') + '"'));
    } else if (typeof obj === 'object' && obj !== null) {
      Object.keys(obj).forEach((key) => {
        obj[key] = decodeUnicode(obj[key]);
      });
      return obj;
    } else {
      return obj;
    }
  };

  const damagedbuildingbyid = async (obj) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/get-id-data?id=${obj.id}`);
        // Assuming the response data contains the information you want to add to each item
        const buildingData = response.data;
        console.log("geiaa")
        console.log(obj)
        console.log(buildingData)
        // Merge the building data with the current item
        return { ...obj, buildingData };
      } catch (error) {
        console.error('Error fetching building data for ID:', obj.id, error);
        return obj; // Return the item without modification if the request fails
      
    }
  };

  
  const iconHTML = ReactDOMServer.renderToString(
    <FontAwesomeIcon icon={faMonument} />
  );


  const customMarkerIcon = new Leaflet.DivIcon({
    className: "custom-marker-icon", // Apply a custom class for styling
    html: `
\      ${iconHTML}
    `,
  });


  
  return (
    <Marker
      position={[props.object.y, props.object.x]}
      icon={customMarkerIcon}
      eventHandlers={{
        click: (e) => {
          objHandlerSelection(props.object)
          objInfoHandler()
          damagedbuildingbyid(props.object);
        },
      }}
    >
      {/* <Popup>
        <div></div>
      </Popup> */}
    </Marker>
  );
};

export default ObjectsMarker;
