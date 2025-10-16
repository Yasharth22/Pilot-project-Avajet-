import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import AircraftInfoCard from "../components/AircraftInfoCard";
import EngineInfoTable from "../components/EngineInfoTable";
import "../assets/style.css";

const aircraftData = {
  "Tail Number": "AC-PLZ",
  "Induction Date": "10/28/23",
  "MSN Number": "2654",
  "Aircraft Hours": "52787",
  Model: "A320-214",
  "Aircraft Cycles": "32623",
  "Manufacture Date": "1/1/06",
};

const engineData = [
  {
    position: "Engine RH",
    partNumber: "CFM56-5B4/P",
    serialNumber: "5774860",
    tsn: "4579256",
    csn: "28100",
    tsr: "0.0",
    csr: "0",
  },
];

const AircraftDetails = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("General Info");
  const tabs = [
    "General Info",
    "Aircraft Detail",
    "Operational Details",
    "Maintenance History",
    "Weight & Balance",
    "Cabin Configuration",
  ];

  return (
    <div className="details-container">
      {/* HEADER */}
      <div className="details-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          <FaArrowLeft size={18} />
        </button>
        <h2 className="header-title">Aircraft: AC-PLZ</h2>
      </div>

      {/* TABS */}
      <div className="details-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`details-tab ${
              activeTab === tab ? "active-tab" : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="details-content">
        {activeTab === "General Info" && (
          <div className="space-y-8">
            <AircraftInfoCard data={aircraftData} />
            <EngineInfoTable data={engineData} />
          </div>
        )}
        {activeTab !== "General Info" && (
          <div className="placeholder-card">
            <p>This section is under development.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AircraftDetails;