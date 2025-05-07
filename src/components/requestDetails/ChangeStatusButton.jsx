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

const ChangeStatusButton = ({
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
            : null,
        userID: documentDetails.userID,
        receiverEmail: documentDetails.email,
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

  const uploadScheduleSlip = async () => {
    const data = new FormData();
    data.append("requestID", formData.requestID);
    data.append("feedbackType", formData.feedbackType);
    data.append("file", file);
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/documents/uploadScheduleSlip`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return res.data;
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
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

      if (file) {
        await uploadScheduleSlip();
      }
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Allowed file types
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];
    const maxSize = 1 * 1024 * 1024; // 1MB

    if (file.size > maxSize) {
      Swal.fire({
        icon: "warning",
        title: "File Too Large",
        text: "File size should not exceed 1MB.",
      });
      setFile(null);
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      Swal.fire({
        icon: "error",
        title: "Invalid File Type",
        text: "Only JPEG, JPG, and PDF files are allowed.",
      });
      setFile(null);
      return;
    }

    setFile(file);
  };

  return (
    <>
      <button
        className="btn btn-success btn-sm btn-responsive d-none d-md-block"
        onClick={handleShowChangeStatusModal}
        disabled={
          documentDetails.status === "cancelled" ||
          documentDetails.status === "completed"
        }
      >
        <p className="m-0">
          {documentDetails.status === "pending"
            ? "Processing"
            : documentDetails.status === "processing"
            ? "Ready to Pickup"
            : documentDetails.status === "ready to pickup"
            ? "Completed"
            : documentDetails.status === "cancelled"
            ? "Cancelled"
            : "Claimed"}
        </p>
      </button>

      <button
        className="btn btn-success btn-sm btn-responsive w-100 d-block d-md-none"
        onClick={() => setShowPhoneStatusModal(true)}
        disabled={
          documentDetails.status === "cancelled" ||
          documentDetails.status === "completed"
        }
      >
        <p className="m-0">
          {documentDetails.status === "pending"
            ? "Processing"
            : documentDetails.status === "processing"
            ? "Ready to Pickup"
            : documentDetails.status === "ready to pickup"
            ? "Completed"
            : "Claimed"}
        </p>
      </button>

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
                <p className="m-0">
                  Upload Schedule Slip (JPG, JPEG, PNG or PDF, up to 1MB){" "}
                  {/* {file && file.size} */}
                </p>

                <InputGroup className="mb-3">
                  <Form.Control
                    type="file"
                    placeholder="ScheduleSlip"
                    aria-label="ScheduleSlip"
                    aria-describedby="basic-addon1"
                    onChange={(e) => handleFileChange(e)}
                  />
                </InputGroup>
              </div>
              <div className="customToggleButton">
                <p className="m-0">Feedback Form Type</p>
                <div className="d-flex align-items-center gap-1">
                  <ToggleButton
                    type="radio"
                    id={`radioInternalButtons`}
                    label="Internal"
                    checked={formData.feedbackType === "internal"}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, feedbackType: "internal" });
                      } else {
                        setFormData({ ...formData, feedbackType: "" });
                      }
                    }}
                  >
                    Internal
                  </ToggleButton>
                  <ToggleButton
                    type="radio"
                    id={`radioExternalButtons`}
                    label="External"
                    checked={formData.feedbackType === "external"}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, feedbackType: "external" });
                      } else {
                        setFormData({ ...formData, feedbackType: "" });
                      }
                    }}
                  >
                    External
                  </ToggleButton>
                  <ToggleButton
                    type="radio"
                    id={`radioNoneButtons`}
                    label="None"
                    checked={formData.feedbackType === ""}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, feedbackType: "" });
                      } else {
                        setFormData({ ...formData, feedbackType: "" });
                      }
                    }}
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
            onClick={() => handleChangeStatusRequest()}
            disabled={
              (documentDetails.status === "processing" && !file) || isLoading
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
