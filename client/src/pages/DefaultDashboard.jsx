import React from "react";
import "../assets/style.css";

const DefaultDashboard = () => {
  const cards = [
    { title: "Total Aircraft", count: "12", icon: "✈️" },
    { title: "Total Materials", count: "58", icon: "📦" },
    { title: "Total Resources", count: "24", icon: "🧰" },
    { title: "Total Financials", count: "$150,000", icon: "💰" },
    { title: "Scheduled Maintenances", count: "9", icon: "🛠️" },
    { title: "Completed Tasks", count: "122", icon: "✅" },
    { title: "Pending Tasks", count: "18", icon: "⏳" },
    { title: "Total Vendors", count: "7", icon: "🏢" },
    { title: "Active Contracts", count: "11", icon: "📑" },
    { title: "Notifications", count: "5", icon: "🔔" },
    { title: "Total Staff", count: "42", icon: "👷" },
    { title: "Incidents Reported", count: "3", icon: "⚠️" },
    { title: "Audit Reports", count: "6", icon: "📝" },
  ];

  return (
    <div className="defaultdashboard-container">
      <h2 className="defaultdashboard-heading">Dashboard Overview</h2>

      <div className="defaultdashboard-grid">
        {cards.map((card, index) => (
          <div key={index} className="defaultdashboard-card">
            <div className="defaultdashboard-icon">{card.icon}</div>
            <div className="defaultdashboard-title">{card.title}</div>
            <div className="defaultdashboard-count">{card.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DefaultDashboard;
