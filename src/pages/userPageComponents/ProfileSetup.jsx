import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MainLayout from "../../layouts/MainLayout";
import { Button, Form, Row, Col } from "react-bootstrap";

export default function Sidebar() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdate = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Account details updated successfully!");
  };

  return (
    <MainLayout>
      <div className="p-4 w-100">
        <div
          className="rounded-2 shadow-sm"
          style={{ backgroundColor: "#007bff" }}
        >
          <h5 className="m-0 p-2 text-white">Account Settings</h5>
        </div>

        <div className="w-100 bg-light shadow-sm rounded-2 p-4 mt-3">
          <Form>
            <Row>
              <Col md={4}>
                {/* Username Input */}
                <Form.Group className="mb-3">
                  <Form.Label>First name:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter new First name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Middle name:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter new Middle name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={5}>
                <Form.Group className="mb-3">
                  <Form.Label>Last name:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter new Last name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              {/* Change Password Input */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
              </Col>

              {/* Confirm Password Input */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Update Button */}
            <Button variant="primary" onClick={handleUpdate}>
              Update Account
            </Button>
          </Form>
        </div>
      </div>
    </MainLayout>
  );
}
