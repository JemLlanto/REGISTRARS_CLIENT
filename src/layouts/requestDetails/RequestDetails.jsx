import axios from "axios";
import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import RequestInfo from "../../components/requestDetails/RequestInfo";
import DocumentFileModal from "../../components/requestDetails/DocumentFileModal";
import { OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import RequestDetailsHeader from "../../components/requestDetails/RequestDetailsHeader";

const RequestDetails = () => {
  const { user } = useOutletContext();
  const { requestID } = useParams();
  const [documentDetails, setDocumentDetails] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [documentInputValues, setDocumentInputValues] = useState([]);
  const [documentInputs, setDocumentInputs] = useState([]);
  const [documentFile, setDocumentFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDocumentDetails = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/fetchingDocuments/fetchRequestedDocumentsDetails/${requestID}`
      );

      if (res.data.Status === "Success") {
        setDocumentDetails(res.data.data);
      } else if (res.data.Message) {
        // Handle any specific message from the response
        // console.log("Error: ", res.data.Message);
      }
    } catch (err) {
      // console.log("Error fetching details: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  // FETCHING DOCUMENT DETAILS
  useEffect(() => {
    if (requestID && user) {
      fetchDocumentDetails();
    }
  }, [requestID, user]);
  //FETCHING DOCUMENT TYPES
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/fetchingDocuments/fetchRequestedDocumentTypes/${requestID}`
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          // // console.log(res.data.data);
          setDocumentTypes(res.data.data);
        } else if (res.data.Message) {
          // // console.log("Error: ", res.data.Message);
        }
      })
      .catch((err) => {
        // console.log("Error fetching details: ", err);
      });
  }, [requestID]);
  //FETCHING DOCUMENT FILES
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/fetchingDocuments/fetchRequestedDocumentFiles/${requestID}`
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          setDocumentFile(res.data.data);
        } else if (res.data.Message) {
          // // console.log("Error: ", res.data.Message);s
        }
      })
      .catch((err) => {
        // console.log("Error fetching details: ", err);
      });
  }, [requestID]);
  //FETCHING DOCUMENT INPUTS
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/fetchingDocuments/fetchRequestedDocumentInputs/${requestID}`
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          // // console.log(res.data.data);
          setDocumentInputValues(res.data.data);
        } else if (res.data.Message) {
          // // console.log("Error: ", res.data.Message);
        }
      })
      .catch((err) => {
        // console.log("Error fetching details: ", err);
      });
  }, [requestID]);
  // FETCHING INPUTS
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/fetchingDocuments/fetchInputs`,
        {
          params: { purposeID: documentDetails.purposeID },
        }
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          // // console.log(res.data.data);
          setDocumentInputs(res.data.data);
        } else if (res.data.Message) {
          // // console.log("Error: ", res.data.Message);
        }
      })
      .catch((err) => {
        // console.log("Error fetching details: ", err);
      });
  }, [documentDetails.purposeID]);

  const status = documentDetails.status;

  return (
    <>
      {isLoading || !user ? (
        <>
          <div className="d-flex flex-column align-items-center justify-content-center gap-2 w-100 h-100">
            <Spinner animation="border" variant="dark" size="lg" />
            <p className="m-0">Loading request details... </p>
          </div>
        </>
      ) : (
        <div className="px-1 w-100 " style={{ height: "92%" }}>
          {/* Header Section */}
          <RequestDetailsHeader
            user={user}
            documentDetails={documentDetails}
            fetchDocumentDetails={fetchDocumentDetails}
          />

          <div
            className="custom-scrollbar overflow-x-hidden overflow-y-auto mt-2 d-flex flex-column gap-2 rounded "
            style={{
              maxHeight: "74dvh",
              minHeight: "50vh",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            {/* purpose */}
            <div
              className="fade-in-section row bg-white d-flex align-items-center justify-content-between rounded-3 p-2 p-md-4 mx-0 shadow-sm"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                zIndex: "1",
                animationDelay: `${1 * 0.2}s`,
              }}
            >
              {/* Purpose and Status */}
              <div className="col p-0 d-flex gap-1">
                <div className="d-flex align-items-center justify-content-start gap-1">
                  <i className="bx bxs-notepad bx-sm"></i>
                  <h4 className="m-0">
                    {documentDetails.purpose}
                    {" - "}
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
                      } `}
                    >
                      (
                      {String(status).charAt(0).toUpperCase() +
                        String(status).slice(1)}
                      )
                    </span>
                    <span
                      className=""
                      style={{
                        fontSize: "clamp(0.8rem, 1.5dvw, 1.2rem)",
                        cursor: "pointer",
                      }}
                    >
                      {!user.isAdmin ? (
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip>
                              {documentDetails.status === "pending"
                                ? "Your request has been received and is awaiting further updates."
                                : documentDetails.status === "processing"
                                ? "Your request is currently being processed. Please wait for further updates."
                                : documentDetails.status === "ready to pickup"
                                ? "Your request is ready for pick-up. Please download your schedule slip and present it at the office."
                                : documentDetails.status === "completed"
                                ? "Your request has been successfully completed."
                                : documentDetails.status === "cancelled"
                                ? "Your request has been cancelled. Please review the details below."
                                : ""}
                            </Tooltip>
                          }
                        >
                          <i className="bx bx-info-circle"></i>
                        </OverlayTrigger>
                      ) : null}
                    </span>
                    <span
                      className="fade-in-section m-0 text-secondary ms-2"
                      style={{
                        animationDelay: `${1 * 0.2}s`,
                        fontSize: "clamp(0.8rem, 1.5dvw, 1.2rem)",
                      }}
                    >
                      {documentDetails.reason && (
                        <>
                          Reason:{" "}
                          {documentDetails.reason
                            ? documentDetails.reason
                            : null}
                        </>
                      )}
                    </span>
                  </h4>
                </div>
              </div>
            </div>
            <div
              className="fade-in-section"
              style={{ animationDelay: `${1 * 0.2}s`, zIndex: 0 }}
            >
              <RequestInfo documentDetails={documentDetails} />
            </div>

            {documentTypes.length > 0 && (
              <div
                className="fade-in-section information bg-white w-100  rounded-2 p-2 p-md-4"
                style={{
                  animationDelay: `${1 * 0.2}s`,
                  boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                }}
              >
                <h5 className="m-0 my-2 ms-2">Document requested</h5>
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
                className="fade-in-section information bg-white w-100 rounded-2 p-2 p-md-4"
                style={{
                  animationDelay: `${1 * 0.2}s`,
                  boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                }}
              >
                <table className="table">
                  <thead>
                    <tr>
                      {documentInputs.map((input, index) => (
                        <th key={index} scope="col">
                          <h6 className="m-0 fw-bold">
                            {input.inputDescription}
                          </h6>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {documentInputValues.map((inputValue, index) => (
                        <td key={index}>
                          <p className="m-0">{inputValue.inputValue}</p>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {documentFile && (
              <div
                className="fade-in-section bg-white w-100 rounded-2 d-flex flex-column p-2 p-md-4"
                style={{
                  animationDelay: `${1 * 0.2}s`,
                  boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                }}
              >
                <h5 className="m-0 ms-2 py-2">Uploaded document</h5>
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
      )}
    </>
  );
};

export default RequestDetails;
