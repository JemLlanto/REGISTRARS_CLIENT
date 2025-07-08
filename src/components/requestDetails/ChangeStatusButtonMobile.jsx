import {
  Modal,
  InputGroup,
  Form,
  ToggleButton,
  Spinner,
  CloseButton,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ScheduleSlipForm from "./ScheduleSlipForm";

const ChangeStatusButtonMobile = ({
  user,
  show,
  handleClose,
  documentDetails,
  fetchDocumentDetails,
}) => {
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
            // console.log(emailRes.data.Message);
          } else {
            // console.log(emailRes.data.Message);
          }
        } catch (emailErr) {
          // console.log("An error occurred while sending email: ", emailErr);
        }

        await Swal.fire({
          title: "Success!",
          text: res.data.Message,
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });

        handleClose();
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
      // console.log("Error changing status: ", err);
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
      <div
        className={`${
          show ? "d-flex" : "d-none"
        } justify-content-center align-items-center position-fixed`}
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          height: "100%",
          width: "100%",
          zIndex: 1000,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        onClick={handleClose}
      >
        <div
          className={`d-flex flex-column justify-content-between align-items-center mx-2 overflow-hidden`}
          style={{
            // height: "clamp(150px, 88dvw, 300px)",x
            width: "clamp(300px, 95dvw, 500px)",
            backgroundColor: "rgba(255, 255, 255)",
            borderRadius: "10px",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="w-100">
            <div className="modal-header d-flex justify-content-between p-3">
              <h5 className="m-0">Update request status</h5>
              <CloseButton onClick={handleClose} />
            </div>

            {/* BODY */}
            <div className="modal-body p-3">
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
                        type="checkBox"
                        id={`checkBoxInternalButtons`}
                        label="Internal"
                        name="feedbackType"
                        value="internal"
                        checked={formData.feedbackType === "internal"}
                        onChange={() => {
                          setFormData({
                            ...formData,
                            feedbackType: "internal",
                          });
                        }}
                      >
                        Internal
                      </ToggleButton>
                      <ToggleButton
                        type="checkBox"
                        id={`checkBoxExternalButtons`}
                        label="External"
                        name="feedbackType"
                        value="external"
                        checked={formData.feedbackType === "external"}
                        onChange={() => {
                          setFormData({
                            ...formData,
                            feedbackType: "external",
                          });
                        }}
                      >
                        External
                      </ToggleButton>
                      <ToggleButton
                        type="checkBox"
                        id={`checkBoxNoneButtons`}
                        label="None"
                        name="feedbackType"
                        value=""
                        checked={formData.feedbackType === ""}
                        onChange={() => {
                          setFormData({ ...formData, feedbackType: "" });
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
                    {formData.dateRelease}
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
            </div>
          </div>

          <div className="w-100 d-flex justify-content-end align-items-center border-top gap-2 p-3">
            {/* FOOTER */}
            <button className="btn btn-secondary" onClick={handleClose}>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeStatusButtonMobile;
