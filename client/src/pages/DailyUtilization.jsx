import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "../assets/style.css";

const DailyUtilization = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Daily Utilization");
  const [searchTerm, setSearchTerm] = useState("");

  const tabs = ["Daily Utilization", "Monthly Summary", "Yearly Summary"];

  const tableData = [
    {
      aircraft: "AC-PLZ",
      flightDate: "18/02/2025",
      flightNumber: "PLZ18FEB25-01",
      flightHours: "1:35",
      totalCycles: "32625",
      engine1Hours: "52787.28",
      engine1Cycles: "26015",
      engine2Hours: "52780.50",
      engine2Cycles: "26010",
      apuHours: "27500",
      apuCycles: "27500",
    },
    // More rows can be added here
  ];

  const filteredData = tableData.filter(
    (d) =>
      d.aircraft.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.flightNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="details-container">
      {/* HEADER */}
      <div className="details-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          <FaArrowLeft size={18} />
        </button>
        <h2 className="header-title">Daily Utilization</h2>
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
        {activeTab === "Daily Utilization" && (
          <div className="space-y-6">
            {/* Search bar */}
            <div className="config-header-row">
              <input
                type="text"
                placeholder="Search daily utilization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="config-search-input"
                style={{ flex: 1 }}
              />
            </div>

            {/* Table */}
            <div className="config-table-card">
              <table className="config-table">
                <thead>
                  <tr>
                    <th>Aircraft Tail Number</th>
                    <th>Flight Date</th>
                    <th>Flight Number</th>
                    <th>Flight Hours</th>
                    <th>Total Flight Cycles</th>
                    <th>Engine 1 Flight Hours</th>
                    <th>Engine 1 Flight Cycles</th>
                    <th>Engine 2 Flight Hours</th>
                    <th>Engine 2 Flight Cycles</th>
                    <th>APU Hours</th>
                    <th>APU Cycles</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((row, index) => (
                      <tr key={index}>
                        <td>{row.aircraft}</td>
                        <td>{row.flightDate}</td>
                        <td>{row.flightNumber}</td>
                        <td>{row.flightHours}</td>
                        <td>{row.totalCycles}</td>
                        <td>{row.engine1Hours}</td>
                        <td>{row.engine1Cycles}</td>
                        <td>{row.engine2Hours}</td>
                        <td>{row.engine2Cycles}</td>
                        <td>{row.apuHours}</td>
                        <td>{row.apuCycles}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="11" className="text-center text-gray-500 py-3">
                        No records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="config-filter-bar" style={{ justifyContent: "flex-end" }}>
              <span>1-{filteredData.length} of {filteredData.length}</span>
              <div style={{ display: "flex", gap: "0.5rem", marginLeft: "1rem" }}>
                <button className="config-action-btn">&lt;</button>
                <button className="config-action-btn">&gt;</button>
              </div>
            </div>
          </div>
        )}

        {activeTab !== "Daily Utilization" && (
          <div className="placeholder-card">
            <p>This section is under development.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyUtilization;
