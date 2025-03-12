import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import "boxicons/css/boxicons.min.css";
import Swal from "sweetalert2";
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

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));

    let validationErrors = { ...errors };

    if (name === "email") {
      validationErrors.email = validateEmail(value) ? "" : "Invalid email format";
    }

    if (name === "password") {
      validationErrors.password = validatePassword(value);
      validationErrors.conPassword = value !== inputs.conPassword ? "Passwords do not match" : "";
    }

    if (name === "conPassword") {
      validationErrors.conPassword = value !== inputs.password ? "Passwords do not match" : "";
    }

    setErrors(validationErrors);
  };

  const isFormValid = () => {
    return (
      inputs.firstName.trim() &&
      inputs.lastName.trim() &&
      validateEmail(inputs.email) &&
      validatePassword(inputs.password).length === 0 &&
      inputs.password === inputs.conPassword
    );
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", inputs);
      if (res.data.Status === "Success") {
        Swal.fire({
          title: "Register Successful!",
          text: "You can login now!",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then(() => setActivePage("login"));
      } else {
        Swal.fire({
          title: "Register Failed",
          text: res.data.Error || "Registration failed. Try again.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "Try Again",
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again later.",
        icon: "error",
      });
      console.error(err);
    }
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
            <img src="/cvsu-logo.png" alt="cvsu-logo" style={{ width: "15%" }} />
          </div>
          <h4 className="text-center fw-bold text-white mt-2">CREATE ACCOUNT</h4>
          <h6 className="text-center mb-4 fw-bold" style={{ color: "#e4b703fb" }}>Sign Up & Get Started</h6>

          <form onSubmit={handleRegister}>
            <Row>
              {["firstName", "middleName", "lastName"].map((field, index) => (
                <Col md={12} key={index}>
                  <div className="mb-3 position-relative">
                    <div className="input-group">
                      <span className="input-group-text" style={{ backgroundColor: "var(--yellow-color)" }}>
                        <i className="bx bx-user"></i>
                      </span>
                      <input
                        type="text"
                        name={field}
                        value={inputs[field]}
                        onChange={handleChange}
                        className="form-control"
                        placeholder={`Enter your ${field.replace("Name", " name")}`}
                      />
                    </div>
                  </div>
                </Col>
              ))}
            </Row>

            <div className="mb-3 position-relative">
              <div className="input-group">
                <span className="input-group-text" style={{ backgroundColor: "var(--yellow-color)" }}>
                  <i className="bx bx-envelope"></i>
                </span>
                <input
                  type="email"
                  name="email"
                  value={inputs.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <div className="text-danger small">{errors.email}</div>}
            </div>

            <Row>
              {[
                { name: "password", show: showPassword, setShow: setShowPassword, placeholder: "Enter your password" },
                { name: "conPassword", show: showConPassword, setShow: setShowConPassword, placeholder: "Verify Password" }
              ].map(({ name, show, setShow, placeholder }, index) => (
                <Col xs={12} md={6} key={index}>
                  <div className="mb-3 position-relative">
                    <div className="input-group">
                      <span className="input-group-text" style={{ backgroundColor: "var(--yellow-color)" }}>
                        <i className="bx bx-lock"></i>
                      </span>
                      <input
                        type={show ? "text" : "password"}
                        name={name}
                        value={inputs[name]}
                        onChange={handleChange}
                        className="form-control"
                        placeholder={placeholder}
                      />
                      <span className="input-group-text" onClick={() => setShow(!show)} style={{ cursor: "pointer" }}>
                        <i className={show ? "bx bx-hide" : "bx bx-show"}></i>
                      </span>
                    </div>
                    {errors[name] && Array.isArray(errors[name]) && (
                      <ul className="text-warning small mt-1">
                        {errors[name].map((err, idx) => (
                          <li key={idx}>{err}</li>
                        ))}
                      </ul>
                    )}
                    {errors[name] && !Array.isArray(errors[name]) && <div className="text-danger small mt-1">{errors[name]}</div>}
                  </div>
                </Col>
              ))}
            </Row>

            <button type="submit" className="btn btn-warning w-100" disabled={!isFormValid()}>
              Register
            </button>

            <p className="mt-3 text-white text-center">
              Already have an account?{" "}
              <span
                style={{ cursor: "pointer", color: "#e4b703fb", fontWeight: "bold" }}
                onClick={() => setActivePage("login")}
              >
                Login Here
              </span>.
            </p>
          </form>
        </div>
      </div>
      <Background />
    </>
  );
};

export default Register;
