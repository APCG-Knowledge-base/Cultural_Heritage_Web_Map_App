import "./CCinfo.css";
import React from "react";
import { useSelector } from "react-redux";
import {
  faMuseum,
  faLeaf,
  faMapMarkedAlt,
  faUniversity,
  faColumns,
  faHistory,
  faLandmark,
  faBuilding,
  faCompass,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CCinfo(props) {
  const selectedMonument = useSelector((state) => state.selectedMonument);
  const imgurl = selectedMonument.imgurl;

  return (
    <div className="titlecc">
      <h1>{selectedMonument.title}</h1>
      <h3>
        <span style={{ fontWeight: "bold" }}>Selected Categories:</span>
        {`\u00A0 ${selectedMonument.objecttag[0]} \u00A0 ${selectedMonument.other_tags}`}
        <FontAwesomeIcon icon={faMuseum} size="1x" className="iconcc" />
      </h3>
      <p>{selectedMonument.description}</p>
      <p style={{ fontWeight: "bold" }}>
        {`Photos: \u00A0`}
        {imgurl.length ? (
          <div>
            {imgurl.map((urll) => (
              <img src={urll} />
            ))}
          </div>
        ) : (
          <span style={{ fontWeight: "normal" }}>No photos available</span>
          )}
      </p>
      {/* Display Date */}
      <div className="datecc">
        <span style={{ fontWeight: "bold" }}>Date:</span>{" "}
        {selectedMonument.date}
      </div>
      {/* Display Link for More Information */}
      <div className="moreinfocc" style={{ fontWeight: "bold" }}>
        {`More Information: \u00A0`}
        <a
          href={selectedMonument.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {selectedMonument.link}
        </a>
      </div>
    </div>
  );
}

export default CCinfo;
