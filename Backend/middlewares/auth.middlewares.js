const userModel= require('../models/user.model.js')
const blackListTokenModel= require('../models/blackListToken.model.js')
const captainModel= require('../models/captain.model.js')
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')

module.exports.authUser= async (req, res, next) => {
    const token= req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        res.status(401).json({message: "Unauthorized"})
    }

    const isBlackListted= await blackListTokenModel.findOne({token: token});

    if(isBlackListted){
        return res.status(401).json({message: "Unauthorized"})
    }

    try{
        const decoded= jwt.verify(token, process.env.JWT_SECRET)
        const user= await userModel.findById(decoded._id)

        req.user= user;

        return next();
    }catch(err){
        return res.status(401).json({message: "unauthorized"})
    }
}

module.exports.authCaptain= async (req, res, next) => {
    const token= req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({message: "Unauthorized"})
    }

    const isBlackListted= await blackListTokenModel.findOne({token: token});

    if(isBlackListted){
        return res.status(401).json({message: "Unauthorized"});
    }

    try{
        const decoded= jwt.verify(token, process.env.JWT_SECRET);
        const captain= await captainModel.findById(decoded._id);

        req.captain= captain;

        return next();
    }
    catch{
        return res.status(401).json({message: "Unauthorized"})
    }
}