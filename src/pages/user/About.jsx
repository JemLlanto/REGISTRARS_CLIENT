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
      {/* 
      <div
        className="core d-flex  justify-content-start flex-column  w-100  shadow-sm rounded-2 p-5 mt-5 text-center"
        style={{
          backgroundColor: "var(--main-color)",
        }}
      >
        <div className="">
          <img
            src="/OfficeLogo.png"
            alt="Registrar Logo"
            style={{ width: "20rem" }}
          />
        </div>
        <div className="m-0 ">
          <h1>Office Hours</h1>
        </div>
        <div>MONDAY - THRUSDAY</div>
        <div>
          <h3>07:00 AM to 06:00 PM</h3>
        </div>
      </div> */}
      <div
        className="d-flex justify-content-between gap-2 mt-2 row mx-auto"
        style={{ maxHeight: "650px" }}
      >
        <div className="policy col-lg d-flex align-items-center justify-content-start w-100  shadow-sm rounded-2 flex-column  p-5">
          <div className="m-0">
            <h3 className="m-0 fw-bold text-white">QUALITY POLICY</h3>
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
        <div className=" policy col-lg d-flex align-items-center justify-content-start w-100  bg-success shadow-sm rounded-2 flex-column  p-5">
          <div className="m-0">
            <h3 className="m-0 fw-bold text-white">VISION</h3>
          </div>
          <div className="mt-3">
            <p className="m-0 text-center text-white fw-bold">
              The premier university in historic Cavite globally recognized for
              excellence in character development, academics, research,
              innovation, and sustainable community engagement.
            </p>
          </div>
        </div>
        <div className=" policy col-lg d-flex align-items-center justify-content-start w-100  bg-success shadow-sm rounded-2 flex-column p-5">
          <div className="m-0">
            <h3 className="m-0 fw-bold text-white">MISSION</h3>
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
        <div
          className="core row w-100  shadow-sm rounded-2 p-5 mt-2 mx-0 gap-3"
          style={{
            backgroundColor: "var(--main-color)",
          }}
        >
          <div className="m-0 col-md d-flex justify-content-center">
            <h2 className="text-warning fw-bold">TRUTH</h2>
          </div>
          <div className="m-0 col-md d-flex justify-content-center">
            <h2 className="text-warning fw-bold">INTEGRITY</h2>
          </div>
          <div className="m-0 col-md d-flex justify-content-center">
            <h2 className="text-warning fw-bold">EXCELLENCE</h2>
          </div>
          <div className="m-0 col-md d-flex justify-content-center">
            <h2 className="text-warning fw-bold">SERVICE</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
