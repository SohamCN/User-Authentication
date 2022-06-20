const express = require('express')
const router = express.Router()

const authMiddleware = require('../middlewares/auth-middleware')
const AuthController = require('../controllers/authController')
const postgreController = require('../controllers/postgresController')

router.post('/register', authMiddleware.validatePassword, AuthController.register);

/**
 * @swagger
 * /user/add-user:
 *    post:
 *        description: Create an User
 *        responses:
 *             201:
 *               description: Created
 *    parameters:
 *      - in: body
 *        name: user
 *        description: The user to create.
 *        schema:
 *          type: object
 *          required:
 *            - username
 *            - password
 *            - email
 *            - phone
 *          properties:
 *            username:
 *              type: string
 *            password:
 *              type: string
 *            email:
 *              type: string
 *            phone:
 *              type: string
 *        
 */
router.post('/add-user', authMiddleware.validatePassword, postgreController.register);
/**
 * @swagger
 * /user/create-login:
 *    post:
 *        description: Create an User Login Session Token
 *        responses:
 *             201:
 *               description: Created
 *    parameters:
 *      - in: body
 *        name: user
 *        description: The user to create.
 *        schema:
 *          type: object
 *          required:
 *            - username
 *            - password
 *          properties:
 *            username:
 *              type: string
 *            password:
 *              type: string
 */
router.post('/create-login', postgreController.login);
/**
 * @swagger
 * /user/get-users:
 *   get:
 *      description: Get all Users
 *      responses: 
 *          200:
 *            description: Success
 */
router.get('/get-users', postgreController.getAllUsers)

router.post('/login', AuthController.login);

router.put('/edit-user/:id', authMiddleware.verifyToken, AuthController.editUser);

/**
 * @swagger
 *   /user/user-edit/{id}:
 *   put:
 *      description: Update an User
 *      responses:
 *             201:
 *               description: Updated
 *   parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: The numercic id of user to update.
 *        schema:
 *          type: integer
 *      - in: header
 *        name: authorization
 *        required: true
 *        description: The token to validate user.
 *        schema:
 *         type: string
 *      - in: body  
 *        name: user
 *        description: The user updated
 *        schema:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *            password:
 *              type: string
 *            email:
 *              type: string
 *            phone:
 *              type: string
 */
router.put('/user-edit/:id', authMiddleware.verifyToken, authMiddleware.validatePassword, postgreController.editUser);

router.delete('/delete-user/:id', AuthController.deleteUser);

/**
 * @swagger
 *   /user/user-delete/{id}:
 *   delete:
 *      description: Delete an user by id
 *      responses: 
 *          200:
 *            description: Deleted
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: Numeric ID of the user to delete
 *      schema:
 *          type: integer
 */
router.delete('/user-delete/:id', postgreController.deleteUser);

router.delete('/delete-all-users', AuthController.deleteAllUsers);

module.exports =router