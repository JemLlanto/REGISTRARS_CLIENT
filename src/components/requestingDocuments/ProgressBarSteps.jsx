import React from "react";

function ProgressBarSteps({ currentStep }) {
  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{ height: "37rem", zIndex: "10" }}
    >
      {[1, 2, 3, 4].map((step) => (
        <div
          key={step}
          className={`step ${currentStep === step ? "active" : ""} ${
            currentStep >= step ? "current text-light border" : ""
          }`}
        >
          {step}
        </div>
      ))}
    </div>
  );
}

export default ProgressBarSteps;
