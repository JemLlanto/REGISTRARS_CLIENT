import {
  Modal,
  InputGroup,
  Form,
  ToggleButton,
  Spinner,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Feedback from "react-bootstrap/esm/Feedback";
import ScheduleSlipForm from "./ScheduleSlipForm";

const ChangeStatusButton = ({
  user,
  showPhoneStatusModal,
  setShowPhoneStatusModal,
  documentDetails,
  fetchDocumentDetails,
}) => {
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [feedbackType, setFeedbackType] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isScheduled, setIsScheduled] = useState(documentDetails.isScheduled);

  useEffect(() => {
    if (documentDetails) {
      setFormData({
        requestID: documentDetails.requestID,
        newStatus:
          documentDetails.status === "pending"
            ? "processing"
            : documentDetails.status === "processing"
            ? "ready to pickup"
            : documentDetails.status === "ready to pickup"
            ? "completed"
            : documentDetails.status === "unclaimed"
            ? "completed"
            : null,
        userID: documentDetails.userID,
        receiverEmail: documentDetails.email,
        dateRelease: documentDetails.readyToReleaseDate
          ? new Date(documentDetails.readyToReleaseDate).toLocaleDateString(
              "en-CA"
            )
          : "",
        feedbackType: "",
      });
    }
  }, [documentDetails]);

  const handleShowChangeStatusModal = () => {
    setShowChangeStatusModal(true);
  };
  const handleCloseChangeStatusModal = () => {
    setShowChangeStatusModal(false);
  };

  const handleChangeStatusRequest = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/managingRequest/changeStatus`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.data.Status === "Success") {
        try {
          const emailRes = await axios.post(
            `${
              import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
            }/api/emailNotification/sendStatusUpdate`,
            formData
          );

          if (emailRes.status === 200) {
            console.log(emailRes.data.Message);
          } else {
            console.log(emailRes.data.Message);
          }
        } catch (emailErr) {
          console.log("An error occurred while sending email: ", emailErr);
        }

        await Swal.fire({
          title: "Success!",
          text: res.data.Message,
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });

        handleCloseChangeStatusModal();
        fetchDocumentDetails();
      } else if (res.data.Status === "Failed") {
        await Swal.fire({
          title: "Failed",
          text: res.data.Message,
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "Try Again",
        });
      }
    } catch (err) {
      console.log("Error changing status: ", err);
      await Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className="btn btn-success btn-sm btn-responsive d-none d-md-block"
        onClick={handleShowChangeStatusModal}
        disabled={
          documentDetails.status === "cancelled" ||
          documentDetails.status === "completed" ||
          documentDetails.status === "" ||
          !documentDetails.status
        }
      >
        {/* {formData.dateRelease} */}
        <p className="m-0">
          {documentDetails.status === "pending"
            ? "Processing"
            : documentDetails.status === "processing"
            ? "Ready to Pickup"
            : documentDetails.status === "ready to pickup"
            ? "Completed"
            : documentDetails.status === "cancelled"
            ? "Cancelled"
            : documentDetails.status === "unclaimed"
            ? "Completed"
            : "Claimed"}
        </p>
      </button>

      {/* <button
        className="btn btn-success btn-sm btn-responsive w-100 d-block d-md-none"
        onClick={() => setShowPhoneStatusModal(true)}
        disabled={
          documentDetails.status === "cancelled" ||
          documentDetails.status === "completed" ||
          documentDetails.status === "unclaimed" ||
          documentDetails.status === "" ||
          !documentDetails.status
        }
      >
        <p className="m-0">
          {documentDetails.status === "pending"
            ? "Processing"
            : documentDetails.status === "processing"
            ? "Ready to Pickup"
            : documentDetails.status === "ready to pickup"
            ? "Completed"
            : documentDetails.status === "unclaimed"
            ? "Unclaimed"
            : "Claimed"}
        </p>
      </button> */}

      <Modal
        show={showChangeStatusModal}
        onHide={handleCloseChangeStatusModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 className="m-0">Update request status</h5>{" "}
            {/* {documentDetails.userID} */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {documentDetails.status === "processing" ? (
            <>
              <div>
                <ScheduleSlipForm
                  formDataForReleaseDate={formData}
                  setFormDataForReleaseDate={setFormData}
                  isScheduled={isScheduled}
                  setIsScheduled={setIsScheduled}
                  documentDetails={documentDetails}
                  user={user}
                />
              </div>
              <div className="customToggleButton">
                <p className="m-0">Feedback Form Type</p>
                <div className="d-flex align-items-center gap-1">
                  <ToggleButton
                    type="radio"
                    id={`radioInternalButtons`}
                    label="Internal"
                    checked={formData.feedbackType === "internal"}
                    onClick={() =>
                      setFormData({ ...formData, feedbackType: "internal" })
                    }
                  >
                    Internal
                  </ToggleButton>
                  <ToggleButton
                    type="radio"
                    id={`radioExternalButtons`}
                    label="External"
                    checked={formData.feedbackType === "external"}
                    onClick={() =>
                      setFormData({ ...formData, feedbackType: "external" })
                    }
                  >
                    External
                  </ToggleButton>
                  <ToggleButton
                    type="radio"
                    id={`radioNoneButtons`}
                    label="None"
                    checked={formData.feedbackType === ""}
                    onClick={() =>
                      setFormData({ ...formData, feedbackType: "" })
                    }
                  >
                    None
                  </ToggleButton>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="m-0">
                Are you sure you want to mark this request as{" "}
                {documentDetails.status === "pending" ? (
                  <>being processed</>
                ) : documentDetails.status === "processing" ? (
                  <>ready to pickup</>
                ) : documentDetails.status === "ready to pickup" ? (
                  <>completed</>
                ) : documentDetails.status === "unclaimed" ? (
                  <>completed</>
                ) : (
                  <></>
                )}
                ?
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={handleCloseChangeStatusModal}
          >
            <p className="m-0">Back</p>
          </button>
          <button
            className="btn primaryButton d-flex justify-content-center align-items-center gap-1"
            onClick={handleChangeStatusRequest}
            disabled={
              (!isScheduled && documentDetails.status === "processing") ||
              isLoading
            }
          >
            {isLoading ? (
              <>
                <Spinner animation="border" variant="light" size="sm" />{" "}
                <p className="m-0">Saving...</p>
              </>
            ) : (
              <>
                <p className="m-0">Confirm</p>
              </>
            )}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChangeStatusButton;
