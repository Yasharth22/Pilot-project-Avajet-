import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEye } from "react-icons/fa";
import "../assets/style.css";

const MaintenanceTasks = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Maintenance Tasks");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showDueOnly, setShowDueOnly] = useState(false);

  const tabs = [
    "Maintenance Tasks",
    "Forecast Overview",
    "Task History",
  ];

  // === SAMPLE DATA ===
  const tableData = [
    {
      mtNo: "MT-1001",
      pn: "PN-8745",
      sn: "SN-9921",
      title: "HIRF/LIGHTNING PROTECTION CHECK",
      life: "500 FH",
      ti: "100 FH",
      dueAt: "1500 FH",
      remaining: "200 FH",
      forecastDate: "2025-12-05",
      lastCompliance: "2024-12-01",
      taskType: "Inspection",
      taskCode: "HIRF-001",
      zone: "21-00",
      onVariation: "No",
      dueUpdatedManually: "No",
      status: "Pending",
    },
    {
      mtNo: "MT-1002",
      pn: "PN-1132",
      sn: "SN-3345",
      title: "CABIN PRESSURE RELIEF VALVE INSPECTION",
      life: "2000 FH",
      ti: "500 FH",
      dueAt: "2500 FH",
      remaining: "400 FH",
      forecastDate: "2026-01-15",
      lastCompliance: "2024-10-01",
      taskType: "Functional Check",
      taskCode: "PRESS-002",
      zone: "24-10",
      onVariation: "Yes",
      dueUpdatedManually: "Yes",
      status: "Completed",
    },
  ];

  // === FILTERING LOGIC ===
  const filteredData = tableData.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.mtNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "All" || task.status === selectedStatus;
    const matchesDue = !showDueOnly || task.status === "Pending";
    return matchesSearch && matchesStatus && matchesDue;
  });

  return (
    <div className="details-container">
      {/* HEADER */}
      <div className="details-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          <FaArrowLeft size={18} />
        </button>
        <h2 className="header-title">
          Maintenance Tasks for AC-PLZ
        </h2>
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
        {activeTab === "Maintenance Tasks" && (
          <div className="space-y-6">
            {/* Header Row */}
            <div className="config-header-row">
              <span>
                <strong>Aircraft:</strong>{" "}
                <a href="#" className="config-parent-link">
                  AC-PLZ
                </a>
              </span>
              <label className="config-checkbox">
                <input
                  type="checkbox"
                  checked={showDueOnly}
                  onChange={() => setShowDueOnly(!showDueOnly)}
                />
                <span>Show Only Due Tasks</span>
              </label>
            </div>

            {/* Search & Filters */}
            <div className="config-filter-bar">
              <input
                type="text"
                placeholder="Search tasks..."
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
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Task Table */}
            <div className="config-table-card">
              <table className="config-table">
                <thead>
                  <tr>
                    <th>MT No</th>
                    <th>PN</th>
                    <th>SN</th>
                    <th>Title</th>
                    <th>Life</th>
                    <th>T.I.</th>
                    <th>Due At</th>
                    <th>Remaining</th>
                    <th>Forecast Date</th>
                    <th>Last Compliance</th>
                    <th>Task Type</th>
                    <th>Task Code</th>
                    <th>Zone</th>
                    <th>On Variation</th>
                    <th>Due Updated Manually</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((task, index) => (
                      <tr key={index}>
                        <td>{task.mtNo}</td>
                        <td>{task.pn}</td>
                        <td>{task.sn}</td>
                        <td>{task.title}</td>
                        <td>{task.life}</td>
                        <td>{task.ti}</td>
                        <td>{task.dueAt}</td>
                        <td>{task.remaining}</td>
                        <td>{task.forecastDate}</td>
                        <td>{task.lastCompliance}</td>
                        <td>{task.taskType}</td>
                        <td>{task.taskCode}</td>
                        <td>{task.zone}</td>
                        <td>{task.onVariation}</td>
                        <td>{task.dueUpdatedManually}</td>
                        <td>{task.status}</td>
                        <td className="text-center">
                          <button
                            className="config-action-btn"
                            onClick={() =>
                              console.log("View details for", task.mtNo)
                            }
                          >
                            <FaEye size={15} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="17" className="text-center text-gray-500 py-3">
                        No maintenance tasks found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab !== "Maintenance Tasks" && (
          <div className="placeholder-card">
            <p>This section is under development.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaintenanceTasks;
