import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Icon } from "react-leaflet";
import L from "leaflet";
import {useSelector} from 'react-redux';
import "./MainMap.css";
import arrow from "../ccccc.png";
import Button from "@material-ui/core/Button";
import MapButtons from "./MapButtons";


// Create a custom icon using the arrow image
const arrowIcon = new L.Icon({
  iconUrl: arrow,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const MainMap = () => {
  const userLocation = useSelector(state => state.userLocation);
  const [mapCenter, setMapCenter] = useState([50.466, 30.481]);
  const [zoomLevel, setZoomLevel] = useState(13);

  useEffect(() => {
    console.log("Use effect is called!");
    console.log(userLocation);
    if (userLocation) {
      setMapCenter([userLocation.latitude, userLocation.longitude]);
      setZoomLevel(15); // Update the zoom level here
    }
  }, [userLocation]);

  // Custom hook to access the map instance
  function ChangeMapView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return (
      <>
        {userLocation && (
          <Marker
            position={[userLocation.latitude, userLocation.longitude]}
            icon={arrowIcon}
          ></Marker>
        )}
      </>
    );
  }

  return (
    <React.Fragment>
      <MapContainer center={mapCenter} zoom={zoomLevel}>
        <TileLayer
          detectRetina={true}
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url={"https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"}
        />
        <MapButtons />
        {userLocation && (
          <React.Fragment>
            <ChangeMapView center={mapCenter} zoom={zoomLevel} />
          </React.Fragment>
        )}
      </MapContainer>
    </React.Fragment>
  );
};

export default MainMap;
