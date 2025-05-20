import React from "react";
import { Button, Spinner } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const FormButtons = ({
  fetchUserData,
  requestID,
  formData,
  currentStep,
  isLoading,
  inputsLength,
  docType,
  file,
  hasSelection,
  hasFile,
  hasInput,
  setInputsLength,
  setHasSelection,
  setHasFile,
  setHasInput,
  setDocType,
  setCurrentStep,
  setFormData,
  setDirection,
  setIsLoading,
}) => {
  const navigate = useNavigate();
  // Function to go to the next step
  const nextStep = () => {
    setDirection(1);
    fetchUserData();
    setCurrentStep((prevStep) => prevStep + 1);
    setFormData((prevData) => {
      const updatedData = { ...prevData, currentStep: currentStep + 1 };

      // Save to localStorage
      const cookieConsent = localStorage.getItem("cookieConsent");
      if (cookieConsent === "accepted") {
        localStorage.setItem("formData", JSON.stringify(updatedData));
      }

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
      const cookieConsent = localStorage.getItem("cookieConsent");
      if (cookieConsent === "accepted") {
        localStorage.setItem("formData", JSON.stringify(updatedData));
      }

      return updatedData;
    });
  };

  const upload = async () => {
    console.log("Inserting Files...");

    const data = new FormData();
    data.append("requestID", formData.requestID);
    data.append("file", file);
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/documents/uploadDocuments`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (res.data.Status === "Success") {
        console.log("Document files Submitted!");
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  const insertDocTypes = async () => {
    console.log("Inserting DocTypes...");

    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/documents/insertDocTypes`,
        {
          documentTypes: docType,
          requestID: requestID,
        }
      );
      if (res.data.Status === "Success") {
        console.log("Document type/s Submitted!");
      }
      // console.log("Insert response:", res.data);
      // return res.data;
    } catch (err) {
      console.log("Error inserting document types:", err);
      throw err;
    }
  };
  const insertInputs = async () => {
    console.log("Inserting Data...");

    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/documents/insertInputs`,
        formData
      );
      if (res.data.Status === "Success") {
        console.log("Inputs Submitted!");
      }
      // console.log(response.data);
    } catch (error) {
      console.error("Error inserting inputs:", error);
    }
  };
  const sendEmail = async () => {
    console.log("Sending email...");

    try {
      const emailRes = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/emailNotification/sendNewRequestEmail`,
        formData
      );

      if (emailRes.status === 200) {
        // alert(emailRes.data.message);
        // alert(emailRes.data.message);
      } else {
        console.log(emailRes.data.message);
        // alert(emailRes.data.message);
      }
    } catch (emailErr) {
      console.log("An error occurred while sending email: ", emailErr);
      // alert("An error occurred while sending email: ", emailErr.err);
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

      Swal.fire({
        title: "Submitting...",
        text: "Please wait while we process your request.",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/documents/sendRequest`,
        formData
      );

      if (response.data.Status === "Success") {
        if (inputsLength > 0) {
          Swal.update({
            text: "Submitting answers...",
          });
          Swal.showLoading();
          await insertInputs();
        }
        if (docType) {
          Swal.update({ text: "Submitting document types..." });
          Swal.showLoading();
          await insertDocTypes();
        }
        if (file) {
          Swal.update({ text: "Uploading files..." });
          Swal.showLoading();
          await upload();
        }

        Swal.update({ text: "Finalizing..." });
        Swal.showLoading();
        await sendEmail();

        Swal.update({ text: "Email sent..." });
        Swal.showLoading();

        Swal.fire({
          title: "Success!",
          text: "Requested document successfully",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          localStorage.removeItem("formData");
          navigate("/home");
        });
      } else {
        Swal.update({
          title: "Error!",
          text: "Failed to request document. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
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
          text: `Failed to request document. Please try again. ${error.messagex}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } finally {
      setIsLoading(false);
    }
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
    <div className="d-flex justify-content-between gap-2 mt-3">
      <Button
        type="button"
        className="btn btn-secondary"
        onClick={prevStep}
        disabled={currentStep === 1}
        style={{ opacity: currentStep === 1 ? 0 : 1, width: "10rem" }}
      >
        <p className="m-0 d-flex align-items-center justify-content-center">
          <i className="bx bx-chevrons-left"></i> Back
        </p>
      </Button>
      {currentStep === 4 ? (
        <button
          type="button"
          className="primaryButton btn d-flex align-items-center justify-content-center gap-1"
          onClick={handleSubmit}
          disabled={
            !(isSelectionFilled() && isFileFilled() && isInputsFilled())
          }
          style={{ width: "10rem" }}
        >
          {isLoading ? (
            <>
              <Spinner animation="border" variant="light" size="sm" />
              <p className="m-0 ">Submitting...</p>
            </>
          ) : (
            <p className="m-0 ">Submit</p>
          )}
        </button>
      ) : (
        <button
          type="button"
          className="primaryButton btn"
          onClick={nextStep}
          disabled={
            currentStep === 1
              ? formData.agree === "no"
              : currentStep === 2
              ? !formData.email ||
                !formData.studentID ||
                !formData.firstName ||
                !formData.lastName ||
                !formData.dateOfBirth ||
                !formData.sex ||
                formData.mobileNum === "+63"
              : currentStep === 3
              ? !formData.program ||
                !formData.classification ||
                (formData.classification === "graduated" &&
                  !formData.yearGraduated) ||
                (formData.classification === "undergraduate" &&
                  !formData.yearLevel) ||
                formData.schoolYearAttended < 1900 ||
                !formData.purpose
              : false
          }
          style={{ width: "10rem" }}
        >
          <p className="m-0 d-flex align-items-center justify-content-center">
            Next Step <i className="bx bx-chevrons-right"></i>
          </p>
        </button>
      )}
    </div>
  );
};

export default FormButtons;
