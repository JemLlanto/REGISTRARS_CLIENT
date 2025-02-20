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
    <div className="p-4 w-100 overflow-auto">
      <div
        className="rounded shadow-sm"
        style={{ backgroundColor: " #007bff" }}
      >
        <h5 className="m-0 p-2  " style={{ color: "white" }}>
          Request Form:
        </h5>
      </div>
      <div className="d-flex align-items-center justify-content-around mt-2 bg-light shadow-sm rounded p-3 position-relative">
        <form className="w-100" onSubmit={handleSubmit}>
          <div className="overflow-y-scroll" style={{ height: "65dvh" }}>
            {/* Step 1 */}
            {currentStep === 1 && (
              <>
                <Reminder inputValue={inputValue}></Reminder>
              </>
            )}

            {/* Step 1 */}
            {currentStep === 2 && <Step1 inputValue={inputValue}></Step1>}

            {/* Step 3 */}
            {currentStep === 3 && <Step2 inputValue={inputValue}></Step2>}

            {/* Step 5 */}
            {currentStep === 4 && <Step3 inputValue={inputValue}></Step3>}
          </div>

          <div className="d-flex justify-content-between mt-2">
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={prevStep}
              disabled={currentStep === 1}
              style={{ opacity: currentStep === 1 ? 0 : 1 }}
            >
              Back
            </Button>
            {currentStep === 4 ? (
              <Button type="button" className="btn btn-success">
                Submit
              </Button>
            ) : (
              <Button
                type="button"
                className="btn btn-primary"
                onClick={nextStep}
              >
                Next Step
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
