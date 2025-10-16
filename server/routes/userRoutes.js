const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// CRUD routes
router.get('/', userController.getUsers);        // GET all users
router.post('/', userController.addUser);        // POST add user
router.put('/:id', userController.updateUser);   // PUT update user
router.delete('/:id', userController.deleteUser); // DELETE user

module.exports = router;
