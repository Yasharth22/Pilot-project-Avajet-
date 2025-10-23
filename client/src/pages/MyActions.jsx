import React, { useState, useRef, useEffect } from "react";
import "../assets/style.css";
import { Search, Filter, Download, ChevronDown, Bell } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

/* ✈️ Aviation Department-wise Role Data */
const departmentRoles = {
  CAMO: [
    { name: "CAMO Manager", new: 3, screening: 2, interview: 1, test: "—", hired: "—" },
    { name: "Airworthiness Engineer", new: 4, screening: 3, interview: 1, test: "—", hired: "—" },
    { name: "Records Specialist", new: 2, screening: 1, interview: "—", test: "—", hired: "—" },
  ],
  MANAGERS: [
    { name: "Accountable Manager", new: 2, screening: 1, interview: 1, test: "—", hired: "—" },
    { name: "Operations Manager", new: 3, screening: 2, interview: 1, test: "—", hired: "—" },
    { name: "Safety Manager", new: 2, screening: 2, interview: 1, test: "—", hired: "—" },
  ],
  FINANCE: [
    { name: "Financial Analyst", new: 4, screening: 2, interview: 1, test: "—", hired: "—" },
    { name: "Budget Controller", new: 3, screening: 2, interview: 1, test: "—", hired: "—" },
    { name: "Asset Accountant", new: 2, screening: 1, interview: 1, test: "—", hired: "—" },
  ],
  PILOTS: [
    { name: "Captain", new: 6, screening: 3, interview: 2, test: "—", hired: "—" },
    { name: "First Officer", new: 5, screening: 3, interview: 1, test: "—", hired: "—" },
    { name: "Trainee Pilot", new: 4, screening: 2, interview: 1, test: "—", hired: "—" },
  ],
  "ON GROUND CREW": [
    { name: "Ground Crew Supervisor", new: 5, screening: 2, interview: 1, test: "—", hired: "—" },
    { name: "Aircraft Technician", new: 4, screening: 3, interview: 1, test: "—", hired: "—" },
    { name: "Ramp Officer", new: 6, screening: 2, interview: 1, test: "—", hired: "—" },
  ],
  "ASSET MANAGEMENT": [
    { name: "Maintenance Engineer", new: 3, screening: 2, interview: 1, test: "—", hired: "—" },
    { name: "Fleet Planner", new: 2, screening: 1, interview: "—", test: "—", hired: "—" },
    { name: "Parts Procurement Officer", new: 3, screening: 1, interview: 1, test: "—", hired: "—" },
  ],
};

/* Tasks */
const tasks = [
  { time: "09:00 — 10:00 AM", title: "Pilot interview sessions", color: "accent-pink" },
  { time: "11:00 — 12:00 PM", title: "Fleet maintenance sync", color: "accent-green" },
  { time: "01:00 — 02:00 PM", title: "Budget review meeting", color: "accent-yellow" },
  { time: "03:00 — 04:00 PM", title: "Crew training schedule update", color: "accent-blue" },
  { time: "05:00 — 06:00 PM", title: "CAMO compliance report prep", color: "accent-purple" },
];

/* Teams */
const teams = [
  { name: "Flight Operations", count: 12 },
  { name: "CAMO Department", count: 8 },
  { name: "Ground Crew", count: 15 },
  { name: "Finance", count: 10 },
];

/* Pill colors for table values */
const pillColors = ["pill-pink", "pill-yellow", "pill-blue", "pill-green", "pill-purple", "pill-teal"];

/* Detect outside clicks for dropdowns */
const useOutsideClick = (ref, handler) => {
  useEffect(() => {
    const fn = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler();
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [ref, handler]);
};

const MyActions = () => {
  const [selectedDept, setSelectedDept] = useState("CAMO");
  const [deptMenuOpen, setDeptMenuOpen] = useState(false);
  const deptRef = useRef(null);
  useOutsideClick(deptRef, () => setDeptMenuOpen(false));

  const [dateMenuOpen, setDateMenuOpen] = useState(false);
  const [periodMenuOpen, setPeriodMenuOpen] = useState(false);
  const [dateRange, setDateRange] = useState("Feb 18 — Nov 18");
  const [period, setPeriod] = useState("Monthly");
  const [search, setSearch] = useState("");

  const dateRef = useRef(null);
  const periodRef = useRef(null);
  useOutsideClick(dateRef, () => setDateMenuOpen(false));
  useOutsideClick(periodRef, () => setPeriodMenuOpen(false));

  const topBtnClass = "ma-top-btn";

  /* Donut Chart Job Summary Data */
  const jobData = [
    { name: "Published", value: 80, color: "#2563eb" }, // Blue
    { name: "On Hold", value: 20, color: "#f59e0b" },  // Amber
    { name: "Internal", value: 18, color: "#10b981" }, // Green
    { name: "Closed", value: 15, color: "#ef4444" },   // Red
  ];

  const roles = departmentRoles[selectedDept];

  return (
    <div className="myactions-container">
      {/* Topbar */}
      <div className="myactions-topbar">
        <div>
          <h1 className="ma-title">My Actions</h1>
          <p className="ma-sub">Good Morning, Dhairyash 👋</p>
        </div>

        <div className="ma-controls">
          {/* Search */}
          <div className="ma-search">
            <Search className="ma-search-icon" />
            <input
              type="text"
              placeholder="Search actions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ma-search-input"
            />
          </div>

          {/* Date Dropdown */}
          <div className="ma-dropdown-wrapper" ref={dateRef}>
            <button
              className={`${topBtnClass} ma-dropdown-btn`}
              onClick={() => {
                setDateMenuOpen((s) => !s);
                setPeriodMenuOpen(false);
              }}
            >
              <span className="ma-dropdown-label">{dateRange}</span>
              <ChevronDown className="ma-caret" />
            </button>
            {dateMenuOpen && (
              <div className="ma-dropdown-menu">
                {["Today", "Last 7 days", "Feb 18 — Nov 18"].map((d) => (
                  <button
                    key={d}
                    className="ma-dropdown-item"
                    onClick={() => {
                      setDateRange(d);
                      setDateMenuOpen(false);
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Period Dropdown */}
          <div className="ma-dropdown-wrapper" ref={periodRef}>
            <button
              className={`${topBtnClass} ma-dropdown-btn`}
              onClick={() => {
                setPeriodMenuOpen((s) => !s);
                setDateMenuOpen(false);
              }}
            >
              <span className="ma-dropdown-label">{period}</span>
              <ChevronDown className="ma-caret" />
            </button>
            {periodMenuOpen && (
              <div className="ma-dropdown-menu">
                {["Daily", "Weekly", "Monthly"].map((p) => (
                  <button
                    key={p}
                    className="ma-dropdown-item"
                    onClick={() => {
                      setPeriod(p);
                      setPeriodMenuOpen(false);
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          <button className={`${topBtnClass} ma-filter-btn`}>
            <Filter className="ma-icon" /> Filter
          </button>
          <button className={`${topBtnClass} ma-export-btn`}>
            <Download className="ma-icon" /> Export
          </button>
          <button className="ma-ghost-btn" title="Notifications">
            <Bell className="ma-icon" />
            <span className="ma-pill-badge" />
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="myactions-grid">
        <div className="myactions-col">
          {/* Hiring Section */}
          <div className="myactions-card">
            <div className="card-header">
              <h2>Hiring</h2>
              <div className="card-actions">
                <div className="small-dropdown" ref={deptRef}>
                  <button
                    className="small-dropdown-btn"
                    onClick={() => setDeptMenuOpen((o) => !o)}
                  >
                    {selectedDept} <ChevronDown className="small-caret" />
                  </button>
                  {deptMenuOpen && (
                    <div className="small-dropdown-menu">
                      {Object.keys(departmentRoles).map((dept) => (
                        <button
                          key={dept}
                          className="small-dropdown-item"
                          onClick={() => {
                            setSelectedDept(dept);
                            setDeptMenuOpen(false);
                          }}
                        >
                          {dept}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button className="link-btn">View All</button>
              </div>
            </div>

            {/* Roles Table */}
            <div className="table-head">
              <div>Role</div>
              <div>New</div>
              <div>Screening</div>
              <div>Interview</div>
              <div>Test</div>
              <div>Hired</div>
            </div>

            <div className="table-body">
              {roles.map((r, i) => (
                <div key={i} className={`table-row ${i % 2 === 0 ? "even" : ""}`}>
                  <div className="role-name">{r.name}</div>
                  <div><span className={`pill ${pillColors[0]}`}>{r.new}</span></div>
                  <div><span className={`pill ${pillColors[1]}`}>{r.screening}</span></div>
                  <div><span className={`pill ${pillColors[2]}`}>{r.interview}</span></div>
                  <div><span className={`pill ${pillColors[3]}`}>{r.test}</span></div>
                  <div><span className={`pill ${pillColors[4]}`}>{r.hired}</span></div>
                </div>
              ))}
            </div>
          </div>

          {/* My Tasks */}
          <div className="myactions-card">
            <div className="card-header">
              <h2>My Tasks</h2>
              <div className="card-actions">
                <div className="small-dropdown">
                  <button className="small-dropdown-btn">
                    Today <ChevronDown className="small-caret" />
                  </button>
                </div>
                <button className="primary-sm">Add Task</button>
              </div>
            </div>

            <div className="task-list">
              {tasks.map((t, i) => (
                <div key={i} className="task-row">
                  <div className={`task-accent ${t.color}`} />
                  <div className="task-meta">
                    <div className="task-time">{t.time}</div>
                    <div className="task-title">{t.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="myactions-col">
          {/* Jobs Summary with Donut Chart */}
          <div className="myactions-card center-col">
            <h2>Jobs Summary</h2>
            <div className="jobs-chart-wrapper">
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie
                    dataKey="value"
                    data={jobData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    startAngle={90}
                    endAngle={450}
                    isAnimationActive={true}
                    animationBegin={0}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  >
                    {jobData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="jobs-center-text">
                <div className="jobs-center-total">133</div>
                <div className="jobs-center-label">Total Jobs</div>
              </div>
            </div>

            {/* Legend auto-linked to chart colors */}
            <div className="jobs-stats">
              {jobData.map((item, idx) => (
                <div key={idx} className="stat-row">
                  <span
                    className="dot"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.value} {item.name}
                </div>
              ))}
            </div>
          </div>

          {/* Teams */}
          <div className="myactions-card">
            <div className="card-header">
              <h2>Teams</h2>
              <div className="card-actions">
                <button className="link-btn">View All</button>
              </div>
            </div>

            <div className="teams-list">
              {teams.map((team, idx) => (
                <div key={idx} className="team-row">
                  <div className="team-left">
                    <div className="team-name">{team.name}</div>
                  </div>
                  <div className="team-right">
                    <div className="avatars">
                      <img src={`https://i.pravatar.cc/150?img=${idx * 3 + 1}`} alt="" />
                      <img src={`https://i.pravatar.cc/150?img=${idx * 3 + 2}`} alt="" />
                      <img src={`https://i.pravatar.cc/150?img=${idx * 3 + 3}`} alt="" />
                    </div>
                    <div className="team-count">+{team.count}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyActions;
