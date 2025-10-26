import React from 'react';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, aircraftTail }) => {
    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm(); // Execute the deletion logic passed from MyAircraft
        onClose();   // Close the modal
    };

    return (
        <div className="modal-overlay"> 
            {/* Use standard modal classes for thematic styling */}
            <div className="modal-content-box modal-small"> 
                <div className="modal-header">
                    <h2 className="modal-title">Confirm Deletion</h2>
                </div>
                
                <div className="modal-body" style={{ padding: '20px', textAlign: 'center' }}>
                    <p>Are you sure you want to permanently delete aircraft **{aircraftTail}**?</p>
                    <p style={{ color: '#D6302B', fontWeight: 'bold' }}>This action cannot be undone.</p>
                </div>
                
                <div className="modal-footer" style={{ justifyContent: 'center' }}>
                    {/* Secondary button for Cancel */}
                    <button type="button" onClick={onClose} className="btn btn-secondary">
                        Cancel
                    </button>
                    {/* Primary button for Confirm (Themed red color) */}
                    <button type="button" onClick={handleConfirm} className="btn btn-primary theme-accent-bg">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;