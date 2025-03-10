import { Modal, FloatingLabel, Form } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";

const CancelButton = ({ documentDetails, fetchDocumentDetails }) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [formData, setFormData] = useState({
    requestID: documentDetails.requestID,
    reason: "",
  });

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
        className=" btn btn-danger"
        onClick={handleShowCancelModal}
        disabled={
          documentDetails.status === "canceled" ||
          documentDetails.status != "pending"
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
          >
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CancelButton;
