import "./CCinfo.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  faMuseum,
  faLeaf,
  faMapMarkedAlt,
  faUniversity,
  faColumns,
  faLandmark,
  faBuilding,
  faCompass,
  faBook,
  faChurch,
  faTheaterMasks,
  faScroll,
  faHistory,
  faMap,
  faGlobe,
  faMonument,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CCinfo(props) {
  const selectedMonument = useSelector((state) => state.selectedMonument);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const imgurl = selectedMonument.imgurl;
  const tagIconMapping = {
    "Ancient buildings": faMuseum,
    Monuments: faMonument,
    Libraries: faScroll,
    Sightseeing: faMapMarkedAlt,
    "Religious Buildings": faChurch,
    Museums: faBuilding,
    Theaters: faTheaterMasks,
  };

  const object_for_basic_infos = selectedMonument;
  // console.log(object_for_basic_infos)
  const renderTagwithIcons = () => {
    const tags = [object_for_basic_infos.objecttag[0]];
    if (
      object_for_basic_infos.other_tags &&
      object_for_basic_infos.other_tags.length > 0
    ) {
      tags.push(...object_for_basic_infos.other_tags);
    }

    return (
      <div className="tags-container">
        {tags.map((tag, index) => (
          <h3 key={index} className="tag">
            {tag}
            <FontAwesomeIcon
              icon={tagIconMapping[tag]}
              size="1x"
              className="iconcc"
            />
          </h3>
        ))}
      </div>
    );
  };

  const handleImageClick = (urll) => {
    setEnlargedImage(urll);
  };

  // Function to close the enlarged image
  const closeEnlargedImage = () => {
    setEnlargedImage(null);
  };

  return (
    <div className="titlecc">
      <h1 className="titleinfocc">{object_for_basic_infos.title}</h1>
      {object_for_basic_infos.subtitle && (
        <h2>{object_for_basic_infos.subtitle}</h2>
      )}
      {renderTagwithIcons()}

      <p>{selectedMonument.description}</p>

      <div className="photos-container">
        <p style={{ fontWeight: "bold", margin: "0" }}>{`Photos: \u00A0`}</p>
        <div className="img-container">
          {imgurl.length ? (
            imgurl.map((urll, index) => (
              <img
                src={urll}
                key={index}
                alt={`Photo ${index}`}
                onClick={() => handleImageClick(urll)} // Add click handler
              />
            ))
          ) : (
            <span style={{ fontWeight: "normal" }}>No photos available</span>
          )}
        </div>
      </div>
      {enlargedImage && (
        <div>
          <div
            className="backdrop"
            onClick={closeEnlargedImage} // Close the image when backdrop is clicked
          ></div>
          <img
            src={enlargedImage}
            alt="Enlarged Photo"
            className="enlarged-image"
          />
        </div>
      )}

      <div className="othercc">
        <div className="datecc">
          <span style={{ fontWeight: "bold" }}>Event Date:</span>{" "}
          {selectedMonument.date}
        </div>

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
    </div>
  );
}

export default CCinfo;
