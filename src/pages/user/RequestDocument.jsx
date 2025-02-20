import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import SideBar from "../../layouts/SideBar/SideBar";
import MainLayout from "../../layouts/MainLayout";
import Step1 from "../../components/requestingDocuments/Step1";
import Step2 from "../../components/requestingDocuments/Step2";
import Step3 from "../../components/requestingDocuments/Step3";
import Reminder from "../../components/requestingDocuments/Reminder";

export default function Sidebar() {
  const [inputValue, setInputValue] = useState(""); // State to store input value
  const [currentStep, setCurrentStep] = useState(1);

  // Function to go to the next step
  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  // Function to go to the previous step
  const prevStep = () => {
    setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("You have agreed to the terms and conditions.");
  };

  return (
    <div className="p-4 w-100 overflow-auto" style={{ maxHeight: "650px" }}>
      <div
        className="rounded-2 shadow-sm"
        style={{ backgroundColor: " #007bff" }}
      >
        <h5 className="m-0 p-2  " style={{ color: "white" }}>
          Request Form:
        </h5>
      </div>
      <div className="w-100 h-50">
        <div className="d-flex align-items-center justify-content-around mt-2">
          <div className="Steps bg-light w-100 p-2 shadow-sm rounded-3">
            <form onSubmit={handleSubmit}>
              {/* Step 1 */}
              {currentStep === 1 && (
                <>
                  <Reminder inputValue={inputValue}></Reminder>
                  <Button
                    type="button"
                    className="btn btn-primary"
                    onClick={nextStep}
                  >
                    Next Step
                  </Button>
                </>
              )}

              {/* Step 1 */}
              {currentStep === 2 && (
                <div className="step1">
                  <Step1 inputValue={inputValue}></Step1>

                  <div className="d-flex justify-content-between">
                    <Button
                      type="button"
                      className="btn btn-secondary"
                      onClick={prevStep}
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      className="btn btn-primary"
                      onClick={nextStep}
                    >
                      Next Step
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {currentStep === 3 && (
                <div className="step2">
                  <Step2 inputValue={inputValue}></Step2>

                  <div className="d-flex justify-content-between">
                    <Button
                      type="button"
                      className="btn btn-secondary"
                      onClick={prevStep}
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      className="btn btn-primary"
                      onClick={nextStep}
                    >
                      Next Step
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 5 */}
              {currentStep === 4 && (
                <div className="step3">
                  <Step3 inputValue={inputValue}></Step3>
                  <div className="d-flex justify-content-between">
                    <Button
                      type="button"
                      className="btn btn-secondary"
                      onClick={prevStep}
                    >
                      Back
                    </Button>
                    <Button type="button" className="btn btn-success">
                      Submit
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
