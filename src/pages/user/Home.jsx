import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useOutletContext, Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const { user } = useOutletContext();
  const [requestedDocuments, setRequestedDocuments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/documents/fetchRequestedDocuments")
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.data);
          setRequestedDocuments(res.data.data);
        } else if (res.data.Message) {
          console.log("Error:", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error fetching Programs: ", err);
      });
  }, []);
  return (
    <div className="p-4 w-100 overflow-auto" style={{ maxHeight: "650px" }}>
      <div
        className="rounded-2 shadow-sm mb-2"
        style={{ backgroundColor: "var(--main-color)" }}
      >
        <h5 className="m-0 p-3" style={{ color: "var(--secondMain-color)" }}>
          Pending Request
        </h5>
      </div>

      <div
        className="p-2 text-start w-100 rounded-2 p-3"
        style={{ backgroundColor: "var(--thirdMain-color)" }}
      >
        <h5
          className="m-0 d-flex align-items-center justify-content-center"
          style={{ color: "var(--background-color)" }}
        >
          <div className="w-100 d-flex align-items-center justify-content-center">
            <i className="bx bxs-notepad fs-5 me-1 m-0"></i>Purpose
          </div>
          <div className="w-100 d-flex align-items-center justify-content-center">
            <i className="bx bxs-calendar-check fs-5 me-1"></i>Date
          </div>
          <div className="w-100 d-flex align-items-center justify-content-center">
            <i className="bx bxs-id-card fs-5 me-1"></i>Status
          </div>
        </h5>
      </div>
      <div className="mt-3 d-flex flex-column gap-3">
        {requestedDocuments.map((request) => (
          <Link
            key={request.requestID}
            className="text-decoration-none text-dark"
            to="/request-details"
          >
            <div className="row mx-auto g-2 bg-light rounded shadow-sm p-3">
              <div className="col-12 col-md d-flex align-items-center justify-content-center">
                <p className="m-0 fw-bold">{request.purpose}</p>
              </div>

              <div className="col-12 col-md d-flex align-items-center justify-content-center">
                <p className="m-0 fw-bold">
                  {new Date(request.created).toLocaleDateString()}
                </p>
              </div>

              <div className="col-12 col-md d-flex align-items-center justify-content-center">
                <h6 className="m-0 text-warning fw-bold">Pending</h6>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* <div className="w-100 h-50 bg-light shadow-sm rounded-2 p-5 mt-5">
        <div className="d-flex align-items-center justify-content-around mt-5">
          Free space
        </div>
      </div> */}
    </div>
  );
}
