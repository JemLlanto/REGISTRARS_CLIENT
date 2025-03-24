import React, { useEffect, useState } from "react";
import RatingStep from "./RatingStep";
import { Modal } from "react-bootstrap";
import axios from "axios";
import CommentsStep from "./CommentsStep";

const InternalFeedbackTemplate = ({
  fetchDocumentDetails,
  documentDetails,
  showScheduleModal,
  setShowScheduleModal,
  showFeedbackModal,
  setShowFeedbackModal,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});

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

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    // Reset form data when closing modal
    // setFormData({
    //   requestID: "",
    //   userID: "",
    //   ratings: {
    //     courtesy: "",
    //     service_quality: "",
    //     service_timeliness: "",
    //     service_efficiency: "",
    //     physical_cleanliness: "",
    //     physical_comfort: "",
    //   },
    //   comments: "",
    // });
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
        "http://localhost:5000/api/feedbackForm/submitFeedbackInternal",
        payload
      );
      if (res.status === 200) {
        try {
          const emailRes = await axios.post(
            "http://localhost:5000/api/emailNotification/sendFeedbackResponseEmail",
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
        alert(res.data.message);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("An error occured: " + (err.response?.data?.error || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        show={showFeedbackModal}
        onHide={handleCloseFeedbackModal}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h4 className="m-0">Client Satisfaction Measurement(Internal)</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="overflow-x-hidden overflow-y-scroll"
            style={{ height: "30rem" }}
          >
            <RatingStep formData={formData} handleChange={handleChange} />
            <CommentsStep formData={formData} handleChange={handleChange} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={submitFeedback}>
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default InternalFeedbackTemplate;
