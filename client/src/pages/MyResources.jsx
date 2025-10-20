import React, { useState } from "react";
import "../assets/style.css";

const resourcesData = {
  technical: {
    title: "Technical Documents",
    icon: "📚",
    items: [
      { name: "Aircraft Maintenance Manual (AMM)", description: "Core maintenance procedures for aircraft." },
      { name: "Illustrated Parts Catalog (IPC)", description: "Find and identify aircraft parts." },
      { name: "Structural Repair Manual (SRM)", description: "Guidelines for repairing aircraft structures." },
      { name: "Component Maintenance Manual (CMM)", description: "Procedures for off-aircraft components." },
    ],
  },
  tools: {
    title: "Tools & Equipment",
    icon: "🧰",
    items: [
      { name: "Calibrated Tools Inventory", description: "View all tools requiring calibration." },
      { name: "Tool ID Search", description: "Find a specific tool by its identification number." },
      { name: "Calibration Due Date Report", description: "List of tools nearing their calibration due date." },
    ],
  },
  maintenance: {
    title: "Maintenance Data",
    icon: "📋",
    items: [
      { name: "Work Cards Library", description: "Standardized task cards for maintenance." },
      { name: "Inspection Checklists", description: "Checklists for routine and special inspections." },
      { name: "Maintenance Schedules", description: "Long-term maintenance planning documents." },
    ],
  },
  compliance: {
    title: "Compliance & Regulatory",
    icon: "📜",
    items: [
      { name: "Airworthiness Directives (ADs)", description: "Mandatory directives from aviation authorities." },
      { name: "Service Bulletins (SBs)", description: "Notices from manufacturers about product improvements." },
      { name: "Regulatory Body Links", description: "Quick links to DGCA, FAA, and EASA websites." },
    ],
  },
  internal: {
    title: "Training & Internal Docs",
    icon: "🏢",
    items: [
      { name: "Standard Operating Procedures (SOPs)", description: "Internal guidelines for company processes." },
      { name: "Quality Assurance (QA) Manuals", description: "Documents defining quality standards." },
      { name: "Safety & Emergency Guidelines", description: "Protocols for safety and emergency situations." },
    ],
  },
};

const MyResources = () => {
  const [activeCategory, setActiveCategory] = useState("technical");
  const activeCategoryData = resourcesData[activeCategory];

  return (
    <div className="resources-container">
      <h2 className="resources-heading">Resource Center</h2>

      <div className="resources-layout">
        {/* Left Menu */}
        <aside className="resources-sidebar">
          <div className="resources-card">
            {Object.keys(resourcesData).map((key) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`resources-menu-item ${
                  activeCategory === key ? "active" : ""
                }`}
              >
                <span className="resources-icon">{resourcesData[key].icon}</span>
                <span>{resourcesData[key].title}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Right Content */}
        <main className="resources-content">
          <div className="resources-card">
            {activeCategoryData.items.map((item, index) => (
              <div
                key={index}
                className={`resources-item ${
                  index === activeCategoryData.items.length - 1 ? "last" : ""
                }`}
              >
                <div>
                  <h3 className="resources-item-title">{item.name}</h3>
                  <p className="resources-item-desc">{item.description}</p>
                </div>
                <button
                  onClick={() => alert(`Accessing: ${item.name}`)}
                  className="resources-access-btn"
                >
                  Access →
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyResources;
