import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Modal,
  InputGroup,
  Form,
  Button,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";

const OtpConfirmation = ({ inputs, isLoading, setIsLoading }) => {
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [formData, setFormData] = useState({ otp: "" });
  const [otpInputs, setOtpInputs] = useState(new Array(6).fill("")); // For 6-digit OTP
  const [generatedOTP, setGeneratedOtp] = useState();
  const [otpTimer, setOtpTimer] = useState(0);
  //   FOR OTP TIMER
  useEffect(() => {
    if (otpTimer > 0) {
      const timerId = setInterval(() => {
        setOtpTimer((prevTime) => {
          if (prevTime - 1 <= 0) {
            clearInterval(timerId); // Stop the timer when it reaches 0
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timerId); // Clean up the interval when component unmounts
    }
  }, [otpTimer]);

  useEffect(() => {
    if (inputs) {
      setFormData({
        firstName: inputs.firstName,
        receiverEmail: inputs.email,
      });
    }
  }, [inputs]);

  const handleShow = () => {
    setShowOtpModal(true);
  };

  const handleClose = () => {
    setShowOtpModal(false);
  };

  const handleOtpChange = (event, index) => {
    const newOtpInputs = [...otpInputs];
    newOtpInputs[index] = event.target.value.slice(-1); // Ensure only one digit is entered
    setOtpInputs(newOtpInputs);

    // Combine OTP digits
    const otp = newOtpInputs.join("");
    setFormData({ ...formData, otp });

    // Focus on the next input if it exists
    if (index < newOtpInputs.length - 1 && event.target.value.length === 1) {
      document.querySelectorAll('input[type="number"]')[index + 1].focus();
    } else if (
      index === newOtpInputs.length - 1 &&
      event.target.value.length === 1
    ) {
      // Blur the last input once it's filled
      event.target.blur();
    }
  };

  const sendOtp = () => {
    setIsLoading(true);
    setOtpTimer(60);
    const generatedOTP = Math.floor(100000 + Math.random() * 900000);
    setGeneratedOtp(generatedOTP);

    const otpData = {
      receiverEmail: formData.receiverEmail,
      firstName: formData.firstName,
      otp: generatedOTP.toString(), // Convert OTP to string
    };

    axios
      .post(
        "http://localhost:5000/api/emailNotification/sendRegistrationOTP",
        otpData
      )
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false);
          handleShow();
        } else if (res.status === 403) {
          alert(res.data.Message); // Display "Email is already in use" message
          setIsLoading(false);
        }
      })
      .catch((err) => {
        alert(err.response?.data?.Message || "An unexpected error occurred.");
        setIsLoading(false);
      });
  };

  const handleVerify = () => {
    console.log(formData.otp); // Use the combined OTP here
    // Add your verification logic here
  };

  // Check if all OTP inputs are filled
  const isOtpComplete = otpInputs.every((input) => input !== "");

  return (
    <>
      <button type="submit" className="btn btn-warning w-100" onClick={sendOtp}>
        {isLoading ? (
          <>
            <Spinner animation="border" variant="light" />
          </>
        ) : (
          <>Register</>
        )}
      </button>
      <Modal show={showOtpModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Email Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>
              {" "}
              A One-Time Password (OTP) has been sent to{" "}
              <span className="text-success fw-bold">{inputs.email}</span>.
              Please check your inbox to proceed.{" "}
            </p>
            <div>
              <Row>
                {otpInputs.map((input, index) => (
                  <Col key={index}>
                    <InputGroup className="mb-3">
                      <Form.Control
                        type="number"
                        maxLength={1}
                        value={input}
                        onChange={(event) => handleOtpChange(event, index)}
                        placeholder=""
                        aria-label=""
                        aria-describedby="basic-addon1"
                        autoFocus={index === 0} // Focus on the first input initially
                        onFocus={(e) => e.target.select()} // Select the input on focus
                      />
                    </InputGroup>
                  </Col>
                ))}
              </Row>
            </div>
            <p>
              {otpTimer === 0 ? (
                <>Resend OTP</>
              ) : (
                <>
                  <span className="text-secondary">Resend OTP({otpTimer})</span>
                </>
              )}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Back
          </Button>
          <Button
            variant="primary"
            onClick={handleVerify}
            disabled={!isOtpComplete}
          >
            Verify
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OtpConfirmation;
