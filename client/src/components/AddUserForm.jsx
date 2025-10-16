import React, { useState } from "react";
// We are temporarily commenting out the CSS import that caused the compile error.
// import "../assets/style.css"; 

// The component now handles API submission instead of local state
const AddUserForm = ({ onClose, onUserAdded }) => { // Added onUserAdded prop
    // We now track the new user details AND the admin's password for verification
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        // New field to collect the password for admin verification
        // NOTE: If you are not using this field on the backend yet, 
        // it's okay to keep it for future implementation.
        adminPassword: "", 
        // We need a password for the *new* user, as your database schema requires it
        // I'm adding a dummy field here that should be replaced with a proper
        // 'password' input in a final version, but we are keeping your existing logic:
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
        
        // ✅ FIX CONFIRMED: Corrected API endpoint. It should be http://localhost:5000/api 
        // as per the current backend routing (app.js uses /api and userRoutes.js uses /)
        const apiEndpoint = "http://localhost:5000/api/users"; 

        // We must include the password field for the new user, as the backend expects it 
        // (even if temporarily hardcoded based on your controller's logic)
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
