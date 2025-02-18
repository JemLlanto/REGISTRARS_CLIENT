import React, { useState } from "react";

const Step5 = ({ selectedOption, handleOptionChange }) => {
  return (
    <div className=" mb-3 p-3">
      <h3>Step 5: For Employment - Abroad</h3>
      <div className="form-check">
        <input
          type="radio"
          id="option1"
          name="privacyConsent"
          value="Strongly Agree"
          className="form-check-input"
          checked={selectedOption === "Strongly Agree"}
          onChange={handleOptionChange}
        />
        <label htmlFor="option1" className="form-check-label">
          Transcript of Records (For Employment Abroad)
        </label>
      </div>

      <div className="form-check">
        <input
          type="radio"
          id="option2"
          name="privacyConsent"
          value="Agree"
          className="form-check-input"
          checked={selectedOption === "Agree"}
          onChange={handleOptionChange}
        />
        <label htmlFor="option2" className="form-check-label">
          Certification Authentication and Verification (CAV)
        </label>
      </div>

      <div className="form-check">
        <input
          type="radio"
          id="option3"
          name="privacyConsent"
          value="Neutral"
          className="form-check-input"
          checked={selectedOption === "Neutral"}
          onChange={handleOptionChange}
        />
        <label htmlFor="option3" className="form-check-label">
          Graduation and Non-Special Order
        </label>
      </div>

      <div className="form-check">
        <input
          type="radio"
          id="option4"
          name="privacyConsent"
          value="Disagree"
          className="form-check-input"
          checked={selectedOption === "Disagree"}
          onChange={handleOptionChange}
        />
        <label htmlFor="option4" className="form-check-label">
          General Point Average/General Weighted Average
        </label>
      </div>

      <div className="form-check">
        <input
          type="radio"
          id="option5"
          name="privacyConsent"
          value="Strongly Disagree"
          className="form-check-input"
          checked={selectedOption === "Strongly Disagree"}
          onChange={handleOptionChange}
        />
        <label htmlFor="option5" className="form-check-label">
          English proficiency/English as medium of instruction
        </label>
      </div>
      <div className="form-check">
        <input
          type="radio"
          id="option5"
          name="privacyConsent"
          value="Strongly Disagree"
          className="form-check-input"
          checked={selectedOption === "Strongly Disagree"}
          onChange={handleOptionChange}
        />
        <label htmlFor="option5" className="form-check-label">
          Certification of Bonafide Student
        </label>
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
      <label className="mb-4 ">
        <input type="radio" value="Yes" />
        Yes, I agree
      </label>
    </div>
  );
};

export default Step5;
