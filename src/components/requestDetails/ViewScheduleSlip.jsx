import { Modal, FloatingLabel, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import InternalFeedbackTemplate from "./InternalFeedback/InternalFeedbackTemplate";

const ViewScheduleSlip = ({ documentDetails, fetchDocumentDetails }) => {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (documentDetails) {
      setFormData({
        requestID: documentDetails.requestID,
        reason: "",
        newStatus: "cancelled",
        userID: documentDetails.userID,
        receiverEmail: documentDetails.email,
      });
    }
  }, [documentDetails]);

  const handleShowScheduleModal = () => {
    if (documentDetails.responded) {
      setShowScheduleModal(true);
    } else {
      alert("Kindly complete our feedback form to access the schedule slip.");
      setShowFeedbackModal(true);
    }
  };
  const handleCloseScheduleModal = () => setShowScheduleModal(false);

  const handleCancelRequest = async () => {
    try {
      console.log("Sending cancellation request with data:", formData); // Debugging log

      const res = await axios.post(
        "http://localhost:5000/api/managingRequest/cancelRequest",
        formData
      );

      if (res.data.Status === "Success") {
        try {
          await axios.post(
            "http://localhost:5000/api/emailNotification/sendStatusUpdate",
            formData
          );
        } catch (emailErr) {
          console.log("Email notification error:", emailErr);
        }

        Swal.fire({
          title: "Request Cancelled!",
          text: res.data.Message,
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then(() => {
          setShowScheduleModal(false);
          setFormData({ requestID: "", reason: "" }); // Reset form data
          fetchDocumentDetails();
        });
      } else {
        Swal.fire({
          title: "Cancellation Failed",
          text: res.data.Message,
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "Try Again",
        });
      }
    } catch (err) {
      console.error("Error canceling request:", err);

      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <>
      <button
        className="btn btn-warning btn-sm btn-responsive"
        onClick={handleShowScheduleModal}
      >
        View schedule slip
      </button>

      <Modal
        show={showScheduleModal}
        onHide={handleCloseScheduleModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h4 className="m-0">Schedule slip </h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="d-flex align-items-center justify-content-center gap-3"
            style={{ width: "20rem", height: "20rem" }}
          >
            <img
              src={`http://localhost:5000/scheduleSlipUploads/${documentDetails.scheduleSlip}`}
              alt="Document"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "0.5rem",
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={handleCloseScheduleModal}
          >
            Back
          </button>
          <button
            className="btn btn-primary"
            // onClick={() => handleCancelRequest(documentDetails.requestID)}
            disabled={formData.reason === ""}
          >
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
      {documentDetails.feedbackType === "internal" ? (
        <InternalFeedbackTemplate
          documentDetails={documentDetails}
          showScheduleModal={showScheduleModal}
          setShowScheduleModal={setShowScheduleModal}
          showFeedbackModal={showFeedbackModal}
          setShowFeedbackModal={setShowFeedbackModal}
        />
      ) : null}
    </>
  );
};

export default ViewScheduleSlip;
