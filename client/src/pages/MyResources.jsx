import React, { useState, useEffect } from "react";
import "../assets/style.css";

// === Import PDFs ===
import AMM from "../assets/documents/AMM.pdf";
import IPC from "../assets/documents/IPC.pdf";
import SRM from "../assets/documents/SRM.pdf";
import CMM from "../assets/documents/CMM.pdf";
import SOPs from "../assets/documents/SOP.pdf";
import QA from "../assets/documents/QA.pdf";
import Safety from "../assets/documents/Safety.pdf";

const resourcesData = {
  technical: {
    title: "Technical Documents",
    icon: "📚",
    items: [
      {
        name: "Aircraft Maintenance Manual (AMM)",
        description: "Core maintenance procedures for aircraft.",
        file: AMM,
      },
      {
        name: "Illustrated Parts Catalog (IPC)",
        description: "Find and identify aircraft parts.",
        file: IPC,
      },
      {
        name: "Structural Repair Manual (SRM)",
        description: "Guidelines for repairing aircraft structures.",
        file: SRM,
      },
      {
        name: "Component Maintenance Manual (CMM)",
        description: "Procedures for off-aircraft components.",
        file: CMM,
      },
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
      { name: "Standard Operating Procedures (SOPs)", description: "Internal guidelines for company processes.", file: SOPs },
      { name: "Quality Assurance (QA) Manuals", description: "Documents defining quality standards.", file: QA },
      { name: "Safety & Emergency Guidelines", description: "Protocols for safety and emergency situations.", file: Safety },
    ],
  },
};

const MyResources = () => {
  const [activeCategory, setActiveCategory] = useState("technical");
  const [openDocsInNewTab, setOpenDocsInNewTab] = useState(true);

  // Load setting from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("userSettings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        if (typeof parsed.openDocsInNewTab === "boolean") {
          setOpenDocsInNewTab(parsed.openDocsInNewTab);
        }
      } catch {
        console.warn("Failed to parse user settings");
      }
    }
  }, []);

  const activeCategoryData = resourcesData[activeCategory];

  const handleAccessDocument = (item) => {
    if (!item.file) {
      alert("Document not available yet.");
      return;
    }

    if (openDocsInNewTab) {
      // 🪟 Open in new tab/window
      window.open(item.file, "_blank");
    } else {
      // 🧩 Open in same window (within app)
      window.location.href = item.file;
    }
  };

  return (
    <div className="resources-container">
      <h2 className="resources-heading">Resource Center</h2>

      <div className="resources-layout">
        {/* Sidebar Menu */}
        <aside className="resources-sidebar">
          <div className="resources-card">
            {Object.keys(resourcesData).map((key) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`resources-menu-item ${activeCategory === key ? "active" : ""}`}
              >
                <span className="resources-icon">{resourcesData[key].icon}</span>
                <span>{resourcesData[key].title}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="resources-content">
          <div className="resources-card">
            {activeCategoryData.items.map((item, index) => (
              <div
                key={index}
                className={`resources-item ${index === activeCategoryData.items.length - 1 ? "last" : ""}`}
              >
                <div>
                  <h3 className="resources-item-title">{item.name}</h3>
                  <p className="resources-item-desc">{item.description}</p>
                </div>
                <button
                  onClick={() => handleAccessDocument(item)}
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
