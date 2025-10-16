import React from "react";

// The main card component. Padding has been removed from here.
export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg ${className}`}>
      {children}
    </div>
  );
}

// Padding is now applied here.
export function CardHeader({ children }) {
  return <div className="px-6 pt-6 pb-2">{children}</div>;
}

export function CardTitle({ children }) {
  return <h2 className="text-xl font-semibold text-gray-800">{children}</h2>;
}

// Padding is also applied here.
export function CardContent({ children, className = "" }) {
  return <div className={`px-6 pb-6 ${className}`}>{children}</div>;
}   