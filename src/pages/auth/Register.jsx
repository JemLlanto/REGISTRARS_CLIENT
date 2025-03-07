import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import "boxicons/css/boxicons.min.css";
import { Background } from "../../components/Background/Background";

const Register = ({ setActivePage }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [inputs, setInputs] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    conPassword: "",
  });
  const [errors, setErrors] = useState({});

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push("At least 8 characters");
    if (!/[A-Z]/.test(password)) errors.push("One uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("One lowercase letter");
    if (!/[0-9]/.test(password)) errors.push("One number");
    if (!/[!@#$%^&*]/.test(password)) errors.push("One special character");
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });

    let validationErrors = { ...errors };

    if (name === "password") {
      validationErrors.password = validatePassword(value);
      if (inputs.conPassword && value !== inputs.conPassword) {
        validationErrors.conPassword = "Passwords do not match";
      } else {
        delete validationErrors.conPassword;
      }
    }

    if (name === "conPassword") {
      validationErrors.conPassword =
        value !== inputs.password ? "Passwords do not match" : "";
    }

    setErrors(validationErrors);
  };

  const isFormValid = () => {
    return (
      inputs.firstName.trim() &&
      inputs.lastName.trim() &&
      inputs.email.trim() &&
      inputs.password.trim() &&
      inputs.conPassword.trim() &&
      validatePassword(inputs.password).length === 0 &&
      inputs.password === inputs.conPassword
    );
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    axios
      .post("http://localhost:5000/api/auth/register", inputs)
      .then((res) => {
        if (res.data.Status === "Success") {
          alert(res.data.Message);
          setActivePage("login");
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="d-flex justify-content-center vh-100 align-items-center p-3 overflow-auto" style={{ height: "100dvh" }}>
        <div
          className="p-4 shadow-sm rounded-4 mx-auto"
          style={{
            overflowY: "auto",
            maxWidth: "30rem",
            backgroundColor: "var(--main-color)",
            zIndex: 1000,
            position: "relative",
          }}
        >
          <div className="d-flex justify-content-center">
            <img
              src="/cvsu-logo.png"
              alt="cvsu-logo"
              style={{ width: "15%" }}
            />
          </div>
          <h4 className="text-center fw-bold text-white mt-2">
            CREATE ACCOUNT
          </h4>
          <h6
            className="text-center mb-4 fw-bold"
            style={{ color: "#e4b703fb" }}
          >
            Sign Up & Get Started
          </h6>

          <form onSubmit={handleRegister}>
            <Row>
              <Col md={12}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    name="firstName"
                    value={inputs.firstName}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="First Name"
                  />
                  <label className="text-dark">First Name</label>
                  {errors.firstName && (
                    <div className="text-danger small">{errors.firstName}</div>
                  )}
                </div>
              </Col>
              <Col md={12}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    name="middleName"
                    value={inputs.middleName}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Middle Name"
                  />
                  <label className="text-dark">Middle Name</label>
                  {errors.middleName && (
                    <div className="text-danger small">{errors.middleName}</div>
                  )}
                </div>
              </Col>
              <Col md={12}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    name="lastName"
                    value={inputs.lastName}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Last Name"
                  />
                  <label className="text-dark">Last Name</label>
                  {errors.lastName && (
                    <div className="text-danger small">{errors.lastName}</div>
                  )}
                </div>
              </Col>
            </Row>

            <div className="form-floating mb-3">
              <input
                type="email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Email"
              />
              <label className="text-dark">Email</label>
              {errors.email && (
                <div className="text-danger small">{errors.email}</div>
              )}
            </div>

            <Row>
              <Col xs={12} md={6}>
                <div className="form-floating mb-3 position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={inputs.password}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Password"
                  />
                  <label className="text-dark">Password</label>
                  <span
                    className="input-group-text position-absolute end-0 top-50 translate-middle-y"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }}
                  >
                    <i
                      className={showPassword ? "bx bx-hide" : "bx bx-show"}
                    ></i>
                  </span>
                  {errors.password && Array.isArray(errors.password) && (
                    <ul className="text-warning small mt-1">
                      {errors.password.map((err, idx) => (
                        <li key={idx}>{err}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </Col>

              <Col xs={12} md={6}>
                <div className="form-floating mb-3 position-relative">
                  <input
                    type={showConPassword ? "text" : "password"}
                    name="conPassword"
                    value={inputs.conPassword}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Confirm Password"
                  />
                  <label className="text-dark">Confirm Password</label>
                  <span
                    className="input-group-text position-absolute end-0 top-50 translate-middle-y"
                    onClick={() => setShowConPassword(!showConPassword)}
                    style={{ cursor: "pointer" }}
                  >
                    <i
                      className={showConPassword ? "bx bx-hide" : "bx bx-show"}
                    ></i>
                  </span>
                  {errors.conPassword && (
                    <div className="text-danger small mt-1">
                      {errors.conPassword}
                    </div>
                  )}
                </div>
              </Col>
            </Row>

            <button
              type="submit"
              className="btn btn-warning w-100"
              disabled={!isFormValid()}
            >
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
      <Background></Background>
    </>
  );
};

export default Register;
