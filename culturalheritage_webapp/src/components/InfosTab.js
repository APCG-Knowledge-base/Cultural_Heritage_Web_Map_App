import React, { useState } from "react";
import "./InfosTab.css";

function InfosTab() {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="container">
      <div className="title-section">
        <h1 className="title">Useful Details</h1>
        <div className="title-underline"></div>
      </div>
      <div className="tab-buttons">
        <button
          className={`tab-button ${activeTab === 1 ? "active" : ""}`}
          onClick={() => handleTabChange(1)}
        >
          Project Details
        </button>
        <button
          className={`tab-button ${activeTab === 2 ? "active" : ""}`}
          onClick={() => handleTabChange(2)}
        >
          List of Events
        </button>
      </div>

      {activeTab === 1 && (
        <div className="details">
<div className="title">Intro & Scope</div>
    <div className="details">
      <p>
        Our idea is about creating an application that combines space data, Earth observations as well as in-situ data provided by citizens (citizen-generated data) to monitor and document threats and damages to cultural heritage in conflict zones in general and in Ukraine more specifically.
      </p>
      <p>
        Our team is composed of experts from Greece, Ukraine, and Norway. It has experience in environmental sciences, software development, Earth observations, data management, standards, and digital education. More precisely, the team is composed by Thanasis Koukoulis and Charalambos Chatzidiakos from the National Observatory of Athens, Greece; by Bente Lilja Bye (Norway) and Katerina Zourou (Greece), co-founders of Space4CC (Greece); and Kateryna Boichenko and Stefania Oikonomou (Web2Learn), Ukraine and Greece.
      </p>
    </div>
    <div className="title">Tech Development & Type of Resources</div>
    <div className="details">
      <p>
        To develop our application (currently at prototype stage), we combine space-based (Copernicus, Galileo, EGNOS), in-situ (air quality sensor networks, environmental data), and citizen-generated data. We aim to make them interoperable across disciplines.
      </p>
      <p>
        To produce an app that caters to real needs, the user interface is designed through a co-design method with stakeholders and end users together.
      </p>
      <p>
        Technically, our app development revolves around ReactJS, harnessing its flexibility to create a seamless and feature-rich user experience. Next.js, Redux, and React Routing further enhance performance, enabling real-time updates and smooth navigation.
      </p>
      <p>
        Our DEMO: <a href="https://www.youtube.com/watch?v=hNAHcL0Wi1k" target="_blank" rel="noopener noreferrer">Watch Demo</a>
      </p>
    </div>

        </div>
      )}
      {activeTab === 2 && (
        <div className="details">
          <p>
            List of Events: <a href="#">Event 1</a>, <a href="#">Event 2</a>,{" "}
            <a href="#">Event 3</a>
          </p>
        </div>
      )}
    </div>
  );
}

export default InfosTab;
