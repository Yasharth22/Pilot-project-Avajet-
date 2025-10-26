import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "../assets/style.css";

const Flights = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Flights");
  const [searchTerm, setSearchTerm] = useState("");

  const tabs = ["Flights", "Flight Summary", "Flight History"];

  const tableData = [
    {
      aircraft: "AC-PLZ",
      flightDate: "19/01/2025",
      departure: "CGK",
      takeoff: "09:40",
      arrival: "DPS",
      landing: "11:15",
      flightHours: "1:55",
      totalHours: "52787.28",
      totalCycles: "32625",
      apuHours: "26015.00",
      apuCycles: "27500",
      status: "Landed",
    },
    // Additional rows can be added here
  ];

  const filteredData = tableData.filter(
    (f) =>
      f.aircraft.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.departure.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.arrival.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="details-container">
      {/* HEADER */}
      <div className="details-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          <FaArrowLeft size={18} />
        </button>
        <h2 className="header-title">Flights</h2>
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
        {activeTab === "Flights" && (
          <div className="space-y-6">
            {/* Search bar */}
            <div className="config-header-row">
              <input
                type="text"
                placeholder="Search flights..."
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
                    <th>Departure Airport</th>
                    <th>Actual Takeoff Time</th>
                    <th>Arrival Airport</th>
                    <th>Actual Landing Time</th>
                    <th>Flight Hours</th>
                    <th>Total Flight Hours</th>
                    <th>Total Flight Cycles</th>
                    <th>APU Hours</th>
                    <th>APU Cycles</th>
                    <th>Flight Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((flight, index) => (
                      <tr key={index}>
                        <td>{flight.aircraft}</td>
                        <td>{flight.flightDate}</td>
                        <td>{flight.departure}</td>
                        <td>{flight.takeoff}</td>
                        <td>{flight.arrival}</td>
                        <td>{flight.landing}</td>
                        <td>{flight.flightHours}</td>
                        <td>{flight.totalHours}</td>
                        <td>{flight.totalCycles}</td>
                        <td>{flight.apuHours}</td>
                        <td>{flight.apuCycles}</td>
                        <td>{flight.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="12" className="text-center text-gray-500 py-3">
                        No flights found.
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

        {activeTab !== "Flights" && (
          <div className="placeholder-card">
            <p>This section is under development.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Flights;
