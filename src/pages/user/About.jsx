import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function About() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-1 p-sm-4 w-100 overflow-auto custom-scrollbar" style={{ maxHeight: "90dvh" }}>
      <div
        className="rounded-2 shadow-sm p-2"
        style={{ backgroundColor: "var(--main-color)" }}
      >
        <h5 className="m-0 p-2 fade-in " style={{ color: "var(--secondMain-color)" }}>
          About Us
        </h5>
      </div>



      <div
        className="d-flex justify-content-between gap-2 mt-3 row mx-auto"
        style={{ maxHeight: "650px" }}
      >
        <div className="core-value policy col-lg d-flex align-items-center justify-content-start w-100 shadow-sm rounded-2 flex-column p-5 fade-in-section">
          <div className="m-0">
            <h3 className="m-0 fw-bold text-white">QUALITY POLICY</h3>
          </div>
          <div className="mt-3">
            <p className="m-0 text-center text-white fw-bold">
              We Commit to the highest standards of education, value our stakeholders, Strive for continual improvement of our products and services, and Uphold the University’s tenets of Truth, Excellence, and Service to produce globally competitive and morally upright individuals.
            </p>
          </div>
        </div>

        <div className="core-value policy col-lg d-flex align-items-center justify-content-start w-100 bg-success shadow-sm rounded-2 flex-column p-5 fade-in-section ">
          <div className="m-0">
            <h3 className="m-0 fw-bold text-white">VISION</h3>
          </div>
          <div className="mt-3">
            <p className="m-0 text-center text-white fw-bold">
              The premier university in historic Cavite globally recognized for excellence in character development, academics, research, innovation, and sustainable community engagement.
            </p>
          </div>
        </div>

        <div className="core-value policy col-lg d-flex align-items-center justify-content-start w-100 bg-success shadow-sm rounded-2 flex-column p-5 fade-in-section ">
          <div className="m-0">
            <h3 className="m-0 fw-bold text-white">MISSION</h3>
          </div>
          <div className="mt-3">
            <p className="m-0 text-center text-white fw-bold">
              CAVITE STATE UNIVERSITY shall provide excellent, equitable and relevant educational opportunities in the arts, sciences, and technology through quality instruction and responsive research and development activities. It shall produce professional skilled and morally upright individuals for global competitiveness.
            </p>
          </div>
        </div>

        <div
          className="mx-0 d-flex justify-content-center row w-100 shadow-sm rounded-2 p-2 mt-2 gap-2 fade-in-section"
          style={{ backgroundColor: "var(--main-color)" }}
        >
          <div className="text-center text-warning mt-3">
            <h2 className="text-warning fw-bold">OUR CORE VALUES</h2>
          </div>

          <div className="row g-3 d-flex justify-content-center mb-3">
            <div className="col-12 col-sm-6 col-md-3 ">
              <div className="core-value text-center p-3 rounded d-flex flex-column h-100" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} >
                <h2 className="text-warning fw-bold">TRUTH</h2>
                <h6 className="text-white">Commitment to honesty and transparency in all academic and institutional pursuits.</h6>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <div className="core-value text-center p-3 rounded d-flex flex-column h-100" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                <h2 className="text-warning fw-bold">INTEGRITY</h2>
                <h6 className="text-white">Maintaining ethical standards and moral principles in education and research.</h6>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <div className="core-value text-center p-3 rounded d-flex flex-column h-100" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                <h2 className="text-warning fw-bold">EXCELLENCE</h2>
                <h6 className="text-white">Striving for the highest quality in teaching, learning, and institutional performance.</h6>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <div className="core-value text-center p-3 rounded d-flex flex-column h-100" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                <h2 className="text-warning fw-bold">SERVICE</h2>
                <h6 className="text-white">Dedicating ourselves to community development and societal progress.</h6>
              </div>
            </div>
          </div>
        </div>

        <div className="fade-in-section text-center mt-2 text-white w-100 p-3" style={{ backgroundColor: "var(--thirdMain-color)" }} >
          <h2 className=" fw-bold">CvSU-R GOALS</h2>
          <p className="text-white">CvSU Rosario Campus aims to produce productive graduates, professionals, and experts marked by global excellence and moral uprightness through the following:</p>
        </div>
        <div
          className="mx-0 d-flex justify-content-center row  shadow-lg gap-2 fade-in-section"
        // style={{ border: "2px solid green" }}
        >


          <div className="fade-in-section  mb-2  text-dark bg-white rounded" style={{ border: "2px solid green" }}>
            <div className=" flex-column p-3 rounded d-flex w-100">
              {/* <h2 className="text-warning fw-bold">SERVICE</h2> */}
              <div className="">
                <p>1. Offer various programs/courses relevant to the needs of the clients for global competitiveness.</p>
                <p>2. Upgrade the qualification and competencies of the teaching and non-teaching personnel for quality service.</p>
                <p>3. Improve facilities relevant for effective and efficient education and training.</p>
                <p>4. Engage in research and extension projects/activities that will lead to instruction and community improvement.</p>
                <p>5. Strengthen linkages with local and international agencies for instruction, research, development and production.</p>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div >
  );
}
