import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReqProgressBar from "../../components/requestingDocuments/ReqProgressBar";
import { useOutletContext, useNavigate } from "react-router-dom";
import ClosedForm from "../../components/requestingDocuments/ClosedForm";
import FormButtons from "../../components/requestingDocuments/FormButtons";
import FormBody from "../../components/requestingDocuments/FormBody";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import PrivacyPolicyModal from "../../components/auth/PrivacyPolicyModal";

// import ReqProgressBarSmall from "../../components/requestingDocuments/ReqProgressBarSmall";

export default function RequestDocument() {
  const { user, fetchUserData } = useOutletContext();
  const [cookieConsent, setCookieConsent] = useState(
    localStorage.getItem("cookieConsent")
  );
  const [storedFormData, setStoredFormData] = useState(
    cookieConsent === "accepted"
      ? JSON.parse(localStorage.getItem("formData"))
      : {} || {}
  );
  const [formData, setFormData] = useState({
    currentStep: storedFormData?.currentStep || 1,
    agree: storedFormData?.agree || "no",
    email: storedFormData?.email || user.email || "",
    userID: storedFormData?.userID || user.userID || "",
    firstName: storedFormData?.firstName || user.firstName || "",
    middleName: storedFormData?.middleName || user.middleName || "",
    lastName: storedFormData?.lastName || user.lastName || "",
    studentID: storedFormData?.studentID || user.studentID || "",
    dateOfBirth: storedFormData?.dateOfBirth || user?.dateOfBirth || "",
    sex: storedFormData?.sex || user.sex || "",
    mobileNum:
      storedFormData?.mobileNum === "+63" || !storedFormData?.mobileNum
        ? user.mobileNum
        : storedFormData?.mobileNum || "+63",
    classification: storedFormData?.classification || "",
    schoolYearAttended: storedFormData?.schoolYearAttended || "",
    yearGraduated: storedFormData?.yearGraduated || "",
    yearLevel: storedFormData?.yearLevel || "",
    program: storedFormData?.program || user.program || "",
    purpose: storedFormData?.purpose || "",
    upload: storedFormData?.upload || "",
  });
  const [currentStep, setCurrentStep] = useState(
    storedFormData?.currentStep || 1
  );
  const [isDataRetrieved, setIsDataRetrieved] = useState(false);
  const [direction, setDirection] = useState(1);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInput, setHasInput] = useState(false);
  const [inputsLength, setInputsLength] = useState(0);
  const [inputs, setInputs] = useState([]);
  const [hasFile, setHasFile] = useState({});
  const [file, setFile] = useState([]);
  const [hasSelection, setHasSelection] = useState(false);
  const [docType, setDocType] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  // IDENTIFY IF THE USER IS ADMIN
  useEffect(() => {
    if (user) {
      if (user?.isAdmin) {
        navigate(-1);
      }
    }
  }, [user, navigate]);

  useEffect(() => {
    // console.log("Files to be uploaded: ", file);
  }, [file]);

  const requestID = useRef(
    Date.now().toString() + Math.floor(Math.random() * 1000).toString()
  ).current;

  // // console.log("requestID", requestID);

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
    // // console.log(inputValue);
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
    if (user && !isDataRetrieved) {
      // console.log("Retrieving saved data");
      // Only update fields from user data if they don't exist in storedFormData
      setFormData((prevData) => {
        let formattedDate = "";
        // Check if user.dateOfBirth exists and is valid
        if (prevData.dateOfBirth || user.dateOfBirth) {
          try {
            const date = new Date(prevData.dateOfBirth || user.dateOfBirth);
            if (!isNaN(date.getTime())) {
              formattedDate = `${date.getFullYear()}-${String(
                date.getMonth() + 1
              ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
            }
          } catch (error) {
            console.error("Error formatting date:", error);
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
          dateOfBirth: formattedDate || "",
          sex: prevData.sex || user.sex || "",
          mobileNum: prevData.mobileNum || user.mobileNum || "+63",
          program: prevData.program || user.program || "",
        };
      });
      setIsDataRetrieved(true);
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
      if (cookieConsent === "accepted") {
        localStorage.setItem("formData", JSON.stringify(updatedData));
      }

      return updatedData;
    });
  };

  const isAccepted = cookieConsent === "accepted";

  const handleAcceptCookie = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setCookieConsent("accepted");
    setShowModal(false);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <p className="m-0">
        {isAccepted ? (
          <>Autosave is currently enabled.</>
        ) : (
          <>
            To enable autosave, please review and accept our{" "}
            <span
              style={{
                color: "var(--primary-color)",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={handleShowModal}
            >
              Privacy Policy
            </span>
            .
          </>
        )}
      </p>
    </Tooltip>
  );

  // console.log("inputs:", inputs);

  return (
    <div
      className="w-100 px-1 row justify-content-center"
      style={{ height: "85dvh" }}
    >
      <PrivacyPolicyModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleAcceptCookie={handleAcceptCookie}
      />
      <div className="col p-0">
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
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 800 }}
            overlay={renderTooltip}
          >
            <h4
              className={`m-0 d-flex align-items-center position-relative`}
              style={{
                color: isAccepted ? "#ffffff" : "rgba(255, 255, 255, 0.5)",
                cursor: "pointer",
              }}
            >
              <i class="bx bx-save"></i>{" "}
              <i
                class={`bx ${isAccepted ? "bx-loader bx-spin" : "bx-x"}`}
                style={{
                  fontSize: "clamp(.4rem, .4rem + .5vw, .8rem)",
                  position: "absolute",
                  left: "clamp(0.7rem, 0.75rem + .65vw, 1.5rem)",
                  top: "-.1rem",
                }}
              ></i>
            </h4>
          </OverlayTrigger>
        </div>

        <div
          className="d-flex align-items-center justify-content-around gap-3 mt-2 position-relative"
          style={{ zIndex: "1" }}
        >
          <ClosedForm user={user} fetchUserData={fetchUserData} />

          <form className="position-relative w-100 bg-light shadow-sm rounded p-3 ">
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
              setInputs={setInputs}
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
              inputs={inputs}
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
              setFile={setFile}
              setHasInput={setHasInput}
              setIsLoading={setIsLoading}
            />
          </form>
        </div>
      </div>
      <div className="d-none d-lg-flex justify-content-center align-items-center col-1 p-0">
        <ReqProgressBar currentStep={currentStep} />
      </div>
    </div>
  );
}
