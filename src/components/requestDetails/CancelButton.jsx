import { Modal, FloatingLabel, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const CancelButton = ({ documentDetails, fetchDocumentDetails }) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
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

  const handleShowCancelModal = () => setShowCancelModal(true);
  const handleCloseCancelModal = () => setShowCancelModal(false);

  const handleCancelRequest = async () => {
    try {
      console.log("Sending cancellation request with data:", formData); // Debugging log

      const res = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/managingRequest/cancelRequest`,
        formData
      );

      if (res.data.Status === "Success") {
        try {
          await axios.post(
            `${
              import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
            }/api/emailNotification/sendStatusUpdate`,
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
          setShowCancelModal(false);
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
        className="btn btn-danger btn-sm btn-responsive"
        onClick={handleShowCancelModal}
        disabled={
          documentDetails.status === "cancelled" ||
          documentDetails.status !== "pending"
        }
      >
        Cancel
      </button>

      <Modal show={showCancelModal} onHide={handleCloseCancelModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 className="m-0">Cancel this request</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingTextarea2"
            label={`Reason ${formData.reason?.length}/150`}
          >
            <Form.Control
              as="textarea"
              placeholder="Enter the reason for cancelation."
              style={{ height: "100px" }}
              name="reason"
              maxLength={150}
              onChange={(e) => {
                if (e.target.value.length <= 150) {
                  setFormData({ ...formData, reason: e.target.value });
                }
              }}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={handleCloseCancelModal}
          >
            <p className="m-0">Back</p>
          </button>
          <button
            className="btn primaryButton"
            onClick={() => handleCancelRequest(documentDetails.requestID)}
            disabled={formData.reason === ""}
          >
            <p className="m-0">Confirm</p>
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CancelButton;
