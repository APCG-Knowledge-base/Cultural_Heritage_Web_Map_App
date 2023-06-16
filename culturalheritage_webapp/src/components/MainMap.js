import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";
import L from "leaflet";
import { useSelector, useDispatch } from "react-redux";
import { buttonsActions } from "../store/index.js";
import "./MainMap.css";
import arrow from "../ccccc.png";
import MapButtons from "./MapButtons";
import { ZoomControl } from "react-leaflet";
import CCMakrer from "./CCMarker.js";
import { ccpoints } from "../common/util.js";
import GeoLayerPoints from "./GeoLayerPoints.js";
import geojsonPoints from "../geoData/egmsathens1pxthinned.geojson";

// Create a custom icon using the arrow image
const arrowIcon = new L.Icon({
  iconUrl: arrow,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const urltofetchPoints = geojsonPoints;

const MainMap = () => {
  const userLocation = useSelector((state) => state.userLocation);
  const showEGMS = useSelector((state) => state.showEGMS);
  const [mapCenter, setMapCenter] = useState([37.977916, 23.724778]);
  const [zoomLevel, setZoomLevel] = useState(13);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Use effect is called!:", userLocation);
    if (userLocation) {
      setMapCenter([userLocation.latitude, userLocation.longitude]);
      setZoomLevel(17); // Update the zoom level here
      dispatch(buttonsActions.geolocation(null));
    }
  }, [userLocation]);
  
  // Custom hook to access the map instance
  function ChangeMapView({ center, zoom }) {
    console.log("changeMapView is called");
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
    <div id="parent_of_all_div">
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

        <div className="leaflet-top leaflet-right">
          {" "}
          <ZoomControl position="topright" />{" "}
        </div>

        <div className="btn_container">
          <MapButtons />
        </div>

        {showEGMS && <GeoLayerPoints urltofetch={urltofetchPoints} />}

        {ccpoints.map((point, index) => (
          <CCMakrer key={index} ccpoint={point} />
        ))}
      </MapContainer>
    </div>
  );
};

export default MainMap;
