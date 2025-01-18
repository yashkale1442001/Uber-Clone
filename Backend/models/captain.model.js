const mongoose= require('mongoose')
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken')

const captainSchema= new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, "First name must be at least 3 characters"]
        },
        lastName: {
            type: String,
            required: true,
            minlength: [3, "Last name must be at least 3 characters"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minlength: [5, "Email must be at least 5 characters"],
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, "Color must be at least 3 characters long"]
        },
        plate: {
            type: String,
            required: true,
            minlength: [10, "Number must be at least 10 characters long"]
        },
        capacity: {
            type: Number,
            required: true,
            minlength: [1, "Capacity must be at least 1 characters long"]
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'bike', 'auto']
        }
    },
    location: {
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    }
},
{timestamps: true}
)

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

captainSchema.methods.comparePassword= async function(password) {
    return await bcrypt.compare(password, this.password)
}

captainSchema.statics.hashPassword= async function(password) {
    return await bcrypt.hash(password, 10)
}

module.exports= mongoose.model("Captain", captainSchema);