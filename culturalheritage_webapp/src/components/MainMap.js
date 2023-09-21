import React, { useState, useEffect, useMemo } from "react";
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
import { ccAthnes } from "../common/util.js";
import GeoLayerPoints from "./GeoLayerPoints.js";
import GeoLayerPolygons from "./GeoLayerPolygons.js";
import geojsonPoints from "../geoData/athensegms.geojson";
import geojsonPolygons from "../geoData/athenslandusecorine.geojson";
import ButtonDetailed from "./ButtonDetailed.js";
import InfosTab from "./InfosTab.js";
// import geojsonPolygons from "../geoData/test.geojson";

// Create a custom icon using the arrow image
const arrowIcon = new L.Icon({
  iconUrl: arrow,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const urltofetchPoints = geojsonPoints;
const urltofetchPolygons = geojsonPolygons;

const MainMap = () => {
  const userLocation = useSelector((state) => state.userLocation);
  const showEGMS = useSelector((state) => state.showEGMS);
  const showLandcover = useSelector((state) => state.showLandcover);
  const userInfo = useSelector((state) => state.userInfo);
  const infoShow = useSelector((state) => state.infoShow);
  const [mapCenter, setMapCenter] = useState([37.977916, 23.724778]);
  const [zoomLevel, setZoomLevel] = useState(13);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userLocation) {
      setMapCenter([userLocation.latitude, userLocation.longitude]);
      setZoomLevel(17); // Update the zoom level here
      dispatch(buttonsActions.geolocation(null));
    }
  }, [userLocation]);

  // Custom hook to access the map instance
  function ChangeMapView({ center, zoom }) {
    console.log("changeMapView is called");
    console.log(userLocation);
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

  const closeDetails = () => {
    dispatch(buttonsActions.userinfoopen(false));
  };
  const closeInfo = () => {
    dispatch(buttonsActions.isinfoopen(false));
  };

  const MemoizedGeoLayerPoints = React.memo(GeoLayerPoints);
  const MemoizedGeoLayerPolygons = React.memo(GeoLayerPolygons);

  // Use useMemo to memoize the rendering of MemoizedGeoLayerPolygons/Points
  const memoizedGeoLayerPolygons = useMemo(() => {
    if (showLandcover) {
      return <MemoizedGeoLayerPolygons urltofetch={urltofetchPolygons} />;
    }
    return null;
  }, [showLandcover, urltofetchPolygons]);

  const memoizedGeoLayerPoints = useMemo(() => {
    if (showEGMS) {
      return <MemoizedGeoLayerPoints urltofetch={urltofetchPoints} />;
    }
    return null;
  }, [showEGMS, urltofetchPoints]);

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

        {infoShow && (
          <div className="details_container">
            <button onClick={closeInfo} className="btn-x">
              X
            </button>
            <InfosTab />
          </div>
        )}

        {userInfo && (
          <div className="details_container">
            <button onClick={closeDetails} className="btn-x">
              X
            </button>
            <ButtonDetailed />
          </div>
        )}

        <div className="btn_container">
          <MapButtons />
        </div>

        {memoizedGeoLayerPoints}

        {memoizedGeoLayerPolygons}

        <div className="markers_div">
          {ccAthnes.map((point, index) => (
            <CCMakrer key={index} ccpoint={point} />
          ))}
        </div>
      </MapContainer>
    </div>
  );
};

export default MainMap;
