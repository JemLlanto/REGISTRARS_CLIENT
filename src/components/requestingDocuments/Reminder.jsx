import React, { useState } from "react";
import { ButtonGroup, ToggleButton, Spinner } from "react-bootstrap";

const Reminder = ({
  isLoading,
  setIsLoading,
  privacyConsent,
  setFormData,
  formData,
}) => {
  const handlePrivacyChange = () => {
    setIsLoading(true); // Show loading spinner

    setTimeout(() => {
      setFormData((prevData) => {
        const updatedAgree = prevData.agree === "yes" ? "no" : "yes"; // Toggle correctly
        const updatedData = { ...prevData, agree: updatedAgree };

        // Save to localStorage
        localStorage.setItem("formData", JSON.stringify(updatedData));

        return updatedData;
      });
      setIsLoading(false); // Hide spinner after change
    }, 500); // Simulate a delay (adjust as needed)
  };
  return (
    <div className="p-1 rounded-1">
      <h3 className="fw-bold" style={{ color: "var(--main-color)" }}>
        <span className="text-danger">Important:</span> Please read carefully
        before completing the form.
      </h3>
      <div>
        <p>
          Processing of documents is{" "}
          <span className="fw-bold">ten(10) working days</span> upon request.
          Details about payment, schedule of release & other pertinent
          information regarding the requested document/s will be sent via
          registered e-mail address.
        </p>
        <p>
          <span className="fw-bold">Working days:</span> Monday to Thursday only
        </p>
        <p>
          <span className="fw-bold">Excluded days:</span> Friday, Saturday,
          Sunday, Holiday (local and national) and Campus/University-wide
          activities
        </p>
        <p className="text-danger fw-bold">--NO EXPEDITE REQUEST--</p>
        <p>Thank you.</p>
      </div>

      <div>
        <h3 className="fw-bold" style={{ color: "var(--main-color)" }}>
          Data Privacy Consent
        </h3>

        <p>
          In compliance with the requirements of the Data Privacy Act of 2012,
          the Cavite State University – CCAT Campus Office of the Registrar
          commits to ensuring that all personal information obtained will be
          secured and remain confidential. Collected personal information will
          only be utilized for purposes of documentation and research, if
          applicable, and facilitation of future transactions. The personal
          information shall not be shared or disclosed with other parties
          without consent unless the disclosure is required by, or in compliance
          with, applicable laws and regulations.
        </p>
        <p>
          <strong>Do you agree to the Data Privacy Consent?</strong>
        </p>

        <ButtonGroup className="mb-3">
          <ToggleButton
            id="privacy-consent"
            type="checkbox" // Acts as a checkbox
            variant={formData.agree === "yes" ? "success" : "outline-success"} // Green when selected
            checked={formData.agree === "yes"}
            onChange={handlePrivacyChange}
          >
            {isLoading ? (
              <Spinner
                animation="border"
                variant={formData.agree === "yes" ? "light" : "success"}
                size="sm"
              />
            ) : formData.agree === "yes" ? (
              "Agreed"
            ) : (
              "yes, I agree"
            )}
          </ToggleButton>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Reminder;
