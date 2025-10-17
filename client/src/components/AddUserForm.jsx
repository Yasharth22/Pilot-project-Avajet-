import React, { useState } from "react";

// The component now handles API submission instead of local state
const AddUserForm = ({ onClose, onUserAdded }) => { 
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",

        adminPassword: "", 

        password: "tempPassword123!", 
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsSubmitting(true);
        
        const apiEndpoint = "http://localhost:5000/api/users"; 

        const postData = {
            name: formData.name,
            email: formData.email,
            role: formData.role,
            adminPassword: formData.adminPassword,
            // Assuming your backend expects a 'password' field from your controller logic
            password: "tempPassword123!", 
        };


        try {
            const response = await fetch(apiEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // IMPORTANT: If your routes are protected by JWT, you must include the token here:
                    // 'Authorization': `Bearer ${yourAuthToken}` 
                },
                body: JSON.stringify(postData),
            });

            const data = await response.json();

            if (response.ok) {
                // Successful response (201 Created)
                setMessage('Success: ' + data.message);
                console.log("New user added:", data.user);
                
                // Call the parent function to refresh the user list
                if (onUserAdded) {
                    onUserAdded();
                }

                // Delay closing the form so the user can see the success message
                setTimeout(onClose, 1500); 
            } else {
                // Handle custom errors from the controller (e.g., password mismatch, email exists)
                setMessage('Error: ' + (data.message || 'Unknown API error.'));
                console.error("API Error:", data);
            }
        } catch (error) {
            // Handle network errors
            setMessage('Error: Cannot connect to server. Check terminal for CORS/Server errors.');
            console.error("Network error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <div className="modal-title-wrapper">
                        <h3 className="text-xl font-semibold">Add New User</h3>
                    </div>
                    <button className="close-btn" onClick={onClose} disabled={isSubmitting}>
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    
                    {/* User Details Fields */}
                    <div className="form-group">
                        <label htmlFor="name">New User Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">New User Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">New User Role</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="form-input"
                            required
                        >
                            <option value="">Select a role</option>
                            <option value="Admin">Admin</option>
                            <option value="Manager">Manager</option>
                            <option value="Staff">Staff</option>
                            <option value="Guest">Guest</option>
                        </select>
                    </div>
                    
                    {/* Admin Verification Field */}
                    <div className="form-group mt-6 pt-4 border-t border-gray-200">
                        <label htmlFor="adminPassword">
                            Admin Password (Verify Action)
                        </label>
                        <input
                            type="password"
                            id="adminPassword"
                            name="adminPassword"
                            value={formData.adminPassword}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Enter your password to confirm"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    {/* Submission Status Message */}
                    {message && (
                        <p className={`text-sm mt-4 p-2 rounded-lg ${message.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                            {message}
                        </p>
                    )}

                    <div className="form-actions">
                        <button 
                            type="submit" 
                            className="save-btn" 
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Adding...' : 'Add User'}
                        </button>
                        <button 
                            type="button" 
                            className="cancel-btn" 
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserForm;
