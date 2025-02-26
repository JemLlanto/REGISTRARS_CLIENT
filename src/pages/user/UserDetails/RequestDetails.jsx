import React from "react";
import { useOutletContext } from "react-router-dom";

const RequestDetails = () => {
  const { user } = useOutletContext();

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
            <h4 className="m-0 px-2">For Transfer</h4>
          </div>

          <div className="row mt-3 g-2">
            <div className="col-12 col-md">
              <p className="text-muted ">Name</p>
              <div className="d-flex align-items-center gap-2">
                <i className="bx bxs-user"></i>
                <h6 className="m-0">Sallao John Mark</h6>
              </div>
            </div>

            <div className="col-12 col-md">
              <p className="text-muted">Course</p>
              <div className="d-flex align-items-center">
                <i className="bx bxs-graduation fs-5 me-1"></i>
                <h6 className="m-0">BS Infotech</h6>
              </div>
            </div>

            <div className="col-12 col-md">
              <p className="text-muted">Year Level</p>
              <div className="d-flex align-items-center">
                <i className="bx bxs-calendar fs-5 me-1"></i>
                <h6 className="m-0">Fourth year</h6>
              </div>
            </div>

            <div className="col-12 col-md">
              <p className="text-muted">Gender</p>
              <div className="d-flex align-items-center">
                <i className="bx bx-male-sign fs-5 me-1"></i>
                <h6 className="m-0">Male</h6>
              </div>
            </div>

            <div className="col-12 col-md">
              <p className="text-muted">Student ID</p>
              <div className="d-flex align-items-center">
                <i className="bx bxs-id-card fs-5 me-1"></i>
                <h6 className="m-0">202110575</h6>
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
                <h6 className="m-0">Undergraduate</h6>
              </div>
            </div>

            <div className="col-12 col-md">
              <p className="text-muted">Phone Number</p>
              <div className="d-flex align-items-center">
                <i className="bx bxs-phone fs-5 me-1"></i>
                <h6 className="m-0">09704715264</h6>
              </div>
            </div>

            <div className="col-12 col-md">
              <p className="text-muted">Birthday</p>
              <div className="d-flex align-items-center">
                <i className="bx bxs-cake fs-5 me-1"></i>
                <h6 className="m-0">April 27, 2003</h6>
              </div>
            </div>

            <div className="col-12 col-md">
              <p className="text-muted">Graduation Year</p>
              <div className="d-flex align-items-center">
                <i className="bx bxs-calendar-check fs-5 me-1"></i>
                <h6 className="m-0">2025</h6>
              </div>
            </div>

            <div className="col-12 col-md">
              <p className="text-muted">Year Graduated</p>
              <div className="d-flex align-items-center">
                <i className="bx bxs-certification fs-5 me-1"></i>
                <h6 className="m-0">Year Graduate</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;
