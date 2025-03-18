import { Modal, FloatingLabel, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";


const ChangeStatusButton = ({ documentDetails, fetchDocumentDetails }) => {
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (documentDetails) {
      setFormData({
        requestID: documentDetails.requestID,
        newStatus:
          documentDetails.status === "pending"
            ? "processing"
            : documentDetails.status === "processing"
              ? "completed"
              : null,
        userID: documentDetails.userID,
        receiverEmail: documentDetails.email,
      });
    }
  }, [documentDetails]);

  const handleShowChangeStatusModal = () => {
    setShowChangeStatusModal(true);
  };
  const handleCloseChangeStatusModal = () => {
    setShowChangeStatusModal(false);
  };
  const handleChangeStatusRequest = () => {
    axios
      .post(
        "http://localhost:5000/api/managingRequest/changeStatus",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
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
              console.log("An error occurred: ", err);
            });

          Swal.fire({
            title: "Success!",
            text: res.data.Message,
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          }).then(() => {
            handleCloseChangeStatusModal();
            fetchDocumentDetails();
          });
        } else if (res.data.Status === "Failed") {
          Swal.fire({
            title: "Failed",
            text: res.data.Message,
            icon: "error",
            confirmButtonColor: "#d33",
            confirmButtonText: "Try Again",
          });
        }
      })
      .catch((err) => {
        console.log("Error canceling request: ", err);
        Swal.fire({
          title: "Error",
          text: "Something went wrong. Please try again later.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      });

  };
  return (
    <>
      <button
        className="btn btn-success btn-sm btn-responsive"
        onClick={handleShowChangeStatusModal}
        disabled={
          documentDetails.status === "cancelled" ||
          documentDetails.status === "completed"
        }
      >
        Mark as{" "}
        {documentDetails.status === "pending" ? "Processing" : "Completed"}
      </button>

      <Modal
        show={showChangeStatusModal}
        onHide={handleCloseChangeStatusModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Notice!
            {documentDetails.userID}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>
            Are you sure you want to mark this request as{" "}
            {documentDetails.status === "pending" ? (
              <>being processed</>
            ) : (
              <>completed</>
            )}
            ?
          </h5>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={handleCloseChangeStatusModal}
          >
            Back
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleChangeStatusRequest()}
          >
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChangeStatusButton;
