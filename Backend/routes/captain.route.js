const express= require('express');
const authMiddleware= require('../middlewares/auth.middlewares.js')
const captainController= require('../controllers/captain.controller.js')
const { body }= require('express-validator')

const router= express.Router();

router.post('/register', [
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullName.firstName').isLength({min: 3}).withMessage("First name must be at least 3 characters"),
    body('fullName.lastName').isLength({min: 3}).withMessage("Last name must be at least 3 characters"),
    body('password').isLength({min: 6}).withMessage("Password must be at least 6 characters"),
    body('vehicle.color').isLength({min: 3}).withMessage("Vehicle color must be at least 3 characters long"),
    body('vehicle.plate').isLength({min: 10}).withMessage("Vehicle number must be at least 10 characters long"),
    body('vehicle.capacity').isInt({min: 1}).withMessage("Vehicle capactiy must be at least 1"),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage("Vehicle must be from the list")
],
    captainController.registerCaptain
)

router.post('/login', [
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min: 6}).withMessage("Password must be at least 6 characters")
],
    captainController.loginCaptain
)

router.get('/captainProfile', authMiddleware.authCaptain, captainController.getCaptainProfile);

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports= router;