import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const StatusLabels = ({ requestedDocuments }) => {
  const pendingCount = requestedDocuments.filter(
    (request) => request.status.toLowerCase() === "pending"
  ).length;
  const processingCount = requestedDocuments.filter(
    (request) => request.status.toLowerCase() === "processing"
  ).length;
  const completedCount = requestedDocuments.filter(
    (request) => request.status.toLowerCase() === "completed"
  ).length;

  return (
    <Row className="w-100 mx-auto gap-2 mt-2">
      <Col className="m-0 p-0">
        <Link
          to="/admin/dashboard/new-request"
          className="text-decoration-none"
        >
          <div className="card-hover shadow-sm rounded p-3 h-100 d-flex align-items-center bg-white">
            <div
              className="text-white d-flex justify-content-center align-items-center p-3"
              style={{ width: "60px", height: "60px" }}
            >
              <i
                className="bx bx-user-plus fs-3 rounded-circle p-3"
                style={{ backgroundColor: "var(--main-color)" }}
              ></i>
            </div>
            <div className="ms-3">
              <h5 className="text-success mb-1">123+</h5>
              <h5 className="text-dark">New Request</h5>
            </div>
          </div>
        </Link>
      </Col>

      <Col className="m-0 p-0">
        <Link
          to="/admin/student-requests?status=pending"
          className="text-decoration-none"
        >
          <div className="card-hover shadow-sm rounded p-3 h-100 d-flex align-items-center bg-white">
            <div
              className=" text-white  d-flex justify-content-center align-items-center p-3"
              style={{ width: "60px", height: "60px" }}
            >
              <i
                className="bx bxs-timer fs-3 rounded-circle p-3"
                style={{ backgroundColor: "var(--main-color)" }}
              ></i>
            </div>
            <div className="ms-3">
              <h5 className="text-success mb-1">{pendingCount}</h5>
              <h5 className="text-dark">Pending</h5>
            </div>
          </div>
        </Link>
      </Col>

      <Col className="m-0 p-0">
        <Link
          to="/admin/student-requests?status=processing"
          className="text-decoration-none"
        >
          <div className="card-hover shadow-sm rounded p-3 h-100 d-flex align-items-center bg-white">
            <div
              className=" text-white  d-flex justify-content-center align-items-center p-3"
              style={{ width: "60px", height: "60px" }}
            >
              <i
                className="bx bxs-user-check fs-3 rounded-circle p-3"
                style={{ backgroundColor: "var(--main-color)" }}
              ></i>
            </div>
            <div className="ms-3"></div>
            <div>
              <h5 className="text-success mb-1">{processingCount}</h5>
              <h5 className="text-dark">Processing</h5>
            </div>
          </div>
        </Link>
      </Col>

      <Col className="m-0 p-0">
        <Link
          to="/admin/student-requests?status=completed"
          className="text-decoration-none"
        >
          <div className="card-hover shadow-sm rounded p-3 h-100 d-flex align-items-center bg-white">
            <div
              className=" text-white  d-flex justify-content-center align-items-center p-3"
              style={{ width: "60px", height: "60px" }}
            >
              <i
                className="bx bxs-user-check fs-3 rounded-circle p-3"
                style={{ backgroundColor: "var(--main-color)" }}
              ></i>
            </div>
            <div className="ms-3"></div>
            <div>
              <h5 className="text-success mb-1">{completedCount}</h5>
              <h5 className="text-dark">Completed</h5>
            </div>
          </div>
        </Link>
      </Col>
    </Row>
  );
};

export default StatusLabels;
