import axios from "axios";
import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import CancelButton from "../../components/requestDetails/CancelButton";
import ChangeStatusButton from "../../components/requestDetails/ChangeStatusButton";
import RequestInfo from "../../components/requestDetails/RequestInfo";
import ViewScheduleSlip from "../../components/requestDetails/ViewScheduleSlip";
import InternalFeedbackDownload from "../../components/DownloadButton/InternalFeedbackDownload";
import ExternalFeedbackDownload from "../../components/DownloadButton/ExternalFeedbackDownload";
import DocumentFileModal from "../../components/requestDetails/DocumentFileModal";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const RequestDetails = () => {
  const { user } = useOutletContext();
  const { requestID } = useParams();
  const [documentDetails, setDocumentDetails] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [documentInputValues, setDocumentInputValues] = useState([]);
  const [documentInputs, setDocumentInputs] = useState([]);
  const [documentFile, setDocumentFile] = useState(null);

  const fetchDocumentDetails = () => {
    axios
      .get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/fetchingDocuments/fetchRequestedDocumentsDetails/${requestID}`
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.data);
          setDocumentDetails(res.data.data);
        } else if (res.data.Message) {
          console.log("Error: ", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error fetching details: ", err);
      });
  };

  // FETCHING DOCUMENT DETAILS
  useEffect(() => {
    if (requestID) {
      fetchDocumentDetails();
    }
  }, [requestID]);
  //FETCHING DOCUMENT TYPES
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/fetchingDocuments/fetchRequestedDocumentTypes/${requestID}`
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.data);
          setDocumentTypes(res.data.data);
        } else if (res.data.Message) {
          console.log("Error: ", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error fetching details: ", err);
      });
  }, [requestID]);
  //FETCHING DOCUMENT FILES
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/fetchingDocuments/fetchRequestedDocumentFiles/${requestID}`
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          setDocumentFile(res.data.data);
        } else if (res.data.Message) {
          console.log("Error: ", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error fetching details: ", err);
      });
  }, [requestID]);
  //FETCHING DOCUMENT INPUTS
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/fetchingDocuments/fetchRequestedDocumentInputs/${requestID}`
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.data);
          setDocumentInputValues(res.data.data);
        } else if (res.data.Message) {
          console.log("Error: ", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error fetching details: ", err);
      });
  }, [requestID]);
  // FETCHING INPUTS
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/fetchingDocuments/fetchInputs`,
        {
          params: { purposeID: documentDetails.purposeID },
        }
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.data);
          setDocumentInputs(res.data.data);
        } else if (res.data.Message) {
          console.log("Error: ", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error fetching details: ", err);
      });
  }, [documentDetails.purposeID]);

  const status = documentDetails.status;

  return (
    <div className="p-0 p-md-4 w-100 " style={{ height: "100%" }}>
      {/* Header Section */}
      <div
        className="rounded-2  p-2 d-flex align-items-center justify-content-between"
        style={{ backgroundColor: "var(--main-color)" }}
      >
        <h5
          className="fade-in m-0 p-2"
          style={{ color: "var(--secondMain-color)" }}
        >
          Request ID: {documentDetails.requestID}
        </h5>

        {user.isAdmin ? (
          <div className="d-none d-md-block d-flex align-items-center justify-content-between rounded-3 p-1 mx-0">
            <div className="col-12 col-md-auto d-flex flex-column flex-md-row gap-2 ms-md-auto text-center">
              {/* FOR DOWNLOAD BUTTONS */}
              {documentDetails.feedbackType === "internal" ? (
                <InternalFeedbackDownload
                  user={user}
                  documentDetails={documentDetails}
                />
              ) : (
                <ExternalFeedbackDownload
                  user={user}
                  documentDetails={documentDetails}
                />
              )}

              <CancelButton
                fetchDocumentDetails={fetchDocumentDetails}
                documentDetails={documentDetails}
                className="btn-sm btn-responsive"
              />
              <ChangeStatusButton
                fetchDocumentDetails={fetchDocumentDetails}
                documentDetails={documentDetails}
                className="btn-sm btn-responsive"
              />
            </div>
          </div>
        ) : (
          <>
            {documentDetails.status === "ready to pickup" ||
              documentDetails.status === "completed" ? (
              <div className="d-none d-md-block d-flex align-items-center justify-content-between rounded-3 p-1 mx-0">
                <div className="col-12 col-md-auto d-flex flex-column flex-md-row gap-2 ms-md-auto text-center">
                  <ViewScheduleSlip
                    fetchDocumentDetails={fetchDocumentDetails}
                    documentDetails={documentDetails}
                  />
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
      {user.isAdmin ? (
        <div className="d-block d-md-none d-flex align-items-center justify-content-between rounded-3 p-1 mx-0">
          <div className="col-12 col-md-auto d-flex flex-column flex-md-row gap-2 ms-md-auto text-center">
            {/* FOR DOWNLOAD BUTTONS */}
            {documentDetails.feedbackType === "internal" ? (
              <InternalFeedbackDownload
                user={user}
                documentDetails={documentDetails}
              />
            ) : (
              <ExternalFeedbackDownload
                user={user}
                documentDetails={documentDetails}
              />
            )}

            <CancelButton
              fetchDocumentDetails={fetchDocumentDetails}
              documentDetails={documentDetails}
              className="btn-sm btn-responsive"
            />
            <ChangeStatusButton
              fetchDocumentDetails={fetchDocumentDetails}
              documentDetails={documentDetails}
              className="btn-sm btn-responsive"
            />
          </div>
        </div>
      ) : (
        <>
          {documentDetails.status === "ready to pickup" ||
            documentDetails.status === "completed" ? (
            <div className="d-none d-md-block d-flex align-items-center justify-content-between rounded-3 p-1 mx-0">
              <div className="col-12 col-md-auto d-flex flex-column flex-md-row gap-2 ms-md-auto text-center">
                <ViewScheduleSlip
                  fetchDocumentDetails={fetchDocumentDetails}
                  documentDetails={documentDetails}
                />
              </div>
            </div>
          ) : null}
        </>
      )}




      <div
        className="custom-scrollbar overflow-x-hidden overflow-y-auto mt-2 d-flex flex-column gap-2 pe-1 rounded "
        style={{
          maxHeight: "80dvh",
          minHeight: "50vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {/* purpose */}
        <div
          className="fade-in-section row bg-white d-flex align-items-center justify-content-between rounded-3 p-4 mx-0 shadow-sm"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
            zIndex: "1",
          }}
        >
          {/* Purpose and Status */}
          <div className="col d-flex flex-column gap-1">
            <div className="d-flex align-items-center gap-1">
              <i className="bx bxs-notepad bx-sm"></i>
              <h4 className="m-0">
                {documentDetails.purpose}
                <span
                  className={`${status === "pending"
                    ? "text-warning"
                    : status === "processing"
                      ? "text-primary"
                      : status === "ready to pickup"
                        ? "text-info"
                        : status === "completed"
                          ? "text-success"
                          : status === "cancelled"
                            ? "text-danger"
                            : null
                    } `}
                >
                  (
                  {String(status).charAt(0).toUpperCase() +
                    String(status).slice(1)}
                  )
                </span>
              </h4>
              {!user.isAdmin ? (
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip>
                      <p className="m-0">
                        {documentDetails.status === "pending"
                          ? "Your request has been received and is awaiting further updates."
                          : documentDetails.status === "processing"
                            ? "Your request is currently being processed. Please wait for further updates."
                            : documentDetails.status === "ready to pickup"
                              ? "Your request is ready for pick-up. Please download your schedule slip."
                              : documentDetails.status === "completed"
                                ? "Your request has been successfully completed."
                                : documentDetails.status === "cancelled"
                                  ? "Your request has been cancelled. Please review the details below."
                                  : ""}
                      </p>
                    </Tooltip>
                  }
                >
                  <button className="btn px-0">
                    <p className="m-0 text-secondary">
                      <i class="bx bx-info-circle"></i>
                    </p>
                  </button>
                </OverlayTrigger>
              ) : null}
            </div>
            <p className="fade-in-section m-0 text-secondary">
              {documentDetails.reason && (
                <>
                  Reason:{" "}
                  {documentDetails.reason ? documentDetails.reason : null}
                </>
              )}
            </p>
          </div>
        </div>
        <div className="fade-in-section" style={{ zIndex: 0 }}>
          <RequestInfo documentDetails={documentDetails} />
        </div>

        {documentTypes.length > 0 && (
          <div
            className="fade-in-section information bg-white w-100  rounded-2 p-4 mb-2"
            style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }}
          >
            <h5 className="text-muted">Document requested</h5>
            <div className="d-flex align-items-center gap-2 p-2">
              <i className="bx bxs-file-pdf fs-5 me-1"></i>
              <h6 className="m-0">
                {documentTypes.map((type) => type.documentType).join(", ")}
              </h6>
            </div>
          </div>
        )}
        {documentInputValues.length > 0 && (
          <div
            className="fade-in-section information bg-white w-100 rounded-2 p-4"
            style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }}
          >
            <table className="table">
              <thead>
                <tr>
                  {documentInputs.map((input) => (
                    <th scope="col">{input.inputDescription}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {documentInputValues.map((inputValue) => (
                    <td>{inputValue.inputValue}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {documentFile && (
          <div
            className="fade-in-section bg-white w-100  rounded-2 d-flex flex-column p-4 mb-2"
            style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }}
          >
            <h5 className="text-muted">Uploaded document</h5>
            <div className="w-100 d-flex align-items-center justify-content-center">
              <DocumentFileModal
                documentFile={documentFile}
                documentDetails={documentDetails}
                user={user}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestDetails;
