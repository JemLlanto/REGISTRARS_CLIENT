import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spinner, Pagination } from "react-bootstrap";

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

  // Render pagination items
  const renderPaginationItems = () => {
    let items = [];

    // First and Previous buttons
    items.push(
      <Pagination.First
        key="first"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      />,
      <Pagination.Prev
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
    );

    // Add page numbers
    const addPageNumbers = () => {
      let pageNumbers = [];

      // Always show first page
      if (currentPage > 3) {
        pageNumbers.push(
          <Pagination.Item key={1} onClick={() => handlePageChange(1)}>
            1
          </Pagination.Item>
        );

        if (currentPage > 4) {
          pageNumbers.push(<Pagination.Ellipsis key="start-ellipsis" />);
        }
      }

      // Surrounding pages
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);

      for (let number = startPage; number <= endPage; number++) {
        pageNumbers.push(
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </Pagination.Item>
        );
      }

      // Always show last page
      if (currentPage < totalPages - 1) {
        if (currentPage < totalPages - 2) {
          pageNumbers.push(<Pagination.Ellipsis key="end-ellipsis" />);
        }

        pageNumbers.push(
          <Pagination.Item
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </Pagination.Item>
        );
      }

      return pageNumbers;
    };

    // Add page number items
    items.push(...addPageNumbers());

    // Next and Last buttons
    items.push(
      <Pagination.Next
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />,
      <Pagination.Last
        key="last"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      />
    );

    return items;
  };

  return (
    <>
      <div className="d-flex flex-column gap-3">
        <div
          className="requestList custom-scrollbar mt-2 d-flex flex-column gap-2 overflow-auto"
        // style={{ height: "clamp(20rem, 5dvh, 40rem)" }}
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
                      className="text-decoration-none text-dark bg-light rounded shadow-sm "
                      to={`/request-details/${request.requestID}`}
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
                    <p>No requested documents found...</p>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="custom-pagination d-flex align-items-center justify-content-center">
          <Pagination className="pagination">
            {renderPaginationItems()}
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default RequestList;
