import React from "react";
import "../assets/style.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";

// === Sample Data ===
const maintenanceData = [
  { name: "A Check", downtime: 40 },
  { name: "B Check", downtime: 55 },
  { name: "C Check", downtime: 180 },
  { name: "D Check", downtime: 150 },
];

const failureData = [
  { name: "Engine #1", rate: 95 },
  { name: "APU", rate: 85 },
  { name: "Landing Gear", rate: 40 },
  { name: "Avionics", rate: 35 },
];

const complianceData = [
  { name: "AD Completed", value: 75 },
  { name: "SB Outstanding", value: 15 },
  { name: "EO Outstanding", value: 10 },
];

const complianceColors = ["#22C55E", "#F97316", "#EF4444"];

const defectsData = [
  { reg: "N12345", desc: "Engine Oil Leak", days: 15, cat: "CAT B" },
  { reg: "N54321", desc: "Cracked window pane", days: 12, cat: "CAT C" },
  { reg: "N67890", desc: "Landing gear sensor fail", days: 8, cat: "CAT A" },
];

const airworthyData = [{ name: "Airworthy", value: 98.5 }];
const aogData = [{ name: "AOG", value: 20 }];
const defectsGaugeData = [{ name: "Defects", value: 45 }];
const checksData = [{ name: "Checks", value: 75 }];

const Analytics = () => {
  return (
    <div className="analytics-container">
      <h2 className="analytics-heading">Analytics Overview</h2>

      {/* === Row 1: Maintenance Forecast === */}
      <div className="analytics-row">
        <div className="analytics-card full-width">
          <h3 className="analytics-title">Maintenance Due Forecast</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={maintenanceData}>
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Bar dataKey="downtime" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* === Row 2: Failure Rate + Compliance + Defects === */}
      <div className="analytics-row three-cols">
        {/* Wider Failure Rate */}
        <div className="analytics-card wide">
          <h3 className="analytics-title">Top Components by Failure Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={failureData} layout="vertical">
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={100} />
              <Tooltip />
              <Bar
                dataKey="rate"
                fill="#EF4444"
                radius={[0, 4, 4, 0]}
                barSize={22}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Compliance */}
        <div className="analytics-card">
          <h3 className="analytics-title">Mandatory Compliance Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={complianceData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={5}
              >
                {complianceData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={complianceColors[index % complianceColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Defects Table */}
        <div className="analytics-card">
          <h3 className="analytics-title">Top Open Deferred Defects</h3>
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Aircraft Reg</th>
                <th>Description</th>
                <th>Days Open</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {defectsData.map((d, i) => (
                <tr key={i}>
                  <td>{d.reg}</td>
                  <td>{d.desc}</td>
                  <td>{d.days}</td>
                  <td>{d.cat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* === Row 3: KPI Mini Cards === */}
      <div className="analytics-row four-cols">
        <div className="analytics-mini-card">
          <h4>Fleet Airworthy %</h4>
          <ResponsiveContainer width="100%" height={120}>
            <RadialBarChart
              cx="50%"
              cy="70%"
              innerRadius="80%"
              outerRadius="100%"
              barSize={15}
              data={airworthyData}
              startAngle={180}
              endAngle={0}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar background clockWise dataKey="value" fill="#22C55E" />
            </RadialBarChart>
          </ResponsiveContainer>
          <p className="analytics-kpi">98.5%</p>
        </div>

        <div className="analytics-mini-card">
          <h4>Aircraft On Ground (AOG)</h4>
          <ResponsiveContainer width="100%" height={120}>
            <RadialBarChart
              cx="50%"
              cy="70%"
              innerRadius="80%"
              outerRadius="100%"
              barSize={15}
              data={aogData}
              startAngle={180}
              endAngle={0}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar background clockWise dataKey="value" fill="#EF4444" />
            </RadialBarChart>
          </ResponsiveContainer>
          <p className="analytics-kpi text-red-600">2+</p>
        </div>

        <div className="analytics-mini-card">
          <h4>Open Deferred Defects</h4>
          <ResponsiveContainer width="100%" height={120}>
            <RadialBarChart
              cx="50%"
              cy="70%"
              innerRadius="80%"
              outerRadius="100%"
              barSize={15}
              data={defectsGaugeData}
              startAngle={180}
              endAngle={0}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar background clockWise dataKey="value" fill="#F97316" />
            </RadialBarChart>
          </ResponsiveContainer>
          <p className="analytics-kpi text-orange-500">45+</p>
        </div>

        <div className="analytics-mini-card">
          <h4>Major Check Deadline</h4>
          <ResponsiveContainer width="100%" height={120}>
            <RadialBarChart
              cx="50%"
              cy="70%"
              innerRadius="80%"
              outerRadius="100%"
              barSize={15}
              data={checksData}
              startAngle={180}
              endAngle={0}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar background clockWise dataKey="value" fill="#3B82F6" />
            </RadialBarChart>
          </ResponsiveContainer>
          <p className="analytics-kpi text-blue-600">3</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
