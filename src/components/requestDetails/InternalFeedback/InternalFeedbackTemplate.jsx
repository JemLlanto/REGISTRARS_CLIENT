import React, { useEffect, useState } from "react";
import RatingStep from "./RatingStep";
import { Modal, Spinner } from "react-bootstrap";
import axios from "axios";
import CommentsStep from "./CommentsStep";
import Swal from "sweetalert2";

const InternalFeedbackTemplate = ({
  fetchScheduleSlipData,
  fetchDocumentDetails,
  documentDetails,
  showFeedbackModal,
  setShowFeedbackModal,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    ratings: {
      courtesy: "",
      service_quality: "",
      service_timeliness: "",
      service_efficiency: "",
      physical_cleanliness: "",
      physical_comfort: "",
    },
  });

  useEffect(() => {
    if (documentDetails) {
      setFormData({
        requestID: documentDetails.requestID,
        userID: documentDetails.userID,
        ratings: {
          courtesy: "",
          service_quality: "",
          service_timeliness: "",
          service_efficiency: "",
          physical_cleanliness: "",
          physical_comfort: "",
        },
        comments: "",
        email: documentDetails.email,
        program: documentDetails.program,
        firstName: documentDetails.firstName,
        lastName: documentDetails.lastName,
      });
    }
  }, [documentDetails]);

  const handleCloseFeedbackModal = () => {
    setShowFeedbackModal(false);
  };

  // Modal control functions
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("rating-")) {
      const ratingKey = name.replace("rating-", "");
      setFormData({
        ...formData,
        ratings: {
          ...formData.ratings,
          [ratingKey]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const submitFeedback = async () => {
    try {
      setIsLoading(true);
      const payload = {
        requestID: formData.requestID,
        userID: formData.userID,
        ...formData.ratings, // Flatten ratings object
        comments: formData.comments,
      };

      const res = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/feedbackForm/submitFeedbackInternal`,
        payload
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
          requestID: documentDetails.requestID,
          userID: documentDetails.userID,
          ratings: {
            courtesy: "",
            service_quality: "",
            service_timeliness: "",
            service_efficiency: "",
            physical_cleanliness: "",
            physical_comfort: "",
          },
          comments: "",
        });
        fetchDocumentDetails();
        fetchScheduleSlipData();

        Swal.fire({
          icon: "success",
          title: "Feedback Submitted",
          text: res.data.message,
          confirmButtonText: "OK",
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

  const allFilled = Object.values(formData?.ratings).every(
    (value) => value !== ""
  );

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
        <Modal.Body className="p-1 p-md-4">
          <div
            className="custom-scrollbar overflow-x-hidden overflow-y-scroll p-1"
            style={{ height: "25rem" }}
          >
            <RatingStep formData={formData} handleChange={handleChange} />
            <CommentsStep formData={formData} handleChange={handleChange} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn primaryButton d-flex justify-content-center align-items-center gap-1"
            onClick={submitFeedback}
            disabled={!allFilled || isLoading}
          >
            {isLoading ? (
              <>
                <Spinner animation="border" variant="light" size="sm" />
                <p className="m-0">Submitting...</p>
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

export default InternalFeedbackTemplate;
