import axios from "axios";
import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import CancelButton from "../../components/requestDetails/CancelButton";
import ChangeStatusButton from "../../components/requestDetails/ChangeStatusButton";
import FeedbackInternal from "../../components/requestDetails/InternalFeedback/Internal";
import FeedbackExternal from "../../components/requestDetails/ExternalFeedback/External";
import SQDFormComponent from "../../components/requestDetails/ExternalFeedback/SQDForm";
import RequestInfo from "../../components/requestDetails/RequestInfo";
import ViewScheduleSlip from "../../components/requestDetails/ViewScheduleSlip";
import InternalFeedbackDownload from "../../components/DownloadButton/InternalFeedbackDownload";
import ExternalFeedbackDownload from "../../components/DownloadButton/ExternalFeedbackDownload";

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
        `http://localhost:5000/api/fetchingDocuments/fetchRequestedDocumentsDetails/${requestID}`
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

  useEffect(() => {
    fetchDocumentDetails();
  }, []);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/fetchingDocuments/fetchRequestedDocumentTypes/${requestID}`
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
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/fetchingDocuments/fetchRequestedDocumentFiles/${requestID}`
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.data);
          setDocumentFile(res.data.data);
        } else if (res.data.Message) {
          console.log("Error: ", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error fetching details: ", err);
      });
  }, [requestID]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/fetchingDocuments/fetchRequestedDocumentInputs/${requestID}`
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
  // fetching inputs
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/fetchingDocuments/fetchInputs`, {
        params: { purposeID: documentDetails.purposeID },
      })
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
    <div
      className="p-0 p-md-4 w-100 overflow-auto"
      // style={{ maxHeight: "90dvh" }}
    >
      {/* Header Section */}
      <div
        className="rounded-2 shadow-sm p-2 d-flex align-items-center justify-content-between"
        style={{ backgroundColor: "var(--main-color)" }}
      >
        <h5 className="m-0 p-2" style={{ color: "var(--secondMain-color)" }}>
          Request ID: {documentDetails.requestID}
        </h5>

        {user.isAdmin ? (
          <div className="d-none d-md-block d-flex align-items-center justify-content-between rounded-3 p-1 mx-0">
            <div className="col-12 col-md-auto d-flex flex-column flex-md-row gap-2 ms-md-auto text-center">
              {/* FOR DOWNLOAD BUTTONS */}
              {documentDetails.feedbackType === "internal" ? (
                <InternalFeedbackDownload documentDetails={documentDetails} />
              ) : (
                <ExternalFeedbackDownload documentDetails={documentDetails} />
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
      {/* buttons */}
      {user.isAdmin ? (
        <div className="d-block d-md-none d-flex align-items-center justify-content-between rounded-3 p-1 mx-0 mt-2">
          <div className="col-12 col-md-auto d-flex flex-column flex-md-row gap-2 ms-md-auto text-center">
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
      ) : null}

      <div
        className="overflow-x-hidden overflow-y-auto mt-2 d-flex flex-column gap-2 pe-1 rounded"
        style={{ height: "35rem" }}
      >
        {/* purpose */}
        <div className="row shadow-sm bg-white d-flex align-items-center justify-content-between rounded-3 p-4 mx-0">
          {/* Purpose and Status */}
          <div className="col d-flex flex-column gap-1">
            <div className="d-flex align-items-center gap-1">
              <i className="bx bxs-notepad bx-sm"></i>
              <h4 className="m-0 px-2">
                {documentDetails.purpose}
                <span
                  className={`${
                    status === "pending"
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
                  }`}
                >
                  (
                  {String(status).charAt(0).toUpperCase() +
                    String(status).slice(1)}
                  )
                </span>
              </h4>
            </div>
            <p className="m-0 text-secondary">
              {documentDetails.reason && (
                <>
                  Reason:{" "}
                  {documentDetails.reason ? documentDetails.reason : null}
                </>
              )}
            </p>
          </div>
        </div>

        <RequestInfo documentDetails={documentDetails} />

        {documentTypes.length > 0 && (
          <div className="information bg-white w-100 shadow-sm rounded-2 p-4">
            <h5 className="text-muted">Document requested</h5>
            <div className="d-flex align-items-center gap-2">
              <i className="bx bxs-file-pdf fs-5 me-1"></i>
              <h6 className="m-0">
                {documentTypes.map((type) => type.documentType).join(", ")}
              </h6>
            </div>
          </div>
        )}
        {documentInputValues.length > 0 && (
          <div className="information bg-white w-100 shadow-sm rounded-2 p-4">
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
          <div className=" bg-white w-100 shadow-sm rounded-2 d-flex flex-column p-4">
            <h5 className="text-muted">Uploaded document</h5>
            <div className="w-100 d-flex align-items-center justify-content-center">
              <div
                className="d-flex align-items-center justify-content-center gap-3"
                style={{ width: "20rem", height: "20rem" }}
              >
                <img
                  src={`http://localhost:5000/uploads/${documentFile.image_file}`}
                  alt="Document"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "0.5rem",
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestDetails;
