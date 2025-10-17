import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/style.css"; 
import { FiTrendingUp, FiAlertCircle, FiArrowDownCircle, FiPlus } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';


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
        <div className="defaultdashboard-container" style={{ padding: '2rem' }}>
            <h2 className="defaultdashboard-heading" style={{ textAlign: 'left', fontSize: '2rem', marginBottom: '2rem' }}>Financial Overview</h2>

            {/* Top Row: Key Metric Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                {financialStats.map((stat, index) => (
                    <div key={index} className="defaultdashboard-card" style={{ textAlign: 'left', padding: '1.5rem' }}>
                        <div className="defaultdashboard-icon" style={{ marginBottom: '1rem' }}>{stat.icon}</div>
                        <p className="defaultdashboard-title" style={{ fontSize: '1rem', color: '#6b7280' }}>{stat.title}</p>
                        <p className="defaultdashboard-count" style={{ fontSize: '2rem', color: '#111827' }}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Main Section: Three-Column Layout */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '2rem', alignItems: 'flex-start' }}>

                {/* Left Column: Recent Transactions */}
                <div className="defaultdashboard-card" style={{ textAlign: 'left', padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>Recent Transactions</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <th style={{ padding: '0.75rem 0', textAlign: 'left', color: '#6b7280', fontSize: '0.75rem', textTransform: 'uppercase' }}>Invoice ID</th>
                                <th style={{ padding: '0.75rem 0', textAlign: 'left', color: '#6b7280', fontSize: '0.75rem', textTransform: 'uppercase' }}>Client</th>
                                <th style={{ padding: '0.75rem 0', textAlign: 'left', color: '#6b7280', fontSize: '0.75rem', textTransform: 'uppercase' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(tx => (
                                <tr key={tx.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '1rem 0', fontWeight: '500' }}>{tx.id}</td>
                                    <td style={{ padding: '1rem 0' }}>{tx.client}</td>
                                    <td style={{ padding: '1rem 0' }}>
                                        <span style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '9999px',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            backgroundColor: tx.status === 'Paid' ? '#d1fae5' : tx.status === 'Pending' ? '#feefc3' : '#fee2e2',
                                            color: tx.status === 'Paid' ? '#065f46' : tx.status === 'Pending' ? '#92400e' : '#991b1b',
                                        }}>
                                            {tx.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Middle Column: Chart */}
                <div className="defaultdashboard-card" style={{ padding: '1.5rem', height: '300px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>Income vs. Expense</h3>
                    <ResponsiveContainer width="100%" height="90%">
                        <BarChart data={incomeExpenseData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                            <XAxis dataKey="month" fontSize={12} />
                            <YAxis fontSize={12} />
                            <Tooltip />
                            <Bar dataKey="income" fill="#22C55E" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="expense" fill="#EF4444" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Right Column: Actions */}
                <div className="defaultdashboard-card" style={{ padding: '1.5rem' }}>
                     <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>Actions</h3>
                     <button style={{ width: '100%', padding: '0.75rem', background: '#3B82F6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <FiPlus /> Create New Invoice
                     </button>
                     <button style={{ width: '100%', padding: '0.75rem', background: '#e5e7eb', color: '#1f2937', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <FiPlus /> Log an Expense
                     </button>
                </div>
            </div>
        </div>
    );
};

export default MyFinancials;