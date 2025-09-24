import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LocationAndContact from "../../components/about/LocationAndContact";
import GuidingPrinciples from "../../components/about/GuidingPrinciples";
import CoreValues from "../../components/about/CoreValues";
import { useOutletContext } from "react-router-dom";

export default function About() {
  const { user } = useOutletContext();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div
      className="ps-1 ps-md-0 pe-1 mb-2 w-100 overflow-y-auto overflow-x-hidden rounded custom-scrollbar"
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
      <LocationAndContact
        isAdmin={user.isAdmin}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />

      {isLoading ? (
        <></>
      ) : (
        <>
          {/* Misson Vision */}
          <GuidingPrinciples isAdmin={user.isAdmin} />

          {/* Core Values */}
          <CoreValues />

          {/* CCAT GOALS */}
          <div
            className=" mt-2 p-4  rounded text-white"
            style={{ backgroundColor: "var(--main-color)" }}
          >
            <h2 className="text-center fw-bold text-warning">
              CvSU-CCAT GOALS
            </h2>
            <p className="text-center mb-4">
              CvSU-CCAT Campus aims to produce productive graduates,
              professionals, and experts marked by global excellence and moral
              uprightness through the following:
            </p>

            <div className="mb-3">
              <p>
                <strong>1. Relevant Programs</strong>
              </p>
              <p>
                Offer various programs/courses relevant to the needs of the
                clients for global competitiveness.
              </p>
            </div>

            <div className="mb-3">
              <p>
                <strong>2. Personnel Competence</strong>
              </p>
              <p>
                Upgrade the qualification and competencies of the teaching and
                non-teaching personnel for quality service.
              </p>
            </div>

            <div className="mb-3">
              <p>
                <strong>3. Facility Improvement</strong>
              </p>
              <p>
                Improve facilities relevant for effective and efficient
                education and training.
              </p>
            </div>

            <div className="mb-3">
              <p>
                <strong>4. Research & Extension</strong>
              </p>
              <p>
                Engage in research and extension projects/activities that will
                lead to instruction and community improvement.
              </p>
            </div>

            <div>
              <p>
                <strong>5. Strengthen Linkages</strong>
              </p>
              <p>
                Strengthen linkages with local and international agencies for
                instruction, research, development and production.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
