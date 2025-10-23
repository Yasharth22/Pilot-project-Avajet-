import React, { useState } from "react";
import "../assets/style.css";

const Forum = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {
    role: "user",
    id: "guest",
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [expandedThread, setExpandedThread] = useState(null);

  const [threads, setThreads] = useState([
    {
      title: "Dashboard not loading after last update",
      author: "UserA",
      content:
        "After updating, my dashboard stays blank. I tried refreshing and clearing cache but no luck.",
      replies: [
        {
          author: "Tech Support",
          content: "Please clear your cache and cookies, then log in again.",
        },
      ],
      createdAt: "10h",
      importance: 2,
      views: 75,
      status: "open",
    },
    {
      title: "Analytics export timing out",
      author: "UserB",
      content: "When I export large datasets, the process gets stuck at 80%.",
      replies: [],
      createdAt: "5h",
      importance: 0,
      views: 42,
      status: "user-solution",
    },
    {
      title: "Incorrect maintenance data syncing",
      author: "UserC",
      content:
        "Data between modules doesn’t match after the last sync operation.",
      replies: [],
      createdAt: "3h",
      importance: 1,
      views: 60,
      status: "resolved",
    },
  ]);

  const [newThread, setNewThread] = useState({ title: "", content: "" });
  const [replyInputs, setReplyInputs] = useState({});
  const [notifyModal, setNotifyModal] = useState({ open: false, index: null });
  const [solutionText, setSolutionText] = useState("");

  const filteredThreads = threads
    .filter((t) => {
      const matchesSearch = t.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === "all" || t.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "importance":
          return b.importance - a.importance;
        case "views":
          return b.views - a.views;
        case "replies":
          return b.replies.length - a.replies.length;
        default:
          return 0; // newest order (already top-down)
      }
    });

  const handleCreateThread = () => {
    if (!newThread.title || !newThread.content) return;
    const newOne = {
      title: newThread.title,
      author: "You",
      content: newThread.content,
      replies: [],
      createdAt: "Just now",
      importance: 0,
      views: Math.floor(Math.random() * 100),
      status: "open",
    };
    setThreads([newOne, ...threads]);
    setNewThread({ title: "", content: "" });
  };

  const handleUpvote = (index) => {
    const updated = [...threads];
    updated[index].importance += 1;
    setThreads(updated);
  };

  const openNotifyModal = (index) => {
    setNotifyModal({ open: true, index });
    setSolutionText("");
  };

  const closeNotifyModal = () => setNotifyModal({ open: false, index: null });

  const handleSendSolution = () => {
    if (!solutionText.trim()) return;
    const updated = [...threads];
    updated[notifyModal.index].status = "user-solution";
    alert(
      `Your solution for "${threads[notifyModal.index].title}" has been sent to admin.`
    );
    setThreads(updated);
    closeNotifyModal();
  };

  const handleMarkResolved = () => {
    const updated = [...threads];
    updated[notifyModal.index].status = "resolved";
    alert(
      `Admin has been notified that "${threads[notifyModal.index].title}" is resolved.`
    );
    setThreads(updated);
    closeNotifyModal();
  };

  const handleReplyChange = (index, value) => {
    setReplyInputs({ ...replyInputs, [index]: value });
  };

  const handleAddReply = (index) => {
    if (!replyInputs[index]) return;
    const updated = [...threads];
    updated[index].replies.push({
      author: user.role === "admin" ? "Tech Support" : "User",
      content: replyInputs[index],
    });
    setThreads(updated);
    setReplyInputs({ ...replyInputs, [index]: "" });
  };

  return (
    <div className="forum-container">
      <h2 className="forum-heading">Community Forum</h2>

      {/* Search Bar */}
      <div className="forum-searchbar">
        <input
          type="text"
          placeholder="Search for existing discussions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="forum-search-icon">🔍</span>
      </div>

      {/* Filter + Sort Row */}
      <div className="forum-filter-sort-row">
        <div className="forum-filter-bar">
          {["all", "open", "user-solution", "resolved"].map((status) => (
            <button
              key={status}
              className={`forum-filter-btn ${
                filterStatus === status ? "active" : ""
              }`}
              onClick={() => setFilterStatus(status)}
            >
              {status === "all"
                ? "All"
                : status === "open"
                ? "Open"
                : status === "user-solution"
                ? "User Solution"
                : "Resolved"}
            </button>
          ))}
        </div>

        <div className="forum-sort-dropdown">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="importance">Most Important</option>
            <option value="views">Most Viewed</option>
            <option value="replies">Most Replies</option>
          </select>
        </div>
      </div>

      {/* START A THREAD */}
      {user.role !== "admin" && (
        <div className="forum-new-thread">
          <h3>Start a New Thread</h3>
          <input
            type="text"
            placeholder="Enter thread title..."
            value={newThread.title}
            onChange={(e) =>
              setNewThread({ ...newThread, title: e.target.value })
            }
          />
          <textarea
            placeholder="Describe your issue or discussion topic..."
            value={newThread.content}
            onChange={(e) =>
              setNewThread({ ...newThread, content: e.target.value })
            }
          />
          <button onClick={handleCreateThread}>Post Thread</button>
        </div>
      )}

      {/* Thread List */}
      <div className="forum-thread-list">
        {filteredThreads.length > 0 ? (
          filteredThreads.map((thread, index) => (
            <div
              key={index}
              className={`forum-thread-card ${
                expandedThread === index ? "expanded" : ""
              }`}
            >
              <div
                className="forum-thread-header clickable"
                onClick={() =>
                  setExpandedThread(expandedThread === index ? null : index)
                }
              >
                <div className="forum-thread-title">
                  <h3>{thread.title}</h3>
                  {thread.status === "resolved" && (
                    <span className="forum-status-badge resolved">
                      Resolved
                    </span>
                  )}
                  {thread.status === "user-solution" && (
                    <span className="forum-status-badge solution">
                      User Solution
                    </span>
                  )}
                </div>

                <button
                  className="forum-upvote"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpvote(index);
                  }}
                >
                  ↑ {thread.importance}
                </button>
              </div>

              <p className="forum-thread-meta">
                Posted by <strong>{thread.author}</strong> • Created{" "}
                {thread.createdAt} • Replies {thread.replies.length} • Views{" "}
                {thread.views}
              </p>

              {/* Expanded view */}
              {expandedThread === index && (
                <div className="forum-expanded">
                  <p className="forum-thread-content">{thread.content}</p>

                  <h4>Replies</h4>
                  {thread.replies.length > 0 ? (
                    thread.replies.map((r, i) => (
                      <div key={i} className="forum-reply">
                        <p>
                          <strong>{r.author}: </strong>
                          {r.content}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="forum-no-replies">No replies yet.</p>
                  )}

                  {/* Admin reply area */}
                  {user.role === "admin" ? (
                    <div className="forum-reply-box">
                      <textarea
                        placeholder="Type your reply..."
                        value={replyInputs[index] || ""}
                        onChange={(e) =>
                          handleReplyChange(index, e.target.value)
                        }
                      />
                      <button
                        className="forum-reply-btn"
                        onClick={() => handleAddReply(index)}
                      >
                        Reply
                      </button>
                    </div>
                  ) : (
                    <div className="forum-thread-actions">
                      <button
                        className="forum-notify-admin"
                        onClick={() => openNotifyModal(index)}
                      >
                        Notify Admin
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="forum-no-results">No discussions found.</p>
        )}
      </div>

      {/* Modal */}
      {notifyModal.open && (
        <div className="forum-modal-overlay">
          <div className="forum-modal">
            <h3>Notify Admin</h3>
            <textarea
              placeholder="Describe your solution here (optional)..."
              value={solutionText}
              onChange={(e) => setSolutionText(e.target.value)}
            ></textarea>
            <div className="forum-modal-buttons">
              <button
                className="forum-solution-btn"
                onClick={handleSendSolution}
              >
                Provide Solution
              </button>
              <button
                className="forum-resolved-btn"
                onClick={handleMarkResolved}
              >
                Mark as Resolved
              </button>
              <button className="forum-close-btn" onClick={closeNotifyModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forum;
