import React, { useState } from "react";
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

  const handleRegister = async (e) => {
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

    // If there are validation errors, return early
    if (Object.keys(validationErrors).length > 0) return;

    try {
      // Send data to backend
      const response = await fetch("http://localhost:5000/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: inputs.firstName,
          lastName: inputs.lastName,
          email: inputs.email,
          password: inputs.password,
          confirmPassword: inputs.conPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      alert("Registration successful!");
      setActivePage("login"); // Redirect to login page after success
    } catch (error) {
      setErrors({ general: error.message });
    }

    axios
      .post("http://localhost/api/auth/register", inputs)
      .then(console.log(res))
      .then(console.log(err));
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card p-4 shadow-sm" style={{ width: "25rem" }}>
          <h2 className="text-center mb-4">Register</h2>
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
