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
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import AirIcon from "@material-ui/icons/Cloud";
import { useSelector, useDispatch } from "react-redux";
import { buttonsActions } from "../store/index.js";
import "./MainMap.css";
import "./MapButtons.css";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
import { LocationOnOutlined } from "@material-ui/icons";
import { json, redirect } from "react-router";
import { useNavigate } from "react-router-dom";
import ButtonDetailed from "./ButtonDetailed.js";
import { aq_devices } from "../common/util.js";


const MapButtons = (props) => {
  const userLocation = useSelector((state) => state.userLocation);
  const showEGMS = useSelector((state) => state.showEGMS);
  const showLandcover = useSelector((state) => state.showLandcover);
  const isloggedin = useSelector((state) => state.isloggedin);
  const userInfo = useSelector((state) => state.userInfo);
  const infoShow = useSelector((state) => state.infoShow);
  const no2Show = useSelector((state) => state.no2Show);
  const userName = useSelector((state) => state.userName);
  const cchover = useSelector((state) => state.cchover);
  const lndhover = useSelector((state) => state.lndhover);
  const grmhover = useSelector((state) => state.grmhover);
  const glctnhover = useSelector((state) => state.glctnhover);
  const ihover = useSelector((state) => state.ihover);
  const airpoluhover = useSelector((state) => state.airpoluhover);
  const addeventhover = useSelector((state) => state.addeventhover);
  const loginhover = useSelector((state) => state.loginhover);
  const dispatch = useDispatch();
  const [classesCC, setCC] = useState("ccbtn");
  const [classesLand, setLand] = useState("lndbtn");
  const [classesInf, setInf] = useState("infobtn");
  const [classesGrm, setGrm] = useState("grmbtn");
  const [classesAir, setAir] = useState("airbtn");
  const [classesNav, setNav] = useState("navbtn");
  const [classesUsr, setUsr] = useState("usrbtn");
  const [classesPlus, setPlus] = useState("plusbtn");
  const [classesProfile, setProfile] = useState("profilee");
  const [classesInfo, setInfoclass] = useState("infobtn");
  const navigate = useNavigate();

  useEffect(() => {
    let t = localStorage.getItem("token");
    let l = localStorage.getItem("userName");
    if (t) {
      dispatch(buttonsActions.logincheck(true));
    }
    if (l) {
      dispatch(buttonsActions.setusername(l[0]));
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      setProfile("clicked2");
    } else {
      setProfile("profilee");
    }
  }, [userInfo]);

  useEffect(() => {
    if (infoShow) {
      setInfoclass("clicked");
    } else {
      setInfoclass("infobtn");
    }
  }, [infoShow]);

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
    if (classesCC != "clicked") {
      setCC("clicked");
    } else {
      setCC("ccbtn");
    }
  };

  const handleGroundMotion = () => {
    dispatch(buttonsActions.egms(!showEGMS));
    dispatch(buttonsActions.land(false));
    dispatch(buttonsActions.no2(false));
    dispatch(buttonsActions.setno2List([]));

    if (!showEGMS) {
      setGrm("clicked");
    } else {
      setGrm("grmbtn");
    }
    setLand("lndbtn");
    setAir("airbtn");
  };

  const handleLandcover = () => {
    dispatch(buttonsActions.land(!showLandcover));
    setGrm("grmbtn");
    setAir("airbtn");
    dispatch(buttonsActions.egms(false));
    dispatch(buttonsActions.no2(false));
    dispatch(buttonsActions.setno2List([]));

    if (!showLandcover) {
      setLand("clicked");
    } else {
      setLand("lndbtn");
    }
  };

  const no2Handler = () => {
    dispatch(buttonsActions.no2(!no2Show));
    setGrm("grmbtn");
    setLand("lndbtn");
    dispatch(buttonsActions.land(false));
    dispatch(buttonsActions.egms(false));
    if (!no2Show) {
      setAir("clicked");
      Promise.all(
        aq_devices
          .filter((device) => device.pollutant.includes("no2"))
          .map((device) => getairdatano2(device))
      ).then((results) => {
        dispatch(buttonsActions.setno2List(results));
      });  
    } else {
      setAir("airbtn");
      dispatch(buttonsActions.setno2List([]));
    }
  };

  const getairdatano2 = async (device) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so we add 1 and pad with '0' if necessary
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    const base_url = `https://www.saveecobot.com/en/maps/marker.json?marker_id=${device.id}&marker_type=device&pollutant=no2_ppb&rand=${formattedDate}`;
    const x = device.x;
    const y = device.y;
    const id = device.id;
    try {
      const res = await fetch(base_url); ///
      const data = await res.json();
      const objectArray = Object.entries(data.history);
      const device_content = data.content;
      const historical_data = data.history;
      let color;
      let txt_lvl;
      let device_value;
      let device_last_date;
      if (objectArray.length > 0) {
        // Get the last entry in the array
        const [lastKey, lastValue] = objectArray[objectArray.length - 1];
        device_value = lastValue;
        device_last_date = lastKey;
        if (device_value >= 0 && device_value <= 53) {
          color = "green";
          txt_lvl = "good level";
        } else if (device_value >= 54 && device_value <= 100) {
          color = "yellow";
          txt_lvl = "moderate level";
        } else if (device_value >= 101 && device_value <= 380) {
          color = "orange";
          txt_lvl = "unhealthy for sensitives level";
        } else if (device_value >= 381 && device_value <= 649) {
          color = "red";
          txt_lvl = "unhealthy level";
        } else if (device_value >= 650 && device_value <= 1249) {
          color = "purple";
          txt_lvl = "very unhealthy level";
        } else if (device_value >= 1250) {
          color = "black";
          txt_lvl = "hazardous level";
        }
      } else {
        console.log("Object is empty.");
        color = "grey";
        txt_lvl = "not available";
        device_value = "-";
        device_last_date = " ";
        historical_data = " ";
        device_content = " ";
      }
      const new_object = {
        id: id,
        x: x,
        y: y,
        color: color,
        device_content: device_content,
        device_value: device_value,
        device_last_date: device_last_date,
        historical_data: historical_data,
      };
      return new_object;
    } catch (err) {
      console.log("here is an error", err);
      return null;
    }
  };


  const loginredirect1 = () => {
    console.log("this is the login status: ", isloggedin);
    if (isloggedin) {
      navigate("/events");
    } else {
      navigate("/auth?mode=login");
    }
    handleHoverplusout();
  };

  const loginredirect2 = () => {
    console.log("this is the login status: ", isloggedin);
    if (isloggedin) {
      dispatch(buttonsActions.isinfoopen(false));
      dispatch(buttonsActions.isccinfoopen(false));
      dispatch(buttonsActions.userinfoopen(!userInfo));
    } else {
      navigate("/auth?mode=login");
      handleHoverloginout();
    }
  };

  const handleInfotab = () => {
    dispatch(buttonsActions.userinfoopen(false));
    dispatch(buttonsActions.isccinfoopen(false));
    dispatch(buttonsActions.isinfoopen(!infoShow));
    // setProfile("profilee")
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
  const handleHoverlogin = () => {
    dispatch(buttonsActions.loginhover(true));
  };
  const handleHoverloginout = () => {
    dispatch(buttonsActions.loginhover(false));
  };
  const handleHoverplusin = () => {
    dispatch(buttonsActions.addeventhover(true));
  };
  const handleHoverplusout = () => {
    dispatch(buttonsActions.addeventhover(false));
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
          className={classesAir}
          size="2x"
          id="airbtn"
          onMouseOver={handleHoverairin}
          onMouseOut={handleHoverairout}
          onClick={no2Handler}
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
        <FontAwesomeIcon
          icon={faPlus}
          size="2x"
          className={classesUsr}
          onClick={loginredirect1}
          onMouseOver={handleHoverplusin}
          onMouseOut={handleHoverplusout}
        />
        {addeventhover && (
          <div>
            <div className="rhombus"></div>

            <div className="hv">Report Event</div>
          </div>
        )}
      </div>

      <div className="btn-container">
        <NearMe
          id="geolocationbtn"
          className={classesNav}
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

      {!isloggedin ? (
        <div className="btn-container">
          <FontAwesomeIcon
            icon={faUser}
            size="2x"
            className={classesPlus}
            onClick={loginredirect2}
            onMouseOver={handleHoverlogin}
            onMouseOut={handleHoverloginout}
          />
          {loginhover && (
            <div>
              <div className="rhombus"></div>
              <div className="hv">Login</div>
            </div>
          )}
        </div>
      ) : (
        <div className="btn-container">
          <div
            className={classesProfile}
            onClick={loginredirect2}
            onMouseOver={handleHoverlogin}
            onMouseOut={handleHoverloginout}
          >
            {userName.toUpperCase()}
          </div>
          {loginhover && (
            <div>
              <div className="rhombus"></div>
              <div className="hv">Profile Settings</div>
            </div>
          )}
        </div>
      )}

      <div className="btn-container">
        <InfoOutlinedIcon
          id="infobtn"
          className={classesInfo}
          onMouseOver={handleHoverinfoin}
          onMouseOut={handleHoverifnoout}
          onClick={handleInfotab}
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
