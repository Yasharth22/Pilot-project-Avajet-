const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Updated role enum to include 'Manager' to match the front-end form
  role: { 
    type: String, 
    enum: ['Admin', 'Manager', 'Staff', 'Guest'], 
    default: 'Staff' 
  },
  // Added status field to track Active/Inactive state as seen in the table
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  }
});

module.exports = mongoose.model('User', userSchema, 'users');
