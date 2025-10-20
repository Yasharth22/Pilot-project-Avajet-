import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaPlane,
  FaMoneyBill,
  FaSuitcase,
  FaRobot,
  FaHeadset,
  FaCog,
  FaSignOutAlt,
  FaUsers,
  FaChartBar,
  FaWarehouse,
  FaUserShield,
  FaCreditCard,
  FaComments,
  FaThLarge,
  FaChartPie,
  FaClipboardCheck,
  FaTools,
} from "react-icons/fa";
import LoadingLogo from "./LoadingLogo";
import logo from "../assets/logo.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  // 🧠 Get user role safely from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role?.toLowerCase() || "user"; // ensure lowercase for safety

  const handleLogout = () => {
    setIsLoading(true);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setTimeout(() => {
      setIsLoading(false);
      navigate("/login");
    }, 800);
  };

  // Hide sidebar on login/signup pages
  const hideOnRoutes = ["/login", "/signup"];
  if (hideOnRoutes.includes(location.pathname)) return null;

  // Detect dashboard view
  const isDashboard = location.pathname === "/dashboard";

  // 🧭 Sidebar menu structure
  let links = [];

  if (role === "admin") {
    // ✅ Admin-specific order
    links = [
      { label: "Dashboard", icon: <FaChartPie />, path: "/dashboard" },
      { label: "Default Dashboard", icon: <FaThLarge />, path: "/default-dashboard" },
      { label: "Administration", icon: <FaUserShield />, path: "/administration" },
      { label: "My Aircraft", icon: <FaPlane />, path: "/my-aircraft" },
      { label: "My Materials", icon: <FaWarehouse />, path: "/my-materials" },
      { label: "My Resources", icon: <FaUsers />, path: "/my-resources" },
      { label: "My Financials", icon: <FaCreditCard />, path: "/my-financials" },
      { label: "Analytics", icon: <FaChartBar />, path: "/analytics" },
      { label: "Chat", icon: <FaComments />, path: "/ai" },
    ];
  } else {
    // 👤 Regular user menu
    links = [
      { label: "Dashboard", icon: <FaChartPie />, path: "/dashboard" },
      { label: "Default Dashboard", icon: <FaThLarge />, path: "/default-dashboard" },
      { label: "My Aircraft", icon: <FaPlane />, path: "/my-aircraft" },
      { label: "My Materials", icon: <FaWarehouse />, path: "/my-materials" },
      { label: "My Resources", icon: <FaUsers />, path: "/my-resources" },
      { label: "Analytics", icon: <FaChartBar />, path: "/analytics" },
      { label: "Chat", icon: <FaComments />, path: "/ai" },
    ];
  }

  // 🆕 Dashboard-specific alternate menu
  const dashboardMenu = [
    { label: "Dashboard", icon: <FaChartPie />, path: "/dashboard" },
    { label: "My Actions", icon: <FaTools />, path: "/my-actions" },
    { label: "Reports", icon: <FaClipboardCheck />, path: "/dashboard/reports" },
    { label: "AI Assistant", icon: <FaRobot />, path: "/ai" },
  ];

  // Choose between default and dashboard menus
  const finalMenu = isDashboard ? dashboardMenu : links;

  // Bottom section
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
          {finalMenu.map((link) => (
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
