import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEye, FaPlus } from "react-icons/fa";
import "../assets/style.css";

const TechLogDetails = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("TechLog Details");
  const [searchTerm, setSearchTerm] = useState("");

  const tabs = ["TechLog Details", "TechLog Summary", "TechLog History"];

  // === SAMPLE DATA ===
  const tableData = [
    {
      logNo: "PLZ20FEB25-01",
      date: "18/02/2025",
      type: "Flight",
      flightHours: "1.35",
      flightCycles: "1",
      totalHours: "135",
      totalCycles: "100",
      flights: "1",
      defects: "0",
      sich: "OK",
      delays: "None",
    },
    {
      logNo: "002",
      date: "19/02/2025",
      type: "Flight",
      flightHours: "2.50",
      flightCycles: "1",
      totalHours: "137.5",
      totalCycles: "101",
      flights: "1",
      defects: "1",
      sich: "OK",
      delays: "30 mins",
    },
  ];

  // === FILTERING ===
  const filteredData = tableData.filter((log) =>
    log.logNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="details-container">
      {/* HEADER */}
      <div className="details-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          <FaArrowLeft size={18} />
        </button>
        <h2 className="header-title">TechLog Details for - AC-PLZ</h2>
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
        {activeTab === "TechLog Details" && (
          <div className="space-y-6">
            {/* Search & Add */}
            <div className="config-header-row">
              <input
                type="text"
                placeholder="Search TechLogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="config-search-input"
                style={{ flex: 1 }}
              />
              <button className="config-action-btn" style={{ display: "flex", alignItems: "center" }}>
                <FaPlus size={12} style={{ marginRight: "5px" }} />
                Add TechLog
              </button>
            </div>

            {/* Table */}
            <div className="config-table-card">
              <table className="config-table">
                <thead>
                  <tr>
                    <th>TechLog Number</th>
                    <th>TechLog Date</th>
                    <th>Type</th>
                    <th>Flight Hours</th>
                    <th>Flight Cycles</th>
                    <th>Total Flight Hours</th>
                    <th>Total Flight Cycles</th>
                    <th>Number Of Flights</th>
                    <th>Number Of Defects</th>
                    <th>Sich Inspection</th>
                    <th>Delays</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((log, index) => (
                      <tr key={index}>
                        <td>{log.logNo}</td>
                        <td>{log.date}</td>
                        <td>{log.type}</td>
                        <td>{log.flightHours}</td>
                        <td>{log.flightCycles}</td>
                        <td>{log.totalHours}</td>
                        <td>{log.totalCycles}</td>
                        <td>{log.flights}</td>
                        <td>{log.defects}</td>
                        <td>{log.sich}</td>
                        <td>{log.delays}</td>
                        <td className="text-center">
                          <button
                            className="config-action-btn"
                            onClick={() => console.log("View TechLog", log.logNo)}
                          >
                            <FaEye size={15} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="12" className="text-center text-gray-500 py-3">
                        No TechLogs found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination placeholder */}
            <div className="config-filter-bar" style={{ justifyContent: "flex-end" }}>
              <span>1-2 of 2</span>
              <div style={{ display: "flex", gap: "0.5rem", marginLeft: "1rem" }}>
                <button className="config-action-btn">&lt;</button>
                <button className="config-action-btn">&gt;</button>
              </div>
            </div>
          </div>
        )}

        {activeTab !== "TechLog Details" && (
          <div className="placeholder-card">
            <p>This section is under development.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechLogDetails;
