import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setActivePage }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< Updated upstream
=======
    let validationErrors = {};

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      validationErrors.email = "Invalid email address";
    }
    if (!formData.password) {
      validationErrors.password = "Password is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("token", data.token); // ✅ Store token
          alert("Login successful!");
          navigate("/Home"); // ✅ Redirect to Home
        } else {
          setErrors({ general: data.error });
        }
      } catch (error) {
        console.error("Login error:", error);
        setErrors({ general: "Something went wrong. Please try again." });
      }
    }
>>>>>>> Stashed changes
  };
  return (
    <>
      <div className="w-100 d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card p-4 shadow-sm" style={{ width: "25rem" }}>
          <h2 className="text-center mb-4">Login Page</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
              />
              {errors.firstName && (
                <div className="text-danger small">{errors.email}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
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
