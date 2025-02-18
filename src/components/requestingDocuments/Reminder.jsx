import React from "react";

const Reminder = ({ isAgreed, handleChange }) => {
  return (
    <div className="p-4 rounded-1">
      <label htmlFor="my-input" className="form-label">
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
    </div>
  );
};

export default Reminder;
