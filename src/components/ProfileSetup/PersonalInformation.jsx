import axios from "axios";
import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import Swal from "sweetalert2";

const PersonalInformation = ({
  handleEditInfo,
  handleCancelEditInfo,
  handleChange,
  editingInfo,
  formData,
  setIsLoading,
  isLoading,
}) => {
  const handleUpdatePersonalInfo = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/updateProfile/updatePersonalInfo",
        formData
      );

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: res.data.message,
        }).then(() => {
          handleCancelEditInfo();
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error Occurred!",
        text: err.response?.data?.error || err.message || "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between gap-2">
        <h5 className="m-0">Personal Information</h5>
        <div className="d-flex align-items-center gap-1">
          {editingInfo ? (
            <>
              <button
                className="btn btn-secondary"
                onClick={handleCancelEditInfo}
              >
                Cancel
              </button>
              <button
                className="primaryButton py-2"
                onClick={handleUpdatePersonalInfo}
              >
                Save Changes
              </button>
            </>
          ) : (
            <button className="primaryButton py-2" onClick={handleEditInfo}>
              Edit
            </button>
          )}
        </div>
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
  );
};

export default PersonalInformation;
