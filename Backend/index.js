const dotenv= require('dotenv');
const express= require('express');
const cors= require('cors');
const cookieParser= require('cookie-parser');
const connectDB= require('./db/dbConnection.js')
const userRoutes= require('./routes/user.route.js')
const captainRoutes= require('./routes/captain.route.js')

dotenv.config();
const app= express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);

connectDB()



app.get("/", (req, res)=> {
    res.send("Hello World");
})

module.exports= app;