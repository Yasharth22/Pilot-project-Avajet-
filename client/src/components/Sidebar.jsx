// Sidebar.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaPlane,
  FaComment,
  FaMoneyBill,
  FaSuitcase,
  FaRobot,
  FaHeadset,
  FaCog,
  FaSignOutAlt,
  FaUsers,
  FaShieldAlt,
  FaKey,
  FaChartBar,
  FaWarehouse,
  FaUserShield,
  FaCreditCard,
  FaComments,
  FaThLarge,
} from "react-icons/fa";
import LoadingLogo from "./LoadingLogo";
import logo from "../assets/logo.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  // Get user role from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "user"; // default to 'user'

  const handleLogout = () => {
    setIsLoading(true);
    localStorage.removeItem("user");
    setTimeout(() => {
      setIsLoading(false);
      navigate("/login");
    }, 1000);
  };

  // Hide sidebar on login/signup
  const hideOnRoutes = ["/login", "/signup"];
  if (hideOnRoutes.includes(location.pathname)) return null;

  // Base menu for all users
  const baseMenu = [
    { label: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    { label: "Default Dashboard", icon: <FaThLarge />, path: "/default-dashboard" },
    { label: "My Aircraft", icon: <FaPlane />, path: "/my-aircraft" },
    { label: "My Materials", icon: <FaWarehouse />, path: "/my-materials" },
    { label: "My Resources", icon: <FaUsers />, path: "/my-resources" },
    { label: "Analytics", icon: <FaChartBar />, path: "/analytics" },
    { label: "Chat", icon: <FaComments />, path: "/ai" },
  ];

  // Add admin-only items
  if (role === "admin") {
    baseMenu.splice(2, 0, {
      label: "Administration",
      icon: <FaUserShield />,
      path: "/administration",
    });
    baseMenu.push({
      label: "My Financials",
      icon: <FaCreditCard />,
      path: "/my-financials",
    });
  }

  const links = baseMenu;

  const bottomLinks = [
    { label: "Support", icon: <FaHeadset />, path: "/support" },
    { label: "Settings", icon: <FaCog />, path: "/settings" },
    { label: "Logout", icon: <FaSignOutAlt />, action: handleLogout },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <aside className={`sidebar ${isLoading ? "blur-[2px]" : ""}`}>
        {/* Logo */}
        <div className="sidebar-top">
          <img src={logo} alt="AVA JET Logo" className="sidebar-logo" />
        </div>

        {/* Main Navigation */}
        <nav className="sidebar-links">
          {links.map((link) => (
            <SidebarLink
              key={link.label}
              icon={link.icon}
              label={link.label}
              onClick={() => navigate(link.path)}
              active={isActive(link.path)}
            />
          ))}
        </nav>

        {/* Bottom Links */}
        <div className="sidebar-bottom">
          {bottomLinks.map((link) => (
            <SidebarLink
              key={link.label}
              icon={link.icon}
              label={link.label}
              onClick={link.action || (() => navigate(link.path))}
              active={isActive(link.path)}
            />
          ))}
        </div>
      </aside>

      {isLoading && <LoadingLogo size={80} />}
    </>
  );
};

const SidebarLink = ({ icon, label, onClick, active }) => (
  <div
    className={`sidebar-link ${active ? "active" : ""}`}
    onClick={onClick}
  >
    <span className="sidebar-icon">{icon}</span>
    <span className="sidebar-text">{label}</span>
  </div>
);

export default Sidebar;
