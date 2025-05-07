import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function About() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="px-1 mb-2 w-100 overflow-y-auto overflow-x-hidden rounded custom-scrollbar"
      style={{ height: "93%" }}
    >
      <div
        className="rounded-2 shadow-sm p-2"
        style={{ backgroundColor: "var(--main-color)" }}
      >
        <h5
          className="m-0 p-2 fade-in "
          style={{ color: "var(--secondMain-color)" }}
        >
          About Us
        </h5>
      </div>

      {/* Where are we? */}
      <div className="mt-2 p-4 rounded text-white fade-in-section" style={{ backgroundColor: "var(--main-color)" }}>
        <h4 className="text-center fw-bold text-warning">Registrar’s Office: Location and Contact</h4>
        <p className="text-md-center ">
          You can find the Office of the Registrar at the Student Center building near Gate 2 of CvSU-Rosario Campus, where student records and services are centrally managed.</p>
        <div className="position-relative">
          <img
            src="/studentCenter.png"
            alt="Registrar Office"
            className="img-fluid w-100"
          />
          <div>
          </div>

        </div>
      </div>

      {/* Misson Vision */}
      <div className="d-flex justify-content-between gap-2 mt-2 row mx-auto">
        <div
          className="core-value policy col-lg d-flex align-items-center justify-content-start w-100 shadow-sm rounded-2 flex-column p-5 fade-in-section"
          style={{ animationDelay: `${1 * 0.2}s` }}
        >
          <div className="m-0">
            <h4 className="m-0 fw-bold text-warning">QUALITY POLICY</h4>
          </div>
          <div className="mt-3">
            <p className="m-0 text-center text-white fw-bold">
              We Commit to the highest standards of education, value our
              stakeholders, Strive for continual improvement of our products and
              services, and Uphold the University’s tenets of Truth, Excellence,
              and Service to produce globally competitive and morally upright
              individuals.
            </p>
          </div>
        </div>

        <div
          className="core-value policy col-lg d-flex align-items-center justify-content-start w-100 bg-success shadow-sm rounded-2 flex-column p-5 fade-in-section "
          style={{ animationDelay: `${1 * 0.2}s` }}
        >
          <div className="m-0">
            <h4 className="m-0 fw-bold text-warning">VISION</h4>
          </div>
          <div className="mt-3">
            <p className="m-0 text-center text-white fw-bold">
              The premier university in historic Cavite globally recognized for
              excellence in character development, academics, research,
              innovation, and sustainable community engagement.
            </p>
          </div>
        </div>

        <div
          className="core-value policy col-lg d-flex align-items-center justify-content-start w-100 bg-success shadow-sm rounded-2 flex-column p-5 fade-in-section "
          style={{ animationDelay: `${1 * 0.2}s` }}
        >
          <div className="m-0">
            <h4 className="m-0 fw-bold text-warning">MISSION</h4>
          </div>
          <div className="mt-3">
            <p className="m-0 text-center text-white fw-bold">
              CAVITE STATE UNIVERSITY shall provide excellent, equitable and
              relevant educational opportunities in the arts, sciences, and
              technology through quality instruction and responsive research and
              development activities. It shall produce professional skilled and
              morally upright individuals for global competitiveness.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div
        className="container-fluid px-2 py-4 shadow-sm rounded-2 mt-3 fade-in-section"
        style={{
          backgroundColor: "var(--main-color)",
          animationDelay: `${1 * 0.2}s`,
        }}
      >
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h2 className="text-warning fw-bold">OUR CORE VALUES</h2>
          </div>
        </div>
        <div className="row g-3 d-flex justify-content-center">
          <div className="col-12 col-sm-6 col-lg-3 mb-3 ">
            <div
              className="core-value text-center p-3 rounded h-100 d-flex flex-column"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              <h3 className="text-warning fw-bold fs-4">TRUTH</h3>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3 mb-3">
            <div
              className="core-value text-center p-3 rounded h-100 d-flex flex-column"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              <h3 className="text-warning fw-bold fs-4">INTEGRITY</h3>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3 mb-3">
            <div
              className="core-value text-center p-3 rounded h-100 d-flex flex-column"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              <h3 className="text-warning fw-bold fs-4">EXCELLENCE</h3>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3 mb-3">
            <div
              className="core-value text-center p-3 rounded h-100 d-flex flex-column"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              <h3 className="text-warning fw-bold fs-4">SERVICE</h3>
            </div>
          </div>
        </div>
      </div>

      {/* CCAT GOALS */}
      <div className=" mt-3 p-4  rounded text-white" style={{ backgroundColor: "var(--main-color)" }}>
        <h2 className="text-center fw-bold text-warning">CvSU-CCAT-R GOALS</h2>
        <p className="text-center mb-4">
          CvSU Rosario Campus aims to produce productive graduates, professionals, and experts marked by global excellence and moral uprightness through the following:
        </p>

        <div className="mb-3">
          <p><strong>1. Relevant Programs</strong></p>
          <p>Offer various programs/courses relevant to the needs of the clients for global competitiveness.</p>
        </div>

        <div className="mb-3">
          <p><strong>2. Personnel Competence</strong></p>
          <p>Upgrade the qualification and competencies of the teaching and non-teaching personnel for quality service.</p>
        </div>

        <div className="mb-3">
          <p><strong>3. Facility Improvement</strong></p>
          <p>Improve facilities relevant for effective and efficient education and training.</p>
        </div>

        <div className="mb-3">
          <p><strong>4. Research & Extension</strong></p>
          <p>Engage in research and extension projects/activities that will lead to instruction and community improvement.</p>
        </div>

        <div>
          <p><strong>5. Strengthen Linkages</strong></p>
          <p>Strengthen linkages with local and international agencies for instruction, research, development and production.</p>
        </div>
      </div>
    </div>
  );
}
