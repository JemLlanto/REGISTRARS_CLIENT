import axios from "axios";
import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

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

  useEffect(() => {
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
  }, [requestID]);
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
      .get(`http://localhost:5000/api/documents/fetchInputs`, {
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
    <div className="p-4 w-100 overflow-auto" style={{ maxHeight: "90dvh" }}>
      {/* Header Section */}
      <div
        className="rounded-2 shadow-sm p-2"
        style={{ backgroundColor: "var(--main-color)" }}
      >
        <h5 className="m-0 p-2" style={{ color: "var(--secondMain-color)" }}>
          Details
        </h5>

      </div>
      <div
        className="p-2 text-center w-100 rounded-2 mt-2"
        style={{ backgroundColor: "var(--thirdMain-color)" }}
      >
        <h5
          className="m-0 d-flex align-items-center justify-content-center"
          style={{ color: "var(--background-color)" }}
        >
          <i className="bx bxs-user-detail m-0 px-2 fs-3"></i>
          Information Details
        </h5>
      </div>

      {/* Document img */}
      <div className="row mx-0">
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
          <div className=" col-6 bg-white w-100 mt-2 shadow-sm rounded-2 p-4">
            <div className="">
              <p className="text-muted">Document Upload</p>
              <div className="d-flex align-items-center gap-3">
                <img
                  src={`http://localhost:5000/uploads/${documentFile.image_file}`}
                  alt="Document"
                  style={{ width: "10rem", objectFit: "cover", borderRadius: "0.5rem" }}
                />
              </div>
            </div>
            <div className="col-6 d-flex align-items-start">
              <i className="bx bxs-notepad fs-2"></i>
              <h4 className="m-0 px-2">{documentDetails.purpose}</h4>
            </div>
          </div>
        )}
      </div>





      <div className="row w-100 mx-0 shadow-sm bg-white rounded-3  mt-2">
        {/* Left Column (7) */}
        <div className="col-12 col-md-7  p-4 shadow-sm rounded-3">
          {/* Name */}
          <div className="mb-3">
            <p className="text-muted fw-bold">Name</p>
            <div className="d-flex align-items-center gap-2">
              <i className="bx bxs-user text-dark fs-5"></i>
              <h6 className="m-0">
                {documentDetails.firstName} {documentDetails.middleName} {documentDetails.lastName}
              </h6>
            </div>
          </div>

          {/* Course */}
          <div className="mb-3">
            <p className="text-muted fw-bold">Course</p>
            <div className="d-flex align-items-center">
              <i className="bx bxs-graduation text-dark fs-5 me-1"></i>
              <h6 className="m-0">{documentDetails.program}</h6>
            </div>
          </div>

          {/* Year Level / Year Graduated */}
          {documentDetails.classification === "graduated" ? (
            <div className="mb-3">
              <p className="text-muted fw-bold">Year Graduated</p>
              <div className="d-flex align-items-center">
                <i className="bx bxs-calendar text-warning fs-5 me-1"></i>
                <h6 className="m-0">{documentDetails.yearGraduated}</h6>
              </div>
            </div>
          ) : (
            <div className="mb-3">
              <p className="text-muted fw-bold">Year Level</p>
              <div className="d-flex align-items-center">
                <i className="bx bxs-calendar text-dark fs-5 me-1"></i>
                <h6 className="m-0">{documentDetails.yearLevel}</h6>
              </div>
            </div>
          )}

          {/* Gender */}
          <div className="mb-3">
            <p className="text-muted fw-bold">Gender</p>
            <div className="d-flex align-items-center">
              <i className="bx bx-male-sign text-dark fs-5 me-1"></i>
              <h6 className="m-0">{documentDetails.sex}</h6>
            </div>
          </div>

          {/* Student ID */}
          <div>
            <p className="text-muted fw-bold">Student ID</p>
            <div className="d-flex align-items-center">
              <i className="bx bxs-id-card text-dark fs-5 me-1"></i>
              <h6 className="m-0">{documentDetails.studentID}</h6>
            </div>
          </div>
        </div>

        {/* Right Column (5) */}
        <div className="col-12 col-md-5  p-4 shadow-sm rounded-3">
          {/* Classification */}
          <div className="mb-3">
            <p className="text-muted fw-bold">Classification</p>
            <div className="d-flex align-items-center gap-2">
              <i className="bx bxs-user-detail text-dark fs-5 me-1"></i>
              <h6 className="m-0">{documentDetails.classification}</h6>
            </div>
          </div>

          {/* Phone Number */}
          <div className="mb-3">
            <p className="text-muted fw-bold">Phone Number</p>
            <div className="d-flex align-items-center">
              <i className="bx bxs-phone text-dark fs-5 me-1"></i>
              <h6 className="m-0">{documentDetails.mobileNum}</h6>
            </div>
          </div>

          {/* Birthday */}
          <div className="mb-3">
            <p className="text-muted fw-bold">Birthday</p>
            <div className="d-flex align-items-center">
              <i className="bx bxs-cake text-dark fs-5 me-1"></i>
              <h6 className="m-0">{birthDate}</h6>
            </div>
          </div>

          {/* Last School Year Attended */}
          <div>
            <p className="text-muted fw-bold">Last School Year Attended</p>
            <div className="d-flex align-items-center">
              <i className="bx bxs-calendar-check text-dark fs-5 me-1"></i>
              <h6 className="m-0">{documentDetails.schoolYearAttended}</h6>
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default RequestDetails;
