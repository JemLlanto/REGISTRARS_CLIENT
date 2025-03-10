import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const StatusLabels = ({ requestedDocuments }) => {
  return (
    <Row className="w-100 mx-auto gap-2 mt-3">
      <Col className="m-0 p-0">
        <Link
          to="/admin/dashboard/new-request"
          className="text-decoration-none"
        >
          <div className="shadow-sm rounded p-3 h-100 d-flex align-items-center bg-white">
            <div
              className="text-white d-flex justify-content-center align-items-center p-3"
              style={{ width: "60px", height: "60px" }}
            >
              <i className="bx bx-user-plus fs-3 rounded-circle p-3" style={{ backgroundColor: "var(--main-color)" }}></i>
            </div>
            <div className="ms-3">
              <h5 className="text-success mb-1">123+</h5>
              <h5 className="text-dark">New Request</h5>
            </div>
          </div>
        </Link>
      </Col>

      <Col className="m-0 p-0">
        <Link to="/admin/dashboard/pendings" className="text-decoration-none">
          <div className="shadow-sm rounded p-3 h-100 d-flex align-items-center bg-white">
            <div
              className=" text-white  d-flex justify-content-center align-items-center p-3"
              style={{ width: "60px", height: "60px" }}
            >
              <i className="bx bxs-timer fs-3 rounded-circle p-3" style={{ backgroundColor: "var(--main-color)" }}></i>
            </div>
            <div className="ms-3">
              <h5 className="text-success mb-1">2133+</h5>
              <h5 className="text-dark">Pending</h5>
            </div>
          </div>
        </Link>
      </Col>

      <Col className="m-0 p-0">
        <Link to="/admin/dashboard/completed" className="text-decoration-none">
          <div className="shadow-sm rounded p-3 h-100 d-flex align-items-center bg-white">
            <div
              className=" text-white  d-flex justify-content-center align-items-center p-3"
              style={{ width: "60px", height: "60px" }}
            >
              <i className="bx bxs-user-check fs-3 rounded-circle p-3" style={{ backgroundColor: "var(--main-color)" }}></i>
            </div>
            <div className="ms-3"></div>
            <div>
              <h5 className="text-success mb-1">923+</h5>
              <h5 className="text-dark">Completed</h5>
            </div>
          </div>
        </Link>
      </Col>

      <Col className="m-0 p-0">
        <Link
          to="/admin/dashboard/total-request"
          className="text-decoration-none"
        >
          <div className="shadow-sm rounded p-3 h-100 d-flex align-items-center bg-white">
            <div
              className=" text-white  d-flex justify-content-center align-items-center p-3"
              style={{ width: "60px", height: "60px" }}
            >
              <i className="bx bx-list-check fs-3 rounded-circle p-3" style={{ backgroundColor: "var(--main-color)" }}></i>
            </div>
            <div className="ms-3">
              <h5 className="text-success mb-1">{requestedDocuments.length}</h5>
              <h5 className="text-dark">Total Request</h5>
            </div>
          </div>
        </Link>
      </Col>
    </Row>
  );
};

export default StatusLabels;
