import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";

const Step2 = () => {
  return (
    <div className="p-3">
      {/* Step 2: Address Information */}

      <FloatingLabel
        controlId="floatingProgram"
        label="Classification"
        className="mb-3"
      >
        <Form.Select>
          <option value="">Choose</option>
          <option value="undergraduate">Undergraduate</option>
          <option value="graduated">Graduated</option>
        </Form.Select>
      </FloatingLabel>

      {/* Step 3: Year Level */}
      <FloatingLabel
        controlId="floatingYearLevel"
        label="Year Level"
        className="mb-3"
      >
        <Form.Select>
          <option value="">Choose</option>
          <option value="first-year">First Year</option>
          <option value="second-year">Second Year</option>
          <option value="third-year">Third Year</option>
          <option value="fourth-year">Fourth Year</option>
          <option value="fifth-year">Fifth Year</option>
        </Form.Select>
      </FloatingLabel>

      {/* Step 4: Purpose Section */}
      <FloatingLabel
        controlId="floatingLastSchoolYear"
        label="Last School Year Attended"
        className="mb-3"
      >
        <Form.Control
          type="number"
          placeholder="Enter last school year attended"
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingPurpose"
        label="Purpose"
        className="mb-3"
      >
        <Form.Select>
          <option value="">Choose</option>
          <option value="purpose1">First Year</option>
          <option value="purpose2">Second Year</option>
          <option value="purpose3">Third Year</option>
          <option value="purpose4">Fourth Year</option>
          <option value="purpose5">Fifth Year</option>
        </Form.Select>
      </FloatingLabel>
    </div>
  );
};

export default Step2;
