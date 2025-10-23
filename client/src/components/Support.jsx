import React, { useState } from "react";
import "../assets/style.css";
import { useNavigate } from "react-router-dom";

const Support = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [showBugForm, setShowBugForm] = useState(false);
  const navigate = useNavigate();

  const faqs = [
    { q: "How do I reset my password?", a: "Go to settings → Security → Reset Password to update your credentials." },
    { q: "Can I export my analytics data?", a: "Yes, navigate to the Analytics page and click the Export Data button." },
    { q: "How do I contact support?", a: "Use the Contact Support option below or email support@aerosys.com." },
    { q: "Where can I view system updates?", a: "System updates appear in your Dashboard under Notifications." },
    { q: "Can I customize my dashboard layout?", a: "Yes, personalization options are available in Settings → Preferences." },
  ];

  const supportOptions = [
    { title: "Troubleshooting", desc: "Fix common issues and performance problems.", icon: "🧰" },
    { title: "Contact Support", desc: "Reach our technical team for personalized help.", icon: "📞" },
    { title: "Report a Bug", desc: "Found an issue? Submit a bug report here.", icon: "🐞" },
    { title: "Documentation", desc: "Explore guides and user documentation.", icon: "📚" },
  ];

  const filteredFaqs = faqs.filter((f) =>
    f.q.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBugSubmit = (e) => {
    e.preventDefault();
    alert("Bug report submitted successfully!");
    setShowBugForm(false);
    setActiveModal(null);
  };

  return (
    <div className="support-container">
      <h2 className="support-heading">Support Center</h2>

      {/* Search Bar */}
      <div className="support-searchbar-center">
        <div className="support-searchbar">
          <input
            type="text"
            placeholder="Search for help topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="support-search-icon">🔍</span>
        </div>
      </div>

      {/* Support Cards */}
      <div className="support-card-grid">
        {supportOptions.map((option, index) => (
          <div
            key={index}
            className="support-card"
            onClick={() => {
              setActiveModal(option.title);
              setShowBugForm(false);
            }}
          >
            <div className="support-card-icon">{option.icon}</div>
            <h3>{option.title}</h3>
            <p>{option.desc}</p>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div className="support-faq-section">
        <h3 className="support-faq-title">Quick Help & FAQs</h3>
        {filteredFaqs.length === 0 ? (
          <p className="support-no-results">No results found for "{searchTerm}"</p>
        ) : (
          filteredFaqs.map((item, index) => (
            <div
              key={index}
              className={`support-faq-item ${activeFAQ === index ? "active" : ""}`}
              onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
            >
              <div className="support-faq-question">{item.q}</div>
              <div className="support-faq-answer">{item.a}</div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {activeModal && (
        <div
          className="support-modal-overlay"
          onClick={() => setActiveModal(null)}
        >
          <div className="support-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{activeModal}</h3>

            {/* Troubleshooting Modal */}
            {activeModal === "Troubleshooting" ? (
              <>
                <p>
                  Here you’ll find detailed troubleshooting steps for common system issues.
                </p>
                <div className="support-modal-actions">
                  <button
                    className="support-resource-btn"
                    onClick={() => navigate("/forum")}
                  >
                    Troubleshoot
                  </button>
                  <button
                    className="support-modal-close"
                    onClick={() => setActiveModal(null)}
                  >
                    Close
                  </button>
                </div>
              </>
            ) : activeModal === "Contact Support" ? (
              <>
                <p>
                  You can reach us at <b>support@aerosys.com</b> or call <b>+1-800-AERO-HELP</b>.
                </p>
                <button
                  className="support-modal-close"
                  onClick={() => setActiveModal(null)}
                >
                  Close
                </button>
              </>
            ) : activeModal === "Report a Bug" ? (
              showBugForm ? (
                <form onSubmit={handleBugSubmit} className="bug-form">
                  <label>Describe the issue:</label>
                  <textarea required placeholder="Describe the bug..."></textarea>
                  <div className="support-modal-actions">
                    <button type="submit" className="support-resource-btn-red">
                      Submit
                    </button>
                    <button
                      type="button"
                      className="support-modal-close"
                      onClick={() => setShowBugForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <p>
                    Found an issue? Please provide details to help us resolve it quickly.
                  </p>
                  <div className="support-modal-actions">
                    <button
                      className="support-resource-btn-red"
                      onClick={() => setShowBugForm(true)}
                    >
                      Report
                    </button>
                    <button
                      className="support-modal-close"
                      onClick={() => setActiveModal(null)}
                    >
                      Close
                    </button>
                  </div>
                </>
              )
            ) : activeModal === "Documentation" ? (
              <>
                <p>
                  You can access detailed guides and system documentation from the My Resources.
                </p>
                <div className="support-modal-actions">
                  <button
                    className="support-resource-btn"
                    onClick={() => navigate("/my-resources")}
                  >
                    My Resources
                  </button>
                  <button
                    className="support-modal-close"
                    onClick={() => setActiveModal(null)}
                  >
                    Close
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;
