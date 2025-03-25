import React from "react";
import { Col, Row } from "react-bootstrap";
import OtpConfirmation from "./OtpConfirmation";

const RegisterInputs = ({
  inputs,
  isLoading,
  setIsLoading,
  handleChange,
  handleRegister,
  isFormValid,
  errors,
  setShowPassword,
  showPassword,
  setShowConPassword,
  showConPassword,
  setActivePage,
}) => {
  return (
    <div>
      <Row>
        {["firstName", "middleName", "lastName"].map((field, index) => (
          <Col md={12} key={index}>
            <div className="mb-3 position-relative">
              <div className="input-group">
                <span
                  className="input-group-text"
                  style={{ backgroundColor: "var(--yellow-color)" }}
                >
                  <i className="bx bx-user"></i>
                </span>
                <input
                  type="text"
                  name={field}
                  value={inputs[field]}
                  onChange={handleChange}
                  className="form-control"
                  placeholder={`Enter your ${field.replace("Name", " name")}`}
                />
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <div className="mb-3 position-relative">
        <div className="input-group">
          <span
            className="input-group-text"
            style={{ backgroundColor: "var(--yellow-color)" }}
          >
            <i className="bx bx-envelope"></i>
          </span>
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your email"
            autoComplete="new-email"
          />
        </div>
        {errors.email && (
          <div className="text-danger small">{errors.email}</div>
        )}
      </div>

      <Row>
        {[
          {
            name: "password",
            show: showPassword,
            setShow: setShowPassword,
            placeholder: "Enter your password",
          },
          {
            name: "conPassword",
            show: showConPassword,
            setShow: setShowConPassword,
            placeholder: "Verify Password",
          },
        ].map(({ name, show, setShow, placeholder }, index) => (
          <Col xs={12} md={6} key={index}>
            <div className="mb-3 position-relative">
              <div className="input-group">
                <span
                  className="input-group-text"
                  style={{ backgroundColor: "var(--yellow-color)" }}
                >
                  <i className="bx bx-lock"></i>
                </span>
                <input
                  type={show ? "text" : "password"}
                  name={name}
                  value={inputs[name]}
                  onChange={handleChange}
                  className="form-control"
                  placeholder={placeholder}
                  autoComplete={`new${name}`}
                />
                <span
                  className="input-group-text"
                  onClick={() => setShow(!show)}
                  style={{ cursor: "pointer" }}
                >
                  <i className={show ? "bx bx-hide" : "bx bx-show"}></i>
                </span>
              </div>
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

      <OtpConfirmation
        inputs={inputs}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        handleRegister={handleRegister}
        isFormValid={isFormValid}
      />

      {/* <button
      type="submit"
      className="btn btn-warning w-100"
      disabled={!isFormValid()}
    >
      Register
    </button> */}

      <p className="mt-3 text-white text-center">
        Already have an account?{" "}
        <span
          style={{
            cursor: "pointer",
            color: "#e4b703fb",
            fontWeight: "bold",
          }}
          onClick={() => setActivePage("login")}
        >
          Login Here
        </span>
        .
      </p>
    </div>
  );
};

export default RegisterInputs;
