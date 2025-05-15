import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useOutletContext, Link, useNavigate } from "react-router-dom";
import { Button, Form, Row, Col } from "react-bootstrap";
import { First } from "react-bootstrap/esm/PageItem";
import PersonalInformation from "../../components/ProfileSetup/PersonalInformation";
import SecurityDetails from "../../components/ProfileSetup/SecurityDetails";

export default function ProfileSetup() {
  const { user } = useOutletContext();
  const [formData, setFormData] = useState({
    userID: "",
    firstName: "",
    middleName: "",
    lastName: "",
    program: "",
    studentID: "",
    dateOfBirth: "",
    mobileNum: "",
    email: "",
    receiverEmail: "",
    otp: "",
    token: "",
    password: "",
    conPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [editingInfo, setEditingInfo] = useState(false);
  const [editingSecurity, setEditingSecurity] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      let formattedDate = "";
      // Check if user.dateOfBirth exists and is valid
      if (user.dateOfBirth) {
        try {
          const date = new Date(user.dateOfBirth);
          if (!isNaN(date.getTime())) {
            formattedDate = `${date.getFullYear()}-${String(
              date.getMonth() + 1
            ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
          }
        } catch (error) {
          console.error("Error formatting date:", error);
        }
      }

      setFormData((prev) => ({
        ...prev,
        userID: user.userID || "",
        firstName: user.firstName || "",
        middleName: user.middleName || "",
        lastName: user.lastName || "",
        program: user.program || "",
        studentID: user.studentID || "",
        dateOfBirth: formattedDate,
        mobileNum: user.mobileNum || "",
        email: user.email || "",
        receiverEmail: user.email || "",
      }));
    }
  }, [user]);

  const handleEditInfo = () => {
    setEditingInfo((prev) => !prev);
    setEditingSecurity(false);
  };

  const handleCancelEditInfo = () => {
    setEditingInfo((prev) => !prev);
  };

  const handleEditSecurity = () => {
    setEditingSecurity((prev) => !prev);
    setEditingInfo(false);
  };
  const handleCancelEditSecurity = () => {
    setEditingSecurity((prev) => !prev);
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password === "") errors.push("At least 8 characters");
    if (!/[A-Z]/.test(password)) errors.push("One uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("One lowercase letter");
    if (!/[0-9]/.test(password)) errors.push("One number");

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "mobileNum") {
      // Remove all non-numeric characters
      newValue = newValue.replace(/\D/g, "");

      // Ensure the number starts with "63"
      if (!newValue.startsWith("63")) {
        newValue = "63" + newValue;
      }

      // Limit to 12 digits (including country code)
      newValue = newValue.slice(0, 12);

      // Add "+" at the beginning
      newValue = "+" + newValue;
    }

    setFormData((prev) => {
      const updatedData = { ...prev, [name]: newValue };
      return updatedData;
    });

    let validationErrors = { ...errors };

    if (name === "password") {
      validationErrors.password = validatePassword(value);
      validationErrors.conPassword =
        value !== formData.conPassword ? "Passwords do not match" : "";
    }

    if (name === "conPassword") {
      validationErrors.conPassword =
        value !== formData.password ? "Passwords do not match" : "";
    }

    setErrors(validationErrors);
  };

  return (
    <div className="px-1 w-100" style={{ height: "100%" }}>
      <div
        className="rounded-2 shadow-sm p-2"
        style={{ backgroundColor: "var(--main-color)" }}
      >
        <h5
          className="m-0 p-2 fade-in"
          style={{ color: "var(--secondMain-color)" }}
        >
          Account Settings
        </h5>
      </div>

      <div
        className="w-100 bg-light shadow-sm rounded-2 p-3 custom-scrollbar mt-2 overflow-x-hidden overflow-y-auto"
        style={{ maxHeight: "75%" }}
      >
        <div className="">
          <PersonalInformation
            user={user}
            handleEditInfo={handleEditInfo}
            handleCancelEditInfo={handleCancelEditInfo}
            handleChange={handleChange}
            editingInfo={editingInfo}
            formData={formData}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
          <SecurityDetails
            handleEditSecurity={handleEditSecurity}
            handleCancelEditSecurity={handleCancelEditSecurity}
            handleChange={handleChange}
            editingSecurity={editingSecurity}
            setFormData={setFormData}
            formData={formData}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            validatePassword={validatePassword}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
}
