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
    <div className="p-4 w-100 overflow-auto" style={{ maxHeight: "650px" }}>
      {/* Header Section */}
      <div
        className="rounded-2 shadow-sm p-2"
        style={{ backgroundColor: "var(--main-color)" }}
      >
        <h5 className="m-0 p-2" style={{ color: "var(--secondMain-color)" }}>
          Details
        </h5>
      </div>
      <div className="d-flex align-items-center justify-content-center w-100 flex-column mt-3">
        <div
          className="p-2 text-center w-100 rounded-2"
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
        <div className="information bg-white w-100 mt-2 shadow-sm rounded-2 p-4">
          {/* Title */}
          <div className="d-flex align-items-center">
            <i className="bx bxs-notepad fs-2"></i>
            <h4 className="m-0 px-2">{documentDetails.purpose}</h4>
          </div>

          <div className="row mt-3 g-2">
            <div className="col-12 col-md">
              <p className="text-muted ">Name</p>
              <div className="d-flex align-items-center gap-2">
                <i className="bx bxs-user"></i>
                <h6 className="m-0">
                  {documentDetails.firstName} {`${documentDetails.middleName} `}
                  {documentDetails.lastName}
                </h6>
              </div>
            </div>

            <div className="col-12 col-md">
              <p className="text-muted">Course</p>
              <div className="d-flex align-items-center">
                <i className="bx bxs-graduation fs-5 me-1"></i>
                <h6 className="m-0">{documentDetails.program}</h6>
              </div>
            </div>
            {documentDetails.classification === "graduated" ? (
              <div className="col-12 col-md">
                <p className="text-muted">Year Graduated</p>
                <div className="d-flex align-items-center">
                  <i className="bx bxs-calendar fs-5 me-1"></i>
                  <h6 className="m-0">{documentDetails.yearGraduated}</h6>
                </div>
              </div>
            ) : (
              <div className="col-12 col-md">
                <p className="text-muted">Year Level</p>
                <div className="d-flex align-items-center">
                  <i className="bx bxs-calendar fs-5 me-1"></i>
                  <h6 className="m-0">{documentDetails.yearLevel}</h6>
                </div>
              </div>
            )}

            <div className="col-12 col-md">
              <p className="text-muted">Gender</p>
              <div className="d-flex align-items-center">
                <i className="bx bx-male-sign fs-5 me-1"></i>
                <h6 className="m-0">{documentDetails.sex}</h6>
              </div>
            </div>

            <div className="col-12 col-md">
              <p className="text-muted">Student ID</p>
              <div className="d-flex align-items-center">
                <i className="bx bxs-id-card fs-5 me-1"></i>
                <h6 className="m-0">{documentDetails.studentID}</h6>
              </div>
            </div>
          </div>

          {/* Line */}
          <div className="bg-dark w-100 mt-3" style={{ height: "1px" }}></div>

          <div className="row mt-3 g-2">
            <div className="col-12 col-md">
              <p className="text-muted">Classification</p>
              <div className="d-flex align-items-center gap-2">
                <i className="bx bxs-user-detail fs-5 me-1"></i>
                <h6 className="m-0">{documentDetails.classification}</h6>
              </div>
            </div>

            <div className="col-12 col-md">
              <p className="text-muted">Phone Number</p>
              <div className="d-flex align-items-center">
                <i className="bx bxs-phone fs-5 me-1"></i>
                <h6 className="m-0">{documentDetails.mobileNum}</h6>
              </div>
            </div>

            <div className="col-12 col-md">
              <p className="text-muted">Birthday</p>
              <div className="d-flex align-items-center">
                <i className="bx bxs-cake fs-5 me-1"></i>
                <h6 className="m-0">{birthDate}</h6>
              </div>
            </div>

            <div className="col-12 col-md">
              <p className="text-muted">Last School Year Attended</p>
              <div className="d-flex align-items-center">
                <i className="bx bxs-calendar-check fs-5 me-1"></i>
                <h6 className="m-0">{documentDetails.schoolYearAttended}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
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
        <div className="information bg-white w-100 mt-2 shadow-sm rounded-2 p-4">
          <div className="col-12 col-md">
            <p className="text-muted">Document Upload</p>
            <div className="d-flex align-items-center gap-2">
              <img
                src={`http://localhost:5000/uploads/${documentFile.image_file}`}
                alt=""
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestDetails;
