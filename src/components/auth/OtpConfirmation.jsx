import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Modal,
  InputGroup,
  Form,
  Button,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";

const OtpConfirmation = ({
  inputs,
  isLoading,
  setIsLoading,
  handleRegister,
  isFormValid,
}) => {
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
    setGeneratedOtp();
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

  const sendOtp = async () => {
    try {
      setIsLoading(true);

      const generatedOTP = Math.floor(100000 + Math.random() * 900000);

      const otpData = {
        receiverEmail: formData.receiverEmail,
        firstName: formData.firstName,
        otp: generatedOTP.toString(), // Convert OTP to string
      };

      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/emailNotification/sendRegistrationOTP`,
        otpData
      );

      if (res.status === 200) {
        setGeneratedOtp(generatedOTP);
        Swal.fire({
          icon: "success",
          title: "OTP Sent!",
          text: "An OTP has been sent to your email.",
        });
        setOtpTimer(60);
        handleShow();
      } else if (res.status === 403) {
        Swal.fire({
          icon: "error",
          title: "Email Already in Use",
          text: res.data.Message,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.Message || "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setIsLoading(true);

      if (!generatedOTP || !formData.otp) {
        Swal.fire({
          icon: "error",
          title: "Invalid OTP",
          text: "OTP doesn't match, Please try again.",
        });
        return;
      }

      if (generatedOTP.toString() === formData.otp.toString()) {
        Swal.fire({
          icon: "success",
          title: "OTP Verified!",
          text: "Your OTP has been successfully verified.",
        }).then(() => {
          handleClose();
          handleRegister();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Incorrect OTP",
          text: "OTP doesn't match, Please try again.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    try {
      setIsLoading(true);
      await sendOtp();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while resending OTP.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check if all OTP inputs are filled
  const isOtpComplete = otpInputs.every((input) => input !== "");

  return (
    <>
      <button
        type="button"
        className="btn btn-warning w-100"
        onClick={sendOtp}
        disabled={!isFormValid()}
      >
        <p className="m-0">
          {isLoading ? (
            <>
              <Spinner animation="border" variant="dark" size="sm" /> Verifying
              Email...
            </>
          ) : (
            <>Register</>
          )}
        </p>
      </button>
      <Modal show={showOtpModal} onHide={handleClose} centered>
        <Modal.Header closeButton style={{ backgroundColor: "var(--main-color)", color: "white" }}>
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
                    <InputGroup className="mb-3" >
                      <Form.Control
                        type="number"
                        className="otp-input"
                        maxLength={1}
                        value={input}
                        onChange={(event) => handleOtpChange(event, index)}
                        placeholder=""
                        aria-label=""
                        aria-describedby="basic-addon1"
                        autoFocus={index === 0}
                        onFocus={(e) => e.target.select()}
                      />

                    </InputGroup>
                  </Col>
                ))}
              </Row>
            </div>
            <button
              type="button"
              className="btn btn-light"
              onClick={resendOTP}
            // disabled={otpTimer != 0 || isLoading}
            >
              <p className="m-0">
                {isLoading ? (
                  <><p className="m-0">Sending OTP</p></>
                ) : (
                  <>
                    {otpTimer === 0 ? (
                      <><p className="m-0">Resend OTP</p></>
                    ) : (
                      <>
                        <><p className="m-0">Resend OTP({otpTimer})</p></>
                      </>
                    )}
                  </>
                )}
              </p>
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary border-0" onClick={handleClose}>
            <p className="m-0">Back</p>
          </Button>
          <Button
            className="border-0 text-white"
            type="button"
            variant="warning"
            onClick={handleVerifyOTP}
            disabled={!isOtpComplete}
          >
            <p className="m-0">Verify</p>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OtpConfirmation;
