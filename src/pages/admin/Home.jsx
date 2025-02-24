import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useOutletContext, Link } from "react-router-dom";

import { Row, Col, Container } from "react-bootstrap";
import AdminModal from "../../components/Modals/Modals";

export default function Home() {
  const { user } = useOutletContext();

  return (
    <Container fluid className="p-4 w-100">
      <div
        className="rounded-2 shadow-sm text-white p-2"
        style={{ backgroundColor: "var(--main-color)" }}
      >
        <h5 className="m-0">Dashboard: {user?.isAdmin}</h5>
      </div>

      {/* Responsive Boxes */}
      <Row className="box w-100 mt-4 g-3">
        <Col xs={12} sm={6} md={3}>
          <Link
            to="/admin/dashboard/new-request"
            className="text-decoration-none"
          >
            <div className="shadow-sm rounded p-3 bg-white text-center">
              <i class="bx bx-user-plus"></i>
              <h3 className="text-success">123</h3>
              <h4>New Request</h4>
              <div className="w-100"></div>
            </div>
          </Link>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Link to="/admin/dashboard/pendings" className="text-decoration-none">
            <div className="shadow-sm rounded p-3 bg-light text-center">
              <i class="bx bxs-timer"></i>
              <h3 className="text-success">2133</h3>
              <h4>Pendings</h4>
            </div>
          </Link>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Link
            to="/admin/dashboard/completed"
            className="text-decoration-none"
          >
            <div className="shadow-sm rounded p-3 bg-light text-center">
              <i class="bx bxs-user-check"></i>
              <h3 className="text-success">923</h3>
              <h4>Completed</h4>
            </div>
          </Link>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Link
            to="/admin/dashboard/total-request"
            className="text-decoration-none"
          >
            <div className="shadow-sm rounded p-3 bg-light text-center">
              <i class="bx bx-list-check"></i>
              <h3 className="text-success">0928</h3>
              <h4>Total Request</h4>
            </div>
          </Link>
        </Col>
      </Row>

      {/* Free Space Section */}
      <div className="w-100 bg-light shadow-sm rounded-2 p-4 mt-5 text-center">
        <div className=" d-flex align-items-center justify-content-evenly">
          <div>
            <img src="/table.png" alt="cvsu-logo" className="w-50" />
            <img src="/chart.png" alt="cvsu-logo" className="w-25" />
          </div>
        </div>
      </div>
    </Container>
  );
}
