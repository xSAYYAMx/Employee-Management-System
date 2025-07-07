import React, { useState } from "react";
import { CreateEmployee } from "../api";
import { notify } from "../utils";


const AddEmployee = ({ showModal, setShowModal }) => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    salary: "",
    profileImage: null,
  });

  const handleClose = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleFileChange = (e) => {
    setEmployee({ ...employee, profileImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(employee);
    try {
        const {success, message} = CreateEmployee(employee);
        console.log(success, message);

        if(success){
            notify(message, 'success')
        }
        else{
            notify(message, 'error')
        }
        
    } catch (err) {
        notify('Failed to create employee', 'error')
    }
  };

  return (
    <div
      className={`modal ${showModal ? "d-block" : ""}`}
      tabIndex={-1}
      role="dialog"
      style={{
        display: showModal ? "block" : "none",
      }}
    >
      <div className="modal-dialogue" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Add Employee</h5>
            <button
              type="button"
              className="btn-close"
              onClick={(e) => handleClose(e)}
            ></button>

            <div className="modal-body">
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                  <label className="form-control">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={employee.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-control">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={employee.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-control">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={employee.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-control">Department</label>
                  <input
                    type="text"
                    name="department"
                    className="form-control"
                    value={employee.department}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-control">Salary</label>
                  <input
                    type="text"
                    name="salary"
                    className="form-control"
                    value={employee.salary}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-control">Profile Image</label>
                  <input
                    type="file"
                    name="profileImage"
                    className="form-control"
                    onChange={handleFileChange}
                    required
                  />
                </div>

                <button className="btn btn-primary" type="submit">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
