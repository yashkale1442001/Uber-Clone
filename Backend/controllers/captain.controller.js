const captainModel= require('../models/captain.model.js')
const captainService= require('../services/captain.service.js')
const blackListTokenModel= require('../models/blackListToken.model.js')
const { validationResult }= require('express-validator')

module.exports.registerCaptain= async (req, res, next) => {
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {fullName, email, password, vehicle}= req.body;

    const isCaptainAlready= await captainModel.findOne({email});

    if(isCaptainAlready){
        return res.status(400).json({message: "Captain already exist"});
    }

    const hashedPassword= await captainModel.hashPassword(password);

    const captain= await captainService.createCaptain({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    console.log(captain);

    const token= captain.generateAuthToken();
    res.status(201).json({ token, captain })
}

module.exports.loginCaptain= async(req, res, next) => {
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password}= req.body;

    const captain= await captainModel.findOne({email}).select('+password');

    if(!captain){
        return res.status(401).json({message: "Invalid email or password"});
    }

    const isMatch= await captain.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message: "Invalid email or password"})
    }

    const token= captain.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({token, captain});
}

module.exports.getCaptainProfile= async(req, res, next)=> {
    return res.status(200).json(req.captain)
}

module.exports.logoutCaptain= async(req, res, next)=> {
    res.clearCookie('token');

    const token= req.cookies.token || req.headers.authorisation.split(' ')[1];

    await blackListTokenModel.create({token});
    return res.status(200).json({message: "Loggged out"})
}