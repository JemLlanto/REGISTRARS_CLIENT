import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReqProgressBar from "../../components/requestingDocuments/ReqProgressBar";
import { useOutletContext, useNavigate } from "react-router-dom";
import ClosedForm from "../../components/requestingDocuments/ClosedForm";
import FormButtons from "../../components/requestingDocuments/FormButtons";
import FormBody from "../../components/requestingDocuments/FormBody";
// import ReqProgressBarSmall from "../../components/requestingDocuments/ReqProgressBarSmall";

export default function RequestDocument() {
  const { user, fetchUserData } = useOutletContext();
  const [storedFormData, setStoredFormData] = useState(
    JSON.parse(localStorage.getItem("formData")) || {}
  );
  const [formData, setFormData] = useState({
    currentStep: storedFormData.currentStep || 1,
    agree: storedFormData.agree || "no",
    email: storedFormData.email || user.email || "",
    userID: storedFormData.userID || user.userID || "",
    firstName: storedFormData.firstName || user.firstName || "",
    middleName: storedFormData.middleName || user.middleName || "",
    lastName: storedFormData.lastName || user.lastName || "",
    studentID: storedFormData.studentID || user.studentID || "",
    dateOfBirth: storedFormData.dateOfBirth || user.dateOfBirth || "",
    sex: storedFormData.sex || user.sex || "",
    mobileNum: storedFormData.mobileNum || user.mobileNum || "+63",
    classification: storedFormData.classification || "",
    schoolYearAttended: storedFormData.schoolYearAttended || "",
    yearGraduated: storedFormData.yearGraduated || "",
    yearLevel: storedFormData.yearLevel || "",
    program: storedFormData.program || user.program || "",
    purpose: storedFormData.purpose || "",
    upload: storedFormData.upload || "",
  });
  const [currentStep, setCurrentStep] = useState(
    storedFormData.currentStep || 1
  );
  const [direction, setDirection] = useState(1);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInput, setHasInput] = useState(false);
  const [inputsLength, setInputsLength] = useState(0);
  const [hasFile, setHasFile] = useState(false);
  const [file, setFile] = useState(null);
  const [hasSelection, setHasSelection] = useState(false);
  const [docType, setDocType] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isAdmin) {
      navigate("/admin/home");
    }
  }, [user.isAdmin, navigate]);

  const requestID = useRef(
    Date.now().toString() + Math.floor(Math.random() * 1000).toString()
  ).current;

  // console.log("requestID", requestID);

  useEffect(() => {
    // Create new input value fields when inputsLength changes
    const inputValue = {};
    for (let i = 1; i <= inputsLength; i++) {
      // Preserve existing values if they exist
      inputValue[`inputValue${i}`] = formData[`inputValue${i}`] || "";
    }

    setFormData((prevData) => ({
      ...prevData,
      ...inputValue,
    }));
    // console.log(inputValue);
  }, [inputsLength]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      inputsLength: inputsLength, // Add this line to include inputsLength in formData
    }));
  }, [inputsLength]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      requestID: requestID, // Add this line to include inputsLength in formData
    }));
  }, [requestID]);

  useEffect(() => {
    if (user) {
      // Only update fields from user data if they don't exist in storedFormData
      setFormData((prevData) => {
        // Only format date if it exists
        let formattedDate = prevData.dateOfBirth;
        if (prevData.dateOfBirth) {
          try {
            const date = new Date(prevData.dateOfBirth);
            formattedDate = `${date.getFullYear()}-${String(
              date.getMonth() + 1
            ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
          } catch (error) {
            console.error("Date formatting error:", error);
          }
        }

        return {
          ...prevData,
          // Only use user data if localStorage doesn't have a value (empty string is considered no value)
          email: prevData.email || user.email || "",
          userID: prevData.userID || user.userID || "",
          firstName: prevData.firstName || user.firstName || "",
          middleName: prevData.middleName || user.middleName || "",
          lastName: prevData.lastName || user.lastName || "",
          studentID: prevData.studentID || user.studentID || "",
          dateOfBirth: formattedDate || user.dateOfBirth || "",
          sex: prevData.sex || user.sex || "",
          mobileNum: prevData.mobileNum || user.mobileNum || "+63",
          program: prevData.program || user.program || "",
        };
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "mobileNum") {
      // Remove all non-numeric characters
      newValue = newValue.replace(/\D/g, "");

      // Ensure the number starts with "63"
      if (!newValue.startsWith("63")) {
        newValue = "63" + newValue;
      }

      // Limit to 12 digits (including country code)
      newValue = newValue.slice(0, 12);

      // Add "+" at the beginning
      newValue = "+" + newValue;
    }

    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: newValue };

      // Save to localStorage
      localStorage.setItem("formData", JSON.stringify(updatedData));

      return updatedData;
    });
  };

  return (
    <div
      className="p-0 p-sm-4 mt-2 w-100 row justify-content-center "
      style={{ height: "100%" }}
    >
      <div className="col">
        <div
          className="rounded shadow-sm d-flex align-items-center p-3"
          style={{ backgroundColor: "var(--main-color)" }}
        >
          <h5
            className="m-0 px-2 fade-in"
            style={{ color: "var(--secondMain-color)" }}
          >
            Request Submission
          </h5>
        </div>

        <div
          className="d-flex align-items-center justify-content-around mt-2 bg-light shadow-sm rounded p-3 position-relative"
          style={{ zIndex: "1" }}
        >
          <form className="position-relative w-100">
            <ClosedForm user={user} fetchUserData={fetchUserData} />

            <FormBody
              direction={direction}
              currentStep={currentStep}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              privacyConsent={privacyConsent}
              setPrivacyConsent={setPrivacyConsent}
              setFormData={setFormData}
              formData={formData}
              handleChange={handleChange}
              docType={docType}
              setDocType={setDocType}
              setFile={setFile}
              inputsLength={inputsLength}
              setInputsLength={setInputsLength}
              setHasSelection={setHasSelection}
              setHasFile={setHasFile}
              setHasInput={setHasInput}
            />

            <FormButtons
              fetchUserData={fetchUserData}
              formData={formData}
              requestID={requestID}
              currentStep={currentStep}
              isLoading={isLoading}
              privacyConsent={privacyConsent}
              inputsLength={inputsLength}
              docType={docType}
              file={file}
              hasSelection={hasSelection}
              hasFile={hasFile}
              hasInput={hasInput}
              setInputsLength={setInputsLength}
              setDocType={setDocType}
              setCurrentStep={setCurrentStep}
              setFormData={setFormData}
              setDirection={setDirection}
              setHasSelection={setHasSelection}
              setHasFile={setHasFile}
              setHasInput={setHasInput}
              setIsLoading={setIsLoading}
            />
          </form>
        </div>
      </div>
      <div
        className="d-none d-md-flex justify-content-center align-items-center col-1"
        style={{}}
      >
        <ReqProgressBar currentStep={currentStep} />
      </div>
    </div>
  );
}
