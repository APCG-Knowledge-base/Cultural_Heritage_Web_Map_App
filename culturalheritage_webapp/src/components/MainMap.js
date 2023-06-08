import React, { Component } from "react";
import { MapContainer, TileLayer, LayersControl, FeatureGroup } from "react-leaflet";
import "./MainMap.css";

const MainMap = (props) => {
  return (
    <React.Fragment>
        <MapContainer
            center={[50.466, 30.481]}
            zoom={13}
          >
        <TileLayer
              // maxZoom=18
              // reuseTiles=true
              detectRetina={true}
              attribution={'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}
              url={'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'}
              />
              </MapContainer>
    </React.Fragment>
  );
};

export default MainMap;
