import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function About() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-1 p-sm-4 w-100 overflow-auto custom-scrollbar" style={{ height: "100%" }}>
      <div
        className="rounded-2 shadow-sm p-2"
        style={{ backgroundColor: "var(--main-color)" }}
      >
        <h5 className="m-0 p-2 fade-in " style={{ color: "var(--secondMain-color)" }}>
          About Us
        </h5>
      </div>



      <div
        className="d-flex justify-content-between gap-2 mt-2 row mx-auto"
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
          className="mx-0 d-flex justify-content-center row w-100 shadow-sm rounded-2 p-2 mt-1 gap-2 fade-in-section"
          style={{ backgroundColor: "var(--main-color)" }}
        >
          <div className="text-center text-warning mt-3">
            <h2 className="text-warning fw-bold">OUR CORE VALUES</h2>
          </div>

          <div className="row g-3 d-flex justify-content-center mb-3">
            <div className="col-12 col-sm-6 d-flex col-md-3 ">
              <div className="core-value text-center p-3 rounded d-flex flex-column h-100" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} >
                <h2 className="text-warning fw-bold">TRUTH</h2>
                <h6 className="text-white">Commitment to honesty and transparency in all academic and institutional pursuits.</h6>
              </div>
            </div>

            <div className="col-12 col-sm-6 d-flex col-md-3">
              <div className="core-value text-center p-3 rounded d-flex flex-column h-100" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                <h2 className="text-warning fw-bold">INTEGRITY</h2>
                <h6 className="text-white">Maintaining ethical standards and moral principles in education and research.</h6>
              </div>
            </div>

            <div className="col-12 col-sm-6 d-flex col-md-3">
              <div className="core-value text-center p-3 rounded d-flex flex-column h-100" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                <h2 className="text-warning fw-bold">EXCELLENCE</h2>
                <h6 className="text-white">Striving for the highest quality in teaching, learning, and institutional performance.</h6>
              </div>
            </div>

            <div className="col-12 col-sm-6 d-flex col-md-3">
              <div className="core-value text-center p-3 rounded d-flex flex-column h-100" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                <h2 className="text-warning fw-bold">SERVICE</h2>
                <h6 className="text-white">Dedicating ourselves to community development and societal progress.</h6>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="fade-in-section w-100 py-5 px-3 px-md-5 text-dark text-center bg-white mt-2 rounded shadow-sm mb-5">
        <div className="mb-5">
          <h2 className="fw-bold display-5">🎯 CvSU-CCAT-R GOALS</h2>
          <p className="lead mt-3 mb-0 mx-auto" style={{ maxWidth: "850px" }}>
            CvSU Rosario Campus aims to produce productive graduates, professionals, and experts marked by global excellence and moral uprightness through the following:
          </p>
        </div>

        <div className="container">
          <div className="row g-4">
            {/* Goal Items */}
            {[
              {
                num: "01",
                color: "bg-success",
                title: "Relevant Programs",
                text: "Offer various programs/courses relevant to the needs of the clients for global competitiveness.",
              },
              {
                num: "02",
                color: "bg-primary",
                title: "Personnel Competence",
                text: "Upgrade the qualification and competencies of the teaching and non-teaching personnel for quality service.",
              },
              {
                num: "03",
                color: "bg-warning",
                title: "Facility Improvement",
                text: "Improve facilities relevant for effective and efficient education and training.",
              },
              {
                num: "04",
                color: "bg-danger",
                title: "Research & Extension",
                text: "Engage in research and extension projects/activities that will lead to instruction and community improvement.",
              },
              {
                num: "05",
                color: "bg-pink", // You might need to define this if not in Bootstrap by default
                title: "Strengthen Linkages",
                text: "Strengthen linkages with local and international agencies for instruction, research, development and production.",
              },
            ].map((goal, i) => (
              <div
                key={i}
                className={`col-12 col-md-6 ${i === 4 ? "offset-md-3" : ""} d-flex`}
              >
                <div className="goal-box d-flex flex-column flex-md-row align-items-start w-100 p-3 border rounded shadow-sm">
                  <div className={`goal-number ${goal.color} text-white me-md-3 mb-2 mb-md-0 px-3 py-2 rounded`}>
                    {goal.num}
                  </div>
                  <div className="goal-content text-start">
                    <p className="fw-bold mb-1">{goal.title}</p>
                    <p className="mb-0">{goal.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div >
  );
}
