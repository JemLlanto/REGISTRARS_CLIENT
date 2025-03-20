import React from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "text-warning"; // Yellow
    case "processing":
      return "text-primary"; // Blue
    case "completed":
      return "text-success"; // Green
    case "cancelled":
      return "text-danger"; // Red
    default:
      return "text-dark"; // Default color
  }
};

const RequestHeaders = ({ filteredRequests, isLoading }) => {
  return (
    <div
      className="mt-2 d-flex flex-column gap-2 overflow-auto pe-1 rounded"
      style={{ height: "60dvh" }}
    >
      {isLoading ? (
        <>
          <p>
            <Spinner animation="border" variant="primary" />
            Loading...
          </p>
        </>
      ) : (
        <>
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request, index) => (
              <Link
                key={index}
                className="text-decoration-none text-dark bg-light rounded shadow-sm "
                to={`/request-details/${request.requestID}`}
              >
                <div className="row mx-auto g-2 p-3">
                  <div className="col-12 col-sm d-flex align-items-center justify-content-center">
                    <h5 className="m-0 fw-bold me-1 d-block d-sm-none">
                      Name:
                    </h5>
                    <p className="m-0 me-1">{request.firstName}</p>
                    <p className="m-0">{request.lastName}</p>
                  </div>

                  <div
                    className="bg-dark w-100 d-block d-sm-none"
                    style={{ height: "1px" }}
                  ></div>

                  <div className="col-12 col-sm d-flex align-items-center justify-content-center">
                    <h5 className="m-0 fw-bold me-1 d-block d-sm-none">
                      Purpose:
                    </h5>
                    <p className="m-0">{request.purpose}</p>
                  </div>

                  <div
                    className="bg-dark w-100 d-block d-sm-none"
                    style={{ height: "1px" }}
                  ></div>

                  <div className="col-12 col-sm d-flex align-items-center justify-content-center">
                    <h5 className="m-0 fw-bold me-1 d-block d-sm-none">
                      Date:
                    </h5>
                    <p className="m-0">
                      {request?.created
                        ? new Intl.DateTimeFormat("en-US", {
                            dateStyle: "medium",
                          }).format(new Date(request?.created))
                        : ""}
                    </p>
                  </div>

                  <div
                    className="bg-dark w-100 d-block d-sm-none"
                    style={{ height: "1px" }}
                  ></div>

                  <div className="col-12 col-sm d-flex align-items-center justify-content-center">
                    <h5 className="m-0 fw-bold me-1 d-block d-sm-none">
                      Status:
                    </h5>
                    <h5 className={`m-0 ${getStatusColor(request.status)}`}>
                      {request.status}
                    </h5>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No pending request</p>
          )}
        </>
      )}
    </div>
  );
};

export default RequestHeaders;
