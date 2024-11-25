import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  CircleMarker,
  ZoomControl,
  useMap, // Import useMap from react-leaflet
} from "react-leaflet";
import L from "leaflet";
import { useSelector, useDispatch } from "react-redux";
import { buttonsActions } from "../store/index.js";
import "./MainMap.css";
import arrow from "../ccccc.png";
import MapButtons from "./MapButtons";
import CCMarker from "./CCMarker.js";
import AirMarker from "./AirMarker.js";
import GeoLayerPoints from "./GeoLayerPoints.js";
import GeoLayerPolygons from "./GeoLayerPolygons.js";
import geojsonPoints from "../geoData/athensegms.geojson";
import geojsonPolygons from "../geoData/athenslandusecorine.geojson";
import ButtonDetailed from "./ButtonDetailed.js";
import CCinfo from "./CCinfo.js";
import InfosTab from "./InfosTab.js";
import Legend from "./Legend.js";

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
  const isloadinforgcc = useSelector((state) => state.isloadinforgcc);
  const infoShow = useSelector((state) => state.infoShow);
  const no2Show = useSelector((state) => state.no2Show);
  const objectsShow = useSelector((state) => state.objectsShow);
  const no2List = useSelector((state) => state.no2List);
  const transformedData = useSelector((state) => state.transformedData);
  const ccpointsKiev = useSelector((state) => state.ccpointsKiev);
  const [clusteredCCpoints, setClusteredCCpoints] = useState([]); // Define clusteredCCpoints state
  const [isLoading, setIsLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState([50.383234, 30.411789]);
  const [zoomLevel, setZoomLevel] = useState(7);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userLocation) {
      setMapCenter([userLocation.latitude, userLocation.longitude]);
      setZoomLevel(17); // Update the zoom level here
      dispatch(buttonsActions.geolocation(null));
    }
  }, [userLocation, dispatch]);

  useEffect(() => {
    if (transformedData.length > 0) {
      setIsLoading(false);
    }
  }, [transformedData]);

  // Custom hook to change map view
  function ChangeMapView({ center, zoom }) {
    const map = useMap(); // Use useMap hook to access the map instance
    useEffect(() => {
      map.setView(center, zoom);
    }, [center, zoom, map]);
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

  // Handle zoom end to update zoom level state
  useEffect(() => {
    const map = mapRef.current;
    if (map) {
      
      map.on("zoomend", () => { 
        const zoom = map.getZoom();
        setZoomLevel(zoom);
      });
    }
  }, []);

  useEffect(() => {
    // console.log("Zoom level changed:", zoomLevel);
    const cc = clusterPoints(ccpointsKiev, zoomLevel);
    setClusteredCCpoints(cc);
  }, [zoomLevel, ccpointsKiev]);

  const closeDetails = () => {
    dispatch(buttonsActions.userinfoopen(false));
  };

  const closeInfo = () => {
    dispatch(buttonsActions.isinfoopen(false));
  };

  const closeCCinfo = () => {
    dispatch(buttonsActions.isccinfoopen(false));
  };

  const MemoizedGeoLayerPoints = React.memo(GeoLayerPoints);
  const MemoizedGeoLayerPolygons = React.memo(GeoLayerPolygons);

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

  const clusterPoints = (points, zoom) => {
    const clusters = [];
    const clusterRadius = 0.0025 * Math.pow(2, 13 - zoom);
    //console.log("Clustering points with zoom level:", zoom);
    //console.log("and radius:", clusterRadius);
    points.forEach((point, index) => {
      let added = false;
      for (const cluster of clusters) {
        const dist = Math.sqrt(
          Math.pow(point.x - cluster.center.x, 2) +
            Math.pow(point.y - cluster.center.y, 2)
        );

        if (dist < clusterRadius) {
          cluster.points.push(point);
          cluster.center.x =
            (cluster.center.x * (cluster.points.length - 1) + point.x) /
            cluster.points.length;
          cluster.center.y =
            (cluster.center.y * (cluster.points.length - 1) + point.y) /
            cluster.points.length;
          added = true;
          break;
        }
      }
      if (!added) {
        const newCluster = {
          center: { x: point.x, y: point.y },
          points: [point],
        };
        clusters.push(newCluster);
      }
    });

    //console.log("Final clusters:", clusters);
    return clusters;
  };

  const handleClusterClick = (center) => {
    if (mapRef.current) {
      mapRef.current.setView([center.y, center.x], 17);
    }
    // console.log("e")
    // const map = mapRef.current;
    // if (map) {
    //   map.on("zoomend", () => {
    //     const zoom = map.getZoom();
    //     setZoomLevel(zoom);
    //   });
    // }
  };

  const createCustomClusterMarker = (cluster, index) => {
    const clusterSize = cluster.points.length;
    const iconSize = Math.min(40 + clusterSize / 2, 100); // Adjust size based on the number of points
    const html = `
      <div class="custom-cluster-marker" style="width: ${iconSize}px; height: ${iconSize}px;">
        ${clusterSize}
      </div>
    `;
    return L.divIcon({
      html,
      className: "",
    });
  };

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
          attributionPosition="bottomtop"
        />

        {userLocation && <ChangeMapView center={mapCenter} zoom={zoomLevel} />}

        <div className="leaflet-top leaflet-right">
          <ZoomControl position="topleft" />
        </div>

        <div className="leaflet-bottom leaflet-left">
          <Legend position="bottomleft" />
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

        {/* CC of kiev (not the markers and the events) when the events are shown! */}
        {objectsShow && (
          <div className="markers_div">
            {isloadinforgcc ? (
              <div class="backdrop">
                <div class="spinner">
                  <div class="dot"></div>
                  <div class="dot"></div>
                  <div class="dot"></div>
                </div>
              </div>
            ) : (
              <>
                {ccpointsKiev.map((point, index) => (
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
              </>
            )}
          </div>
        )}

        {/* Events  of kiev  */}
        {objectsShow && (
          <div className="markers_div">
            {isLoading || isloadinforgcc ? (
              <div class="backdrop">
                <div class="spinner">
                  <div class="dot"></div>
                  <div class="dot"></div>
                  <div class="dot"></div>
                </div>
              </div>
            ) : (
              <>
                {transformedData.map((point, index) => (
                  <CircleMarker
                    key={index}
                    center={[point.y, point.x]}
                    radius={12}
                    color={point.color}
                    fillColor={point.color}
                    fillOpacity={1}
                    stroke={true}
                    weight={2}
                  />
                ))}
                {showCCinfo && (
                  <div className="cc_info_container">
                    <div onClick={closeCCinfo} className="trapezium"></div>
                    <div className="arrow-left" onClick={closeCCinfo}></div>
                    <CCinfo />
                  </div>
                )}
              </>
            )}
          </div>
        )}

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

        {/* CC of kiev (not the markers and the events) when the events are not shown! */}
        {/* {console.log(isloadinforgcc)} */}
        {!objectsShow && (
          <div className="markers_div">
            {isloadinforgcc ? (
              <div class="backdrop">
                <div class="spinner">
                  <div class="dot"></div>
                  <div class="dot"></div>
                  <div class="dot"></div>
                </div>
              </div>
            ) : (
              <>
                {clusteredCCpoints.map((cluster, index) =>
                  cluster.points.length === 1 ? (
                    <CircleMarker
                      key={index}
                      center={[cluster.points[0].y, cluster.points[0].x]}
                      radius={12}
                      color={"#333333"}
                      fillColor={"#333333"}
                      fillOpacity={1}
                      stroke={true}
                      weight={2}
                    >
                      <CCMarker key={index} ccpoint={cluster.points[0]} />
                    </CircleMarker>
                  ) : (
                    <Marker
                      key={index}
                      position={[cluster.center.y, cluster.center.x]}
                      icon={createCustomClusterMarker(cluster, index)}
                      eventHandlers={{
                        click: () => handleClusterClick(cluster.center),
                      }}
                    />
                  )
                )}
                {showCCinfo && (
                  <div className="cc_info_container">
                    <div onClick={closeCCinfo} className="trapezium"></div>
                    <div className="arrow-left" onClick={closeCCinfo}></div>
                    <CCinfo />
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </MapContainer>
    </div>
  );
};

export default MainMap;
