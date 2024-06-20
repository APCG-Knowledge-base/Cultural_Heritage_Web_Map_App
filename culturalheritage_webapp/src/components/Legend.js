import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";

import {
  faMuseum,
  faMonument,
  faScroll,
  faMapMarkedAlt,
  faChurch,
  faBuilding,
  faTheaterMasks,
} from "@fortawesome/free-solid-svg-icons";
import "./Legend.css"

const Legend = () => {
  const legendItems = [
    { label: "Ancient buildings", icon: faMuseum },
    { label: "Monuments", icon: faMonument },
    { label: "Libraries", icon: faScroll },
    { label: "Sightseeing", icon: faMapMarkedAlt },
    { label: "Religious Buildings", icon: faChurch },
    { label: "Museums", icon: faBuilding },
    { label: "Theaters", icon: faTheaterMasks },
  ];

  const objectsShow = useSelector((state) => state.objectsShow);


  // Additional items for damaged and restored markers
  const additionalItems = [
    { label: "Damaged", color: "red" },
    { label: "Restored", color: "orange" },
  ];

  // Add additional items only if objectsShow is true
  if (objectsShow) {
    legendItems.push(...additionalItems);
  }

  return (
    <div className="legend">
      <h3 className="changemelater">Legend</h3>
      <ul>
        {legendItems.map((item, index) => (
          <li key={index} className="listlegend">
            {item.icon ? (
              <FontAwesomeIcon icon={item.icon} className="yo" />
            ) : (
              <div
                className="legend-circle"
                style={{ backgroundColor: item.color }}
              />
            )}
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Legend;