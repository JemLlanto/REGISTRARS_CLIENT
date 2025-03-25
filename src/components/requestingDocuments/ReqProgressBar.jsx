import React from "react";
import { ProgressBar } from "react-bootstrap";
import ProgressBarSteps from "./ProgressBarSteps";

const ReqProgressBar = ({ currentStep }) => {
  return (
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
          animated
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
  );
};

export default ReqProgressBar;
