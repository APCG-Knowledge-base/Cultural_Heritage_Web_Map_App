import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";
import { useSelector, useDispatch } from "react-redux";
import { buttonsActions } from "../store/index.js";
import "./MainMap.css";
import arrow from "../ccccc.png";
import MapButtons from "./MapButtons";
import { ZoomControl } from "react-leaflet";
import CCMarker from "./CCMarker.js";
import AirMarker from "./AirMarker.js";
import { ccAthnes } from "../common/util.js";
import { ccpoints } from "../common/util.js";
import { aq_devices } from "../common/util.js";
import GeoLayerPoints from "./GeoLayerPoints.js";
import GeoLayerPolygons from "./GeoLayerPolygons.js";
import geojsonPoints from "../geoData/athensegms.geojson";
import geojsonPolygons from "../geoData/athenslandusecorine.geojson";
import ButtonDetailed from "./ButtonDetailed.js";
import CCinfo from "./CCinfo.js";
import InfosTab from "./InfosTab.js";

const arrowIcon = new L.Icon({
  iconUrl: arrow,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const urltofetchPoints = geojsonPoints;
const urltofetchPolygons = geojsonPolygons;

const MainMap = () => {
  const mapRef = useRef(null);
  const userLocation = useSelector((state) => state.userLocation);
  const showEGMS = useSelector((state) => state.showEGMS);
  const showLandcover = useSelector((state) => state.showLandcover);
  const userInfo = useSelector((state) => state.userInfo);
  const showCCinfo = useSelector((state) => state.showCCinfo);
  const infoShow = useSelector((state) => state.infoShow);
  const no2Show = useSelector((state) => state.no2Show);
  const no2List = useSelector((state) => state.no2List);

  const [mapCenter, setMapCenter] = useState([50.383234, 30.411789]);
  const [zoomLevel, setZoomLevel] = useState(7);
  // const [no2List, setNo2] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userLocation) {
      setMapCenter([userLocation.latitude, userLocation.longitude]);
      setZoomLevel(17); // Update the zoom level here
      dispatch(buttonsActions.geolocation(null));
    }
  }, [userLocation]);

  // useEffect(() => {
  //   console.log(no2List);
  // }, [no2List]);

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
  const closeCCinfo = () => {
    dispatch(buttonsActions.isccinfoopen(false));
  };

  // const makeairMarker = (airobjectsList) => {

  //     circleMarker.addTo(mapRef.current);
  //   });
  // }

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
        ref={mapRef}
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


        {no2Show && (
          <div className="markers_div">
            {no2List.map((point, index) => (
              <CircleMarker
                key={index}
                center={[point.y, point.x]}
                radius={12}
                color={point.color}
                fillColor={point.color}
                fillOpacity={1}
                stroke={true}
                weight={2}
              >
                <AirMarker key={index} no2point={point} />

              </CircleMarker>
            ))}
            {showCCinfo && (
              <div className="cc_info_container">
                <div onClick={closeCCinfo} className="trapezium"></div>
                <div className="arrow-left" onClick={closeCCinfo}></div>
                <CCinfo />
              </div>
            )}
          </div>
        )}


        <div className="markers_div">
          {ccpoints.map((point, index) => (
            <CircleMarker
              key={index}
              center={[point.y, point.x]}
              radius={12}
              color={"#333333"}
              fillColor={"#333333"}
              fillOpacity={1}
              stroke={true}
              weight={2}
            >
              <CCMarker key={index} ccpoint={point} />
            </CircleMarker>
          ))}
          {showCCinfo && (
            <div className="cc_info_container">
              <div onClick={closeCCinfo} className="trapezium"></div>
              <div className="arrow-left" onClick={closeCCinfo}></div>
              <CCinfo />
            </div>
          )}
        </div>
      </MapContainer>
    </div>
  );
};

export default MainMap;
