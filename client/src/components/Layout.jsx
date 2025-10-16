import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div
        style={{
          marginLeft: "calc(var(--sidebar-width) + var(--sidebar-gap))",
          flex: 1,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Topbar />
        <main
          style={{
            flex: 1,
            overflowY: "auto",
            background: "#f6f5f7",
            padding: "1.5rem",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
