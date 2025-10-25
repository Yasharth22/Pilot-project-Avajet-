import React, { useState, useEffect } from "react";
import "../assets/style.css";

const SettingsRow = ({ label, children }) => (
  <div className="settings-row">
    <div className="settings-label">{label}</div>
    <div className="settings-input">{children}</div>
  </div>
);

const SettingsSection = ({ title, children }) => (
  <div className="settings-card">
    <h3>{title}</h3>
    {children}
  </div>
);

const Settings = () => {
  const defaultSettings = {
    theme: "light",
    fontSize: 16,
    layout: "compact",
    dateFormat: "12h",
    aiTypingSpeed: 3,
    aiTypingDots: true,
    aiSaveHistory: true,
    aiModel: "phi3:mini",
    aiAutoSuggestions: true,
    aiResponseStyle: "Casual",
    aiLanguage: "English",
    aiQuickReplies: true,
    aiHighlightResponses: false,
    aiShowTimestamps: true,
    aiAutoSaveResponses: true,
    aiCompletionNotification: false,
    systemAlerts: true,
    maintenanceAlerts: true,
    aiAlerts: false,
    fullName: "Dhairyash Aswani",
    email: "dhairyash@a14tech.com",
    role: "Admin",
  };

  // ---------- STATE ----------
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

  // For Account Tab Password Change
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [passwordError, setPasswordError] = useState("");

  // ---------- EFFECTS ----------
  useEffect(() => {
    localStorage.setItem("userSettings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    document.body.style.backgroundColor =
      settings.theme === "dark" ? "#ffe8e2" : "#f9fafb";
    document.body.style.color =
      settings.theme === "dark" ? "#7f1d1d" : "#111827";
    document.documentElement.style.fontSize = `${settings.fontSize}px`;
  }, [settings.theme, settings.fontSize]);

  // ---------- HANDLERS ----------
  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetToDefaults = () => {
    setSettings(defaultSettings);
    localStorage.removeItem("userSettings");
  };

  const clearChatHistory = () => {
    localStorage.removeItem("chatHistory");
    alert("Chat history cleared!");
  };

  const handlePasswordChange = (field, value) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
  };

  const validateAndSavePassword = () => {
    setPasswordError("");

    if (!passwords.new || !passwords.confirm) {
      setPasswordError("Please fill in all password fields.");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }
    if (passwords.new.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      return;
    }

    localStorage.setItem("userPassword", passwords.new);
    alert("Password changed successfully!");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  // ---------- TAB RENDERERS ----------
  const renderGeneralTab = () => (
    <div className="settings-content">
      <SettingsSection title="Appearance & Layout">
        <SettingsRow label="Theme">
          <select
            value={settings.theme}
            onChange={(e) => handleChange("theme", e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark (Brand Red)</option>
          </select>
        </SettingsRow>

        <SettingsRow label="Font Size">
          <div className="range-with-value">
            <input
              type="range"
              min="14"
              max="20"
              value={settings.fontSize}
              onChange={(e) => handleChange("fontSize", Number(e.target.value))}
            />
            <span>{settings.fontSize}px</span>
          </div>
        </SettingsRow>

        <SettingsRow label="Dashboard Layout">
          <select
            value={settings.layout}
            onChange={(e) => handleChange("layout", e.target.value)}
          >
            <option value="compact">Compact</option>
            <option value="spacious">Spacious</option>
          </select>
        </SettingsRow>

        <SettingsRow label="Date / Time Format">
          <select
            value={settings.dateFormat}
            onChange={(e) => handleChange("dateFormat", e.target.value)}
          >
            <option value="12h">12-Hour</option>
            <option value="24h">24-Hour</option>
          </select>
        </SettingsRow>
      </SettingsSection>
    </div>
  );

  const renderAITab = () => (
    <div className="settings-content">
      <SettingsSection title="AI Assistant Preferences">
        <SettingsRow label="Model">
          <select
            value={settings.aiModel}
            onChange={(e) => handleChange("aiModel", e.target.value)}
          >
            <option value="phi3:mini">phi3:mini (fast)</option>
            <option value="llama3:3b">llama3:3b (balanced)</option>
            <option value="llama3:8b">llama3:8b (accurate)</option>
          </select>
        </SettingsRow>

        <SettingsRow label="Typing Speed">
          <div className="range-with-value">
            <input
              type="range"
              min="1"
              max="5"
              value={settings.aiTypingSpeed}
              onChange={(e) =>
                handleChange("aiTypingSpeed", Number(e.target.value))
              }
            />
            <span>
              {settings.aiTypingSpeed === 1
                ? "Slow"
                : settings.aiTypingSpeed === 3
                ? "Normal"
                : "Fast"}
            </span>
          </div>
        </SettingsRow>

        <SettingsRow label="Typing Dots Animation">
          <input
            type="checkbox"
            checked={settings.aiTypingDots}
            onChange={(e) => handleChange("aiTypingDots", e.target.checked)}
          />
        </SettingsRow>

        <SettingsRow label="Auto-Suggestions">
          <input
            type="checkbox"
            checked={settings.aiAutoSuggestions}
            onChange={(e) =>
              handleChange("aiAutoSuggestions", e.target.checked)
            }
          />
        </SettingsRow>

        <SettingsRow label="Quick Replies">
          <input
            type="checkbox"
            checked={settings.aiQuickReplies}
            onChange={(e) => handleChange("aiQuickReplies", e.target.checked)}
          />
        </SettingsRow>

        <SettingsRow label="Response Highlighting">
          <input
            type="checkbox"
            checked={settings.aiHighlightResponses}
            onChange={(e) =>
              handleChange("aiHighlightResponses", e.target.checked)
            }
          />
        </SettingsRow>

        <SettingsRow label="Show Timestamps">
          <input
            type="checkbox"
            checked={settings.aiShowTimestamps}
            onChange={(e) => handleChange("aiShowTimestamps", e.target.checked)}
          />
        </SettingsRow>

        <SettingsRow label="Auto-Save Responses">
          <input
            type="checkbox"
            checked={settings.aiAutoSaveResponses}
            onChange={(e) =>
              handleChange("aiAutoSaveResponses", e.target.checked)
            }
          />
        </SettingsRow>

        <SettingsRow label="Completion Notification">
          <input
            type="checkbox"
            checked={settings.aiCompletionNotification}
            onChange={(e) =>
              handleChange("aiCompletionNotification", e.target.checked)
            }
          />
        </SettingsRow>

        <div className="settings-actions">
          <button className="btn-secondary" onClick={clearChatHistory}>
            Clear History
          </button>
          <button
            className="btn-secondary"
            onClick={() => window.dispatchEvent(new Event("clearChat"))}
          >
            Clear Chat
          </button>
        </div>
      </SettingsSection>
    </div>
  );

  const renderAccountTab = () => {
    const lastLogin = localStorage.getItem("lastLogin") || "N/A";
    const accountCreated =
      localStorage.getItem("accountCreated") || "01/01/2025";

    return (
      <div className="settings-content">
        <SettingsSection title="Account">
          <SettingsRow label="Full Name">
            <input
              type="text"
              value={settings.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
          </SettingsRow>

          <SettingsRow label="Email">
            <input
              type="email"
              value={settings.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </SettingsRow>

          <SettingsRow label="Role">
            <input type="text" value={settings.role} disabled />
          </SettingsRow>

          <SettingsSection title="Change Password">
            <SettingsRow label="Current Password">
              <input
                type="password"
                value={passwords.current}
                placeholder="Enter current password"
                onChange={(e) => handlePasswordChange("current", e.target.value)}
              />
            </SettingsRow>

            <SettingsRow label="New Password">
              <input
                type="password"
                value={passwords.new}
                placeholder="Enter new password"
                onChange={(e) => handlePasswordChange("new", e.target.value)}
              />
            </SettingsRow>

            <SettingsRow label="Confirm Password">
              <input
                type="password"
                value={passwords.confirm}
                placeholder="Confirm new password"
                onChange={(e) =>
                  handlePasswordChange("confirm", e.target.value)
                }
              />
            </SettingsRow>

            {passwordError && (
              <div style={{ color: "red", marginTop: "0.5rem" }}>
                {passwordError}
              </div>
            )}

            <div style={{ marginTop: "1rem" }}>
              <button className="btn-primary" onClick={validateAndSavePassword}>
                Save Password
              </button>
            </div>
          </SettingsSection>

          <div
            className="account-info"
            style={{ marginTop: "1.5rem", fontSize: "0.9rem", color: "#6b7280" }}
          >
            <div>Last Login: {lastLogin}</div>
            <div>Account Created: {accountCreated}</div>
            <div style={{ marginTop: "0.5rem", color: "#ef4444" }}>
              Note: If you forget your password, contact the admin.
            </div>
          </div>
        </SettingsSection>
      </div>
    );
  };

  const renderNotificationsTab = () => (
    <div className="settings-content">
      <SettingsSection title="Notifications">
        <SettingsRow label="System Alerts">
          <input
            type="checkbox"
            checked={settings.systemAlerts}
            onChange={(e) => handleChange("systemAlerts", e.target.checked)}
          />
        </SettingsRow>
        <SettingsRow label="Maintenance Alerts">
          <input
            type="checkbox"
            checked={settings.maintenanceAlerts}
            onChange={(e) =>
              handleChange("maintenanceAlerts", e.target.checked)
            }
          />
        </SettingsRow>
        <SettingsRow label="AI Alerts">
          <input
            type="checkbox"
            checked={settings.aiAlerts}
            onChange={(e) => handleChange("aiAlerts", e.target.checked)}
          />
        </SettingsRow>
      </SettingsSection>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "General":
        return renderGeneralTab();
      case "AI Assistant":
        return renderAITab();
      case "Account":
        return renderAccountTab();
      case "Notifications":
        return renderNotificationsTab();
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
