import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/style.css";
import { FiTrendingUp, FiAlertCircle, FiArrowDownCircle, FiPlus } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const financialStats = [
  { title: "Total Revenue (YTD)", value: "$250,650", icon: <FiTrendingUp size={24} className="text-green-500" /> },
  { title: "Outstanding Invoices", value: "$18,200", icon: <FiAlertCircle size={24} className="text-orange-500" /> },
  { title: "Monthly Expenses", value: "$45,300", icon: <FiArrowDownCircle size={24} className="text-red-500" /> },
];

const transactions = [
  { id: "INV-007", client: "SkyLink Airways", date: "2025-10-15", amount: "$5,500", status: "Paid" },
  { id: "EXP-012", client: "Parts Supplier Inc.", date: "2025-10-14", amount: "-$1,200", status: "Expense" },
  { id: "INV-006", client: "AeroLease Group", date: "2025-10-10", amount: "$12,000", status: "Pending" },
  { id: "INV-005", client: "SkyLink Airways", date: "2025-09-28", amount: "$4,800", status: "Paid" },
  { id: "INV-008", client: "JetStream Cargo", date: "2025-10-18", amount: "$7,200", status: "Pending" },
];

const incomeExpenseData = [
  { month: "Aug", income: 45000, expense: 32000 },
  { month: "Sep", income: 52000, expense: 38000 },
  { month: "Oct", income: 38000, expense: 29000 },
];

const MyFinancials = () => {
  const navigate = useNavigate();

  return (
    <div className="financials-container">
      <h2 className="financials-heading">Financial Overview</h2>

      {/* Top Cards */}
      <div className="financials-grid">
        {financialStats.map((stat, index) => (
          <div key={index} className="financial-card">
            <div className="financial-icon">{stat.icon}</div>
            <p className="financial-title">{stat.title}</p>
            <p className="financial-value">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Section */}
      <div className="financials-main">
        {/* Left Column - Transactions */}
        <div className="financial-card">
          <h3 className="financial-subtitle">Recent Transactions</h3>
          <table className="financial-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Client</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{tx.id}</td>
                  <td>{tx.client}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        tx.status === "Paid"
                          ? "paid"
                          : tx.status === "Pending"
                          ? "pending"
                          : "expense"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Middle Column - Chart */}
        <div className="financial-card chart-card">
          <h3 className="financial-subtitle">Income vs Expense</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={incomeExpenseData}>
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="income" fill="#22C55E" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Right Column - Actions */}
        <div className="financial-card">
          <h3 className="financial-subtitle">Actions</h3>
          <button className="financial-btn primary">
            <FiPlus /> Create New Invoice
          </button>
          <button className="financial-btn secondary">
            <FiPlus /> Log an Expense
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyFinancials;
