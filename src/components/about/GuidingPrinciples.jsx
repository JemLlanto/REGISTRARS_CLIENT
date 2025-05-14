import axios from "axios";
import React, { useState } from "react";
import GuidingPrinciplesModal from "./modal/GuidingPrinciplesModal";

const GuidingPrinciples = () => {
  const [principles, setPrinciples] = useState([]);

  const fetchPrinciples = async () => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/about/fetchGuidingPrinciples`
      );
      if (res.status === 200) {
        console.log(res.data.result);
        setPrinciples(res.data.result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useState(() => {
    fetchPrinciples();
  }, []);
  return (
    <>
      <div className="d-flex justify-content-between gap-2 mt-2 row mx-auto">
        {principles.map((principle) => (
          <div
            key={principle.id}
            className="core-value policy col-xl d-flex align-items-center justify-content-start shadow-sm rounded-2 flex-column py-3 p-2 p-md-4 fade-in-section"
            style={{ animationDelay: `${1 * 0.2}s` }}
          >
            <GuidingPrinciplesModal
              principle={principle}
              fetchPrinciples={fetchPrinciples}
            />
            <div className="m-0">
              <h4 className="m-0 fw-bold text-warning text-center">
                {principle.title}
              </h4>
            </div>
            <div className="mt-2">
              <p className="m-0 text-center text-white fw-bold">
                {principle.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GuidingPrinciples;
