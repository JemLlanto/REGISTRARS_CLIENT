import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useOutletContext, Link, useNavigate } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";

export default function Home() {
  const { user } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isAdmin) {
      navigate("/home");
    }
  }, [user.isAdmin, navigate]);

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
        <Row className="container w-100 mt-4 g-3">
          <Col xs={12} sm={6} md={3}>
            <Link
              to="/admin/dashboard/new-request"
              className="text-decoration-none"
            >
              <div className="shadow-sm rounded p-3 h-100 d-flex align-items-center">
                <div
                  className="text-white d-flex justify-content-center align-items-center p-3"
                  style={{ width: "60px", height: "60px" }}
                >
                  <i className="bx bx-user-plus fs-3 rounded-circle"></i>
                </div>
                <div className="ms-3">
                  <h5 className="text-success mb-1">123+</h5>
                  <h5 className="text-dark">New Request</h5>
                </div>
              </div>
            </Link>
          </Col>

          <Col xs={12} sm={6} md={3}>
            <Link
              to="/admin/dashboard/pendings"
              className="text-decoration-none"
            >
              <div className="shadow-sm rounded p-3 h-100 d-flex align-items-center">
                <div
                  className=" text-white  d-flex justify-content-center align-items-center p-3"
                  style={{ width: "60px", height: "60px" }}
                >
                  <i className="bx bxs-timer fs-3 rounded-circle"></i>
                </div>
                <div className="ms-3">
                  <h5 className="text-success mb-1">2133+</h5>
                  <h5 className="text-dark">Pendings</h5>
                </div>
              </div>
            </Link>
          </Col>

          <Col xs={12} sm={6} md={3}>
            <Link
              to="/admin/dashboard/completed"
              className="text-decoration-none"
            >
              <div className="shadow-sm rounded p-3 h-100 d-flex align-items-center">
                <div
                  className=" text-white  d-flex justify-content-center align-items-center p-3"
                  style={{ width: "60px", height: "60px" }}
                >
                  <i className="bx bxs-user-check fs-3 rounded-circle"></i>
                </div>
                <div className="ms-3"></div>
                <div>
                  <h5 className="text-success mb-1">923+</h5>
                  <h5 className="text-dark">Completed</h5>
                </div>
              </div>
            </Link>
          </Col>

          <Col xs={12} sm={6} md={3}>
            <Link
              to="/admin/dashboard/total-request"
              className="text-decoration-none"
            >
              <div className="shadow-sm rounded p-3 h-100 d-flex align-items-center">
                <div
                  className=" text-white  d-flex justify-content-center align-items-center p-3"
                  style={{ width: "60px", height: "60px" }}
                >
                  <i className="bx bx-list-check fs-3 rounded-circle"></i>
                </div>
                <div className="ms-3">
                  <h5 className="text-success mb-1">928+</h5>
                  <h5 className="text-dark">Total Request</h5>
                </div>
              </div>
            </Link>
          </Col>
        </Row>

        {/* Free Space Section */}
        {/* <div className="w-100 rounded-2 p-1 mt-5 text-center">
          <div className=" d-flex  justify-content-evenly gap-3">
            <div className="w-100  bg-white shadow-sm d-flex justify-content-center align-items-center">
              <img
                src="/Graph.png"
                alt="cvsu-logo"
                className="w-75 img-fluid"
                style={{ objectFit: "cover", height: "400px" }}
              />
            </div>
          </div>
        </div> */}
      </div>
    </Container>
  );
}
