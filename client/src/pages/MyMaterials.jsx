import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 


const MOCK_MATERIALS = [
  { id: 1, partNumber: 'PN-C102', description: 'Wing Flap Actuator', quantity: 18, unit: 'Units', location: 'Hangar 1, Aisle 3', status: 'Serviceable', shelfLife: 'N/A', reorderAlert: 'CRITICAL', minStock: 20 },
  { id: 2, partNumber: 'PN-SEAL-GLUE', description: 'Fuselage Sealant', quantity: 30, unit: 'Tubes', location: 'Store Room', status: 'Serviceable', shelfLife: '2024-12-31', reorderAlert: 'LOW', minStock: 25 },
  { id: 3, partNumber: 'MIN-TIRE-MAIN-SM', description: 'Main Tire Assy Small', quantity: 15, unit: 'Tubs', location: 'Hangar 2, Shelf D', status: 'Serviceable', shelfLife: 'N/A', reorderAlert: 'OK', minStock: 10 },
  { id: 4, partNumber: 'PN-FIRE-ASSY', description: 'Fire Extinguisher Assy', quantity: 5, unit: 'Units', location: 'OH Bay', status: 'Unserviceable', shelfLife: 'REPAIR', reorderAlert: 'REPAIR', minStock: 5 },
  { id: 5, partNumber: 'Broken Assy RH', description: 'Broken Assembly RH', quantity: 2, unit: 'OH', location: 'Quarantine', status: 'Unserviceable', shelfLife: 'N/A', reorderAlert: 'REPAIR', minStock: 5 },
];

const MyMaterials = () => {
  const [materials, setMaterials] = useState(MOCK_MATERIALS);
  const [searchTerm, setSearchTerm] = useState('');
  // State for filters (Status, Shelf Life, Location, etc. will be added here)

  // Filter materials based on search term (Part Number or Description)
  const filteredMaterials = materials.filter(material =>
    material.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate Alerts
  const lowStockItems = materials.filter(m => m.quantity < m.minStock);
  const criticalStockCount = materials.filter(m => m.reorderAlert === 'CRITICAL').length;
  // Note: Shelf life expiration logic would be more complex (e.g., checking against today's date)

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Materials</h1>
      </div>

      <div className="materials-content">
        
        {/* Alerts Sidebar/Panel */}
        <div className="materials-alerts">
          <h3>Alerts</h3>
          <div className="alert-card low-stock-alert">
            <span className="alert-icon">⚠️</span>
            <p><strong>Low Stock Items</strong></p>
            <p>Critical: {criticalStockCount} (Qty needed: {lowStockItems.reduce((sum, m) => sum + (m.minStock - m.quantity), 0)})</p>
          </div>
          {/* Expiration Alert Card (simplified) */}
          <div className="alert-card expiring-alert">
            <span className="alert-icon">⏳</span>
            <p><strong>Expiring Items</strong></p>
            <p>Exp: 2023-C | Exp: 2025-03-15</p>
          </div>
        </div>

        {/* Main Table and Controls */}
        <div className="materials-main">
          
          <div className="materials-actions">
            <button className="btn btn-primary">+ Add New Material</button>
            <button className="btn btn-secondary">Stock Transfer</button>
            <button className="btn btn-tertiary">Batch Actions</button>
          </div>

          <div className="materials-filters">
            <input
              type="text"
              placeholder="Search by P/N, Description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="filter-input"
            />
            {/* Placeholder for Select Filters */}
            <select className="filter-select"><option>Status</option></select>
            <select className="filter-select"><option>Shelf Life</option></select>
            <select className="filter-select"><option>Location</option></select>
          </div>

          {/* Materials Table */}
          <div className="materials-table-container">
            <table className="materials-table">
              <thead>
                <tr>
                  <th>Part Number</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Shelf Life</th>
                  <th>Reorder Alert</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMaterials.map(material => (
                  <tr key={material.id}>
                    <td><Link to={`/materials/${material.id}`}>{material.partNumber}</Link></td>
                    <td>{material.description}</td>
                    <td>{material.quantity}</td>
                    <td>{material.location}</td>
                    <td><span className={`status-badge ${material.status.toLowerCase().replace(' ', '-')}`}>{material.status}</span></td>
                    <td>{material.shelfLife}</td>
                    <td>
                      <span className={`alert-indicator ${material.reorderAlert.toLowerCase()}`}>
                        {material.reorderAlert === 'CRITICAL' ? '🔴' : 
                         material.reorderAlert === 'LOW' ? '🟠' : 
                         material.reorderAlert === 'OK' ? '🟢' : '🟡'}
                      </span>
                    </td>
                    <td>
                      <button className="action-icon-btn" title="Issue Part">📤</button>
                      <button className="action-icon-btn" title="View Traceability">📄</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="table-footer">
            Showing 1 to {filteredMaterials.length} of {materials.length} items
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default MyMaterials;