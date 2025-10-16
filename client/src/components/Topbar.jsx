import React from "react";
import { FaSearch } from "react-icons/fa";
import "../assets/style.css"; // Make sure the file exists

const Topbar = () => {
  return (
    <header className="topbar-wrapper">
      {/* Left Placeholder (if needed for spacing balance) */}
      <div className="topbar-left-space"></div>

      {/* Center Title */}
      <div className="topbar-center">
        <div className="topbar-title">CAMO SOFTWARE</div>
      </div>

      {/* Right Search Input */}
      <div className="topbar-search">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Flight number"
          className="search-input"
        />
      </div>
    </header>
  );
};

export default Topbar;
