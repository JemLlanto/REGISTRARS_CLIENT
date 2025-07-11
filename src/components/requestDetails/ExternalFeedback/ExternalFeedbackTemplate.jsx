import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import axios from "axios";
import CitizensCharterStep from "./Citizen";
import PersonalInfoStep from "./Personal";
import SQDFormComponent from "./SQDForm";
import Swal from "sweetalert2";

const ExternalFeedbackTemplate = ({
  fetchScheduleSlipData,
  fetchDocumentDetails,
  documentDetails,
  showFeedbackModal,
  setShowFeedbackModal,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (documentDetails) {
      setFormData({
        requestID: documentDetails.requestID,
        userID: documentDetails.userID,
        // Step 1 data
        cc1: "",
        cc2: "",
        cc3: "",
        // Step 2 data
        clientType: "",
        date: new Date().toISOString().split("T")[0], // Formats as "YYYY-MM-DD"
        sex: "",
        age: "",
        serviceAvailed: "",
        // Step 3 (SQD) data
        sqd0: "",
        sqd1: "",
        sqd2: "",
        sqd3: "",
        sqd4: "",
        sqd5: "",
        sqd6: "",
        sqd7: "",
        sqd8: "",
        suggestions: "",
        email: documentDetails.email,
        program: documentDetails.program,
        purpose: documentDetails.purpose,
        firstName: documentDetails.firstName,
        lastName: documentDetails.lastName,
      });
    }
  }, [documentDetails]);

  const handleCloseFeedbackModal = () => {
    setShowFeedbackModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        [name]: isNaN(value) ? value : Number(value), // Convert only numbers
      };

      // If cc1 is 4, set cc2 and cc3 to 5
      if (updatedFormData.cc1 === 4) {
        updatedFormData.cc2 = 5;
        updatedFormData.cc3 = 4;
      }

      return updatedFormData;
    });
  };

  const submitFeedback = async () => {
    try {
      setIsLoading(true);

      const res = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/feedbackForm/submitFeedbackExternal`,
        formData
      );

      if (res.status === 200) {
        try {
          const emailRes = await axios.post(
            `${
              import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
            }/api/emailNotification/sendFeedbackResponseEmail`,
            formData
          );

          if (emailRes.status === 200) {
            // console.log(emailRes.data.message);
          } else {
            // console.log(emailRes.data.message);
          }
        } catch (emailErr) {
          // console.log("An error occurred while sending email: ", emailErr);
        }

        handleCloseFeedbackModal();
        setFormData({
          // Step 1 data
          cc1: "",
          cc2: "",
          cc3: "",
          // Step 2 data
          clientType: "",
          date: new Date().toISOString().split("T")[0], // Formats as "YYYY-MM-DD"
          sex: "",
          age: "",
          serviceAvailed: "",
          // Step 3 (SQD) data
          sqd0: "",
          sqd1: "",
          sqd2: "",
          sqd3: "",
          sqd4: "",
          sqd5: "",
          sqd6: "",
          sqd7: "",
          sqd8: "",
          suggestions: "",
        });
        fetchDocumentDetails();
        fetchScheduleSlipData();

        Swal.fire({
          icon: "success",
          title: "Feedback Submitted",
          text: res.data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: res.data.message,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          "An error occurred: " + (err.response?.data?.error || err.message),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const step1Complete =
    formData.clientType &&
    formData.date &&
    formData.sex &&
    formData.age &&
    formData.serviceAvailed;
  const step2Complete = formData.cc1 && formData.cc2 && formData.cc3;
  const step3Complete =
    formData.sqd0 &&
    formData.sqd1 &&
    formData.sqd2 &&
    formData.sqd3 &&
    formData.sqd4 &&
    formData.sqd5 &&
    formData.sqd6 &&
    formData.sqd7 &&
    formData.sqd8;

  return (
    <>
      <Modal
        show={showFeedbackModal}
        onHide={handleCloseFeedbackModal}
        centered
        size="lg"
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "var(--main-color)" }}
        >
          <Modal.Title>
            <h5 className="m-0 text-white">Client Satisfaction Measurement</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-2 p-lg-4">
          <div
            className="custom-scrollbar overflow-x-hidden overflow-y-scroll"
            style={{ height: "25rem" }}
          >
            {currentStep === 1 && (
              <PersonalInfoStep
                formData={formData}
                handleChange={handleChange}
              />
            )}
            {currentStep === 2 && (
              <CitizensCharterStep
                formData={formData}
                setFormData={setFormData}
                handleChange={handleChange}
              />
            )}
            {currentStep === 3 && (
              <SQDFormComponent
                documentDetails={documentDetails}
                formData={formData}
                handleChange={handleChange}
              />
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {currentStep > 1 && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={prevStep}
            >
              <p className="m-0">Previous</p>
            </button>
          )}

          <button
            type="button"
            className="btn primaryButton px-4 d-flex justify-content-center align-items-center gap-1"
            onClick={currentStep < 3 ? nextStep : submitFeedback}
            disabled={
              currentStep === 1
                ? !step1Complete
                : currentStep === 2
                ? !step2Complete
                : currentStep === 3
                ? !step3Complete || isLoading
                : false
            }
          >
            {isLoading ? (
              <>
                <Spinner animation="border" variant="light" size="sm" />
                <p className="m-0">Saving...</p>
              </>
            ) : currentStep < 3 ? (
              <>
                <p className="m-0">Next</p>
              </>
            ) : (
              <>
                <p className="m-0">Submit</p>
              </>
            )}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ExternalFeedbackTemplate;
