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
import axios from "axios";



const CCMarker = (props) => {
  const dispatch = useDispatch();

  const ccInfoHandler = () => {
    dispatch(buttonsActions.isccinfoopen(true));
    dispatch(buttonsActions.isinfoopen(false));
    dispatch(buttonsActions.userinfoopen(false));
    dispatch(buttonsActions.isobjinfoopen(false));
  };

  const monumentHandlerselection = (p) =>{
    // const final_point = findEvents(p)
    dispatch(buttonsActions.monumentselection(p))
  }

  const damagedbuildingbyid = async (obj) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/get-id-data?id=${obj.t_array_id}`);
      const responseData = response.data.trim(); // Trim to remove any leading/trailing whitespace

      // Separate the URL and JSON object
      const separatorIndex = responseData.indexOf('\r\n');
      const url = responseData.slice(0, separatorIndex);
      const jsonData = responseData.slice(separatorIndex + 2); // +2 to skip '\r\n'
  
      // Parse the JSON object
      const buildingData = JSON.parse(jsonData);
  
      // console.log('URL:', url); // Log the URL if needed
      // console.log('Building Data:', buildingData); // Log the parsed JSON object
      return buildingData; // Return only the fetched data
    } catch (error) { 
      console.error('Error fetching building data for ID:', obj.t_array_id, error);
      return null; // Return null if the request fails
    }
  };    

  const handleClick = async (ccpoint) => {
    console.log(ccpoint)
    if (ccpoint.t_array_id) {
      const fetchedData = await damagedbuildingbyid(ccpoint);
      console.log('Fetched Data:', fetchedData); // Log the entire fetched data object

      // // Log individual fields to verify their types and values
      // console.log('happend:', fetchedData.happend);
      // console.log('link:', fetchedData.link);
      // console.log('before:', fetchedData.before);
      // console.log('after:', fetchedData.after);
      // console.log('infotxt:', fetchedData.infotxt);     
      if (fetchedData) {
        const formattedEventData = {
          happend: fetchedData.happend || null,
          source: fetchedData.link ? decodeURIComponent(fetchedData.link) : null,
          // before: fetchedData.before || null,
          after: fetchedData.after || null,
          infotxt: fetchedData.infotxt ? decodeURIComponent(fetchedData.infotxt) : null,
          restored:fetchedData.restored || null
        };
        
        const updatedCcpoint = {
          ...ccpoint,
          event: ccpoint.event ? [...ccpoint.event, formattedEventData] : [formattedEventData],
        };
        console.log('updatedCcpoint: ', updatedCcpoint);
        ccInfoHandler();
        monumentHandlerselection(updatedCcpoint);
      }
    }else{
      monumentHandlerselection(ccpoint);
      ccInfoHandler();
    }

  };

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
    // else{
    //   return faTheaterMasks;
    // }
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
          click: () => handleClick(props.ccpoint),
        }}
      >
      </Marker>
  );
};

export default CCMarker;