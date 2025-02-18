import React from "react";

const Step2 = () => {
  return (
    // Step 2
    <div className="p-3">
      <h3>Step 2: Address Information</h3>
      <label htmlFor="dropdown" className="form-label">
        Program/Course & Major:
      </label>
      <select id="dropdown" className="form-select mb-5 ">
        <option value="">
          <span className="text-light">Choose</span>
        </option>
        <option value="option1">Undergraduate</option>
        <option value="option2">Graduated</option>
      </select>

      {/* step 3 */}
      <h3>Step 3: Year Level:</h3>
      <label htmlFor="dropdown" className="form-label ">
        Program/Course & Major:
      </label>
      <select id="dropdown" className="form-select mb-5 ">
        <option value="">
          <span className="text-light">Choose</span>
        </option>
        <option value="option1">First Year</option>
        <option value="option1">Second Year</option>
        <option value="option1">Third Year</option>
        <option value="option1">Fourth Year</option>
        <option value="option1">Fifth Year</option>
      </select>

      {/* step 4 */}
      <h3>Step 4: Purpose Section:</h3>
      <label htmlFor="my-input" className="form-label mt-3">
        Last School Year Attended:
      </label>
      <input type="number" id="my-input" className="form-control" />

      <label htmlFor="dropdown" className="form-label ">
        Purpose :
      </label>
      <select id="dropdown" className="form-select mb-5 ">
        <option value="">
          <span className="text-light">Choose</span>
        </option>
        <option value="option1">First Year</option>
        <option value="option1">Second Year</option>
        <option value="option1">Third Year</option>
        <option value="option1">Fourth Year</option>
        <option value="option1">Fifth Year</option>
      </select>
    </div>
  );
};

export default Step2;
