import axios from "axios";
import React, { useState, useEffect } from "react";
import { Modal, Button, FloatingLabel, Form } from "react-bootstrap";
import Swal from "sweetalert2";

const NewAccountPopup = ({ user }) => {
  const [showAccountPopup, setShowAccountPopup] = useState(user.isNewAccount);
  const [programs, setPrograms] = useState([]);
  const [formData, setFormData] = useState({
    userID: user.userID,
    dateOfBirth: "",
    sex: "",
    studentID: "",
    program: "",
    mobileNum: "+63",
  });

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
          console.log("Error:", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error fetching Programs: ", err);
      });
  }, []);

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

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue, // Use the properly formatted newValue
    }));
  };

  const handleClosePopup = () => setShowAccountPopup(false);
  const handleShowPopup = () => setShowAccountPopup(true);

  const handleSaveChanges = () => {
    axios
      .post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/manageAccount/setUpAccount`,
        formData
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.Message);
          Swal.fire({
            icon: "success",
            title: "Account Setup Successful",
            text: res.data.Message,
          }).then(() => {
            handleClosePopup();
            window.location.reload();
          });
        } else if (res.data.Error) {
          console.log("Error:", res.data.Error);
          Swal.fire({
            icon: "error",
            title: "Account Setup Failed",
            text: res.data.Error,
          });
        }
      })
      .catch((err) => {
        console.log("Error setting up account: ", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An unexpected error occurred. Please try again.",
        });
      });
  };
  return (
    <Modal
      show={showAccountPopup}
      onHide={handleClosePopup}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header>
        <Modal.Title>
          <h5 className="m-0">
            You're almost there! Please complete setting up your account.
          </h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column gap-1">
          <div>
            {/* Program/Course & Major Dropdown */}
            <FloatingLabel
              controlId="floatingProgram"
              label="Program/Course & Major"
              className=""
            >
              <Form.Select
                name="program"
                value={formData.program}
                onChange={handleChange}
              >
                <option value="">Choose...</option>
                {programs.map((program) => (
                  <option key={program.programID} value={program.programName}>
                    {program.programName}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </div>
          <div>
            <FloatingLabel controlId="floatingStudentID" label="Student ID No">
              <Form.Control
                type="number"
                name="studentID"
                value={formData.studentID}
                onChange={handleChange}
                placeholder="Student ID"
              />
            </FloatingLabel>
          </div>
          <div>
            {/* Date of Birth */}
            <FloatingLabel
              controlId="floatingDOB"
              label="Date of Birth"
              className=""
            >
              <Form.Control
                type="date"
                placeholder="Date of Birth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </FloatingLabel>
          </div>
          <div>
            {/* Sex Selection */}
            <FloatingLabel controlId="floatingSelect" label="Sex">
              <Form.Select
                aria-label="Floating label select example"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
              >
                <option>Choose...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Select>
            </FloatingLabel>
          </div>
          <div>
            {/* Mobile Number */}
            <FloatingLabel
              controlId="floatingMobile"
              label="Mobile No.(+63XXXXXXXXXX)"
              className=""
            >
              <Form.Control
                type="text"
                name="mobileNum"
                value={formData.mobileNum}
                onChange={handleChange}
                placeholder="Mobile No."
              />
            </FloatingLabel>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="primaryButton py-2"
          disabled={
            !formData.dateOfBirth || !formData.mobileNum || !formData.program
          }
          onClick={handleSaveChanges}
        >
          Save changes
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewAccountPopup;
