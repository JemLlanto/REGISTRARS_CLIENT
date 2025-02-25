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
    <div className="p-4 w-100">
      <div
        className="rounded-2 shadow-sm"
        style={{ backgroundColor: "var(--main-color)" }}
      >
        <h5 className="m-0 p-3" style={{ color: "var(--secondMain-color)" }}>
          Pending Request:
        </h5>
      </div>
      {requestedDocuments.map((request) => (
        <Link
          key={request.requestID}
          className="text-decoration-none text-dark"
          to="/request-details"
        >
          <div className="w-100 h-50 bg-light shadow-sm rounded-2">
            <div className="d-flex align-items-center justify-content-around mt-5 p-3">
              <p>{request.firstName}</p>
              <p>Feb 19, 2025</p>
              <p>Pending</p>
            </div>
          </div>
        </Link>
      ))}

      <div className="w-100 h-50 bg-light shadow-sm rounded-2 p-5 mt-5">
        <div className="d-flex align-items-center justify-content-around mt-5">
          Free space
        </div>
      </div>
    </div>
  );
}
