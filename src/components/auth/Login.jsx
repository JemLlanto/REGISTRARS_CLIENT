import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import ForgotPassword from "./ForgotPassword";
import { Spinner, Offcanvas } from "react-bootstrap";
import { GooleLogin } from "./GooleLogin";
import CookieConsent from "./UserCookieConsent";

const Login = ({ setActivePage }) => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  axios.defaults.withCredentials = true;
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let validationErrors = {};
    if (!inputs.email.trim()) validationErrors.email = "Email is required";
    if (!inputs.password.trim())
      validationErrors.password = "Password is required";

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/login`,
        inputs
      );

      if (res.data.Status === "Success") {
        await Swal.fire({
          title: "Login Successful!",
          text: "Welcome back!",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
        localStorage.setItem("token", res.data.token);
        if (res.data.isAdmin === 0) {
          navigate("/home");
        } else {
          navigate("/admin/home");
        }
      } else {
        Swal.fire({
          title: "Login Failed",
          text: res.data.Error,
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "Try Again",
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Login Failed",
        text: "Something went wrong. Please try again later.",
        icon: "error",
      });
      // console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container-fluid vh-100 d-flex justify-content-center align-items-center position-relative">
        <div
          className="p-4 shadow-lg rounded-4 fade-in"
          style={{ width: "30rem", backgroundColor: "#001957f7", zIndex: 2 }}
        >
          {/* Logo */}
          <div className="d-flex justify-content-center mb-1">
            <img
              style={{ width: "20%" }}
              src="/cvsu-logo.png"
              alt="cvsu-logo"
            />
          </div>
          {/* Title */}
          <h4 className="text-center fw-bold text-white m-0">
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
                <div className="text-danger small d-flex align-items-center gap-1">
                  <i className="bx bx-error-circle"></i>
                  <p className="m-0">{errors.email}</p>
                </div>
              )}
            </div>

            <div className="mb-2 position-relative">
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
                <div className="text-danger small d-flex align-items-center gap-1">
                  <i className="bx bx-error-circle"></i>
                  <p className="m-0">{errors.password}</p>
                </div>
              )}
            </div>
            <div className="d-flex justify-content-end align-items-end mb-2">
              <ForgotPassword />
            </div>

            <button
              className="btn btn-warning w-100 d-flex align-items-center justify-content-center gap-2"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner animation="border" variant="dark" size="sm" />{" "}
                  <p className="m-0">Verifying credentials...</p>
                </>
              ) : (
                <p className="m-0">Login</p>
              )}
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
          <div>
            <GooleLogin setIsLoading={setIsLoading} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
