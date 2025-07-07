const EmployeeModel = require("../Models/EmployeeModel");

const createEmployee = async(req, res) => {
    try {
        const body = req.body;
        body.profileImage = req.file ? req.file?.path : null;
        console.log(body)
        const emp = new EmployeeModel(body);
        await emp.save()
        res.status(201)
            .json({
                message: "Employee created",
                success: true
            })
        
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err
        })
    }
}

const updateEmployeeById = async(req, res) => {
    try {
        const {name, email, phone, department, salary} = req.body;
        const {id} = req.params;

        let updateData = {
            name, email, phone, department, salary, updatedAt: new Date()
        }

        if(req.file){
            updateData.profileImage = req.file.path;
        }

        const updateEmployee = await EmployeeModel.findByIdAndUpdate( id, updateData, { new : true })

        if(!updateEmployee){
            res.status(404).json({
                message: "Employee not found"
            })
        }

        res.status(200)
            .json({
                message: "Employee updated",
                success: true,
                data: updateEmployee
            })
        
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err
        })
    }
}

const getAllEmployees = async(req, res) => {
    try {
        // seach and pagination feature
        let { page, limit, search} = req.query;

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 5;

        const skip = (page-1) * limit;
        // page = 1 -> (1-1)*5 = 0 skip  //iska mtlb jab hum page 1 par honge toh hume starting se employees dikhenge
        // page = 2 -> (2-1)*5 = 5 skip  //jab page 2 par honge toh starting ke 5 employees skip ho jaaenge
        // page = 3 -> (3-1)*5 = 10 skip // jab page 3 par honge toh strting ke 10 employees skip ho jaaenge aur 11th se show krega 

        let searchCriteria = {} //like flter
        
        if(search){
            searchCriteria = {
                name: {
                    $regex: search,
                    $options: 'i' // case insensitive
                }
            }
        }

        const totalEmployees = await EmployeeModel.countDocuments(searchCriteria);

        const emps = await EmployeeModel.find(searchCriteria)
            .skip(skip)
            .limit(limit)
            .sort({updatedAt: -1})

        const totalPages = Math.ceil( totalEmployees / limit)
            
        res.status(200)
            .json({
                message: "All Employees",
                success: true,
                data: {
                    employees: emps,
                    pagination:{
                        totalEmployees,
                        currentPage: page,
                        totalPages,
                        pageSize: limit
                    }
                }
            })
        
    } catch (err) {
        console.log(err);
        
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err
        })
    }
}

const getEmployeeById = async(req, res) => {
    try {
        const {id} = req.params;
        const emp = await EmployeeModel.findOne({_id: id});
        res.status(200)
            .json({
                message: "Get Employee Details",
                success: true,
                data: emp
            })
        
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err
        })
    }
}

const deleteEmployeeById = async(req, res) => {
    try {
        const {id} = req.params;
        const emp = await EmployeeModel.findByIdAndDelete({_id: id});
        res.status(200)
            .json({
                message: "Employee deleted",
                success: true,
            })
        
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err
        })
    }
}

module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    deleteEmployeeById,
    updateEmployeeById
}