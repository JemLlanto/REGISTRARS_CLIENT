import React from "react";

const CoreValues = () => {
  return (
    <div
      className="container-fluid px-4 py-4 shadow-sm rounded-2 mt-2 fade-in-section"
      style={{
        backgroundColor: "var(--main-color)",
        animationDelay: `${1 * 0.2}s`,
      }}
    >
      <div className="row mb-4">
        <div className="col-12 text-center">
          <h2 className="text-warning fw-bold m-0">OUR CORE VALUES</h2>
        </div>
      </div>
      <div className="row g-3 d-flex justify-content-center">
        <div
          className="col-12 col-sm-6 col-lg-3 mb-3"
          style={{ cursor: "pointer" }}
        >
          <div
            className="core-value text-center p-3 rounded h-100 d-flex flex-column"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          >
            <h3 className="text-warning fw-bold fs-4 m-0 my-3">TRUTH</h3>
          </div>
        </div>

        <div
          className="col-12 col-sm-6 col-lg-3 mb-3"
          style={{ cursor: "pointer" }}
        >
          <div
            className="core-value text-center p-3 rounded h-100 d-flex flex-column"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          >
            <h3 className="text-warning fw-bold fs-4 m-0 my-3">INTEGRITY</h3>
          </div>
        </div>

        <div
          className="col-12 col-sm-6 col-lg-3 mb-3"
          style={{ cursor: "pointer" }}
        >
          <div
            className="core-value text-center p-3 rounded h-100 d-flex flex-column"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          >
            <h3 className="text-warning fw-bold fs-4 m-0 my-3">EXCELLENCE</h3>
          </div>
        </div>

        <div
          className="col-12 col-sm-6 col-lg-3 mb-3"
          style={{ cursor: "pointer" }}
        >
          <div
            className="core-value text-center p-3 rounded h-100 d-flex flex-column"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          >
            <h3 className="text-warning fw-bold fs-4 m-0 my-3">SERVICE</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoreValues;
