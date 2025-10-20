import React from "react";
import { FaSearch } from "react-icons/fa";
import "../assets/style.css";

const Topbar = () => {
  return (
    <header className="topbar">
      {/* Left Spacer for layout balance */}
      <div className="topbar-left"></div>

      {/* Centered Title */}
      <div className="topbar-center">
        <div className="topbar-title">CAMO SOFTWARE</div>
      </div>

      {/* Search box on right */}
      <div className="topbar-search">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search flight number..."
          className="search-input"
        />
      </div>
    </header>
  );
};

export default Topbar;
