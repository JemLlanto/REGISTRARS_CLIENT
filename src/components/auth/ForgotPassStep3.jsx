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
      <Row className="gap-2">
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
            <div className="position-relative">
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
                <ul className="text-warning small mt-1 list-unstyled">
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
  );
};

export default ForgotPassStep3;
