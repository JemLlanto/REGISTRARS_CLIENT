import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useOutletContext, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NewAccountPopup from "../../components/NewAccount/NewAccountPopup";

export default function Home() {
  const { user } = useOutletContext();
  const [requestedDocuments, setRequestedDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isAdmin) {
      navigate("/admin/home");
    }
  }, [user.isAdmin, navigate]);

  const userID = user?.userID;

  useEffect(() => {
    if (userID) {
      axios
        .get(
          `http://localhost:5000/api/fetchingDocuments/fetchRequestedDocuments/${userID}`
        )
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
    }
  }, [userID]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-warning"; // Yellow
      case "processing":
        return "text-primary"; // Blue
      case "ready to pickup":
        return "text-info"; // Blue
      case "completed":
        return "text-success"; // Green
      case "cancelled":
        return "text-danger"; // Red
      default:
        return "text-dark"; // Default color
    }
  };

  return (
    <div className="p-1 p-sm-4 w-100">
      <div
        className="rounded-2 shadow-sm mb-2"
        style={{ backgroundColor: "var(--main-color)" }}
      >
        <h5 className="m-0 p-3" style={{ color: "var(--secondMain-color)" }}>
          Pending Request
        </h5>
      </div>

      <div
        className="p-2 text-start w-100 rounded-2 p-3 d-none d-sm-block"
        style={{ backgroundColor: "var(--yellow-color)" }}
      >
        <div
          className="m-0 d-flex align-items-center justify-content-center"
          style={{ color: "var(--background-color)" }}
        >
          <div className="w-100 d-flex align-items-center justify-content-center">
            <h5 className="m-0">
              <i className="bx bxs-user me-2 "></i>Name
            </h5>
          </div>
          <div className="w-100 d-flex align-items-center justify-content-center">
            <h5 className="m-0">
              <i className="bx bxs-notepad me-2 m-0"></i>Purpose
            </h5>
          </div>
          <div className="w-100 d-flex align-items-center justify-content-center">
            <h5 className="m-0">
              <i className="bx bxs-calendar-check me-2"></i>Date
            </h5>
          </div>
          <div className="w-100 d-flex align-items-center justify-content-center">
            <h5 className="m-0">
              <i className="bx bxs-id-card me-2"></i>Status
            </h5>
          </div>
        </div>
      </div>
      <div
        className="custom-scrollbar mt-3 d-flex flex-column gap-3 overflow-auto"
        style={{ height: "65dvh" }}
      >
        {requestedDocuments.length > 0 ? (
          <>
            {requestedDocuments.map((request) => (
              <Link
                key={request.requestID}
                className="text-decoration-none text-dark"
                to={`/request-details/${request.requestID}`}
              >
                <div className="row mx-auto g-2 bg-light rounded shadow-sm p-3">
                  <div className="col-12 col-sm d-flex align-items-center justify-content-center">
                    <h5 className="m-0 fw-bold me-1 d-block d-sm-none">
                      Name:
                    </h5>
                    <p className="m-0">{request.firstName}</p>
                  </div>
                  {/* Line */}
                  <div
                    className="bg-dark w-100  d-block d-sm-none"
                    style={{ height: "1px" }}
                  ></div>
                  <div className="col-12 col-sm d-flex align-items-center justify-content-center">
                    <h5 className="m-0 fw-bold me-1 d-block d-sm-none">
                      Purpose:
                    </h5>
                    <p className="m-0">{request.purpose}</p>
                  </div>

                  {/* Line */}
                  <div
                    className="bg-dark w-100  d-block d-sm-none"
                    style={{ height: "1px" }}
                  ></div>

                  <div className="col-12 col-sm d-flex align-items-center justify-content-center">
                    <h5 className="m-0 fw-bold me-1 d-block d-sm-none">
                      Date:
                    </h5>
                    <p className="m-0 ">
                      {request?.created
                        ? new Intl.DateTimeFormat("en-US", {
                            dateStyle: "medium",
                          }).format(new Date(request?.created))
                        : ""}
                    </p>
                  </div>
                  {/* Line */}
                  <div
                    className="bg-dark w-100 d-block d-sm-none"
                    style={{ height: "1px" }}
                  ></div>

                  <div className="col-12 col-sm d-flex align-items-center justify-content-center">
                    <h5 className="m-0 fw-bold me-1 d-block d-sm-none">
                      Status:
                    </h5>
                    <h5 className={`m-0 ${getStatusColor(request.status)}`}>
                      {String(request.status).charAt(0).toUpperCase() +
                        String(request.status).slice(1)}
                    </h5>
                  </div>
                </div>
              </Link>
            ))}
          </>
        ) : (
          <>
            <p>No pending request</p>
          </>
        )}
      </div>

      {/* <div className="w-100 h-50 bg-light shadow-sm rounded-2 p-5 mt-5">
        <div className="d-flex align-items-center justify-content-around mt-5">
          Free space
        </div>
      </div> */}
    </div>
  );
}
