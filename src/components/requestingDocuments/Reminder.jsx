import React, { useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

const Reminder = ({ isAgreed, handleChange }) => {
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const handlePrivacyChange = () => {
    setPrivacyConsent((prev) => !prev); // Toggle state
  };
  return (
    <div className="p-4 rounded-1">
      <div className="">
        <img
          src="/OfficeLogo.png"
          alt="Registrar Logo"
          style={{ width: "20rem" }}
        />
      </div>
      <label htmlFor="my-input" className="form-label mt-4">
        <span className="fw-bold">Reminder:</span>
      </label>
      <p>
        Processing of documents is{" "}
        <span className="fw-bold">ten(10) working days</span> upon request.
        Details about payment, schedule of release & other pertinent information
        regarding the requested document/s will be sent via registered e-mail
        address.
        <br />
        <br />
        <span className="fw-bold">Working days:</span> Monday to Thursday only
        <br />
        <span className="fw-bold">Excluded days:</span> Friday, Saturday,
        Sunday, Holiday (local and national) and Campus/University-wide
        activities
        <br />
        <br />
        <span className="fw-bold">--NO EXPEDITE REQUEST--</span>
        <br />
        <br />
        Thank you.
      </p>

      <div>
        <p className="mt-4">
          <strong>Data Privacy Consent</strong>
        </p>
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
            variant={privacyConsent ? "success" : "outline-success"} // Green when selected
            checked={privacyConsent}
            onChange={handlePrivacyChange}
          >
            {privacyConsent ? "Agreed " : "Yes, I agree"}
          </ToggleButton>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Reminder;
