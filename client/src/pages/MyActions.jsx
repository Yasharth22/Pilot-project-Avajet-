import React from "react";
import { Search, Filter, Download, ChevronDown } from "lucide-react";

const roles = [
  { name: "Design Head", new: 18, screening: 28, interview: 3, test: "—", hired: "—" },
  { name: "Art Lead", new: 5, screening: 12, interview: 2, test: "—", hired: "—" },
  { name: "Product Designer", new: 10, screening: 15, interview: 4, test: "—", hired: "—" },
  { name: "Junior UI Designer", new: 9, screening: 6, interview: 1, test: "—", hired: "—" },
  { name: "3D Artist", new: 7, screening: 3, interview: "—", test: "—", hired: "—" },
  { name: "UX Researcher", new: 4, screening: 8, interview: 2, test: "—", hired: "—" },
];

const tasks = [
  { time: "09:00 — 10:00 AM", title: "Interview with product designer candidates", color: "border-pink-500" },
  { time: "11:00 — 12:00 PM", title: "Project sync with Design Team", color: "border-green-500" },
  { time: "01:00 — 02:00 PM", title: "Prepare new hiring plan", color: "border-yellow-500" },
  { time: "03:00 — 04:00 PM", title: "One-on-one with interns", color: "border-blue-500" },
  { time: "05:00 — 06:00 PM", title: "UX feedback review", color: "border-purple-500" },
];

const teams = [
  { name: "Design Team", count: 24 },
  { name: "Development Team", count: 16 },
  { name: "Finance Team", count: 10 },
  { name: "Sales Team", count: 27 },
];

const pillColors = [
  "bg-pink-100 text-pink-600",
  "bg-yellow-100 text-yellow-600",
  "bg-blue-100 text-blue-600",
  "bg-green-100 text-green-600",
  "bg-purple-100 text-purple-600",
  "bg-teal-100 text-teal-600",
];

const MyActions = () => {
  const btnBase = "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200";
  const btnPrimary = `${btnBase} bg-indigo-500 text-white hover:bg-indigo-600`;
  const btnSecondary = `${btnBase} border border-gray-300 bg-white hover:bg-gray-100`;
  const btnSuccess = `${btnBase} bg-green-500 text-white hover:bg-green-600`;

  return (
    <div className="p-6 bg-gradient-to-b from-gray-50 to-white min-h-screen w-full font-inter text-gray-800">
      {/* ================= Top Bar ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 bg-white p-4 rounded-2xl shadow-sm">
        {/* Left - Heading */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500">Today is Monday, 8th November 2025</p>
        </div>

        {/* Right - Search and Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex items-center w-full sm:w-auto">
            <Search className="absolute left-3 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-56"
            />
          </div>
          <button className={`${btnSecondary} flex items-center justify-between`}>
            Feb 18 — Nov 18 <ChevronDown className="ml-2 w-4 h-4" />
          </button>
          <button className={`${btnSecondary} flex items-center justify-between`}>
            Monthly <ChevronDown className="ml-2 w-4 h-4" />
          </button>
          <button className={`${btnPrimary} flex items-center gap-2`}>
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className={`${btnSuccess} flex items-center gap-2`}>
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* ================= Content Grid ================= */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* LEFT COLUMN */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Hiring Section */}
          <div className="bg-white rounded-2xl shadow-md p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Hiring</h2>
              <div className="flex items-center gap-3">
                <button className={btnSecondary}>
                  Design <ChevronDown className="ml-2 w-4 h-4" />
                </button>
                <button className="text-indigo-600 text-sm font-medium hover:underline">View All</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="grid grid-cols-6 text-sm font-medium text-gray-500 border-b pb-2 mb-2">
                <div>Role Name</div>
                <div>New Applied</div>
                <div>Screening</div>
                <div>Interview</div>
                <div>Test</div>
                <div>Hired</div>
              </div>
              {roles.map((role, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-6 items-center text-sm text-gray-700 py-2 px-2 rounded-lg ${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-indigo-50 transition`}
                >
                  <div>{role.name}</div>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs ${pillColors[0]}`}>
                      {role.new} Candidates
                    </span>
                  </div>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs ${pillColors[1]}`}>
                      {role.screening} Candidates
                    </span>
                  </div>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs ${pillColors[2]}`}>
                      {role.interview} Candidates
                    </span>
                  </div>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs ${pillColors[3]}`}>
                      {role.test}
                    </span>
                  </div>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs ${pillColors[4]}`}>
                      {role.hired}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Task Section */}
          <div className="bg-white rounded-2xl shadow-md p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">My Task</h2>
              <div className="flex items-center gap-3">
                <button className={btnSecondary}>
                  Today <ChevronDown className="ml-2 w-4 h-4" />
                </button>
                <button className={btnSecondary}>
                  Feb 18 — Nov 18 <ChevronDown className="ml-2 w-4 h-4" />
                </button>
                <button className={btnPrimary}>Add Task</button>
              </div>
            </div>
            <div className="flex flex-col divide-y divide-gray-200">
              {tasks.map((task, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col pl-3 py-3 border-l-4 ${task.color}`}
                >
                  <p className="text-xs text-gray-500">{task.time}</p>
                  <p className="text-sm font-medium text-gray-800">{task.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Jobs Summary Section */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center card-hover">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Jobs Summary</h2>
            <div className="w-40 h-40 bg-gray-100 rounded-full mb-4 flex items-center justify-center">
              <span className="text-gray-400 text-sm">Chart</span>
            </div>
            <p className="text-xl font-bold text-gray-800 mb-4">133 Total Jobs</p>
            <div className="space-y-2 w-full">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                <span className="text-sm text-gray-600">80 Published</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="text-sm text-gray-600">20 On Hold</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-sm text-gray-600">18 Internal</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-pink-500"></span>
                <span className="text-sm text-gray-600">15 Closed</span>
              </div>
            </div>
          </div>

          {/* Employee Section */}
          <div className="bg-white rounded-2xl shadow-md p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Employee</h2>
              <button className="text-indigo-600 text-sm font-medium hover:underline">
                View All
              </button>
            </div>
            <div className="flex flex-col divide-y divide-gray-200">
              {teams.map((team, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-2 transition"
                >
                  <div className="text-gray-800 font-medium text-sm">{team.name}</div>
                  <div className="flex -space-x-2">
                    <img
                      className="w-8 h-8 rounded-full border-2 border-white"
                      src={`https://i.pravatar.cc/150?img=${idx * 3 + 1}`}
                      alt="avatar"
                    />
                    <img
                      className="w-8 h-8 rounded-full border-2 border-white"
                      src={`https://i.pravatar.cc/150?img=${idx * 3 + 2}`}
                      alt="avatar"
                    />
                    <img
                      className="w-8 h-8 rounded-full border-2 border-white"
                      src={`https://i.pravatar.cc/150?img=${idx * 3 + 3}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="text-gray-500 text-sm font-medium">+{team.count}</div>
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
