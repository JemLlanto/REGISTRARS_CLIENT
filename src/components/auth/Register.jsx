import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "boxicons/css/boxicons.min.css";
import Swal from "sweetalert2";
import { Background } from "../Background/Background";
import RegisterInputs from "./RegisterInputs";

const Register = ({ setActivePage }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    // if (!/[!@#$%^&*]/.test(password)) errors.push("One special character");
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
      validationErrors.email = validateEmail(value)
        ? ""
        : "Invalid email format";
    }

    if (name === "password") {
      validationErrors.password = validatePassword(value);
      validationErrors.conPassword =
        value !== inputs.conPassword ? "Passwords do not match" : "";
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
      validateEmail(inputs.email) &&
      validatePassword(inputs.password).length === 0 &&
      inputs.password === inputs.conPassword
    );
  };

  const handleRegister = async () => {
    if (!isFormValid()) return;

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/register`,
        inputs
      );
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
        title: "Oppss...",
        text: err.response.data.Message || "An unexpected error occurred.",
        icon: "error",
      });
      console.error(err);
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-center vh-100 align-items-center p-3 overflow-auto"
        style={{ height: "100dvh" }}
      >
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

          <RegisterInputs
            inputs={inputs}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            handleChange={handleChange}
            handleRegister={handleRegister}
            isFormValid={isFormValid}
            errors={errors}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConPassword={showConPassword}
            setShowConPassword={setShowConPassword}
            setActivePage={setActivePage}
          />
        </div>
      </div>
    </>
  );
};

export default Register;
