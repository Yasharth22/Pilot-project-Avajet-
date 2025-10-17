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
    ]
  },
  tools: {
    title: "Tools & Equipment",
    icon: "🧰",
    items: [
      { name: "Calibrated Tools Inventory", description: "View all tools requiring calibration." },
      { name: "Tool ID Search", description: "Find a specific tool by its identification number." },
      { name: "Calibration Due Date Report", description: "List of tools nearing their calibration due date." },
    ]
  },
  maintenance: {
    title: "Maintenance Data",
    icon: "📋",
    items: [
      { name: "Work Cards Library", description: "Standardized task cards for maintenance." },
      { name: "Inspection Checklists", description: "Checklists for routine and special inspections." },
      { name: "Maintenance Schedules", description: "Long-term maintenance planning documents." },
    ]
  },
  compliance: {
    title: "Compliance & Regulatory",
    icon: "📜",
    items: [
      { name: "Airworthiness Directives (ADs)", description: "Mandatory directives from aviation authorities." },
      { name: "Service Bulletins (SBs)", description: "Notices from manufacturers about product improvements." },
      { name: "Regulatory Body Links", description: "Quick links to DGCA, FAA, and EASA websites." },
    ]
  },
  internal: {
    title: "Training & Internal Docs",
    icon: "🏢",
    items: [
      { name: "Standard Operating Procedures (SOPs)", description: "Internal guidelines for company processes." },
      { name: "Quality Assurance (QA) Manuals", description: "Documents defining quality standards." },
      { name: "Safety & Emergency Guidelines", description: "Protocols for safety and emergency situations." },
    ]
  }
};

const MyResources = () => {
  const [activeCategory, setActiveCategory] = useState('technical');
  const activeCategoryData = resourcesData[activeCategory];

  return (
    <div className="defaultdashboard-container" style={{ padding: '5rem 2rem' }}>
      <h2 className="defaultdashboard-heading" style={{ textAlign: 'left', fontSize: '2rem', marginBottom: '2rem' }}>Resource Center</h2>

      {/* Main Two-Column Layout that fills the height */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        
        {/* Left Column: Navigation Menu */}
        <aside style={{ width: '30%' }}>
          <div className="defaultdashboard-card" style={{ padding: '1rem', textAlign: 'left' }}>
            {Object.keys(resourcesData).map((key) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  background: activeCategory === key ? '#eef2ff' : 'transparent',
                  color: activeCategory === key ? '#4338ca' : '#374151',
                  fontWeight: activeCategory === key ? '600' : '500',
                  fontSize: '1rem',
                  marginBottom: '0.5rem',
                  transition: 'background 0.2s ease'
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{resourcesData[key].icon}</span>
                <span>{resourcesData[key].title}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Right Column: Content Area */}
        <main style={{ flex: 1 }}>
          <div className="defaultdashboard-card" style={{ textAlign: 'left', padding: '1.5rem' }}>
            {activeCategoryData.items.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.5rem 0',
                  borderBottom: index === activeCategoryData.items.length - 1 ? 'none' : '1px solid #e5e7eb'
                }}
              >
                <div>
                  <h3 className="defaultdashboard-title" style={{ fontSize: '1.125rem', color: '#111827', fontWeight: '600' }}>{item.name}</h3>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '4px 0 0 0', lineHeight: '1.5' }}>{item.description}</p>
                </div>
                <button 
                  onClick={() => alert(`Accessing: ${item.name}`)}
                  style={{
                    border: 'none', background: 'none', cursor: 'pointer', 
                    color: '#3B82F6', fontWeight: '600', fontSize: '0.875rem',
                    padding: '0.5rem',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Access &rarr;
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