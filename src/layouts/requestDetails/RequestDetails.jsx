import axios from "axios";
import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import CancelButton from "../../components/requestDetails/CancelButton";
import ChangeStatusButton from "../../components/requestDetails/ChangeStatusButton";
import Feedbacks from "../../components/feedbacks/feedbacks";

const RequestDetails = () => {
  const { user } = useOutletContext();
  const { requestID } = useParams();
  const [documentDetails, setDocumentDetails] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [documentInputValues, setDocumentInputValues] = useState([]);
  const [documentInputs, setDocumentInputs] = useState([]);
  const [documentFile, setDocumentFile] = useState(null);
  const birthDate = documentDetails?.dateOfBirth
    ? new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
    }).format(new Date(documentDetails?.dateOfBirth))
    : "";

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
  return (
    <div className="p-0 p-md-4 w-100 overflow-auto" style={{ maxHeight: "90dvh" }}>
      {/* Header Section */}
      <div
        className="rounded-2 shadow-sm p-2 d-flex align-items-center justify-content-between"
        style={{ backgroundColor: "var(--main-color)" }}
      >
        <h5 className="m-0 p-2" style={{ color: "var(--secondMain-color)" }}>
          Request Details
        </h5>
        {user.isAdmin ? (
          <div className="d-none d-md-block d-flex align-items-center justify-content-between rounded-3 p-1 mx-0">
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


      {/* purpose */}
      <div className="row shadow-sm bg-white d-flex align-items-center justify-content-between rounded-3 p-4 mt-2 mx-0">
        {/* Purpose and Status */}
        <div className="col d-flex align-items-center gap-1">
          <i className="bx bxs-notepad fs-2"></i>
          <h4 className="m-0 px-2">
            {documentDetails.purpose} - {documentDetails.status}
          </h4>
        </div>

        {/* ExternalFormModal button */}
        {/* {documentDetails.status === "completed" && (
          <div className="col-auto">
            <ExternalFormModal />
          </div>
        )} */}
      </div>


      <div className="row shadow-sm bg-white d-flex align-items-center justify-content-center rounded-3 p-4 mt-2 mx-0">
        {/* Name */}
        <div className="col-12 col-md-6 col-lg-4 mb-3">
          <p className="text-muted fw-bold">Name</p>
          <div className="d-flex align-items-center">
            <i className="bx bxs-user text-dark fs-5 me-1"></i>
            <h6 className="m-0">
              {documentDetails.firstName} {documentDetails.middleName}{" "}
              {documentDetails.lastName}
            </h6>
          </div>
        </div>

        {/* Course */}
        <div className="col-12 col-md-6 col-lg-4 mb-3">
          <p className="text-muted fw-bold">Course</p>
          <div className="d-flex align-items-center">
            <i className="bx bxs-graduation text-dark fs-5 me-1"></i>
            <h6 className="m-0">{documentDetails.program}</h6>
          </div>
        </div>

        {/* Year Level / Year Graduated */}
        <div className="col-12 col-md-6 col-lg-4 mb-3">
          <p className="text-muted fw-bold">
            {documentDetails.classification === "graduated"
              ? "Year Graduated"
              : "Year Level"}
          </p>
          <div className="d-flex align-items-center">
            <i className="bx bxs-calendar text-dark fs-5 me-1"></i>
            <h6 className="m-0">
              {documentDetails.classification === "graduated"
                ? documentDetails.yearGraduated
                : documentDetails.yearLevel}
            </h6>
          </div>
        </div>

        {/* Line */}
        <div className="bg-dark w-100 mb-2" style={{ height: "1px" }}></div>

        {/* Gender */}
        <div className="col-12 col-md-6 col-lg-4 mb-3">
          <p className="text-muted fw-bold">Gender</p>
          <div className="d-flex align-items-center">
            <i className="bx bx-male-sign text-dark fs-5 me-1"></i>
            <h6 className="m-0">{documentDetails.sex}</h6>
          </div>
        </div>

        {/* Student ID */}
        <div className="col-12 col-md-6 col-lg-4 mb-3">
          <p className="text-muted fw-bold">Student ID</p>
          <div className="d-flex align-items-center">
            <i className="bx bxs-id-card text-dark fs-5 me-1"></i>
            <h6 className="m-0">{documentDetails.studentID}</h6>
          </div>
        </div>

        {/* Classification */}
        <div className="col-12 col-md-6 col-lg-4 mb-3">
          <p className="text-muted fw-bold">Classification</p>
          <div className="d-flex align-items-center gap-2">
            <i className="bx bxs-user-detail text-dark fs-5 me-1"></i>
            <h6 className="m-0">{documentDetails.classification}</h6>
          </div>
        </div>
        {/* Line */}
        <div className="bg-dark w-100 mb-2" style={{ height: "1px" }}></div>
        {/* Phone Number */}
        <div className="col-12 col-md-6 col-lg-4 mb-3">
          <p className="text-muted fw-bold">Phone Number</p>
          <div className="d-flex align-items-center">
            <i className="bx bxs-phone text-dark fs-5 me-1"></i>
            <h6 className="m-0">{documentDetails.mobileNum}</h6>
          </div>
        </div>

        {/* Birthday */}
        <div className="col-12 col-md-6 col-lg-4 mb-3">
          <p className="text-muted fw-bold">Birthday</p>
          <div className="d-flex align-items-center">
            <i className="bx bxs-cake text-dark fs-5 me-1"></i>
            <h6 className="m-0">{birthDate}</h6>
          </div>
        </div>

        {/* Last School Year Attended */}
        <div className="col-12 col-md-6 col-lg-4 mb-3">
          <p className="text-muted fw-bold">Last School Year Attended</p>
          <div className="d-flex align-items-center">
            <i className="bx bxs-calendar-check text-dark fs-5 me-1"></i>
            <h6 className="m-0">{documentDetails.schoolYearAttended}</h6>
          </div>
        </div>
      </div>

      {/* Document img */}
      <div className="mx-0">
        {documentTypes.length > 0 && (
          <div className="information bg-white w-100 mt-2 shadow-sm rounded-2 p-4">
            <p className="text-muted">Document Type</p>
            <div className="d-flex align-items-center gap-2">
              <i className="bx bxs-file-pdf fs-5 me-1"></i>
              <h6 className="m-0">
                {documentTypes.map((type) => type.documentType).join(", ")}
              </h6>
            </div>
          </div>
        )}
        {documentInputValues.length > 0 && (
          <div className="information bg-white w-100 mt-2 shadow-sm rounded-2 p-4">
            <table class="table">
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
          <div className="row mx-0 bg-white w-100 mt-2 shadow-sm rounded-2 p-4 align-items-center">
            <div className="col-12 col-md-4 col-lg-7 d-flex flex-column align-items-center ">
              <div className="d-flex align-items-center gap-3">
                <img
                  src={`http://localhost:5000/uploads/${documentFile.image_file}`}
                  alt="Document"
                  style={{
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "0.5rem",
                  }}
                />
              </div>
            </div>
          </div>
        )}

      </div>
      <div className="row shadow-sm bg-white d-flex align-items-center justify-content-center rounded-3 p-4 mt-2 mx-0">
        <Feedbacks></Feedbacks>
      </div>


    </div>
  );
};

export default RequestDetails;
