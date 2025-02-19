import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FloatingLabel, Form, Row, Col } from "react-bootstrap";

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
      <div
        style={{
          position: "absolute",
          zIndex: 0,
          width: "100dvw",
          height: "100dvh",
        }}
      >
        <img
          src="/2.png"
          alt="Logo"
          style={{ width: "100%", height: "100%", objectFit: "" }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          zIndex: 0,
          width: "100dvw",
          height: "100dvh",
        }}
      >
        <img
          src="/1.png"
          alt="Logo"
          style={{ width: "100%", height: "100%", objectFit: "" }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          zIndex: 0,
          width: "100dvw",
          height: "100dvh",
        }}
      >
        <img
          src="/3.png"
          alt="Logo"
          style={{ height: "100%", objectFit: "" }}
        />
      </div>
      <div
        className="card p-4 shadow-sm rounded-4"
        style={{ width: "35rem", backgroundColor: "#001957f7" }}
      >
        <div className="d-flex justify-content-center">
          <img src="/cvsu-logo.png" alt="cvsu-logo" style={{ width: "5rem" }} />
        </div>
        <h4 className="text-center fw-bold text-white">
          CAVITE STATE UNIVERSITY
        </h4>
        <h5
          className="text-center mb-4 fw-bold text-white"
          style={{ color: "#e4b703fb" }}
        >
          REGISTRAR
        </h5>
        {errors.general && (
          <div className="alert alert-danger">{errors.general}</div>
        )}
        <form onSubmit={handleRegister}>
          <Row>
            <Col md={6}>
              <div className="mb-3">
                <label className="form-label text-white">First Name:</label>
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
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <label className="form-label text-white">Last Name:</label>
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
            </Col>
          </Row>

          <div className="mb-3">
            <label className="form-label text-white">Email:</label>
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

          <Row>
            <Col>
              <div className="mb-3">
                <label className="form-label text-white">Password:</label>
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
            </Col>
            <Col>
              <div className="mb-3">
                <label className="form-label text-white">
                  Confirm Password
                </label>
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
            </Col>
          </Row>

          <button type="submit" className="btn btn-primary w-100 ">
            Register
          </button>
          <p className="mt-3 text-white text-center">
            Already have an account?{" "}
            <span
              className=""
              style={{
                cursor: "pointer",
                color: "#e4b703fb",
                fontWeight: "bold",
              }}
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
