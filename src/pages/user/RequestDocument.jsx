import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import Step1 from "../../components/requestingDocuments/Step1";
import Step2 from "../../components/requestingDocuments/Step2";
import Step3 from "../../components/requestingDocuments/Step3";
import Reminder from "../../components/requestingDocuments/Reminder";
import { motion, AnimatePresence } from "framer-motion";
import ReqProgressBar from "../../components/requestingDocuments/ReqProgressBar";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

export default function RequestDocument() {
  const { user } = useOutletContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const requestID =
    Date.now().toString() + Math.floor(Math.random() * 1000).toString();
  console.log(requestID);
  const [formData, setFormData] = useState({
    requestID: requestID,
    agree: "Yes",
    email: user.email || "",
    userID: user.userID || "",
    firstName: user.firstName || "",
    middleName: user.middleName || "",
    lastName: user.lastName || "",
    studentID: user.studentID || "",
    dateOfBirth: user.dateOfBirth || "",
    sex: user.sex || "",
    mobileNum: user.mobileNum || "",
    classification: "",
    schoolYearAttended: "",
    yearGraduated: "",
    yearLevel: "",
    program: user.program || "",
    purpose: "",
    selection: "",

    inputs: {},
  }); // State to store input value

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        email: user.email || "",
        userID: user.userID || "",
        firstName: user.firstName || "",
        middleName: user.middleName || "",
        lastName: user.lastName || "",
        studentID: user.studentID || "",
        dateOfBirth: user.dateOfBirth || "",
        sex: user.sex || "",
        mobileNum: user.mobileNum || "",
        // Add any other user fields you want to pre-populate
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      inputs: {
        ...prev.inputs,
        [name]: value,
      },
    }));
  };

  // Function to go to the next step
  const nextStep = () => {
    setDirection(1);
    setCurrentStep((prevStep) => prevStep + 1);
  };

  // Function to go to the previous step
  const prevStep = () => {
    setDirection(-1);
    setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/documents/sendRequest",
        formData
      );
      alert("Document Requested");
      console.log(response.data); // Handle success response
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  // FOR ANIMATIONS
  const stepVariants = {
    hidden: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: { duration: 0.4, ease: "easeIn" },
    }),
  };

  return (
    <div className="w-100 row p-4">
      <div className="col">
        <div
          className="rounded shadow-sm d-flex align-items-center p-3"
          style={{ backgroundColor: "var(--main-color)" }}
        >
          <h5 className="m-0 px-2" style={{ color: "var(--secondMain-color)" }}>
            Request Submission {currentStep}
          </h5>
          <p className="m-0 text-light">
            (Please ensure all required fields are completed before submission.)
          </p>
        </div>

        <div className="d-flex align-items-center justify-content-around mt-2 bg-light shadow-sm rounded p-3 position-relative">
          <form className="w-100" onSubmit={handleSubmit}>
            <div
              className="overflow-y-scroll overflow-x-hidden"
              style={{ height: "65dvh" }}
            >
              <AnimatePresence mode="wait" custom={direction}>
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={direction}
                  >
                    <Reminder
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                      privacyConsent={privacyConsent}
                      setPrivacyConsent={setPrivacyConsent}
                      formData={formData}
                      handleChange={handleChange}
                    />
                  </motion.div>
                )}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={direction}
                  >
                    <Step1 formData={formData} handleChange={handleChange} />
                  </motion.div>
                )}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={direction}
                  >
                    <Step2 formData={formData} handleChange={handleChange} />
                  </motion.div>
                )}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={direction}
                  >
                    <Step3 formData={formData} handleChange={handleChange} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="d-flex justify-content-between mt-2">
              <Button
                type="button"
                className="btn btn-secondary"
                onClick={prevStep}
                disabled={currentStep === 1}
                style={{ opacity: currentStep === 1 ? 0 : 1, width: "10rem" }}
              >
                <p className="m-0 d-flex align-items-center justify-content-center">
                  <i class="bx bx-chevrons-left"></i> Back
                </p>
              </Button>
              {currentStep === 4 ? (
                <Button
                  type="button"
                  className="btn btn-success"
                  style={{
                    width: "10rem",
                  }}
                  onClick={handleSubmit}
                >
                  <p className="m-0 d-flex align-items-center justify-content-center">
                    Submit
                  </p>
                </Button>
              ) : (
                <button
                  type="button"
                  className="primaryButton"
                  onClick={nextStep}
                  style={{}}
                  disabled={
                    currentStep === 1
                      ? !privacyConsent
                      : currentStep === 2
                      ? !formData.email ||
                        !formData.studentID ||
                        !formData.firstName ||
                        !formData.lastName ||
                        !formData.dateOfBirth ||
                        !formData.sex ||
                        !formData.mobileNum
                      : currentStep === 3
                      ? !formData.program ||
                        !formData.classification ||
                        (formData.classification === "graduated" &&
                          !formData.yearGraduated) ||
                        (formData.classification === "undergraduate" &&
                          !formData.yearLevel) ||
                        !formData.schoolYearAttended ||
                        !formData.purpose
                      : false
                  }
                >
                  <p className="m-0 d-flex align-items-center justify-content-center">
                    Next Step <i class="bx bx-chevrons-right"></i>
                  </p>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <div
        className="d-flex justify-content-center align-items-center col-1"
        style={{}}
      >
        <ReqProgressBar currentStep={currentStep} />
      </div>
    </div>
  );
}
