import React from 'react';
import { Edit } from 'lucide-react';
// You might need to import the CSS file here if your module bundler requires it, 
// e.g., import './aircraft-config.css'; or assuming it's imported globally.

const ConfigurationCard = ({ title, icon, children, onEdit, noBorder = false }) => {
  return (
    // Apply config-card class, and conditional no-border class
    <div className={`config-card ${noBorder ? 'no-border' : ''}`}>
      {/* Card Header */}
      <div className="config-card-header">
        <div className="config-card-title">
          {/* Apply color to icon if needed (adjust icon color in CSS or here) */}
          {React.cloneElement(icon, { className: 'w-5 h-5 text-red-600' })}
          <h2>{title}</h2>
        </div>
        {onEdit && (
          // Apply config-edit-button class
          <button 
            onClick={onEdit}
            className="config-edit-button"
            title={`Edit ${title}`}
          >
            <Edit className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {/* Card Content */}
      <div className="config-card-content">
        {children}
      </div>
    </div>
  );
};

export default ConfigurationCard;