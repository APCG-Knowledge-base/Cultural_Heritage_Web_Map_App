import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Icon } from "react-leaflet";
import L from "leaflet";
import NearMe from "@material-ui/icons/NearMe";
import LayersIcon from "@material-ui/icons/Layers";
import MuseumIcon from "@material-ui/icons/Museum";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import NoteIcon from "@material-ui/icons/Note";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBiohazard,
  faRadiation,
  faEarthquake,
  faSignal,
  faMountain,
  faExclamationCircle,
  faLandmark,
  faCloud,
} from "@fortawesome/free-solid-svg-icons";
import AirIcon from "@material-ui/icons/Cloud";
import { useSelector, useDispatch } from "react-redux";
import { buttonsActions } from "../store/index.js";
import "./MainMap.css";
import "./MapButtons.css";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
import { LocationOnOutlined } from "@material-ui/icons";

const MapButtons = (props) => {
  const userLocation = useSelector((state) => state.userLocation);
  const showEGMS = useSelector((state) => state.showEGMS);
  const showLandcover = useSelector((state) => state.showLandcover);
  const cchover = useSelector((state) => state.cchover);
  const lndhover = useSelector((state) => state.lndhover);
  const grmhover = useSelector((state) => state.grmhover);
  const glctnhover = useSelector((state) => state.glctnhover);
  const ihover = useSelector((state) => state.ihover);
  const airpoluhover = useSelector((state) => state.airpoluhover);
  const dispatch = useDispatch();
  const [classesCC, setCC] = useState('ccbtn');
  const [classesLand, setLand] = useState('lndbtn');
  const [classesInf, setInf] = useState("infobtn");
  const [classesGrm, setGrm] = useState("grmbtn");
  const [classesAir, setAir] = useState("airbtn");

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Found users position!!", position);
          const { latitude, longitude } = position.coords;
          dispatch(buttonsActions.geolocation({ latitude, longitude }));
          // setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const ccHandlerclickHandler = () => {
    if (classesCC != 'clicked'){
      setCC('clicked')
    }else{
      setCC('ccbtn')
    }
  }

  const handleGroundMotion = () => {
    dispatch(buttonsActions.egms(!showEGMS));
    dispatch(buttonsActions.land(false));
    if (!showEGMS){
      setGrm('clicked')
    }else{
      setGrm('grmbtn')
    }
    setLand('lndbtn')
    setAir('airbtn')
  };
  const handleLandcover = () => {
    dispatch(buttonsActions.land(!showLandcover));
    setGrm('grmbtn')
    setAir('airbtn')
    dispatch(buttonsActions.egms(false));
    if (!showLandcover){
      setLand('clicked')
    }else{
      setLand('lndbtn')
    }
  };



  //HOvers
  const handleHoverccin = () => {
    dispatch(buttonsActions.culthover(true));
  };
  const handleHoverccout = () => {
    dispatch(buttonsActions.culthover(false));
  };
  const handleHoverairin = () => {
    dispatch(buttonsActions.airhover(true));
  };
  const handleHoverairout = () => {
    dispatch(buttonsActions.airhover(false));
  };
  const handleHoverlandin = () => {
    dispatch(buttonsActions.landhover(true));
  };
  const handleHoverlandout = () => {
    dispatch(buttonsActions.landhover(false));
  };
  const handleHovergrmin = () => {
    dispatch(buttonsActions.grmotionhover(true));
  };
  const handleHovergrmout = () => {
    dispatch(buttonsActions.grmotionhover(false));
  };
  const handleHoverinfoin = () => {
    dispatch(buttonsActions.infohover(true));
  };
  const handleHoverifnoout = () => {
    dispatch(buttonsActions.infohover(false));
  };
  const handleHoverlocationin = () => {
    dispatch(buttonsActions.glocationhover(true));
  };
  const handleHoverlocationout = () => {
    dispatch(buttonsActions.glocationhover(false));
  };

 


  return (
    <div className="main-container">
      <div className="btn-container">
        <FontAwesomeIcon
          className={classesCC}
          icon={faLandmark}
          size="2x"
          // id="ccbtn"
          onMouseOver={handleHoverccin}
          onMouseOut={handleHoverccout}
          onClick={ccHandlerclickHandler}
        />
        {cchover && (
          <div>
            <div className="hv">Cultural Heritage Map</div>
            <div className="rhombus"></div>
          </div>
        )}
      </div>

      <div className="btn-container">
        <FontAwesomeIcon
          icon={faCloud}
          size="2x"
          id="airbtn"
          onMouseOver={handleHoverairin}
          onMouseOut={handleHoverairout}
        />
        {airpoluhover && (
          <div>
            <div className="rhombus"></div>
            <div className="hv">Air Quality Map</div>
          </div>
        )}
      </div>

      <div className="btn-container">
        <FontAwesomeIcon
          icon={faMountain}
          size="2x"
          className={classesGrm}
          onClick={handleGroundMotion}
          onMouseOver={handleHovergrmin}
          onMouseOut={handleHovergrmout}
        />
        {grmhover && (
          <div>
            <div className="rhombus"></div>

            <div className="hv">Ground Motion Map</div>
          </div>
        )}
      </div>

      <div className="btn-container">
        <LayersIcon
          id={classesLand}
          onClick={handleLandcover}
          onMouseOver={handleHoverlandin}
          onMouseOut={handleHoverlandout}
        />
        {lndhover && (
          <div>
            <div className="rhombus"></div>

            <div className="hv">Land Cover Map</div>
          </div>
        )}
      </div>

      <span id="spancheck"></span>

      <div className="btn-container">
        <NearMe
          id="geolocationbtn"
          onClick={handleGeolocation}
          onMouseOver={handleHoverlocationin}
          onMouseOut={handleHoverlocationout}
        />
        {glctnhover && (
          <div>
            <div className="rhombus"></div>
            <div className="hv">Locate Me</div>
          </div>
        )}
      </div>
      <div className="btn-container">
        <InfoOutlinedIcon
          id="infobtn"
          onMouseOver={handleHoverinfoin}
          onMouseOut={handleHoverifnoout}
        />
        {ihover && (
          <div>
            <div className="rhombus"></div>
            <div className="hv">Information</div>{" "}
          </div>
        )}
      </div>

    </div>
  );
};

export default MapButtons;
