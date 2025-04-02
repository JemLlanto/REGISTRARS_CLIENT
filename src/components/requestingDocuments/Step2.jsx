import axios from "axios";
import React, { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";

const Step2 = ({ formData, handleChange }) => {
  const [purposes, setPurposes] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [yearGraduated, setYearGraduated] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/fetchingDocuments/fetchPrograms`
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          // console.log(res.data.data);
          setPrograms(res.data.data);
        } else if (res.data.Message) {
          // console.log("Error:", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error fetching Programs: ", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/fetchingDocuments/fetchPurposes`
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          // console.log(res.data.data);
          setPurposes(res.data.data);
        } else if (res.data.Message) {
          console.log("Error: ", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error fetching purposes:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/fetchingDocuments/fetchYearGraduated`
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          // console.log(res.data.data);
          setYearGraduated(res.data.data);
        } else if (res.data.Message) {
          console.log("Error: ", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error fetching purposes:", err);
      });
  }, []);

  if (formData.classification === "graduated") {
    formData.yearLevel = "";
  } else {
    formData.yearGraduated = "";
  }

  // Validate min/max when user finishes typing
  const handleBlur = (e) => {
    const { name, value } = e.target;
    let numericValue = Number(value);

    if (name === "schoolYearAttended") {
      if (numericValue < 1900) numericValue = 1900;
      if (numericValue > new Date().getFullYear())
        numericValue = new Date().getFullYear();

      setFormData((prevData) => {
        const updatedData = { ...prevData, [name]: numericValue };
        localStorage.setItem("formData", JSON.stringify(updatedData));
        return updatedData;
      });
    }
  };

  return (
    <div className="p-2 d-flex flex-column gap-2">
      {/* Program/Course & Major Dropdown */}
      <FloatingLabel
        controlId="program-select"
        label="Program/Course & Major"
        className="mt-3"
      >
        <Form.Select
          name="program"
          id="program-select"
          value={formData.program}
          onChange={handleChange}
        >
          <option value="">Choose...</option>
          {programs.map((program) => (
            <option key={program.programID} value={program.programName}>
              {program.programName}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
      {/* Step 2: Classification */}
      <FloatingLabel
        controlId="classification-select"
        label="Classification"
        className=""
      >
        <Form.Select
          name="classification"
          id="classification-select"
          value={formData.classification}
          onChange={handleChange}
        >
          <option value="">Choose...</option>
          <option value="undergraduate">Undergraduate</option>
          <option value="graduated">Graduated</option>
        </Form.Select>
      </FloatingLabel>
      {formData.classification === "graduated" ? (
        <FloatingLabel
          controlId="floatingProgram"
          label="Year Graduated"
          className=""
        >
          <Form.Select
            name="yearGraduated"
            value={formData.yearGraduated}
            onChange={handleChange}
            disabled={!formData.classification}
          >
            <option value="">Choose...</option>
            {yearGraduated.map((year, index) => (
              <option key={index} value={year.yearOption}>
                {year.yearOption}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>
      ) : (
        <FloatingLabel
          controlId="floatingYearLevel"
          label="Year Level"
          className=""
        >
          <Form.Select
            name="yearLevel"
            value={formData.yearLevel}
            onChange={handleChange}
            disabled={!formData.classification}
          >
            <option value="">Choose...</option>
            <option value="first-year">First Year</option>
            <option value="second-year">Second Year</option>
            <option value="third-year">Third Year</option>
            <option value="fourth-year">Fourth Year</option>
            <option value="fifth-year">Fifth Year</option>
          </Form.Select>
        </FloatingLabel>
      )}
      {/* Step 4: Purpose Section */}
      <FloatingLabel
        controlId="floatingLastSchoolYear"
        label="Last School Year Attended (e.g., 2025)"
      >
        <Form.Control
          type="number"
          placeholder="Enter last school year attended"
          name="schoolYearAttended"
          value={formData.schoolYearAttended}
          onChange={handleChange}
          min="1900"
          max={new Date().getFullYear()}
          step="1"
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPurpose" label="Purpose" className="">
        <Form.Select
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
        >
          <option value="">Choose...</option>
          {purposes.map((purpose, index) => (
            <option key={index} value={purpose.purposeName}>
              {purpose.purposeName}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
    </div>
  );
};

export default Step2;
