import React from "react";
import { Button, Spinner } from "react-bootstrap";

const FormButtons = ({
  formData,
  prevStep,
  nextStep,
  currentStep,
  handleSubmit,
  isLoading,
  privacyConsent,
  isSelectionFilled,
  isFileFilled,
  isInputsFilled,
}) => {
  return (
    <div className="d-flex justify-content-between gap-2 mt-2">
      <Button
        type="button"
        className="btn btn-secondary"
        onClick={prevStep}
        disabled={currentStep === 1}
        style={{ opacity: currentStep === 1 ? 0 : 1, width: "10rem" }}
      >
        <p className="m-0 d-flex align-items-center justify-content-center">
          <i className="bx bx-chevrons-left"></i> Back
        </p>
      </Button>
      {currentStep === 4 ? (
        <button
          type="button"
          className="primaryButton btn"
          onClick={handleSubmit}
          disabled={
            !(isSelectionFilled() && isFileFilled() && isInputsFilled())
          }
          style={{ width: "10rem" }}
        >
          <p className="m-0 d-flex align-items-center justify-content-center">
            {isLoading ? (
              <>
                <Spinner animation="border" variant="light" size="sm" />
                Submitting...
              </>
            ) : (
              <>Submit</>
            )}
          </p>
        </button>
      ) : (
        <button
          type="button"
          className="primaryButton btn"
          onClick={nextStep}
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
          style={{ width: "10rem" }}
        >
          <p className="m-0 d-flex align-items-center justify-content-center">
            Next Step <i className="bx bx-chevrons-right"></i>
          </p>
        </button>
      )}
    </div>
  );
};

export default FormButtons;
