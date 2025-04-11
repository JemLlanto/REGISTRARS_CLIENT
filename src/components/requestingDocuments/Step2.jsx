import axios from "axios";
import React, { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";

const Step2 = ({ formData, handleChange }) => {
  const [purposes, setPurposes] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [yearGraduated, setYearGraduated] = useState([]);
  const [isProgramLoading, setIsProgramLoading] = useState(true);
  const [isPurposeLoading, setIsPurposeLoading] = useState(true);
  const [isYearGraduatedLoading, setIsYearGraduatedLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setIsProgramLoading(true);
        const res = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/fetchingDocuments/fetchPrograms`
        );
        if (res.data.Status === "Success") {
          setPrograms(res.data.data);
        } else if (res.data.Message) {
          console.log("Error:", res.data.Message);
        }
      } catch (err) {
        console.log("Error fetching Programs: ", err);
      } finally {
        setIsProgramLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  useEffect(() => {
    const fetchPurposes = async () => {
      try {
        setIsPurposeLoading(true);
        const res = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/fetchingDocuments/fetchPurposes`
        );
        if (res.data.Status === "Success") {
          setPurposes(res.data.data);
        } else if (res.data.Message) {
          console.log("Error: ", res.data.Message);
        }
      } catch (err) {
        console.log("Error fetching purposes:", err);
      } finally {
        setIsPurposeLoading(false);
      }
    };

    fetchPurposes();
  }, []);

  useEffect(() => {
    const fetchYearGraduated = async () => {
      try {
        setIsYearGraduatedLoading(true);
        const res = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/fetchingDocuments/fetchYearGraduated`
        );
        if (res.data.Status === "Success") {
          setYearGraduated(res.data.data);
        } else if (res.data.Message) {
          console.log("Error: ", res.data.Message);
        }
      } catch (err) {
        console.log("Error fetching year graduated:", err);
      } finally {
        setIsYearGraduatedLoading(false);
      }
    };

    fetchYearGraduated();
  }, []);

  if (formData.classification === "graduated") {
    formData.yearLevel = "";
  } else {
    formData.yearGraduated = "";
  }

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
          {isProgramLoading ? (
            <option value="" disabled>
              Loading...
            </option>
          ) : (
            programs.map((program) => (
              <option key={program.programID} value={program.programName}>
                {program.programName}
              </option>
            ))
          )}
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
            {isYearGraduatedLoading ? (
              <option value="" disabled>
                Loading...
              </option>
            ) : (
              yearGraduated.map((year, index) => (
                <option key={index} value={year.yearOption}>
                  {year.yearOption}
                </option>
              ))
            )}
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
          {isPurposeLoading ? (
            <option value="" disabled>
              Loading...
            </option>
          ) : (
            purposes.map((purpose, index) => (
              <option key={index} value={purpose.purposeName}>
                {purpose.purposeName}
              </option>
            ))
          )}
        </Form.Select>
      </FloatingLabel>
    </div>
  );
};

export default Step2;
