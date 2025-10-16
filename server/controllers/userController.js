const User = require('../models/User');
const bcrypt = require('bcrypt');

// GET all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// ADD new user
exports.addUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash('tempPassword123!', 10);

    const newUser = new User({
      name, email, password: hashedPassword, role, status: 'Active'
    });

    await newUser.save();
    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({ message: 'User added successfully', user: userResponse });
  } catch (error) {
    res.status(500).json({ message: 'Error adding user', error: error.message });
  }
};

// UPDATE user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, status } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, role, status },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

// DELETE user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};
