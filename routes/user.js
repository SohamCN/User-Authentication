const express = require('express')
const router = express.Router()

const authMiddleware = require('../middlewares/auth-middleware')
const AuthController = require('../controllers/authController')

router.post('/register', authMiddleware.validatePassword, AuthController.register);

router.post('/login', AuthController.login);

router.put('/edit-user/:id', authMiddleware.verifyToken, AuthController.editUser);

router.delete('/delete-user/:id', AuthController.deleteUser);

router.delete('/delete-all-users', AuthController.deleteAllUsers);

module.exports =router