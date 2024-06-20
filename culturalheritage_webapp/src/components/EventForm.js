import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect,
} from "react-router-dom";
import { ccAthnes } from "../common/util.js";
import { ccpoints } from "../common/util.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import classes from "./EventForm.module.css";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";


function EventForm({ event }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [selectedTitle, setSelectedTitle] = useState(event ? event.title : ""); // Initialize with event title
  const ccpointsKiev = useSelector((state) => state.ccpointsKiev);


  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("/");
  }

  function titleHandler(e) {
    setSelectedTitle(e.target.value)
  }


  
  return (
    <>
      <FontAwesomeIcon
        icon={faArrowLeft}
        size="2x"
        className={classes.gobackbtn}
        onClick={cancelHandler}
      />
      <Form method="post" className={classes.form}>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}

        <p>
          <label htmlFor="monument">Select a monument</label>
          <select
            id="monument"
            type="text"
            name="monument"
            required
            value={selectedTitle} 
            onChange={titleHandler}
          >
            <option value="" disabled>Select a monument</option>
            {ccpointsKiev.map((item) => (
              <option key={item.title} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>
        </p>

        {/* <p>
          <label htmlFor="infotxt">Description</label>
          <input
            id="infotxt"
            type="text"
            name="infotxt"
            required
            defaultValue={event ? event.title : ""}
          />
        </p> */}
        <p>
          <label htmlFor="image">Image</label>
          <input
            id="image"
            type="url"
            name="image"
            required
            defaultValue={event ? event.image : ""}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            name="date"
            required
            defaultValue={event ? event.date : ""}
          />
        </p>
        <p>
          <label htmlFor="title">Source</label>
          <input
            id="title"
            type="text"
            name="title"
            required
            defaultValue={event ? event.title : ""}
          />
        </p>
        <p>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            required
            defaultValue={event ? event.description : ""}
          />
        </p>
        <div className={classes.actions}>
          <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
            Cancel
          </button>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </Form>
    </>
  );
}

export default EventForm;
