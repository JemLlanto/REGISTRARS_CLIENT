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

  const handleRegister = (e) => {
    e.preventDefault();

    let validationErrors = {};

    // Validate input fields
    if (!inputs.firstName.trim())
      validationErrors.firstName = "First name is required";
    if (!inputs.lastName.trim())
      validationErrors.lastName = "Last name is required";
    if (!inputs.email.trim()) validationErrors.email = "Email is required";
    if (!inputs.password.trim())
      validationErrors.password = "Password is required";
    if (!inputs.conPassword.trim())
      validationErrors.conPassword = "Confirm password is required";
    if (inputs.password !== inputs.conPassword) {
      validationErrors.conPassword = "Passwords do not match";
    }

    setErrors(validationErrors);

    // Stop if there are validation errors
    if (Object.keys(validationErrors).length > 0) return;
    axios
      .post("http://localhost:5000/api/auth/register", inputs)
      .then((res) => {
        if (res.data.Status === "Success") {
          alert("Registration successful!");
          setActivePage("login");
        } else {
          alert("Error");
        }
      })
      .then(console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ width: "25rem" }}>
        <h2 className="text-center mb-4">Register</h2>
        {errors.general && (
          <div className="alert alert-danger">{errors.general}</div>
        )}
        <form onSubmit={handleRegister}>
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
            {errors.password && (
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
            {errors.conPassword && (
              <div className="text-danger small">{errors.conPassword}</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
          <p className="mt-3 text-center">
            Already have an account?{" "}
            <span
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => setActivePage("login")}
            >
              Login Here
            </span>
            .
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
