import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, Popup } from "react-leaflet";
import L, { popup } from "leaflet";
import { useSelector, useDispatch } from "react-redux";
import { buttonsActions } from "../store/index.js";


const GeoLayerPolygons = (props) => {
  const [geojsonData, setGeojsonData] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [itemclicked, setItemclicked] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const dispatch = useDispatch();
  

  useEffect(() => {
    console.log("fetch the geojson", props.urltofetch);
    const fetchGeojsonData = async () => {
      try {
        const response = await fetch(props.urltofetch);
        const data = await response.json();
        setGeojsonData(data);
      } catch (error) {
        console.error("Error fetching GeoJSON data:", error);
      }
    };

    fetchGeojsonData();
  }, []);

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: () => {
        setItemclicked(feature);
        setSelectedFeature(feature);
        const content = (
          <div>
            <div
              style={{
                width: "20px",
                height: "10px",
                backgroundColor: feature.properties.codeColor,
                display: "inline-block",
                marginRight: "5px",
              }}
            ></div>
            <span>{feature.properties.Code_18}</span>
          </div>
        );
        setPopupContent(content);

        // Reset opacity/border for all features except the one that is clicked
        geojsonData.features.forEach((f) => {
          if (f.properties.ID != feature.properties.ID) {
            f.properties.opacity = 0.3;
            f.properties.weight = 0;
            f.properties.color = f.properties.codeColor;
          } else {
            f.properties.opacity = 1;
            f.properties.weight = 2;
            f.properties.color = 'red'
          }
        });
      },
      mouseover: () => {
        setSelectedFeature(feature);
        geojsonData.features.forEach((f) => {
          if (f.properties.ID != feature.properties.ID) {
            f.properties.weight = 0;
            f.properties.color = f.properties.codeColor;
            f.properties.opacity = 0.3;

          } else {
            f.properties.weight = 2;
            f.properties.color = 'red'
            f.properties.opacity = 0.5;
          }
        });
      },
      mouseout: () => {},

      popupclose: () => {
        setItemclicked(null);
        // Reset opacity for all features
        geojsonData.features.forEach((f) => {
          f.properties.opacity = 0.3;
          f.properties.weight = 0;
          f.properties.color = f.properties.codeColor;
        });
      },
    });
  };

  const style = (feature) => {
    const code = feature.properties.Code_18;
    let fillColor;

    switch (code) {
      case "111":
        fillColor = "#fc03a5";
        break;
      case "112":
        fillColor = "#fc0307";
        break;
      case "121":
        fillColor = "#ff63f2";
        break;
      case "122":
        fillColor = "#7d0116";
        break;
      case "123":
        fillColor = "#dbcacd";
        break;
      case "124":
        fillColor = "#d7c1e3";
        break;
      case "131":
        fillColor = "#9600e8";
        break;
      case "132":
        fillColor = "#a85700";
        break;
      case "133":
        fillColor = "#ed4fff";
        break;
      case "141":
        fillColor = "#f8b8ff";
        break;
      case "142":
        fillColor = "#f0e6f7";
        break;
      case "211":
        fillColor = "#f2f5ce";
        break;
      case "212":
        fillColor = "#e3eb13";
        break;
      case "221":
        fillColor = "#de9000";
        break;
      case "222":
        fillColor = "#e3bb71";
        break;
      case "223":
        fillColor = "#c99c47";
        break;
      case "242":
        fillColor = "#ebd55b";
        break;
      case "243":
        fillColor = "#9c8e43";
        break;
      case "311":
        fillColor = "#52ffa3";
        break;
      case "312":
        fillColor = "#0d753e";
        break;
      case "313":
        fillColor = "#04db6a";
        break;
      case "321":
        fillColor = "#a6c989";
        break;
      case "323":
        fillColor = "#88cc50";
        break;
      case "324":
        fillColor = "#93fa3e";
        break;
      case "332":
        fillColor = "#cfcfcf";
        break;
      case "333":
        fillColor = "#c5ede2";
        break;
      case "334":
        fillColor = "#000000";
        break;
      case "411":
        fillColor = "#a4a1e6";
        break;
      case "421":
        fillColor = "#cdcbf5";
        break;
      case "511":
        fillColor = "#24d1f0";
        break;
      case "512":
        fillColor = "#91eafa";
        break;
      case "521":
        fillColor = "#00ffea";
        break;
      default:
        fillColor = "#ffffff";
        break;
    }

    feature.properties.codeColor = fillColor;
     // Add codeColor to feature properties

    let f_op;
    if (feature.properties.opacity) {
      f_op = feature.properties.opacity;
    } else {
      f_op = 0.3;
    }

    let f_weight;
    if (feature.properties.weight) {
      f_weight = feature.properties.weight;
    } else {
      f_weight = 0;
    }

    let f_color;
    if (feature.properties.color) {
      f_color = feature.properties.color;
    } else {
      f_color = fillColor;
    }


    // console.log(f_op);
    return {
      fillColor,
      color: f_color,
      weight: f_weight,
      opacity: 2,
      fillOpacity: f_op, // Use opacity property from feature properties
      interactive: true, // Enable interactivity for click event
    };
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {geojsonData && (
        <GeoJSON data={geojsonData} style={style} onEachFeature={onEachFeature}>
          {selectedFeature && (
            <Popup position={selectedFeature.geometry.coordinates}>
              {popupContent}
            </Popup>
          )}
        </GeoJSON>
      )}
    </div>
  );
};

export default GeoLayerPolygons;
