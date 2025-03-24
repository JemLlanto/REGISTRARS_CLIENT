import axios from "axios";
import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import ForgotPassStep1 from "./ForgotPassStep1";
import ForgotPassStep2 from "./ForgotPassStep2";
import ForgotPassStep3 from "./ForgotPassStep3";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedOTP, setGeneratedOtp] = useState();
  const [alreadySent, setAlreadySent] = useState(false);
  const [otpInputs, setOtpInputs] = useState(new Array(6).fill(""));
  const [otpTimer, setOtpTimer] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    receiverEmail: "",
    token: "",
    password: "",
    conPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push("At least 8 characters");
    if (!/[A-Z]/.test(password)) errors.push("One uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("One lowercase letter");
    if (!/[0-9]/.test(password)) errors.push("One number");
    if (!/[!@#$%^&*]/.test(password)) errors.push("One special character");
    return errors;
  };
  const handleShow = () => {
    setShowForgotModal(true);
  };
  const handleClose = () => {
    setShowForgotModal(false);
    setFormData({
      firstName: "",
      receiverEmail: "",
      token: "",
      password: "",
      conPassword: "",
    });
    setCurrentStep(1);
  };

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

  const isFormValid = () => {
    return (
      validatePassword(formData.password).length === 0 &&
      formData.password === formData.conPassword
    );
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    let validationErrors = { ...errors };

    if (name === "password") {
      validationErrors.password = validatePassword(value);
      validationErrors.conPassword =
        value !== formData.conPassword ? "Passwords do not match" : "";
    }

    if (name === "conPassword") {
      validationErrors.conPassword =
        value !== formData.password ? "Passwords do not match" : "";
    }

    setErrors(validationErrors);
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
        Swal.fire({
          icon: "success",
          title: "OTP Sent!",
          text: "An OTP has been sent to your email.",
        });
        setOtpTimer(60);
        setAlreadySent(true);
        if (currentStep < 2) {
          setCurrentStep(2);
        }
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
        title: "Error!",
        text: err.response?.data?.Message || "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    try {
      setIsLoading(true);
      setGeneratedOtp(null);
      await sendOTP();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Resend Failed",
        text: "An error occurred while resending OTP.",
      });
    }
  };

  const verifyOTP = async () => {
    if (!generatedOTP || !formData.otp) {
      return Swal.fire({
        icon: "warning",
        title: "Missing OTP!",
        text: "Please enter the OTP.",
      });
    }

    if (generatedOTP.toString() === formData.otp.toString()) {
      const res = await axios.post(
        "http://localhost:5000/api/auth/resetToken",
        formData
      );

      if (res.data.Status === "Success") {
        Swal.fire({
          icon: "success",
          title: "OTP Verified!",
          text: res.data.Message,
        }).then(() => {
          setCurrentStep(3);
          setFormData((prev) => ({
            ...prev,
            token: res.data.token,
          }));
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Verification Failed",
          text: res.data.message || "Failed to generate reset token.",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid OTP!",
        text: "OTP doesn't match, please try again.",
      });
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
      <button className="border-0 bg-transparent fw-bold d-flex align-items-end" style={{ color: "var(--yellow-color)" }} onClick={handleShow}>Forgot password</button>
      <Modal
        show={showForgotModal}
        onHide={handleClose}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="text-white" style={{ backgroundColor: "var(--main-color)" }}>
          <Modal.Title>Account Recovery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {currentStep === 1 && (
              <>
                <ForgotPassStep1
                  formData={formData}
                  setFormData={setFormData}
                />
              </>
            )}
            {currentStep === 2 && (
              <>
                <ForgotPassStep2
                  formData={formData}
                  otpInputs={otpInputs}
                  handleOtpChange={handleOtpChange}
                  resendOTP={resendOTP}
                  isLoading={isLoading}
                  otpTimer={otpTimer}
                />
              </>
            )}
            {currentStep === 3 && (
              <>
                <ForgotPassStep3
                  formData={formData}
                  showPassword={showPassword}
                  showConPassword={showConPassword}
                  handleChange={handleChange}
                  errors={errors}
                  setShowConPassword={setShowConPassword}
                  setShowPassword={setShowPassword}
                />
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {currentStep === 1 ? (
            <>
              <button className="btn btn-secondary" onClick={handleClose}>
                <p className="m-0">Cancel</p>
              </button>
              {alreadySent ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={resendOTP}
                  disabled={
                    otpTimer != 0 || isLoading || !formData.receiverEmail
                  }
                >
                  <p className="m-0">
                    {isLoading ? (
                      <>Resending OTP</>
                    ) : (
                      <>
                        {otpTimer === 0 ? (
                          <>
                            {isLoading ? <>Resending OTP</> : <>Resend OTP</>}
                          </>
                        ) : (
                          <>
                            {isLoading ? (
                              <>Resending OTP</>
                            ) : (
                              <>Resend OTP({otpTimer})</>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </p>
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={sendOTP}
                  disabled={!formData.receiverEmail || isLoading}
                >
                  <>
                    <p className="m-0">
                      {isLoading ? <>Sending OTP</> : <>Send OTP</>}
                    </p>
                  </>
                </button>
              )}
            </>
          ) : currentStep === 2 ? (
            <>
              <button
                className="btn btn-secondary"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Back
              </button>
              <button className="btn btn-primary" onClick={verifyOTP}>
                Verify
              </button>
            </>
          ) : currentStep === 3 ? (
            <>
              <button
                className="btn btn-secondary"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Back
              </button>
              <button
                className="btn btn-primary"
                disabled={!isFormValid()}
                onClick={handleChangePassword}
              >
                Save Changes
              </button>
            </>
          ) : null}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ForgotPassword;
