import React from "react";
import {
  FaUserShield,
  FaPlane,
  FaWarehouse,
  FaUsers,
  FaCreditCard,
  FaChartBar,
  FaComments,
  FaThLarge,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../assets/style.css";

const Dashboard = () => {
  const navigate = useNavigate();

  // Get user info
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role?.toLowerCase() || "user";

  // Menu for admin
  const adminMenu = [
    { title: "Default Dashboard", icon: <FaThLarge size={40} className="text-blue-500" />, route: "/default-dashboard" },
    { title: "Administration", icon: <FaUserShield size={40} className="text-purple-500" />, route: "/administration" },
    { title: "My Aircraft", icon: <FaPlane size={40} className="text-green-500" />, route: "/my-aircraft" },
    { title: "My Materials", icon: <FaWarehouse size={40} className="text-orange-500" />, route: "/my-materials" },
    { title: "My Resources", icon: <FaUsers size={40} className="text-pink-500" />, route: "/my-resources" },
    { title: "My Financials", icon: <FaCreditCard size={40} className="text-yellow-500" />, route: "/my-financials" },
    { title: "Analytics", icon: <FaChartBar size={40} className="text-teal-500" />, route: "/analytics" },
    { title: "Chat", icon: <FaComments size={40} className="text-teal-500" />, route: "/ai" },
  ];

  // Menu for normal user
  const userMenu = adminMenu.filter(
    (item) => item.title !== "Administration" && item.title !== "My Financials"
  );

  const menuItems = role === "admin" ? adminMenu : userMenu;

  const handleCardClick = (route) => {
    if (route) navigate(route);
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">
        Hello, {user?.name ? user.name : "User"}!
      </h2>

      <div
        className={`dashboard-grid ${
          role === "admin" ? "admin-grid" : "user-grid"
        }`}
      >
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(item.route)}
            className={`dashboard-card ${item.route ? "clickable" : ""}`}
          >
            <div className="dashboard-icon">{item.icon}</div>
            <div className="dashboard-title">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
