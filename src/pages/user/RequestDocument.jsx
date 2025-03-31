import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Spinner } from "react-bootstrap";
import Step1 from "../../components/requestingDocuments/Step1";
import Step2 from "../../components/requestingDocuments/Step2";
import Step3 from "../../components/requestingDocuments/Step3";
import Reminder from "../../components/requestingDocuments/Reminder";
import { motion, AnimatePresence } from "framer-motion";
import ReqProgressBar from "../../components/requestingDocuments/ReqProgressBar";
import { useOutletContext, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import ClosedForm from "../../components/requestingDocuments/ClosedForm";
import FormButtons from "../../components/requestingDocuments/FormButtons";
// import ReqProgressBarSmall from "../../components/requestingDocuments/ReqProgressBarSmall";

export default function RequestDocument() {
  const { user, fetchUserData } = useOutletContext();
  const [storedFormData, setStoredFormData] = useState(
    JSON.parse(localStorage.getItem("formData")) || {}
  );
  const [formData, setFormData] = useState({
    currentStep: storedFormData.currentStep || 1,
    agree: "Yes",
    email: user.email || "",
    userID: user.userID || "",
    firstName: user.firstName || "",
    middleName: user.middleName || "",
    lastName: user.lastName || "",
    studentID: user.studentID || "",
    dateOfBirth: user.dateOfBirth || "",
    sex: user.sex || "",
    mobileNum: user.mobileNum || "+63",
    classification: "",
    schoolYearAttended: "",
    yearGraduated: "",
    yearLevel: "",
    program: user.program || "",
    purpose: "",
    upload: "",
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
      const date = new Date(user.dateOfBirth);
      const formattedDate = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

      setFormData((prevData) => ({
        ...prevData,
        dateOfBirth: formattedDate,
        ...(storedFormData
          ? storedFormData
          : {
              currentStep: 1,
              agree: "Yes",
              email: user.email || "",
              userID: user.userID || "",
              firstName: user.firstName || "",
              middleName: user.middleName || "",
              lastName: user.lastName || "",
              studentID: user.studentID || "",
              sex: user.sex || "",
              mobileNum: user.mobileNum || "+63",
              classification: "",
              schoolYearAttended: "",
              yearGraduated: "",
              yearLevel: "",
              program: user.program || "",
              purpose: "",
              upload: "",
            }),
      }));
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

  // Function to go to the next step
  const nextStep = () => {
    setDirection(1);
    fetchUserData();
    setCurrentStep((prevStep) => prevStep + 1);
    setFormData((prevData) => {
      const updatedData = { ...prevData, currentStep: currentStep + 1 };

      // Save to localStorage
      localStorage.setItem("formData", JSON.stringify(updatedData));

      return updatedData;
    });
  };

  // Function to go to the previous step
  const prevStep = () => {
    setDocType([]);
    fetchUserData();
    setHasSelection(false);
    setHasFile(false);
    setHasInput(false);
    setInputsLength(0);
    setDirection(-1);
    setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
    setFormData((prevData) => {
      const updatedData = { ...prevData, currentStep: currentStep - 1 };

      // Save to localStorage
      localStorage.setItem("formData", JSON.stringify(updatedData));

      return updatedData;
    });
  };

  const upload = async () => {
    const data = new FormData();
    data.append("requestID", formData.requestID);
    data.append("file", file);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/documents/uploadDocuments",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  const insertDocTypes = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/documents/insertDocTypes",
        {
          documentTypes: docType,
          requestID: requestID,
        }
      );
      console.log("Insert response:", res.data);
      return res.data;
    } catch (err) {
      console.log("Error inserting document types:", err);
      throw err;
    }
  };
  const insertInputs = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/documents/insertInputs",
        formData
      );
      console.log(response.data); // Handle success response
    } catch (error) {
      console.error("Error inserting inputs:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isConfirmed = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to submit the request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, submit!",
      cancelButtonText: "Cancel",
    });

    if (!isConfirmed.isConfirmed) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/documents/sendRequest",
        formData
      );
      if (inputsLength > 0) {
        await insertInputs();
      }
      if (docType) {
        await insertDocTypes();
      }
      if (file) {
        await upload();
      }

      try {
        const emailRes = await axios.post(
          "http://localhost:5000/api/emailNotification/sendNewRequestEmail",
          formData
        );

        if (emailRes.status === 200) {
          console.log(emailRes.data.message);
          // alert(emailRes.data.message);
        } else {
          console.log(emailRes.data.message);
          // alert(emailRes.data.message);
        }
      } catch (emailErr) {
        console.log("An error occurred while sending email: ", emailErr);
        // alert("An error occurred while sending email: ", emailErr.err);
      }

      // Use SweetAlert2 for success message
      Swal.fire({
        title: "Success!",
        text: "Requested document successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        localStorage.removeItem("formData");
        navigate("/home"); // Redirect after confirmation
      });

      console.log(response.data); // Handle success response
    } catch (error) {
      console.error("Error sending request:", error);

      // Check if the error response contains missing fields
      if (
        error.response &&
        error.response.data &&
        error.response.data.missingFields
      ) {
        const missingFields = error.response.data.missingFields.join(", ");

        Swal.fire({
          title: "Error!",
          text: `Failed to request document. The following fields are missing: ${missingFields}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to request document. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // FOR ANIMATIONS
  const stepVariants = {
    hidden: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: { duration: 0.4, ease: "easeIn" },
    }),
  };

  const isSelectionFilled = () => {
    if (!hasSelection) {
      return true;
    }
    return docType.length != 0;
  };

  const isFileFilled = () => {
    if (!hasFile) {
      return true;
    }
    return !!file;
  };

  const isInputsFilled = () => {
    if (!hasInput) {
      return true; // If hasInput is false, inputs are not required
    }

    for (let i = 1; i <= inputsLength; i++) {
      if (
        !formData[`inputValue${i}`] ||
        formData[`inputValue${i}`].trim() === ""
      ) {
        return false; // If any input is empty, return false
      }
    }

    return true; // All inputs are filled
  };

  return (
    <div className="p-0 p-sm-4 w-100 row justify-content-center ">
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
          {/* <p className="m-0 text-light">
            (Please ensure all required fields are completed before submission.)
          </p> */}
        </div>
        {/* <div>
          <ReqProgressBarSmall currentStep={currentStep} />
        </div> */}
        <div
          className="d-flex align-items-center justify-content-around mt-2 bg-light shadow-sm rounded p-3 position-relative"
          style={{ zIndex: "1" }}
        >
          <form className="position-relative w-100" onSubmit={handleSubmit}>
            {/* {!user.isAutomatic ? (
              <ClosedForm />
            ) : (
              !user.isAutomatic && (<ClosedForm />)()
            )} */}
            <ClosedForm user={user} fetchUserData={fetchUserData} />
            <div
              className="custom-scrollbar overflow-y-scroll overflow-x-hidden"
              style={{ height: "65dvh" }}
            >
              <AnimatePresence mode="wait" custom={direction}>
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={direction}
                  >
                    <Reminder
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                      privacyConsent={privacyConsent}
                      setPrivacyConsent={setPrivacyConsent}
                      setFormData={setFormData}
                      formData={formData}
                      handleChange={handleChange}
                    />
                  </motion.div>
                )}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={direction}
                  >
                    <Step1 formData={formData} handleChange={handleChange} />
                  </motion.div>
                )}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={direction}
                  >
                    <Step2 formData={formData} handleChange={handleChange} />
                  </motion.div>
                )}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={direction}
                  >
                    <Step3
                      docType={docType}
                      setDocType={setDocType}
                      setFile={setFile}
                      setInputsLength={setInputsLength}
                      inputsLength={inputsLength}
                      formData={formData}
                      handleChange={handleChange}
                      setHasSelection={setHasSelection}
                      setHasFile={setHasFile}
                      setHasInput={setHasInput}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <FormButtons
              formData={formData}
              prevStep={prevStep}
              nextStep={nextStep}
              currentStep={currentStep}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              privacyConsent={privacyConsent}
              isSelectionFilled={isSelectionFilled}
              isFileFilled={isFileFilled}
              isInputsFilled={isInputsFilled}
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
