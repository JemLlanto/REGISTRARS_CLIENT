import { Modal, FloatingLabel, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";

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

  const handleShowCancelModal = () => {
    setShowCancelModal(true);
  };
  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
  };
  const handleCancelRequest = () => {
    axios
      .post("http://localhost:5000/api/managingRequest/cancelRequest", formData)
      .then((res) => {
        if (res.data.Status === "Success") {
          // FOR SENDING EMAIL TO THE USER
          axios
            .post(
              "http://localhost:5000/api/emailNotification/sendStatusUpdate",
              formData
            )
            .then((res) => {
              if (res.status === 200) {
                console.log(res.data.Message);
              } else {
                console.log(res.data.Message);
              }
            })
            .catch((err) => {
              console.log("An error occured: ", err);
            });
          handleCloseCancelModal();
          alert(res.data.Message);
          setFormData({
            requestID: "",
            reason: "",
          });
          fetchDocumentDetails();
        } else if (res.data.Status === "Failed") {
          alert(res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error canceling request: ", err);
      });
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
          <Modal.Title>Cancel this request.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingTextarea2" label="Reason">
            <Form.Control
              as="textarea"
              placeholder="Enter the reason for cancelation."
              style={{ height: "100px" }}
              name="reason"
              onChange={(e) => {
                setFormData({ ...formData, reason: e.target.value });
              }}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={handleCloseCancelModal}
          >
            Back
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleCancelRequest(documentDetails.requestID)}
            disabled={formData.reason === ""}
          >
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CancelButton;
