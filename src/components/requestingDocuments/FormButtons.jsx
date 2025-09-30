import React from "react";
import { Button, Spinner } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import RequestInfoModal from "./RequestInfoModal";
import { useEffect } from "react";

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
  setFile,
  hasInput,
  inputs,
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
    // setDocType([]);
    fetchUserData();
    setHasSelection(false);
    setHasFile(false);
    setHasInput(false);
    setFile([]);
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

  useEffect(() => {
    setDocType("");
    setFile([]);
  }, [formData.purpose]);
  // const upload = async () => {
  //   // console.log("Inserting Files...");

  //   const data = new FormData();
  //   data.append("requestID", formData.requestID);
  //   data.append("file", file);
  //   try {
  //     const res = await axios.post(
  //       `${
  //         import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
  //       }/api/documents/uploadDocuments`,
  //       data,
  //       { headers: { "Content-Type": "multipart/form-data" } }
  //     );
  //     if (res.data.Status === "Success") {
  //       // console.log("Document files Submitted!");
  //     }
  //   } catch (err) {
  //     // console.log(err);
  //     throw err;
  //   }
  // };
  // Helper function to upload a single file

  const uploadAllFiles = async () => {
    // console.log("Uploading files...");

    // Get all files from your files object
    const fileEntries = Object.entries(file);

    console.log("Files to upload:", fileEntries);

    if (fileEntries.length === 0) {
      // console.log("No files to upload");
      return;
    }

    // Create upload promises for each file
    const uploadPromises = fileEntries.map(([uploadID, fileData]) => {
      // fileData is an object like {description: "...", file: FileObject}
      const actualFile = fileData.file; // Extract the actual File object

      console.log(`Uploading file for uploadID ${uploadID}:`, actualFile.name);

      return uploadSingleFile(actualFile, uploadID); // Pass the actual File object
    });

    try {
      // Execute all uploads concurrently
      const results = await Promise.all(uploadPromises);
      // console.log("All files uploaded successfully:", results);

      // Handle success - maybe show success message
      // Swal.fire({
      //   icon: "success",
      //   title: "Upload Complete",
      //   text: `Successfully uploaded ${results.length} files.`,
      // });

      return results;
    } catch (error) {
      console.error("One or more uploads failed:", error);

      // Handle error
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Some files failed to upload. Please try again.",
      });

      throw error;
    }
  };
  const uploadSingleFile = async (file, uploadID) => {
    const data = new FormData();
    data.append("requestID", formData.requestID);
    data.append("uploadID", uploadID); // Add uploadID to identify which upload this is
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
        console.log(`File ${uploadID} uploaded successfully`);
        return { uploadID, success: true, data: res.data };
      }
    } catch (err) {
      console.error(`Failed to upload file ${uploadID}:`, err.message);
      return { uploadID, success: false, error: err };
    }
  };
  const insertDocTypes = async () => {
    // console.log("Inserting DocTypes...");

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
        // console.log("Document type/s Submitted!");
      }
      // // console.log("Insert response:", res.data);
      // return res.data;
    } catch (err) {
      // console.log("Error inserting document types:", err);
      throw err;
    }
  };
  const insertInputs = async () => {
    // console.log("Inserting Data...");

    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/documents/insertInputs`,
        formData
      );
      if (res.data.Status === "Success") {
        // console.log("Inputs Submitted!");
      }
      // // console.log(response.data);
    } catch (error) {
      console.error("Error inserting inputs:", error);
    }
  };
  const sendEmail = async () => {
    // console.log("Sending email...");

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
        // console.log(emailRes.data.message);
        // alert(emailRes.data.message);
      }
    } catch (emailErr) {
      // console.log("An error occurred while sending email: ", emailErr);
      // alert("An error occurred while sending email: ", emailErr.err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isConfirmed = await Swal.fire({
      title: "Are you sure? Changes cannot be made afterward.",
      text: "I verify that the data I am about to submit is accurate to the best of my knowledge.",
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
          await uploadAllFiles();
        }

        Swal.update({ text: "Finalizing..." });
        Swal.showLoading();
        sendEmail();
        await new Promise((resolve) => setTimeout(resolve, 3000));

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
    if (Object.keys(hasFile).length === 0) {
      return true;
    }
    return hasFile.length === Object.keys(file).length;
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

  // const isFormValid = () => {
  //   return isSelectionFilled() && isFileFilled() && isInputsFilled();
  // };

  // console.log("isFormValid:", isFormValid());

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
        <>
          <RequestInfoModal
            handleSubmit={handleSubmit}
            formData={formData}
            inputsLength={inputsLength}
            inputs={inputs}
            docType={docType}
            file={file}
            isSelectionFilled={isSelectionFilled}
            isFileFilled={isFileFilled}
            isInputsFilled={isInputsFilled}
            isLoading={isLoading}
            hasSelection={hasSelection}
            hasFile={hasFile}
            hasInput={hasInput}
          />
        </>
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
