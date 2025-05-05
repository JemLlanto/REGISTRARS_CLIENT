import React, { useState, useEffect } from "react";
import { Col, Form, Row, InputGroup, Spinner } from "react-bootstrap";
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
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/auth/forgotPassword`,
        formData
      );

      if (res.data.status === "Success") {
        Swal.fire({
          icon: "success",
          title: "Password Reset Successful",
          text: res.data.message,
        }).then(() => {
          handleEditSecurity();
          setFormData({ ...formData, password: "", conPassword: "" });
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Password Reset Failed",
          text: "Please try again.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `An error occurred during password reset. Please try again later. ${err.message}`,
      });
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
                <p className="m-0">Cancel</p>
              </button>
              <button
                className="primaryButton btn"
                onClick={handleChangePassword}
                disabled={!isFormValid() || isLoading}
              >
                {isLoading ? (
                  <>
                    <p className="m-0">Saving</p>
                  </>
                ) : (
                  <>
                    <p className="m-0">Save</p>
                  </>
                )}
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
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                disabled
                autoComplete="none"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          {[
            {
              label: "New Password",
              name: "password",
              id: "password",
              show: showPassword,
              setShow: setShowPassword,
              placeholder: "Enter your new password",
            },
            {
              label: "Confirm Password",
              name: "conPassword",
              id: "conPassword",
              show: showConPassword,
              setShow: setShowConPassword,
              placeholder: "Verify your new Password",
            },
          ].map(({ label, name, id, show, setShow, placeholder }, index) => (
            <Col xs={12} lg={6} key={index}>
              <div className="mb-3 position-relative">
                <Form.Label htmlFor={id}>{label}</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={show ? "text" : "password"}
                    placeholder={placeholder}
                    name={name}
                    id={id}
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
                  <ul className="text-warning list-unstyled small mt-1">
                    {errors[name].map((err, idx) => (
                      <li key={idx}>
                        <p className="m-0 ms-2">{err}</p>
                      </li>
                    ))}
                  </ul>
                )}
                {errors[name] && !Array.isArray(errors[name]) && (
                  <div className="text-danger small mt-1">
                    <p className="m-0 ms-2">{errors[name]}</p>
                  </div>
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
