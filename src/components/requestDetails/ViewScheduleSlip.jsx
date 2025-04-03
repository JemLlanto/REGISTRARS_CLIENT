import { Modal, FloatingLabel, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import InternalFeedbackTemplate from "./InternalFeedback/InternalFeedbackTemplate";
import ExternalFeedbackTemplate from "./ExternalFeedback/ExternalFeedbackTemplate";

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
      Swal.fire({
        icon: "info",
        title: "Feedback Required",
        text: "Kindly complete our feedback form to access the schedule slip.",
        confirmButtonText: "OK",
      }).then(() => {
        setShowFeedbackModal(true);
      });
    }
  };
  const handleCloseScheduleModal = () => setShowScheduleModal(false);

  // Add this function to your component
  const handleDownloadImage = async () => {
    try {
      // Get the image URL
      const imageUrl = `${documentDetails.cloudinary_url}`;

      // Fetch the image as a blob
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();

      // Create a blob URL
      const blobUrl = window.URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement("a");

      // Set the href to the blob URL
      link.href = blobUrl;

      // Set the download attribute with a filename
      link.download = `${documentDetails.lastName}-${documentDetails.requestID}-schedule-slip.jpg`;

      // Append to the document
      document.body.appendChild(link);

      // Trigger the click event
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      Swal.fire({
        title: "Download Failed",
        text: "Could not download the image. Please try again later.",
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
        disabled={documentDetails.status === "completed"}
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
        <Modal.Body style={{ height: "25rem" }}>
          <div
            className="d-flex align-items-center justify-content-center gap-3"
            style={{ width: "100%", height: "100%" }}
          >
            <img
              src={documentDetails.cloudinary_url}
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
            <p className="m-0">Back</p>
          </button>
          <button className="btn primaryButton" onClick={handleDownloadImage}>
            <p className="m-0">Download</p>
          </button>
        </Modal.Footer>
      </Modal>
      {documentDetails.feedbackType === "internal" ? (
        <InternalFeedbackTemplate
          fetchDocumentDetails={fetchDocumentDetails}
          documentDetails={documentDetails}
          showScheduleModal={showScheduleModal}
          setShowScheduleModal={setShowScheduleModal}
          showFeedbackModal={showFeedbackModal}
          setShowFeedbackModal={setShowFeedbackModal}
        />
      ) : (
        <ExternalFeedbackTemplate
          fetchDocumentDetails={fetchDocumentDetails}
          documentDetails={documentDetails}
          showScheduleModal={showScheduleModal}
          setShowScheduleModal={setShowScheduleModal}
          showFeedbackModal={showFeedbackModal}
          setShowFeedbackModal={setShowFeedbackModal}
        />
      )}
    </>
  );
};

export default ViewScheduleSlip;
