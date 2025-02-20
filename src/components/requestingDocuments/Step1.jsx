import React from "react";
import { FloatingLabel, Form, Row, Col } from "react-bootstrap";

const Step1 = ({ isAgreed, handleChange }) => {
  return (
    <div className="form-label mb-3 p-3">
      {/* Email and Student ID */}
      <Row className="mb-3">
        <Col md={6}>
          <FloatingLabel controlId="floatingEmail" label="Email address">
            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>
        </Col>
        <Col md={6}>
          <FloatingLabel controlId="floatingStudentID" label="Student ID No">
            <Form.Control type="number" placeholder="Student ID" />
          </FloatingLabel>
        </Col>
      </Row>
      {/* Name Fields in a Row */}
      <Row className="mb-3">
        <Col md={3}>
          <FloatingLabel controlId="floatingSurname" label="Surname">
            <Form.Control type="text" placeholder="Surname" />
          </FloatingLabel>
        </Col>
        <Col md={3}>
          <FloatingLabel controlId="floatingFirstname" label="Firstname">
            <Form.Control type="text" placeholder="Firstname" />
          </FloatingLabel>
        </Col>
        <Col md={3}>
          <FloatingLabel controlId="floatingMiddlename" label="Middlename">
            <Form.Control type="text" placeholder="Middlename" />
          </FloatingLabel>
        </Col>
        <Col md={3}>
          <FloatingLabel controlId="floatingLastname" label="Lastname">
            <Form.Control type="text" placeholder="Lastname" />
          </FloatingLabel>
        </Col>
      </Row>

      {/* Date of Birth */}
      <FloatingLabel
        controlId="floatingDOB"
        label="Date of Birth"
        className="mb-3"
      >
        <Form.Control type="date" placeholder="Date of Birth" />
      </FloatingLabel>

      {/* Sex Selection */}
      <FloatingLabel controlId="floatingSelect" label="Sex">
        <Form.Select aria-label="Floating label select example">
          <option>Choose...</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </Form.Select>
      </FloatingLabel>

      {/* Mobile Number */}
      <FloatingLabel
        controlId="floatingMobile"
        label="Mobile No."
        className="mt-3"
      >
        <Form.Control type="number" placeholder="Mobile No." />
      </FloatingLabel>

      {/* Program/Course & Major Dropdown */}
      <FloatingLabel
        controlId="floatingProgram"
        label="Program/Course & Major"
        className="mt-3"
      >
        <Form.Select onChange={handleChange}>
          <option value="">Choose</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Form.Select>
      </FloatingLabel>
    </div>
  );
};

export default Step1;
