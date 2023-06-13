import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";
import L from "leaflet";
import { useSelector } from "react-redux";
import "./MainMap.css";
import arrow from "../ccccc.png";
import MapButtons from "./MapButtons";
import { ZoomControl } from "react-leaflet";
import { withWidth } from "@material-ui/core";
import { Height } from "@material-ui/icons";
import CCMakrer from "./CCMarker.js";
import { ccpoints } from "../common/util.js";
// Create a custom icon using the arrow image
const arrowIcon = new L.Icon({
  iconUrl: arrow,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const MainMap = () => {
  const userLocation = useSelector((state) => state.userLocation);
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
    <MapContainer
      center={mapCenter}
      zoom={zoomLevel}
      className="map-container"
      zoomControl={false}
    >
      <TileLayer
        detectRetina={true}
        url={
          "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        }
        attributionPosition="bottomtop" // Set the attribution position here
      />
      {userLocation && <ChangeMapView center={mapCenter} zoom={zoomLevel} />}
      <div className="btn_container" style={{ width: "5%", height: "100%" }}>
        <MapButtons />
      </div>
      <div className="leaflet-top leaflet-right">
        {" "}
        <ZoomControl position="topright" />{" "}
      </div>
      {ccpoints.map((point, index) => (
        <CCMakrer key={index} ccpoint={point} />
      ))}
    </MapContainer>
  );
};

export default MainMap;
