import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';

const GeoLayerPoints = (props) => {
  const [geojsonData, setGeojsonData] = useState(null);

  useEffect(() => {
    console.log("fetch the geojson", props.urltofetch)
    const fetchGeojsonData = async () => {
      try {
        const response = await fetch(props.urltofetch);
        const data = await response.json();
        setGeojsonData(data);
      } catch (error) {
        console.error('Error fetching GeoJSON data:', error);
      }
    };

    fetchGeojsonData();
  }, []);

const pointToLayer = (feature, latlng) => {
  const value = feature.properties.VALUE;
  let dotColor;

  if (value >= -5 && value <= 5) {
    dotColor = 'lightgreen';
  } else if (value > 5 && value <= 8) {
    dotColor = 'lightblue';
  } else if (value > 8 && value <= 12) {
    dotColor = 'lightsteelblue';
  } else if (value > 12 && value <= 16) {
    dotColor = 'blue';
  } else if (value > 16 && value <= 20) {
    dotColor = 'darkblue';
  } else if (value > 20 && value <= 29) {
    dotColor = 'darkslateblue';
  } else if (value <= -5 && value > -8) {
    dotColor = 'yellow';
  } else if (value <= -8 && value > -12) {
    dotColor = 'orange';
  } else if (value <= -12 && value > -16) {
    dotColor = 'darkorange';
  } else if (value <= -16 && value > -20) {
    dotColor = 'orangered';
  } else if (value <= -20 && value > -29) {
    dotColor = 'darkred';
  } else if (value <= -29) {
    dotColor = 'darkred'; // Adjust the color as per your preference
  } else {
    dotColor = 'black';
  }

    return L.circleMarker(latlng, {
      radius: 2,
      fillColor: dotColor,
      color: dotColor,
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    });
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {geojsonData && (
          <GeoJSON
            data={geojsonData}
            pointToLayer={pointToLayer}
          />
      )}
    </div>
  );
};

export default GeoLayerPoints;