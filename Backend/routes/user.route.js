const express= require('express')
const authMiddleware= require('../middlewares/auth.middlewares.js')
const userController= require("../controllers/user.controller.js")
const { body }= require('express-validator')

const router= express.Router();

router.post('/register', [
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullName.firstName').isLength({min: 3}).withMessage("First name must be at least 3 characters"),
    body('fullName.lastName').isLength({min: 3}).withMessage("Last name must be at least 3 characters"),
    body('password').isLength({min: 6}).withMessage("Password must be at least 6 characters")
],
    userController.registerUser
)

router.post('/login', [
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min: 6}).withMessage("Password must be at least 6 characters")
],
    userController.loginUser
)

router.get('/userProfile',  authMiddleware.authUser, userController.getUserProfile)

router.get('/logoutUser', authMiddleware.authUser, userController.logoutUser)


module.exports= router;