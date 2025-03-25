import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MainLayout from "../../layouts/MainLayout";
import { Button, Form, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";

export default function ProfileSetup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdate = () => {
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Passwords do not match!",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Update Successful!",
      text: "Account details updated successfully!",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="p-1 p-sm-4 w-100">
      <div
        className="rounded-2 shadow-sm p-2"
        style={{ backgroundColor: "var(--main-color)" }}
      >
        <h5 className="m-0 p-2 fade-in" style={{ color: "var(--secondMain-color)" }}>
          Account Settings
        </h5>
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
          <Button
            variant="primary"
            onClick={handleUpdate}
            style={{
              color: "var(--secondMain-color)",
              backgroundColor: "var(--main-color)",
            }}
            className="p-2"
          >
            Update Account
          </Button>
        </Form>
      </div>
    </div>
  );
}
