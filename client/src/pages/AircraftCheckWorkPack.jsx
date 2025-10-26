import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEye } from "react-icons/fa";
import "../assets/style.css";

const AircraftCheckWorkPacks = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Aircraft Check Work Pack");
  const [searchTerm, setSearchTerm] = useState("");

  const tabs = [
    "Aircraft Check Work Pack",
    "Forecast Overview",
    "Work Pack History",
  ];

  // === SAMPLE DATA ===
  const tableData = [
    {
      tailNo: "AC-PLZ",
      wpNo: "wrk-002",
      sn: "2654",
      title: "Base Maintenance",
      arrival: "18/02/2025",
      finish: "25/02/2025",
      estHours: "40",
      actualHours: "35",
      type: "Base",
      status: "Work in Progress",
    },
    {
      tailNo: "AC-PLZ",
      wpNo: "wk plc-001",
      sn: "2654",
      title: "Routine Check",
      arrival: "18/03/2025",
      finish: "21/05/2025",
      estHours: "50",
      actualHours: "50",
      type: "Base",
      status: "Closed",
    },
    {
      tailNo: "AC-PLZ",
      wpNo: "AC-PLZ-004",
      sn: "Test work Pack",
      title: "Test Work Pack",
      arrival: "19/04/2025",
      finish: "20/04/2025",
      estHours: "5",
      actualHours: "0",
      type: "Line",
      status: "New",
    },
  ];

  // === FILTERING LOGIC ===
  const filteredData = tableData.filter(
    (wp) =>
      wp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wp.wpNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="details-container">
      {/* HEADER */}
      <div className="details-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          <FaArrowLeft size={18} />
        </button>
        <h2 className="header-title">Aircraft Check Work Pack for AC-PLZ</h2>
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
        {activeTab === "Aircraft Check Work Pack" && (
          <div className="space-y-6">
            {/* Search + Add Button */}
            <div
              className="config-header-row"
              style={{ gap: "1rem", marginTop: "1rem" }}
            >
              <input
                type="text"
                placeholder="Search work packs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="config-search-input"
                style={{ flex: 1 }}
              />
              <button className="config-action-btn">
                Add Aircraft Check Work Pack
              </button>
            </div>

            {/* Work Pack Table */}
            <div className="config-table-card">
              <table className="config-table">
                <thead>
                  <tr>
                    <th>Tail Number</th>
                    <th>Work Pack Number</th>
                    <th>Serial Number</th>
                    <th>Work Pack Title</th>
                    <th>Arrival Date</th>
                    <th>Finish Date</th>
                    <th>Estimate Hours</th>
                    <th>Actual Hours</th>
                    <th>Maintenance Type</th>
                    <th>Work Pack Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((wp, index) => (
                      <tr key={index}>
                        <td>{wp.tailNo}</td>
                        <td>{wp.wpNo}</td>
                        <td>{wp.sn}</td>
                        <td>{wp.title}</td>
                        <td>{wp.arrival}</td>
                        <td>{wp.finish}</td>
                        <td>{wp.estHours}</td>
                        <td>{wp.actualHours}</td>
                        <td>{wp.type}</td>
                        <td>{wp.status}</td>
                        <td className="text-center">
                          <button
                            className="config-action-btn"
                            onClick={() =>
                              console.log("View details for", wp.wpNo)
                            }
                          >
                            <FaEye size={15} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="11" className="text-center text-gray-500 py-3">
                        No work packs found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab !== "Aircraft Check Work Pack" && (
          <div className="placeholder-card">
            <p>This section is under development.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AircraftCheckWorkPacks;
