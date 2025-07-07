const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
const port = process.env.PORT || 8080
require('./Models/db.js')
const EmployeeRouter = require('./Routes/EmployeeRoutes.js')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req,res)=>{
    res.send("Employee management app");
})

app.use('/api/employees', EmployeeRouter)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
    
})