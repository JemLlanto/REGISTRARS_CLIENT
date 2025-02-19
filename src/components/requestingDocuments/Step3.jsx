import React, { useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

const Step5 = () => {
  // Separate state for Step 5 options
  const [selectedOption, setSelectedOption] = useState("");

  // Separate state for Data Privacy Consent
  const [privacyConsent, setPrivacyConsent] = useState("");

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const handlePrivacyChange = (value) => {
    setPrivacyConsent(value);
  };

  const options = [
    {
      name: "Transcript of Records (For Employment Abroad)",
      value: "Strongly Agree",
    },
    {
      name: "Certification Authentication and Verification (CAV)",
      value: "Agree",
    },
    { name: "Graduation and Non-Special Order", value: "Neutral" },
    {
      name: "General Point Average/General Weighted Average",
      value: "Disagree",
    },
    {
      name: "English proficiency/English as medium of instruction",
      value: "Strongly Disagree",
    },
    { name: "Certification of Bonafide Student", value: "Bonafide" },
  ];

  return (
    <div className="mb-3 p-3">
      <h3>Step 5: For Employment - Abroad</h3>

      <div className="d-flex  flex-column gap-2">
        {options.map((option, idx) => (
          <ToggleButton
            key={idx}
            id={`option-${idx}`}
            type="radio"
            variant={
              selectedOption === option.value ? "primary" : "outline-primary"
            }
            name="employmentOptions"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={() => handleOptionChange(option.value)}
          >
            {option.name}
          </ToggleButton>
        ))}
      </div>

      <p className="mt-4">
        <strong>Data Privacy Consent</strong>
      </p>
      <p>
        In compliance with the requirements of the Data Privacy Act of 2012, the
        Cavite State University – CCAT Campus Office of the Registrar commits to
        ensuring that all personal information obtained will be secured and
        remain confidential. Collected personal information will only be
        utilized for purposes of documentation and research, if applicable, and
        facilitation of future transactions. The personal information shall not
        be shared or disclosed with other parties without consent unless the
        disclosure is required by, or in compliance with, applicable laws and
        regulations.
      </p>

      <p>
        <strong>Do you agree to the Data Privacy Consent?</strong>
      </p>

      <ButtonGroup className="mb-3">
        <ToggleButton
          id="privacy-yes"
          type="radio"
          variant={privacyConsent === "Yes" ? "success" : "outline-success"}
          name="privacyConsent"
          value="Yes"
          checked={privacyConsent === "Yes"}
          onClick={handlePrivacyChange}
        >
          Yes, I agree
        </ToggleButton>
      </ButtonGroup>
    </div>
  );
};

export default Step5;
