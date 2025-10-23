import React, { useState, useEffect } from "react";
import "../assets/style.css";

const Settings = () => {
  const defaultSettings = {
    theme: "light",
    fontSize: 16,
    layout: "compact",
    dateFormat: "12h",
    aiTypingSpeed: 2,
    aiTypingDots: true,
    aiSaveHistory: true,
    systemAlerts: true,
    maintenanceAlerts: true,
    aiAlerts: false,
  };

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("userSettings");
    if (!saved) return defaultSettings;
    try {
      return { ...defaultSettings, ...JSON.parse(saved) };
    } catch {
      return defaultSettings;
    }
  });

  const [activeTab, setActiveTab] = useState("General");

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem("userSettings", JSON.stringify(settings));
  }, [settings]);

  // Apply Settings UI theme and font size
  useEffect(() => {
    document.body.style.backgroundColor =
      settings.theme === "dark" ? "#ffe8e2" : "#f9fafb"; // Brand dark mode background
    document.body.style.color =
      settings.theme === "dark" ? "#7f1d1d" : "#111827"; // Brand dark text
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
              <h3>Appearance & Layout</h3>

              <div className="settings-row">
                <label>Theme (UI Only)</label>
                <select
                  value={settings.theme}
                  onChange={(e) => handleChange("theme", e.target.value)}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark (Brand Red)</option>
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

              <div className="settings-row">
                <label>Date/Time Format</label>
                <select
                  value={settings.dateFormat}
                  onChange={(e) => handleChange("dateFormat", e.target.value)}
                >
                  <option value="12h">12-Hour</option>
                  <option value="24h">24-Hour</option>
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
              <h3>Account Settings</h3>

              {/* User Details */}
              <div className="settings-section">
                <h4>User Details</h4>
                <div className="settings-row">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={settings.fullName || "Dhairyash Aswani"}
                    disabled
                  />
                </div>
                <div className="settings-row">
                  <label>Email</label>
                  <input
                    type="email"
                    value={settings.email || "dhairyash@a14tech.com"}
                    disabled
                  />
                </div>
                <div className="settings-row">
                  <label>Role</label>
                  <input
                    type="text"
                    value={settings.role || "Admin"}
                    disabled
                  />
                </div>
              </div>

              {/* Password Section */}
              <div className="settings-section">
                <h4>Password</h4>
                {settings.passwordChanged ? (
                  <p className="info-text">
                    Password has been changed. To change again, contact admin to
                    reset it to default.
                  </p>
                ) : (
                  <>
                    <div className="settings-row">
                      <label>Current Password</label>
                      <input
                        type="password"
                        value={settings.currentPassword || ""}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            currentPassword: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="settings-row">
                      <label>New Password</label>
                      <input
                        type="password"
                        value={settings.newPassword || ""}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            newPassword: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="settings-row">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        value={settings.confirmPassword || ""}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            confirmPassword: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <button
                      className="primary-sm"
                      onClick={() => {
                        if (
                          settings.currentPassword !== "tempPassword123!" ||
                          settings.newPassword !== settings.confirmPassword
                        ) {
                          alert(
                            "Either current password is incorrect or new passwords do not match!"
                          );
                          return;
                        }
                        setSettings((prev) => ({
                          ...prev,
                          passwordChanged: true,
                          currentPassword: "",
                          newPassword: "",
                          confirmPassword: "",
                        }));
                        alert(
                          "Password changed successfully. Notify admin if you want to reset it again."
                        );
                      }}
                    >
                      Change Password
                    </button>
                  </>
                )}
              </div>

              {/* Two-Factor Authentication (Optional) */}
              <div className="settings-section">
                <h4>Security</h4>
                <div className="settings-row">
                  <label>Two-Factor Authentication</label>
                  <input
                    type="checkbox"
                    checked={settings.twoFA || false}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        twoFA: e.target.checked,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Logout */}
              <div className="settings-section">
                <button
                  className="logout-btn"
                  onClick={() => {
                    alert("Logged out!");
                  }}
                >
                  Logout
                </button>
              </div>
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
                  onChange={(e) => handleChange("aiAlerts", e.target.checked)}
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
            className={`settings-tab ${activeTab === tab ? "active" : ""}`}
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
