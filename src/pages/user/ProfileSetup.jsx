import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useOutletContext, Link, useNavigate } from "react-router-dom";
import { Button, Form, Row, Col } from "react-bootstrap";
import { First } from "react-bootstrap/esm/PageItem";

export default function ProfileSetup() {
  const { user } = useOutletContext();
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    studentID: "",
    dateOfBirth: "",
    mobileNum: "",
    email: "",
  });
  const [editingInfo, setEditingInfo] = useState(false);
  const [editingSecurity, setEditingSecurity] = useState(false);
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

      setFormData({
        firstName: user.firstName || "",
        middleName: user.middleName || "",
        lastName: user.lastName || "",
        studentID: user.studentID || "",
        dateOfBirth: formattedDate,
        mobileNum: user.mobileNum || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleEditInfo = () => {
    setEditingInfo((prev) => !prev);
  };

  const handleEditSecurity = () => {
    setEditingSecurity((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Account details updated successfully!");
  };

  return (
    <div className="p-1 p-sm-4 w-100">
      <div
        className="rounded-2 shadow-sm p-2"
        style={{ backgroundColor: "var(--main-color)" }}
      >
        <h5 className="m-0 p-2 " style={{ color: "var(--secondMain-color)" }}>
          Account Settings
        </h5>
      </div>

      <div className="w-100 bg-light shadow-sm rounded-2 p-4 mt-3">
        <div
          className="overflow-x-hidden overflow-y-auto"
          style={{ maxHeight: "50rem" }}
        >
          <div>
            <div className="d-flex align-items-center gap-2">
              <h5 className="m-0">Personal Information</h5>
              <button className="btn btn-primary" onClick={handleEditInfo}>
                Edit
              </button>
            </div>
            <Row>
              <Col lg={6}>
                {/* Username Input */}
                <Form.Group className="mb-3">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={!editingInfo}
                  />
                </Form.Group>
              </Col>
              <Col lg={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Middle name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Middle name"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    disabled={!editingInfo}
                  />
                </Form.Group>
              </Col>
              <Col lg={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={!editingInfo}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col lg={5}>
                <Form.Group className="mb-3">
                  <Form.Label>Student ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Student ID"
                    name="studentID"
                    value={formData.studentID}
                    onChange={handleChange}
                    disabled={!editingInfo}
                  />
                </Form.Group>
              </Col>
              <Col lg={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Mobile Number"
                    name="mobileNum"
                    value={formData.mobileNum}
                    onChange={handleChange}
                    disabled={!editingInfo}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Date of Birth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    disabled={!editingInfo}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>

          <div>
            <div className="d-flex align-items-center gap-2">
              <h5 className="m-0">Security Details</h5>
              <button className="btn btn-primary" onClick={handleEditSecurity}>
                Edit
              </button>
            </div>
            <Row>
              <Col>
                {/* Username Input */}
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Email"
                    value={formData.email}
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              {/* Change Password Input */}
              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    name="newPassword"
                    onChange={handleChange}
                    disabled={!editingSecurity}
                    autoComplete="newPassword"
                  />
                </Form.Group>
              </Col>

              {/* Confirm Password Input */}
              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm new password"
                    name="confPassword"
                    onChange={handleChange}
                    disabled={!editingSecurity}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}
