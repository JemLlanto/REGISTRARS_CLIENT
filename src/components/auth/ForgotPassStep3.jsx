import React from "react";
import { InputGroup, Form, Row, Col } from "react-bootstrap";

const ForgotPassStep3 = ({
  formData,
  showPassword,
  showConPassword,
  handleChange,
  errors,
  setShowConPassword,
  setShowPassword,
}) => {
  return (
    <div>
      <Row>
        {[
          {
            name: "password",
            show: showPassword,
            setShow: setShowPassword,
            placeholder: "Enter your new password",
          },
          {
            name: "conPassword",
            show: showConPassword,
            setShow: setShowConPassword,
            placeholder: "Verify your new Password",
          },
        ].map(({ name, show, setShow, placeholder }, index) => (
          <Col xs={12} md={12} key={index}>
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
                  value={formData[name]}
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
    </div>
  );
};

export default ForgotPassStep3;
