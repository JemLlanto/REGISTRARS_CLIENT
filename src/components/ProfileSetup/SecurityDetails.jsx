import React, { useState, useEffect } from "react";
import { Col, Form, Row, InputGroup } from "react-bootstrap";
import UserVerificationModal from "./UserVerificationModal";
import axios from "axios";
import Swal from "sweetalert2";

const SecurityDetails = ({
  handleEditSecurity,
  handleCancelEditSecurity,
  handleChange,
  editingSecurity,
  setFormData,
  formData,
  setIsLoading,
  isLoading,
  validatePassword,
  errors,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);

  const isFormValid = () => {
    return (
      validatePassword(formData.password).length === 0 &&
      formData.password === formData.conPassword
    );
  };

  const handleChangePassword = async () => {
    try {
      setIsLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/forgotPassword",
        formData
      );
      if (res.data.status === "Success") {
        alert(res.data.message);
        handleEditSecurity();
        setFormData({ ...formData, password: "", conPassword: "" });
      } else {
        alert("Password reset failed");
      }
    } catch (err) {
      alert("An error occurred during password reset", err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between gap-2">
        <h5 className="m-0">Security Details</h5>
        <div className="d-flex align-items-center gap-1">
          {editingSecurity ? (
            <>
              <button
                className="btn btn-secondary"
                onClick={handleCancelEditSecurity}
              >
                Cancel
              </button>
              <button
                className="primaryButton py-2"
                onClick={handleChangePassword}
                disabled={!isFormValid()}
              >
                Save Changes
              </button>
            </>
          ) : (
            <UserVerificationModal
              handleEditSecurity={handleEditSecurity}
              formData={formData}
              setFormData={setFormData}
            />
          )}
        </div>
      </div>
      <div>
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
          {[
            {
              label: "New Password",
              name: "password",
              show: showPassword,
              setShow: setShowPassword,
              placeholder: "Enter your new password",
            },
            {
              label: "Confirm Password",
              name: "conPassword",
              show: showConPassword,
              setShow: setShowConPassword,
              placeholder: "Verify your new Password",
            },
          ].map(({ label, name, show, setShow, placeholder }, index) => (
            <Col xs={12} lg={6} key={index}>
              <div className="mb-3 position-relative">
                <Form.Label>{label}</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={show ? "text" : "password"}
                    placeholder={placeholder}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    disabled={!editingSecurity}
                    autoComplete={`new${name}`}
                    aria-label={name}
                    aria-describedby={name}
                  />
                  <InputGroup.Text id={name}>
                    {" "}
                    <span
                      className=""
                      onClick={() => setShow(!show)}
                      style={{ cursor: "pointer" }}
                    >
                      <i className={show ? "bx bx-hide" : "bx bx-show"}></i>
                    </span>
                  </InputGroup.Text>
                </InputGroup>

                {errors[name] && Array.isArray(errors[name]) && (
                  <ul className="text-warning small mt-1">
                    {errors[name].map((err, idx) => (
                      <li key={idx}>{err}</li>
                    ))}
                  </ul>
                )}
                {errors[name] && !Array.isArray(errors[name]) && (
                  <div className="text-danger small mt-1">{errors[name]}</div>
                )}
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default SecurityDetails;
