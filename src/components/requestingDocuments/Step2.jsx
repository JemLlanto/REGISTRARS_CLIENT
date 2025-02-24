import axios from "axios";
import React, { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";

const Step2 = ({ handleChange }) => {
  const [purposes, setPurposes] = useState([]);
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/documents/fetchPrograms")
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.data);
          setPrograms(res.data.data);
        } else if (res.data.Message) {
          console.log("Error:", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error fetching Programs: ", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/documents/fetchPurposes")
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.data);
          setPurposes(res.data.data);
        } else if (res.data.Message) {
          console.log("Error: ", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error fetching purposes:", err);
      });
  });
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
          {purposes.map((purpose) => (
            <option key={purpose.purposeID} value={purpose.purposeName}>
              {purpose.purposeName}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
      {/* Program/Course & Major Dropdown */}
      <FloatingLabel
        controlId="floatingProgram"
        label="Program/Course & Major"
        className="mt-3"
      >
        <Form.Select onChange={handleChange}>
          <option value="">Choose</option>
          {programs.map((program) => (
            <option key={program.programID} value={program.programName}>
              {program.programName}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
    </div>
  );
};

export default Step2;
