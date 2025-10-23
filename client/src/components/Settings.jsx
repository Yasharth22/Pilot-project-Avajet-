import React, { useState, useEffect } from "react";
import "../assets/style.css";

const Settings = () => {
  const defaultSettings = {
    theme: "light",
    fontSize: 16,
    layout: "compact",
    aiTypingSpeed: 2,
    aiTypingDots: true,
    aiSaveHistory: true,
    systemAlerts: true,
    maintenanceAlerts: true,
    aiAlerts: false,
  };

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("userSettings");
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const [activeTab, setActiveTab] = useState("General");

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem("userSettings", JSON.stringify(settings));
  }, [settings]);

  // Apply live preview
  useEffect(() => {
    document.body.style.backgroundColor =
      settings.theme === "dark" ? "#1f2937" : "#f5f5f5";
    document.body.style.color =
      settings.theme === "dark" ? "#f9fafb" : "#111827";
    document.documentElement.style.fontSize = `${settings.fontSize}px`;
  }, [settings.theme, settings.fontSize]);

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetToDefaults = () => {
    setSettings(defaultSettings);
    localStorage.removeItem("userSettings");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "General":
        return (
          <div className="settings-content">
            <div className="settings-card">
              <h3>Appearance</h3>
              <div className="settings-row">
                <label>Theme</label>
                <select
                  value={settings.theme}
                  onChange={(e) => handleChange("theme", e.target.value)}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>

              <div className="settings-row">
                <label>Font Size</label>
                <input
                  type="range"
                  min="14"
                  max="20"
                  value={settings.fontSize}
                  onChange={(e) =>
                    handleChange("fontSize", Number(e.target.value))
                  }
                />
                <span>{settings.fontSize}px</span>
              </div>

              <div className="settings-row">
                <label>Dashboard Layout</label>
                <select
                  value={settings.layout}
                  onChange={(e) => handleChange("layout", e.target.value)}
                >
                  <option value="compact">Compact</option>
                  <option value="spacious">Spacious</option>
                </select>
              </div>
            </div>
          </div>
        );

      case "AI Assistant":
        return (
          <div className="settings-content">
            <div className="settings-card">
              <h3>AI Assistant Preferences</h3>
              <div className="settings-row">
                <label>Typing Speed</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={settings.aiTypingSpeed}
                  onChange={(e) =>
                    handleChange("aiTypingSpeed", Number(e.target.value))
                  }
                />
                <span>{settings.aiTypingSpeed}</span>
              </div>

              <div className="settings-row">
                <label>Typing Dots Animation</label>
                <input
                  type="checkbox"
                  checked={settings.aiTypingDots}
                  onChange={(e) =>
                    handleChange("aiTypingDots", e.target.checked)
                  }
                />
              </div>

              <div className="settings-row">
                <label>Save Chat History</label>
                <input
                  type="checkbox"
                  checked={settings.aiSaveHistory}
                  onChange={(e) =>
                    handleChange("aiSaveHistory", e.target.checked)
                  }
                />
              </div>
            </div>
          </div>
        );

      case "Account":
        return (
          <div className="settings-content">
            <div className="settings-card">
              <h3>Account Details</h3>
              <div className="settings-row">
                <label>User ID</label>
                <span>684c14fbeb291877924267ec</span>
              </div>
              <div className="settings-row">
                <label>Role</label>
                <span>Admin</span>
              </div>
              <div className="settings-row">
                <label>Change Password</label>
                <input type="password" disabled value="********" />
              </div>
              <button className="logout-btn">Logout</button>
            </div>
          </div>
        );

      case "Notifications":
        return (
          <div className="settings-content">
            <div className="settings-card">
              <h3>Notification Settings</h3>
              <div className="settings-row">
                <label>System Alerts</label>
                <input
                  type="checkbox"
                  checked={settings.systemAlerts}
                  onChange={(e) =>
                    handleChange("systemAlerts", e.target.checked)
                  }
                />
              </div>

              <div className="settings-row">
                <label>Maintenance Alerts</label>
                <input
                  type="checkbox"
                  checked={settings.maintenanceAlerts}
                  onChange={(e) =>
                    handleChange("maintenanceAlerts", e.target.checked)
                  }
                />
              </div>

              <div className="settings-row">
                <label>AI Alerts</label>
                <input
                  type="checkbox"
                  checked={settings.aiAlerts}
                  onChange={(e) =>
                    handleChange("aiAlerts", e.target.checked)
                  }
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-tabs">
        {["General", "AI Assistant", "Account", "Notifications"].map((tab) => (
          <button
            key={tab}
            className={`settings-tab ${
              activeTab === tab ? "active" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {renderTabContent()}

      <div className="settings-reset">
        <button onClick={resetToDefaults}>Reset to Default</button>
      </div>
    </div>
  );
};

export default Settings;
