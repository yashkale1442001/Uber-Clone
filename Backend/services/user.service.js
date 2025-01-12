const userModel= require('../models/user.model.js')

module.exports.createUser= async ({
    firstName, lastName, email, password
})=> {
    if(!firstName || !lastName || !email || !password){
        throw new Error("All fields are required");
    }
    const user= userModel.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password
    })

    return user;
}