import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Background } from "../../components/Background/Background";
import Preloader from "../../components/Preloader/Preloader";

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
          alert("Login successful!");
          navigate("/Home");
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
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
            <img style={{ width: "20%" }} src="/cvsu-logo.png" alt="cvsu-logo" />
          </div>
          {/*  Title*/}
          <h4 className="text-center fw-bold text-white">
            CAVITE STATE UNIVERSITY
          </h4>
          <h5
            className="text-center mb-4 fw-bold"
            style={{ color: "#e4b703fb" }}
          >
            REGISTRAR'S ONLINE REQUEST
          </h5>
          {/* inputs */}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="text-white">Email</label>
              <input
                type="email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your email"
              />
              {errors.email && <div className="text-danger small">{errors.email}</div>}
            </div>

            <div className="mb-3 position-relative">
              <label className="text-white">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={inputs.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your password"
              />
              <span
                className="position-absolute end-0 translate-middle-y me-3"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer", top: "70%" }}
              >
                <i className={showPassword ? "bx bx-hide" : "bx bx-show"}></i>
              </span>
              {errors.password && <div className="text-danger small">{errors.password}</div>}
            </div>

            <button type="submit" className="btn btn-warning w-100">
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
          </form>
        </div>
      </div>
      <Background></Background>
    </>
  );
};

export default Login;
