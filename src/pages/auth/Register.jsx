import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = ({ setActivePage }) => {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    conPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card p-4 shadow-sm" style={{ width: "25rem" }}>
          <h2 className="text-center mb-4">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="firstName"
                value={inputs.firstName}
                onChange={handleChange}
                className="form-control"
              />
              {errors.firstName && (
                <div className="text-danger small">{errors.firstName}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={inputs.lastName}
                onChange={handleChange}
                className="form-control"
              />
              {errors.lastName && (
                <div className="text-danger small">{errors.lastName}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
                className="form-control"
              />
              {errors.email && (
                <div className="text-danger small">{errors.email}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={inputs.password}
                onChange={handleChange}
                className="form-control"
              />
              {errors.email && (
                <div className="text-danger small">{errors.password}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="conPassword"
                value={inputs.conPassword}
                onChange={handleChange}
                className="form-control"
              />
              {errors.email && (
                <div className="text-danger small">{errors.conPassword}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
            <p>
              Already have an acoount? Login{" "}
              <span onClick={() => setActivePage("login")}>Here</span>.
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
