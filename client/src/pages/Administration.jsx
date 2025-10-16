import React, { useState, useEffect } from "react";
import AddUserForm from "../components/AddUserForm";
import "../assets/style.css";

const Administration = () => {
  // State to hold the list of users fetched from the server
  const [users, setUsers] = useState([]);

  // State to manage the loading status and add user form visibility
  const [loading, setLoading] = useState(true);
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  // Function to fetch users from the server
  const fetchUsers = async () => {
    try {
      setLoading(true); // Start loading state

      // Simulate an API call to your backend
      // Replace with your actual server endpoint
      const response = await fetch("http://localhost:5000/api/users");
      const data = await response.json();

      // Update the component's state with the fetched data
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      // You can add an error state here to show a message to the user
    } finally {
      setLoading(false); // End loading state
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await fetch(`http://localhost:5000/api/users/${id}`, { method: "DELETE" });
      fetchUsers(); // refresh table
    }
  };

  // Edit
  const handleEdit = async (user) => {
    const newName = prompt("Edit Name:", user.name);
    const newRole = prompt("Edit Role:", user.role);
    const newStatus = prompt("Edit Status (Active/Inactive):", user.status);

    if (!newName || !newRole || !newStatus) return;

    await fetch(`http://localhost:5000/api/users/${user._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName, role: newRole, status: newStatus, email: user.email }),
    });

    fetchUsers(); // refresh after edit
  };


  // The useEffect hook runs the fetchUsers function when the component first mounts.
  // The empty dependency array `[]` ensures it only runs once.
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 mt-[4rem]">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Administration</h2>

        {/* ... (Your existing summary cards go here, you'll need to update them 
           to use the new 'users' state for counts) ... */}

        {/* User Management Table Section */}
        <div className="user-management-section mt-8">
          <div className="flex justify-between items-center mb-4">
            <h4 className="section-title text-lg font-semibold">User Accounts</h4>
            <button
              className="add-user-btn"
              onClick={() => setShowAddUserForm(true)}
            >
              + Add New User
            </button>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Search users..."
              className="search-input"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Name</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Email</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Role</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Status</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Conditional rendering for loading, empty, or populated states */}
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      Loading users...
                    </td>
                  </tr>
                ) : users.length > 0 ? (
                  // Map over the 'users' state to dynamically generate table rows
                  users.map((user) => (
                    <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">{user.role}</td>
                      <td className="py-3 px-4">
                        <span className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          className="table-btn edit-btn"
                          onClick={() => handleEdit(user)}
                        >
                          Edit
                        </button>

                        <button
                          className="table-btn delete-btn"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Conditionally render the AddUserForm */}
      {showAddUserForm && (
        <AddUserForm
          onClose={() => setShowAddUserForm(false)}
          // Pass the fetchUsers function to the child component
          // so it can tell the parent to refresh the data after a successful save.
          onUserAdded={fetchUsers}
        />
      )}
    </div>
  );
};

export default Administration;