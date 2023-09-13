import "./ButtonDetailed.css";
import { buttonsActions } from "../store/index.js";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-router-dom";

function ButtonDetailed() {
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  const closeDetails = () => {
    dispatch(buttonsActions.userinfoopen(false));
  };
  const closeDetails2 = () => {
    dispatch(buttonsActions.userinfoopen(false));
    dispatch(buttonsActions.logincheck(false));
    localStorage.setItem("userName", "No");
  };

  return (
    <div className="container1">
      <button onClick={closeDetails}>X</button>
      <div className="title">EO</div>;
      <div className="details">
        Lorem ipsum dolor sit amet, con lorem ipsum dolor lorem ipsum dolor
        lorem ipsum d lorem ipsum d lorem ipsum d lorem ipsum d lorem ips
      </div>
      <button onClick={closeDetails2}>Log Out</button>
    </div>
  );
}

export default ButtonDetailed;
