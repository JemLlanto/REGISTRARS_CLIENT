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
        console.log("Error: ", res.data.Message);
      }
    } catch (err) {
      console.log("Error fetching details: ", err);
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
          // console.log(res.data.data);
          setDocumentTypes(res.data.data);
        } else if (res.data.Message) {
          // console.log("Error: ", res.data.Message);
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
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/fetchingDocuments/fetchRequestedDocumentFiles/${requestID}`
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          setDocumentFile(res.data.data);
        } else if (res.data.Message) {
          // console.log("Error: ", res.data.Message);s
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
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/fetchingDocuments/fetchRequestedDocumentInputs/${requestID}`
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          // console.log(res.data.data);
          setDocumentInputValues(res.data.data);
        } else if (res.data.Message) {
          // console.log("Error: ", res.data.Message);
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
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/fetchingDocuments/fetchInputs`,
        {
          params: { purposeID: documentDetails.purposeID },
        }
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          // console.log(res.data.data);
          setDocumentInputs(res.data.data);
        } else if (res.data.Message) {
          // console.log("Error: ", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error fetching details: ", err);
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
                          <i className="bx bx-info-circle"></i>
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
                className="fade-in-section information bg-white w-100  rounded-2 p-4"
                style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }}
              >
                <p className="text-muted">Document requested</p>
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
                      {documentInputs.map((input, index) => (
                        <th key={index} scope="col">
                          {input.inputDescription}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {documentInputValues.map((inputValue, index) => (
                        <td key={index}>{inputValue.inputValue}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {documentFile && (
              <div
                className="fade-in-section bg-white w-100 rounded-2 d-flex flex-column p-4"
                style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }}
              >
                <p className="text-muted">Uploaded document</p>
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
