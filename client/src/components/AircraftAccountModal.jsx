import React from 'react';

// This is a simplified component focused purely on the visual structure.
// Props are included to maintain the component signature.
const AircraftAccountModal = ({ aircraftTailNumber = 'AC-PLZ', isOpen, onClose }) => {
    
    // Hardcoded options for the visual mockup
    const accountOptions = [
        { id: 1, name: 'Bank Account ANNA' },
        { id: 2, name: 'Purchase Ledger Control Account' },
        { id: 3, name: 'Account Receivable Control Account' },
        { id: 4, name: 'Software IPO Valuation' },
    ];

    if (!isOpen) return null;

    return (
        // The overlay element to dim the background
        <div className="modal-overlay"> 
            
            {/* The main content box of the modal */}
            <div className="modal-content-box">
                
                {/* Header matching the clean, white background theme */}
                <div className="modal-header">
                    <h2 className="modal-title">Aircraft Account Add</h2>
                </div>
                
                {/* Form Body */}
                <div className="modal-body">
                    
                    {/* Aircraft (Read-only field) */}
                    <div className="form-group">
                        <label className="form-label">Aircraft</label>
                        <input 
                            type="text" 
                            value={aircraftTailNumber} 
                            readOnly 
                            className="form-control read-only-input"
                        />
                    </div>
                    
                    {/* MIP Account Dropdown */}
                    <div className="form-group">
                        <label htmlFor="mipAccount" className="form-label required">MIP Account *</label>
                        <select 
                            id="mipAccount" 
                            name="mipAccountId" 
                            className="form-control"
                            // Value is empty for non-functional UI
                        >
                            <option value="">Select MIP Account</option>
                            {accountOptions.map(option => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Maintenance Account Dropdown */}
                    <div className="form-group">
                        <label htmlFor="maintenanceAccount" className="form-label required">Maintenance Account *</label>
                        <select 
                            id="maintenanceAccount" 
                            name="maintenanceAccountId" 
                            className="form-control"
                            // Value is empty for non-functional UI
                        >
                            <option value="">Select Maintenance Account</option>
                            {accountOptions.map(option => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>
                
                {/* Footer with Action Buttons */}
                <div className="modal-footer">
                    {/* The Cancel button */}
                    <button type="button" onClick={onClose} className="btn btn-secondary">
                        Cancel
                    </button>
                    {/* The Primary Add button using the theme's accent color (dark orange/red) */}
                    <button type="button" className="btn btn-primary theme-accent-bg">
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AircraftAccountModal;