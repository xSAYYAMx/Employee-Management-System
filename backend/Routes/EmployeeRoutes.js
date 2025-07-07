const { createEmployee, getAllEmployees, getEmployeeById, deleteEmployeeById, updateEmployeeById } = require('../Controllers/EmployeeControllers')
const { clodinaryFileUploader } = require('../Middlewares/fileLoader')

const routes = require('express').Router()

routes.get('/', getAllEmployees)

routes.post('/', clodinaryFileUploader.single('profileImage'), createEmployee)

routes.put('/:id', clodinaryFileUploader.single('profileImage'), updateEmployeeById)

routes.get('/:id', getEmployeeById)

routes.delete('/:id', deleteEmployeeById)


module.exports = routes