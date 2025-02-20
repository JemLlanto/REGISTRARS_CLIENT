import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useOutletContext } from "react-router-dom";

import { Row, Col, Container } from "react-bootstrap";
import AdminModal from "../../components/Modals/Modals";

export default function Home() {
  const { user } = useOutletContext();

  return (
    <Container fluid className="p-4 w-100">
      <div
        className="rounded-2 shadow-sm text-white p-2"
        style={{ backgroundColor: "#007bff" }}
      >
        <h5 className="m-0">Dashboard:</h5>
      </div>

      {/* Responsive Boxes */}
      <Row className="w-100 mt-4 g-3">
        <Col xs={12} sm={6} md={3}>
          <div className="shadow-sm rounded p-3 bg-white text-center">
            <h3 className="text-success">123</h3>
            <h4>New Request</h4>
            <div className="w-100">
              <AdminModal />
            </div>
          </div>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <div className="shadow-sm rounded p-3 bg-light text-center">
            <h3 className="text-success">2133</h3>
            <h4>Pendings</h4>
            <AdminModal />
          </div>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <div className="shadow-sm rounded p-3 bg-light text-center">
            <h3 className="text-success">923</h3>
            <h4>Completed</h4>
            <AdminModal />
          </div>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <div className="shadow-sm rounded p-3 bg-light text-center">
            <h3 className="text-success">0928</h3>
            <h4>Total Request</h4>
            <AdminModal />
          </div>
        </Col>
      </Row>

      {/* Free Space Section */}
      <div className="w-100 bg-light shadow-sm rounded-2 p-4 mt-5 text-center">
        <h5>Free Space</h5>
      </div>
    </Container>
  );
}
