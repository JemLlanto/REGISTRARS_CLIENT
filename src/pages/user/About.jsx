import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function About() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4 w-100 overflow-auto" style={{ maxHeight: "650px" }}>
      <div
        className="rounded-2 shadow-sm p-2"
        style={{ backgroundColor: "var(--main-color)" }}
      >
        <h5 className="m-0 p-2  " style={{ color: "var(--secondMain-color)" }}>
          About Us:
        </h5>
      </div>
      <div
        className="d-flex justify-content-between gap-3"
        style={{ maxHeight: "650px" }}
      >
        <div className="d-flex align-items-center justify-content-start w-100  bg-success shadow-sm rounded-2 flex-column mt-5 p-5">
          <div className="m-0">
            <h3 className="m-0 fw-bold text-white">QUALITY POLICY</h3>
          </div>
          <div className="mt-3">
            <p className="m-0 text-center text-white">
              We Commit to the highest standards of education, value our
              stakeholders, Strive for continual improvement of our products and
              services, and Uphold the University’s tenets of Truth, Excellence,
              and Service to produce globally competitive and morally upright
              individuals.
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-start w-100  bg-success shadow-sm rounded-2 flex-column mt-5 p-5">
          <div className="m-0">
            <h3 className="m-0 fw-bold text-white">VISION</h3>
          </div>
          <div className="mt-3">
            <p className="m-0 text-center text-white">
              The premier university in historic Cavite globally recognized for
              excellence in character development, academics, research,
              innovation, and sustainable community engagement.
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-start w-100  bg-success shadow-sm rounded-2 flex-column mt-5 p-5">
          <div className="m-0">
            <h3 className="m-0 fw-bold text-white">MISSION</h3>
          </div>
          <div className="mt-3">
            <p className="m-0 text-center text-white">
              CAVITE STATE UNIVERSITY shall provide excellent, equitable and
              relevant educational opportunities in the arts, sciences, and
              technology through quality instruction and responsive research and
              development activities. It shall produce professional skilled and
              morally upright individuals for global competitiveness.
            </p>
          </div>
        </div>
      </div>

      {/* <li
        className=" w-100 list-unstyled mt-5"
        style={{ height: "2px", backgroundColor: "var(--secondMain-color)" }}
      ></li> */}

      <div
        className="core d-flex  justify-content-evenly w-100  shadow-sm rounded-2 p-5 mt-5"
        style={{
          backgroundColor: "var(--main-color)",
        }}
      >
        <div className="m-0 ">
          <h2 className=" fw-bold">TRUTH</h2>
        </div>
        <div className="m-0 ">
          <h2 className=" fw-bold">INTEGRITY</h2>
        </div>
        <div className="m-0 ">
          <h2 className=" fw-bold">EXCELLENCE</h2>
        </div>
        <div className="m-0">
          <h2 className=" fw-bold">SERVICE</h2>
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-center w-100 h-50 bg-white shadow-sm rounded-2 flex-column mt-4">
        <div className="">
          <img
            src="/OfficeLogo.png"
            alt="Registrar Logo"
            style={{ width: "20rem" }}
          />
        </div>
        <div className="m-0 mt-3">
          <h4>MANAGEMENT INFORMATION SYSTEMS</h4>
        </div>
        <div className="mt-3 m-0">
          <h1>Withdrawal of Registration / Enrollment</h1>
        </div>
        <div className="mb-2">
          <p className="text-center">until</p>
          <h3>MARCH 11, 2025</h3>
          <h5>CUT-OFF TIME: 4:00 PM</h5>
        </div>
      </div>
    </div>
  );
}
