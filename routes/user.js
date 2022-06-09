const express = require('express')
const router = express.Router()

const authMiddleware = require('../middlewares/auth-middleware')
const AuthController = require('../controllers/authController')
const postgreController = require('../controllers/postgresController')

router.post('/register', authMiddleware.validatePassword, AuthController.register);

router.post('/add-user', postgreController.register);

router.post('/create-login', postgreController.login);

router.get('/get-users', postgreController.getAllUsers)

router.post('/login', AuthController.login);

router.put('/edit-user/:id', authMiddleware.verifyToken, AuthController.editUser);

router.put('/user-edit/:id', authMiddleware.verifyToken, postgreController.editUser);

router.delete('/delete-user/:id', AuthController.deleteUser);

router.delete('/user-delete/:id', postgreController.deleteUser);

router.delete('/delete-all-users', AuthController.deleteAllUsers);

module.exports =router