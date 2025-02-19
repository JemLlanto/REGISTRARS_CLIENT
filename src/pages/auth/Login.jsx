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
      <div className="w-100 d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card p-4 shadow-sm" style={{ width: "25rem" }}>
          <h2 className="text-center mb-4">Login Page</h2>
          <form onSubmit={handleLogin}>
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
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
            <p>
              Register{" "}
              <span onClick={() => setActivePage("register")}>here</span>.
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
