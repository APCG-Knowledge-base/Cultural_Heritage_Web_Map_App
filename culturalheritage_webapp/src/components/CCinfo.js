import "./CCinfo.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  faMuseum,
  faMapMarkedAlt,
  faMonument,
  faBuilding,
  faChurch,
  faTheaterMasks,
  faScroll,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const tagIconMapping = {
  "Ancient buildings": faMuseum,
  Monuments: faMonument,
  Libraries: faScroll,
  Sightseeing: faMapMarkedAlt,
  "Religious Buildings": faChurch,
  Museums: faBuilding,
  Theaters: faTheaterMasks,
};

const TagWithIcons = ({ tags }) => (
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

const ImageGallery = ({ imgurl, handleImageClick }) => (
  <div className="photos-container">
    <p style={{ fontWeight: "bold", margin: "0" }}>Photos:</p>
    <div className="img-container">
      {imgurl.length ? (
        imgurl.map((url, index) => (
          <img
            src={url}
            key={index}
            alt={`Photo ${index}`}
            onClick={() => handleImageClick(url)}
          />
        ))
      ) : (
        <span style={{ fontWeight: "normal", paddingLeft: "19px" }}>
          No photos available
        </span>
      )}
    </div>
  </div>
);

const EventDetails = ({ event, handleImageClick }) => (
  <div className="event-details" style={{ padding: "10px", marginTop: "10px" }}>
    <p>{event.infotxt}</p>
    {event.after && (
      <div className="img-container">
        <img
          src={event.after}
          alt="After Event"
          onClick={() => handleImageClick(event.after)}
        />
      </div>
    )}
    <p>
      <strong>Event Date:</strong> {event.happend}
    </p>
    <p>
      <strong>Source:</strong> {event.source}
    </p>
  </div>
);

const EventTabs = ({ events, activeEventIndex, setActiveEventIndex }) => (
  <div className="event-tabs">
    {events.map((event, index) => {
      const isActive = index === activeEventIndex;
      const color = event.restored ? "orange" : "red";

      return (
        <span
          key={index}
          className={`event-tab ${isActive ? "active" : ""}`}
          onClick={() => setActiveEventIndex(index)}
          style={{
            borderBottom: isActive ? `2px solid ${color}` : "none",
            color: isActive ? color : "black",
          }}
        >
          {`Event ${index + 1}`}
        </span>
      );
    })}
  </div>
);

function CCinfo(props) {
  const selectedMonument = useSelector((state) => state.selectedMonument);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [activeEventIndex, setActiveEventIndex] = useState(0);

  const handleImageClick = (url) => {
    setEnlargedImage(url);
  };

  const closeEnlargedImage = () => {
    setEnlargedImage(null);
  };

  const tags = [selectedMonument.objecttag[0]];
  if (selectedMonument.other_tags && selectedMonument.other_tags.length > 0) {
    tags.push(...selectedMonument.other_tags);
  }

  const hasEvent = selectedMonument.event && selectedMonument.event.length > 0;
  const events = hasEvent ? selectedMonument.event : null;
  const activeEvent = hasEvent ? events[activeEventIndex] : null;



  return (
    <div className="titlecc">
      <h1 className="titleinfocc">{selectedMonument.title}</h1>
      {selectedMonument.subtitle && (
        <h2>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              selectedMonument.subtitle
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {selectedMonument.subtitle}
          </a>
        </h2>
      )}
      <TagWithIcons tags={tags} />

      {hasEvent ? (
        <>
          <EventTabs
            events={events}
            activeEventIndex={activeEventIndex}
            setActiveEventIndex={setActiveEventIndex}
          />
          <EventDetails
            event={activeEvent}
            handleImageClick={handleImageClick}
          />
          {enlargedImage && (
            <div>
              <div className="backdrop" onClick={closeEnlargedImage}></div>
              <img
                src={enlargedImage}
                alt="Enlarged Photo"
                className="enlarged-image"
              />
            </div>
          )}
        </>
      ) : (
        <>
          <p>{selectedMonument.description}</p>
          <ImageGallery
            imgurl={selectedMonument.imgurl}
            handleImageClick={handleImageClick}
          />
          {enlargedImage && (
            <div>
              <div className="backdrop" onClick={closeEnlargedImage}></div>
              <img
                src={enlargedImage}
                alt="Enlarged Photo"
                className="enlarged-image"
              />
            </div>
          )}
          <div className="othercc">
            <div className="moreinfocc" style={{ fontWeight: "bold" }}>
              More Information:{" "}
              <a
                href={selectedMonument.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedMonument.link}
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CCinfo;
