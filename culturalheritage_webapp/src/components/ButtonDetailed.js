import "./ButtonDetailed.css";
import { buttonsActions } from "../store/index.js";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-router-dom";

function ButtonDetailed() {
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  // const closeDetails = () => {
  //   dispatch(buttonsActions.userinfoopen(false));
  // };
  const closeDetails2 = () => {
    dispatch(buttonsActions.userinfoopen(false));
    dispatch(buttonsActions.logincheck(false));
    localStorage.setItem("userName", "No");
  };

  return (
    <div className="container1">
      {/* <button onClick={closeDetails} className="btn btn-">X</button> */}
      <div className="title">Profile Settings</div>
      <div className="details">
        <p>Name: Charalampos</p>
        <p>Surname: Chatzidiakos</p>
        <p>List of Events: <a href="#">Event 1</a>, <a href="#">Event 2</a>, <a href="#">Event 3</a></p>
      </div>
      <div>
        Email: chchatzidiakos@outlook.com
      </div>
      <button onClick={closeDetails2}>Log Out</button>
    </div>
  );
}

export default ButtonDetailed;
