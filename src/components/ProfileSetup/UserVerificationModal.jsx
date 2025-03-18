import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import OTPVerification from "./OTPVerification";
import axios from "axios";

const UserVerificationModal = ({
  setFormData,
  formData,
  handleEditSecurity,
}) => {
  const [showVerificationModal, setVerificationModal] = useState(false);

  const handleShow = () => {
    setVerificationModal(true);
  };
  const handleClose = () => {
    setVerificationModal(false);
    setFormData({ ...formData, otp: "" });
    setOtpInputs(new Array(6).fill(""));
    setOtpTimer(0);
  };
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedOTP, setGeneratedOtp] = useState();
  const [alreadySent, setAlreadySent] = useState(false);
  const [otpInputs, setOtpInputs] = useState(new Array(6).fill(""));
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

  const sendOTP = async () => {
    try {
      setIsLoading(true);
      const generatedOTP = Math.floor(100000 + Math.random() * 900000);

      const otpData = {
        receiverEmail: formData.receiverEmail,
        firstName: formData.firstName,
        otp: generatedOTP.toString(), // Convert OTP to string
      };

      const res = await axios.post(
        "http://localhost:5000/api/emailNotification/sendForgotPasswordOTP",
        otpData
      );

      if (res.status === 200) {
        setGeneratedOtp(generatedOTP);
        alert("An OTP has been sent to your email.");
        handleShow();
        setOtpTimer(60);
        setAlreadySent(true);
        handleShow();
      } else if (res.status === 403) {
        alert(res.data.Message); // Display "Email is already in use" message
      }
    } catch (err) {
      alert(
        err.response?.data?.Message ||
          err.message ||
          "An unexpected error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };
  const resendOTP = async () => {
    try {
      setIsLoading(true);
      setGeneratedOtp(null);
      sendOTP();
    } catch (err) {
      alert("An error occured: ", err);
    }
  };
  const verifyOTP = async () => {
    if (!generatedOTP || !formData.otp) {
      return alert("No otp.");
    }
    if (generatedOTP.toString() === formData.otp.toString()) {
      const res = await axios.post(
        "http://localhost:5000/api/auth/resetToken",
        formData
      );
      if (res.data.Status === "Success") {
        alert(res.data.Message);
        handleClose();
        setFormData((prev) => ({
          ...prev,
          token: res.data.token,
        }));
        handleEditSecurity();
      } else {
        alert(res.data.message || "Failed to generate reset token");
      }
    } else {
      alert("OTP doesn't match, Please try again.");
    }
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
        handleClose();
      } else {
        alert("Password reset failed");
      }
    } catch (err) {
      alert("An error occurred during password reset", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button className="btn btn-primary" onClick={sendOTP}>
        {isLoading ? <>Sending OTP</> : <>Edit</>}
      </button>
      <Modal
        show={showVerificationModal}
        onHide={handleClose}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            User Verification
            {generatedOTP} {formData.otp}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OTPVerification
            formData={formData}
            otpInputs={otpInputs}
            handleOtpChange={handleOtpChange}
            resendOTP={resendOTP}
            isLoading={isLoading}
            otpTimer={otpTimer}
          />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={verifyOTP}
            disabled={otpInputs.includes("")}
          >
            Verify
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserVerificationModal;
