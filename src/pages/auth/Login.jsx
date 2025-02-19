import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setActivePage }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  axios.defaults.withCredentials = true;
  const handleLogin = (e) => {
    e.preventDefault();

    let validationErrors = {};

    // Validate input fields
    if (!inputs.email.trim()) validationErrors.email = "Email is required";
    if (!inputs.password.trim())
      validationErrors.password = "Password is required";

    setErrors(validationErrors);

    // Stop if there are validation errors
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
      .then((err) => console.log(err));
  };

  return (
    <>
      <div className="login-container w-100 d-flex justify-content-center align-items-center">
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
          style={{ width: "25rem", backgroundColor: "#001957f7" }}
        >
          <div className="d-flex justify-content-center">
            <img
              src="/cvsu-logo.png"
              alt="cvsu-logo"
              style={{ width: "5rem" }}
            />
          </div>
          <h4 className="text-center fw-bold text-white">
            CAVITE STATE UNIVERSITY
          </h4>
          <h5
            className="text-center mb-4 fw-bold "
            style={{ color: "#e4b703fb" }}
          >
            REGISTRAR
          </h5>
          <form onSubmit={handleLogin}>
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
            <div className="mb-3">
              <label className="form-label text-white">Password:</label>
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
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
            <p className="text-white mt-2 text-center">
              Don't have account?{" "}
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
    </>
  );
};

export default Login;
