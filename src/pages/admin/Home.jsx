import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useOutletContext, Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";

export default function Home() {
  const { user } = useOutletContext();

  return (
    <Container fluid className="p-4 w-100">
      <div
        className="rounded-2 shadow-sm text-white p-2"
        style={{ backgroundColor: "var(--main-color)" }}
      >
        <h5 className="m-0 p-2" style={{ color: "var(--secondMain-color)" }}>
          Dashboard: {user?.firstName}
        </h5>
      </div>
      <div
        className="overflow-y-scroll overflow-x-hidden"
        style={{ height: "77dvh" }}
      >
        {/* Responsive Boxes */}
        <Row className="container w-100 mt-4 g-3">
          <Col xs={12} sm={6} md={3}>
            <Link
              to="/admin/dashboard/new-request"
              className="text-decoration-none"
            >
              <div className="shadow-sm rounded p-3  text-start">
                <div className="d-flex justify-content-between">
                  <i class="bx bx-user-plus"></i>
                  <div className="flex-column">
                    <h5 className="text-success">123+</h5>
                    <h4 className="text-dark">New Request</h4>
                  </div>
                </div>
              </div>
            </Link>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Link
              to="/admin/dashboard/pendings"
              className="text-decoration-none"
            >
              <div className="shadow-sm rounded p-3  text-start">
                <div className="d-flex justify-content-between">
                  <i class="bx bxs-timer"></i>
                  <div className="flex-column">
                    <h5 className="text-success">2133+</h5>
                    <h4 className="text-dark">Pendings</h4>
                  </div>
                </div>
              </div>
            </Link>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Link
              to="/admin/dashboard/completed"
              className="text-decoration-none"
            >
              <div className="shadow-sm rounded p-3 text-start">
                <div className="d-flex justify-content-between">
                  <i class="bx bxs-user-check"></i>
                  <div className="flex-column">
                    <h5 className="text-success">923+</h5>
                    <h4 className="text-dark">Completed</h4>
                  </div>
                </div>
              </div>
            </Link>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Link
              to="/admin/dashboard/total-request"
              className="text-decoration-none"
            >
              <div className="shadow-sm rounded p-3 text-start">
                <div className="d-flex justify-content-between">
                  <i class="bx bx-list-check"></i>
                  <div className="flex-column">
                    <h5 className="text-success">0928+</h5>
                    <h4 className="text-dark">Total Request</h4>
                  </div>
                </div>
              </div>
            </Link>
          </Col>
        </Row>

        {/* Free Space Section */}
        <div className="w-100 rounded-2 p-1 mt-5 text-center">
          <div className=" d-flex  justify-content-evenly gap-3">
            <div className="w-100  bg-white shadow-sm d-flex justify-content-center align-items-center">
              <img
                src="/Graph.png"
                alt="cvsu-logo"
                className="w-100 img-fluid"
                style={{ objectFit: "cover", height: "300px" }}
              />
            </div>

            <div className="w-100  bg-white shadow-sm d-flex justify-content-between">
              <div className="w-50">
                <img
                  src="/chart.png"
                  alt="cvsu-logo"
                  className="w-100 img-fluid"
                  style={{ objectFit: "cover", height: "300px" }}
                />
              </div>
              <div className="w-50 m-0 d-flex align-content-center justify-content-center flex-column">
                <h3 className="m-0">50%</h3>
                <h3 className="m-0">25%</h3>
                <h3 className="m-0">25%</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
