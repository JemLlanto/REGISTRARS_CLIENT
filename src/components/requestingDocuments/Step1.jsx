import React from "react";

const Step1 = ({ isAgreed, handleChange }) => {
  return (
    <div className="form-label mb-3 p-3">
      <label htmlFor="my-input" className="form-label">
        Email:
      </label>
      <input type="text" id="my-input" className="form-control" />

      <br />
      <label htmlFor="my-input" className="form-label mt-3">
        Student ID No:
      </label>
      <input type="number" id="my-input" className="form-control" />
      <label htmlFor="my-input" className="form-label mt-3">
        Student Surname:
      </label>
      <input type="text" id="my-input" className="form-control" />
      <label htmlFor="my-input" className="form-label mt-3">
        Student Firstname:
      </label>
      <input type="text" id="my-input" className="form-control" />
      <label htmlFor="my-input" className="form-label mt-3">
        Student Lastname:
      </label>
      <input type="text" id="my-input" className="form-control" />
      <label htmlFor="my-input" className="form-label mt-3">
        Student Middlename:
      </label>
      <input type="text" id="my-input" className="form-control" />

      <label htmlFor="my-input" className="form-label mt-3">
        Date of Birth:
      </label>
      <input type="date" id="my-input" className="form-control" />
      <h6 className="mt-3 fw-bold">Sex:</h6>
      <label>
        <input
          className="ms-2"
          type="radio"
          value="Yes"
          checked={isAgreed} // Controlled by the parent's state
          onChange={handleChange} // Calls the parent's function to update the state
        />
        Male
      </label>
      <br />
      <label>
        <input
          className="ms-2"
          type="radio"
          value="Yes"
          checked={isAgreed} // Controlled by the parent's state
          onChange={handleChange} // Calls the parent's function to update the state
        />
        Female
      </label>
      <br />
      <label htmlFor="my-input" className="form-label mt-3">
        Mobile No.:
      </label>
      <input type="number" id="my-input" className="form-control" />
      <label htmlFor="dropdown" className="form-label mt-3">
        Program/Course & Major:
      </label>
      <select
        id="dropdown"
        className="form-select"
        onChange={handleChange} // Handle change event
      >
        <option value="">
          <span className="text-light">Choose</span>
        </option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    </div>
  );
};

export default Step1;
