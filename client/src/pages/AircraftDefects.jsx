import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEye, FaPlus } from "react-icons/fa";
import "../assets/style.css"; // Using the same CSS as Configurations

const AircraftDefects = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Aircraft Defects");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showOpenOnly, setShowOpenOnly] = useState(false);

  const tabs = ["Aircraft Defects", "Defect Overview", "Defect History"];

  const tableData = [
    {
      defectNo: "DF-1001",
      raisedDate: "2025-10-20",
      aircraft: "AC-PLZ",
      ataChapter: "21-50",
      defectType: "PREP",
      description: "Hydraulic leak detected in landing gear",
      status: "Closed",
      dueDate: "2025-10-25",
    },
    {
      defectNo: "DF-1002",
      raisedDate: "2025-10-22",
      aircraft: "AC-PLZ",
      ataChapter: "05-30",
      defectType: "MAREP",
      description: "Cabin oxygen system check required",
      status: "Open",
      dueDate: "2025-11-01",
    },
  ];

  const filteredData = tableData.filter((defect) => {
    const matchesSearch =
      defect.defectNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      defect.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "All" || defect.status === selectedStatus;
    const matchesOpen = !showOpenOnly || defect.status === "Open";
    return matchesSearch && matchesStatus && matchesOpen;
  });

  return (
    <div className="details-container">
      {/* HEADER */}
      <div className="details-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          <FaArrowLeft size={18} />
        </button>
        <h2 className="header-title">Aircraft Defects for AC-PLZ</h2>
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
        {activeTab === "Aircraft Defects" && (
          <div className="space-y-6">
            {/* Header Row */}
            <div className="config-header-row">
              <span>
                <strong>Aircraft:</strong>{" "}
                <a href="#" className="config-parent-link">
                  AC-PLZ
                </a>
              </span>

              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <label className="config-checkbox">
                  <input
                    type="checkbox"
                    checked={showOpenOnly}
                    onChange={() => setShowOpenOnly(!showOpenOnly)}
                  />
                  <span>Show Open Defects Only</span>
                </label>

                <button
                  className="config-action-btn"
                  onClick={() => console.log("Add Defect clicked")}
                  style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
                >
                  <FaPlus size={12} /> Add Defect
                </button>
              </div>
            </div>

            {/* Search & Filters */}
            <div className="config-filter-bar">
              <input
                type="text"
                placeholder="Search defects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="config-search-input"
              />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="config-select"
              >
                <option value="All">All</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            {/* Defects Table */}
            <div className="config-table-card">
              <table className="config-table">
                <thead>
                  <tr>
                    <th>Defect No</th>
                    <th>Raised Date</th>
                    <th>Aircraft</th>
                    <th>ATA Chapter</th>
                    <th>Defect Type</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Due Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((defect, index) => (
                      <tr key={index}>
                        <td>{defect.defectNo}</td>
                        <td>{defect.raisedDate}</td>
                        <td>{defect.aircraft}</td>
                        <td>{defect.ataChapter}</td>
                        <td>{defect.defectType}</td>
                        <td>{defect.description}</td>
                        <td>{defect.status}</td>
                        <td>{defect.dueDate}</td>
                        <td className="text-center">
                          <button
                            className="config-action-btn"
                            onClick={() =>
                              console.log("View defect", defect.defectNo)
                            }
                          >
                            <FaEye size={15} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center text-gray-500 py-3">
                        No defects found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab !== "Aircraft Defects" && (
          <div className="placeholder-card">
            <p>This section is under development.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AircraftDefects;
    