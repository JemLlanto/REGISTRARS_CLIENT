import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, ProgressBar } from "react-bootstrap";
import Step1 from "../../components/requestingDocuments/Step1";
import Step2 from "../../components/requestingDocuments/Step2";
import Step3 from "../../components/requestingDocuments/Step3";
import Reminder from "../../components/requestingDocuments/Reminder";
import ProgressBarSteps from "../../components/requestingDocuments/ProgressBarSteps";

export default function Sidebar() {
  const [inputValues, setInputValues] = useState(""); // State to store input value
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
    <div className="w-100 row p-4">
      <div className="col">
        <div
          className="rounded shadow-sm d-flex align-items-center p-3"
          style={{ backgroundColor: "var(--main-color)" }}
        >
          <h5 className="m-0 px-2" style={{ color: "var(--secondMain-color)" }}>
            Request Submission
          </h5>
          <p className="m-0 text-light">
            (Please ensure all required fields are completed before submission.)
          </p>
        </div>

        <div className="d-flex align-items-center justify-content-around mt-2 bg-light shadow-sm rounded p-3 position-relative">
          <form className="w-100" onSubmit={handleSubmit}>
            <div className="overflow-y-scroll" style={{ height: "65dvh" }}>
              {/* Step 1 */}
              {currentStep === 1 && (
                <>
                  <Reminder inputValues={inputValues}></Reminder>
                </>
              )}

              {/* Step 1 */}
              {currentStep === 2 && <Step1 inputValues={inputValues}></Step1>}

              {/* Step 3 */}
              {currentStep === 3 && <Step2 inputValues={inputValues}></Step2>}

              {/* Step 5 */}
              {currentStep === 4 && <Step3 inputValues={inputValues}></Step3>}
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
                  className="btn "
                  onClick={nextStep}
                  style={{
                    backgroundColor: "var(--main-color)",
                    color: "var(--secondMain-color)",
                  }}
                >
                  Next Step
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
      <div
        className="d-flex justify-content-center align-items-center col-1"
        style={{}}
      >
        <div
          className="d-flex justify-content-center align-items-center position-relative"
          style={{ width: "5rem", height: "100%" }}
        >
          <ProgressBarSteps currentStep={currentStep}></ProgressBarSteps>
          <div
            className="position-absolute"
            style={{ transform: "rotate(90deg)", width: "37rem" }}
          >
            <ProgressBar
              className="shadow-sm border"
              variant="primary"
              now={
                currentStep === 1
                  ? 0
                  : currentStep === 2
                  ? 35
                  : currentStep === 3
                  ? 65
                  : currentStep === 4 && 100
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
