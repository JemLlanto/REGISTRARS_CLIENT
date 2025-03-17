import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { Background } from "../Background/Background";
import Preloader from "../Preloader/Preloader";
import ForgotPassword from "./ForgotPassword";

const Login = ({ setActivePage }) => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  axios.defaults.withCredentials = true;
  const handleLogin = (e) => {
    e.preventDefault();
    let validationErrors = {};
    if (!inputs.email.trim()) validationErrors.email = "Email is required";
    if (!inputs.password.trim())
      validationErrors.password = "Password is required";

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    axios
      .post("http://localhost:5000/api/auth/login", inputs)
      .then((res) => {
        if (res.data.Status === "Success") {
          Swal.fire({
            title: "Login Successful!",
            text: "Welcome back!",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/Home");
          });
        } else {
          Swal.fire({
            title: "Login Failed",
            text: res.data.Error,
            icon: "error",
            confirmButtonColor: "#d33",
            confirmButtonText: "Try Again",
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          text: "Something went wrong. Please try again later.",
          icon: "error",
        });
        console.log(err);
      });
  };

  return (
    <>
      <div className="container-fluid vh-100 d-flex justify-content-center align-items-center position-relative">
        <div
          className="p-4 shadow-lg rounded-4 fade-in"
          style={{ width: "30rem", backgroundColor: "#001957f7", zIndex: 2 }}
        >
          {/* Logo */}
          <div className="d-flex justify-content-center">
            <img
              style={{ width: "20%" }}
              src="/cvsu-logo.png"
              alt="cvsu-logo"
            />
          </div>
          {/* Title */}
          <h4 className="text-center fw-bold text-white">
            CAVITE STATE UNIVERSITY
          </h4>
          <h5
            className="text-center mb-4 fw-bold"
            style={{ color: "#e4b703fb" }}
          >
            REGISTRAR'S ONLINE REQUEST
          </h5>
          {/* Inputs */}
          <div>
            <div className="mb-3 position-relative">
              <div className="input-group">
                <span
                  className="input-group-text"
                  style={{ backgroundColor: "var(--yellow-color)" }}
                >
                  <i className="bx bx-user"></i>
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
              {errors.email && (
                <div className="text-danger small">{errors.email}</div>
              )}
            </div>

            <div className="mb-3 position-relative">
              <div className="input-group">
                <span
                  className="input-group-text"
                  style={{ backgroundColor: "var(--yellow-color)" }}
                >
                  <i className="bx bx-lock"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={inputs.password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your password"
                />
                <span
                  className="input-group-text"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer" }}
                >
                  <i className={showPassword ? "bx bx-hide" : "bx bx-show"}></i>
                </span>
              </div>
              {errors.password && (
                <div className="text-danger small">{errors.password}</div>
              )}
            </div>
            <ForgotPassword />
            <button className="btn btn-warning w-100" onClick={handleLogin}>
              Login
            </button>
            <p className="text-white mt-2 text-center">
              Don't have an account?{" "}
              <span
                onClick={() => setActivePage("register")}
                style={{
                  cursor: "pointer",
                  color: "#e4b703fb",
                  fontWeight: "bold",
                }}
              >
                Register here
              </span>
              .
            </p>
          </div>
        </div>
      </div>
      <Background></Background>
    </>
  );
};

export default Login;
