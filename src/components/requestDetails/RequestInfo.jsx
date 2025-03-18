import React from "react";

const RequestInfo = ({ documentDetails }) => {
  const birthDate = documentDetails?.dateOfBirth
    ? new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
      }).format(new Date(documentDetails?.dateOfBirth))
    : "";
  return (
    <div className="row shadow-sm bg-white d-flex align-items-center justify-content-center rounded-3 p-4 mx-0">
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
  );
};

export default RequestInfo;
