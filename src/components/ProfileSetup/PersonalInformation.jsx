import axios from "axios";
import React, { useState, useEffect } from "react";
import { Col, Form, Row, InputGroup } from "react-bootstrap";
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
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/fetchingDocuments/fetchPrograms`
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.data);
          setPrograms(res.data.data);
        } else if (res.data.Message) {
          // console.log("Error:", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error fetching Programs: ", err);
      });
  }, []);
  const handleUpdatePersonalInfo = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/updateProfile/updatePersonalInfo`,
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
        text:
          err.response?.data?.error ||
          err.message ||
          "An unexpected error occurred.",
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
                <p className="m-0">Cancel</p>
              </button>
              <button
                className="primaryButton btn "
                onClick={handleUpdatePersonalInfo}
              >
                <p className="m-0">Save Changes</p>
              </button>
            </>
          ) : (
            <button className="primaryButton btn " onClick={handleEditInfo}>
              <p className="m-0">Edit</p>
            </button>
          )}
        </div>
      </div>
      <Row>
        <Col lg={6}>
          {/* Username Input */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="firstName">First name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First name"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={!editingInfo}
            />
          </Form.Group>
        </Col>
        <Col lg={3}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="middleName">Middle name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Middle name"
              name="middleName"
              id="middleName"
              value={formData.middleName}
              onChange={handleChange}
              disabled={!editingInfo}
            />
          </Form.Group>
        </Col>
        <Col lg={3}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="lastName">Last name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last name"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={!editingInfo}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col lg={3}>
          <Form.Group className="">
            <Form.Label htmlFor="program-select">Program/Course</Form.Label>
            <Form.Select
              name="program"
              id="program-select"
              value={formData.program}
              onChange={handleChange}
              disabled={!editingInfo}
            >
              <option value="">Choose...</option>
              {programs.map((program) => (
                <option key={program.programID} value={program.programName}>
                  {program.programName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col lg={3}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="studentID">Student ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Student ID"
              name="studentID"
              id="studentID"
              value={formData.studentID}
              onChange={handleChange}
              disabled={!editingInfo}
            />
          </Form.Group>
        </Col>
        <Col lg={3}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="mobileNum">Mobile Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Mobile Number"
              name="mobileNum"
              id="mobileNum"
              value={formData.mobileNum}
              onChange={handleChange}
              disabled={!editingInfo}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="dateOfBirth">Date of Birth</Form.Label>
            <Form.Control
              type="date"
              placeholder="Date of Birth"
              name="dateOfBirth"
              id="dateOfBirth"
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
