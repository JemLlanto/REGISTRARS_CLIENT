import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spinner, Pagination } from "react-bootstrap";
import { renderPaginationItems } from "../../utils/requestServices";

const RequestList = ({ status, filteredRequests, isLoading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 10;

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

  // Paginate requests
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );

  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [status]);

  return (
    <>
      <div
        className="d-flex flex-column justify-content-between gap-2"
        style={{ height: "70dvh" }}
      >
        <div
          className="requestList rounded custom-scrollbar mt-2 d-flex flex-column gap-2 overflow-auto"
          style={{ height: "85%" }}
        >
          {isLoading ? (
            <>
              <div
                className="d-flex justify-content-center align-items-center gap-1"
                style={{ height: "70%" }}
              >
                <Spinner animation="border" variant="primary" size="sm" />
                <p className="m-0">Loading request...</p>
              </div>
            </>
          ) : (
            <>
              {currentRequests.length > 0 ? (
                <>
                  {currentRequests.map((request, index) => (
                    <Link
                      key={index}
                      className="text-decoration-none text-dark bg-light rounded shadow-sm fade-in-section"
                      to={`/request-details/${request.requestID}`}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <div className="row mx-auto g-2 p-3">
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
                          <h5
                            className={`m-0 ${getStatusColor(request.status)}`}
                          >
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
                  <div
                    className="spinner-container d-flex justify-content-center align-items-center spinner-container"
                    style={{ height: "70%" }}
                  >
                    <p>No requested documents found.</p>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="custom-pagination d-flex align-items-center justify-content-center">
          <Pagination className="pagination">
            {renderPaginationItems(handlePageChange, currentPage, totalPages)}
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default RequestList;
