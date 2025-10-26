import React, { useState } from 'react';

const AddAircraftModal = ({ isOpen, onClose, onAddAircraft }) => {
    // Initial state matching the table headers
    const [formData, setFormData] = useState({
        tail: '',
        msn: '',
        model: '',
        maintenance: '', // Maintenance Program / Revision
        base: '',
        flightHours: '',
        flightCycles: '',
        apuHours: '',
        apuCycles: '',
        status: 'Serviceable', // Default status
        serviceability: 'Serviceable', // Default serviceability
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation for required fields
        if (!formData.tail || !formData.msn || !formData.model) {
            alert("Tail Number, MSN, and Model are required.");
            return;
        }

        // Call the prop function to save and update state
        onAddAircraft(formData);
        
        // Reset form and close modal
        setFormData({
            tail: '', msn: '', model: '', maintenance: '', base: '',
            flightHours: '', flightCycles: '', apuHours: '', apuCycles: '',
            status: 'Serviceable', serviceability: 'Serviceable',
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay"> 
            {/* 🎯 Using modal-large class for defined width/max-height in CSS */}
            <div className="modal-content-box modal-large"> 
                <div className="modal-header">
                    <h2 className="modal-title">Add New Aircraft</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    
                    {/* 🎯 CRITICAL: Use modal-body for the scrollable container */}
                    <div className="modal-body">
                        
                        {/* 🎯 CRITICAL: Use the three-column grid for compactness */}
                        <div className="module-grid-3"> 
                            
                            {/* Row 1 */}
                            <div className="form-group"><label className="form-label required">Tail Number *</label><input type="text" name="tail" value={formData.tail} onChange={handleChange} className="form-control" required/></div>
                            <div className="form-group"><label className="form-label required">MSN Number *</label><input type="text" name="msn" value={formData.msn} onChange={handleChange} className="form-control" required/></div>
                            <div className="form-group"><label className="form-label required">Model *</label><input type="text" name="model" value={formData.model} onChange={handleChange} className="form-control" required/></div>
                            
                            {/* Row 2 */}
                            <div className="form-group"><label className="form-label">Maintenance Program / Revision</label><input type="text" name="maintenance" value={formData.maintenance} onChange={handleChange} className="form-control"/></div>
                            <div className="form-group"><label className="form-label">Base</label><input type="text" name="base" value={formData.base} onChange={handleChange} className="form-control"/></div>
                            <div className="form-group"><label className="form-label">Flight Hours</label><input type="text" name="flightHours" value={formData.flightHours} onChange={handleChange} className="form-control"/></div>
                            
                            {/* Row 3 */}
                            <div className="form-group"><label className="form-label">Flight Cycles</label><input type="text" name="flightCycles" value={formData.flightCycles} onChange={handleChange} className="form-control"/></div>
                            <div className="form-group"><label className="form-label">APU Hours</label><input type="text" name="apuHours" value={formData.apuHours} onChange={handleChange} className="form-control"/></div>
                            <div className="form-group"><label className="form-label">APU Cycles</label><input type="text" name="apuCycles" value={formData.apuCycles} onChange={handleChange} className="form-control"/></div>
                            
                            {/* Row 4 (Status & Serviceability) */}
                            <div className="form-group">
                                <label className="form-label">Status</label>
                                <select name="status" value={formData.status} onChange={handleChange} className="form-control">
                                    <option value="Serviceable">Serviceable</option>
                                    <option value="Unserviceable">Unserviceable</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">System Serviceability</label>
                                <select name="serviceability" value={formData.serviceability} onChange={handleChange} className="form-control">
                                    <option value="Serviceable">Serviceable</option>
                                    <option value="Unserviceable">Unserviceable</option>
                                </select>
                            </div>
                            {/* Empty div to fill the third column and maintain alignment */}
                            <div></div> 
                        </div>
                    </div>
                    
                    <div className="modal-footer">
                        <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
                        <button type="submit" className="btn btn-primary theme-accent-bg">Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAircraftModal;