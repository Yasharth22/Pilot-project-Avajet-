import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "../assets/style.css"; // Using same CSS as configurations

const TechLogConfiguration = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Details");

  const tabs = ["Details", "TechLog Book", "TechLog Configuration Log"];

  const [numberingType, setNumberingType] = useState("");
  const [techLogBook, setTechLogBook] = useState("");
  const [sequencePrefix, setSequencePrefix] = useState("");
  const [allowDuplicate, setAllowDuplicate] = useState(false);
  const [mandatoryBlock, setMandatoryBlock] = useState(false);
  const [autoDefectNumbering, setAutoDefectNumbering] = useState(false);

  const handleSave = () => {
    console.log("Configuration Saved", {
      numberingType,
      techLogBook,
      sequencePrefix,
      allowDuplicate,
      mandatoryBlock,
      autoDefectNumbering,
    });
  };

  return (
    <div className="details-container">
      {/* HEADER */}
      <div className="details-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          <FaArrowLeft size={18} />
        </button>
        <h2 className="header-title">Tech Log Configuration for AC-PLZ</h2>
      </div>

      {/* TABS */}
      <div className="details-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`details-tab ${activeTab === tab ? "active-tab" : ""}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="details-content">
        {activeTab === "Details" && (
          <div className="space-y-6">
            {/* Form Header Row */}
            <div className="config-header-row">
              <h3 className="header-title">Configuration Options</h3>
              <button
                className="config-action-btn"
                onClick={handleSave}
                style={{ display: "flex", alignItems: "center" }}
              >
                Save
              </button>
            </div>

            {/* Form Fields */}
            <div className="config-form">
              <div className="config-form-row">
                <label>Numbering Type:</label>
                <select
                  value={numberingType}
                  onChange={(e) => setNumberingType(e.target.value)}
                  className="config-select"
                >
                  <option value="">Select Type</option>
                  <option value="Type A">Type A</option>
                  <option value="Type B">Type B</option>
                </select>
              </div>

              <div className="config-form-row">
                <label>TechLog Book:</label>
                <input
                  type="text"
                  value={techLogBook}
                  onChange={(e) => setTechLogBook(e.target.value)}
                  className="config-search-input"
                  placeholder="Enter TechLog Book"
                />
              </div>

              <div className="config-form-row">
                <label>Sequence Prefix:</label>
                <input
                  type="text"
                  value={sequencePrefix}
                  onChange={(e) => setSequencePrefix(e.target.value)}
                  className="config-search-input"
                  placeholder="Enter Prefix"
                />
              </div>

              <div className="config-form-row" style={{ flexDirection: "column", gap: "0.5rem" }}>
                <label className="config-checkbox">
                  <input
                    type="checkbox"
                    checked={allowDuplicate}
                    onChange={() => setAllowDuplicate(!allowDuplicate)}
                  />
                  <span>Allow Duplicate TechLog Number</span>
                </label>

                <label className="config-checkbox">
                  <input
                    type="checkbox"
                    checked={mandatoryBlock}
                    onChange={() => setMandatoryBlock(!mandatoryBlock)}
                  />
                  <span>Mandatory Block Time</span>
                </label>

                <label className="config-checkbox">
                  <input
                    type="checkbox"
                    checked={autoDefectNumbering}
                    onChange={() => setAutoDefectNumbering(!autoDefectNumbering)}
                  />
                  <span>Auto Defect Numbering</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab !== "Details" && (
          <div className="placeholder-card">
            <p>This section is under development.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechLogConfiguration;
