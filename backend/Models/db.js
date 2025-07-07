const mongoose = require('mongoose')
require('dotenv').config({ path: '../.env' });

const MONGO_URL = process.env.MONGO_URL

mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("MongoDB connected successfully......");
}).catch((error)=>{
    console.log("Error in mongodb connection....", error)
})