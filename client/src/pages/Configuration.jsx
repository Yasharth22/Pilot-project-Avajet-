import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaFolderOpen } from "react-icons/fa";
import "../assets/style.css";

const Configurations = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Aircraft Configuration");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [showNotApplicable, setShowNotApplicable] = useState(false);

  const tabs = [
    "Aircraft Configuration",
    "View Aircraft Configuration",
    "Installed Components",
  ];

  const tableData = [
    {
      configItem: "AIR CONDITIONING PACK",
      serialNumber: "",
      group: "",
      location: "21-00",
      position: "11HM7",
      serviceStatus: "",
      initialStatus: "",
    },
    {
      configItem: "SAFETY-VALVE",
      serialNumber: "",
      group: "",
      location: "21-00",
      position: "6HL",
      serviceStatus: "",
      initialStatus: "",
    },
    {
      configItem: "PRESSURE CONTROL AND MONITORING",
      serialNumber: "",
      group: "HT",
      location: "21-00",
      position: "7HL",
      serviceStatus: "",
      initialStatus: "",
    },
  ];

  const filteredData = tableData.filter((item) => {
    const matchesSearch = item.configItem
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGroup =
      selectedGroup === "All" || item.group === selectedGroup;
    const matchesStatus =
      !showNotApplicable || item.serviceStatus !== "Not Applicable";
    return matchesSearch && matchesGroup && matchesStatus;
  });

  return (
    <div className="details-container">
      {/* HEADER */}
      <div className="details-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          <FaArrowLeft size={18} />
        </button>
        <h2 className="header-title">
          Aircraft Configuration Details - AC-PLZ
        </h2>
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
        {activeTab === "Aircraft Configuration" && (
          <div className="space-y-6">
            {/* Parent + Checkbox Row */}
            <div className="config-header-row">
              <span>
                <strong>Parent:</strong>{" "}
                <a href="#" className="config-parent-link">
                  AC-PLZ
                </a>
              </span>
              <label className="config-checkbox">
                <input
                  type="checkbox"
                  checked={showNotApplicable}
                  onChange={() => setShowNotApplicable(!showNotApplicable)}
                />
                <span>Show Not Applicable</span>
              </label>
            </div>

            {/* Search & Group Filters */}
            <div className="config-filter-bar">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="config-search-input"
              />
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="config-select"
              >
                <option value="All">All</option>
                <option value="HT">HT</option>
                <option value="HT-XL">HT-XL</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Configuration Table */}
            <div className="config-table-card">
              <table className="config-table">
                <thead>
                  <tr>
                    <th>Config Item</th>
                    <th>Serial Number</th>
                    <th>Group</th>
                    <th>Location</th>
                    <th>Position</th>
                    <th>Service Status</th>
                    <th>Initial Status</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.configItem}</td>
                        <td>{item.serialNumber}</td>
                        <td>{item.group}</td>
                        <td>{item.location}</td>
                        <td>{item.position}</td>
                        <td>{item.serviceStatus}</td>
                        <td>{item.initialStatus}</td>
                        <td className="text-center">
                          <button
                            onClick={() =>
                              console.log("Open details for", item.configItem)
                            }
                            className="config-action-btn"
                          >
                            <FaFolderOpen size={15} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center text-gray-500 py-3">
                        No matching records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab !== "Aircraft Configuration" && (
          <div className="placeholder-card">
            <p>This section is under development.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Configurations;
