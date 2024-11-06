const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas
router.get('/', userController.getUsers);
router.post('/add', userController.createUser);
router.delete('/delete/:id', userController.deleteUser);
router.put('/edit/:id', userController.updateUser);

module.exports = router;