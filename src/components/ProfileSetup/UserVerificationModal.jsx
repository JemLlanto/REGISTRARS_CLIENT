import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import OTPVerification from "./OTPVerification";
import axios from "axios";
import Swal from "sweetalert2";

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
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/emailNotification/resetPassword`,
        otpData
      );

      if (res.status === 200) {
        setGeneratedOtp(generatedOTP);
        Swal.fire({
          icon: "success",
          title: "OTP Sent!",
          text: "An OTP has been sent to your email.",
        });
        handleShow();
        setOtpTimer(60);
        setAlreadySent(true);
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
        title: "Error!",
        text:
          err.response?.data?.Message ||
          err.message ||
          "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async () => {
    setIsLoading(true);
    if (!generatedOTP || !formData.otp) {
      return Swal.fire({
        icon: "warning",
        title: "Missing OTP!",
        text: "Please enter the OTP.",
      });
    }

    if (generatedOTP.toString() === formData.otp.toString()) {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/resetToken`,
        formData
      );

      if (res.data.Status === "Success") {
        Swal.fire({
          icon: "success",
          title: "OTP Verified!",
          text: res.data.Message,
        }).then(() => {
          handleClose();
          setFormData((prev) => ({
            ...prev,
            token: res.data.token,
          }));
          handleEditSecurity();
          setIsLoading(false);
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Verification Failed",
          text: res.data.message || "Failed to generate reset token.",
        });
        setIsLoading(false);
      }
    } else {
      setTimeout(() => {
        Swal.fire({
          icon: "error",
          title: "Invalid OTP!",
          text: "OTP doesn't match, please try again.",
        });
        setIsLoading(false);
      }, 2000);
    }
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
          handleClose();
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
        title: "Error!",
        text: err.message || "An error occurred during password reset.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className="primaryButton btn"
        onClick={sendOTP}
        disabled={isLoading && !generatedOTP}
      >
        <p className="m-0">
          {isLoading && !generatedOTP ? <>Sending OTP</> : <>Edit</>}
        </p>
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
            <h5 className="m-0">User Verification</h5>{" "}
            {/* {generatedOTP} {formData.otp} */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OTPVerification
            formData={formData}
            otpInputs={otpInputs}
            handleOtpChange={handleOtpChange}
            sendOTP={sendOTP}
            otpTimer={otpTimer}
          />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            <p className="m-0">Cancel</p>
          </button>
          <button
            className="primaryButton btn d-flex align-items-center gap-1"
            onClick={verifyOTP}
            disabled={otpInputs.includes("") || isLoading}
          >
            {isLoading ? (
              <>
                <Spinner animation="border" variant="light" size="sm" />
                <p className="m-0">Verifying</p>
              </>
            ) : (
              <p className="m-0">Verify</p>
            )}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserVerificationModal;
