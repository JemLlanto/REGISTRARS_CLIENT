import React, { useState } from "react";
import { Modal, InputGroup, Form } from "react-bootstrap";

const ForgotPassword = () => {
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const handleShow = () => {
    setShowForgotModal(true);
  };
  const handleClose = () => {
    setShowForgotModal(false);
  };
  return (
    <>
      <button onClick={handleShow}>Forgot password</button>
      <Modal show={showForgotModal} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>Account Recovery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {currentStep === 1 && (
              <>
                <div>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      <i className="bx bx-envelope"></i>
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Email"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </div>
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary">Cancel</button>
          <button className="btn btn-primary">Sent OTP</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ForgotPassword;
