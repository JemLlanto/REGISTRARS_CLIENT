import axios from "axios";
import React, { useState, useEffect } from "react";
import { FloatingLabel, Form, Row, Col } from "react-bootstrap";

const Step1 = ({ isAgreed, handleChange }) => {
  return (
    <div className="requestForm form-label mb-3 p-3">
      {/* Email and Student ID */}
      <Row className="mb-1">
        <Col md={6}>
          <FloatingLabel controlId="floatingEmail" label="Email address">
            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>
        </Col>
        <Col md={6}>
          <FloatingLabel controlId="floatingStudentID" label="Student ID No">
            <Form.Control type="number" placeholder="Student ID" />
          </FloatingLabel>
          <h6 className=" text-secondary mt-1">
            <span className="fw-bold">Note:</span> If your student number is not
            available, kindly indicate the last school year attended/graduated
            in the University.
          </h6>
        </Col>
      </Row>
      {/* Name Fields in a Row */}
      <Row className="mb-1">
        <Col md={""}>
          <FloatingLabel controlId="floatingFirstname" label="Firstname">
            <Form.Control type="text" placeholder="Firstname" />
          </FloatingLabel>
        </Col>
        <Col md={""}>
          <FloatingLabel controlId="floatingMiddlename" label="Middlename">
            <Form.Control type="text" placeholder="Middlename" />
          </FloatingLabel>
        </Col>
        <Col md={""}>
          <FloatingLabel controlId="floatingLastname" label="Lastname">
            <Form.Control type="text" placeholder="Lastname" />
          </FloatingLabel>
          <h6 className=" text-secondary mt-1">
            <span className="fw-bold">Note:</span> For married woman, kindly use
            the name you used in the University.
          </h6>
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

      <div>
        {/* Mobile Number */}
        <FloatingLabel
          controlId="floatingMobile"
          label="Mobile No."
          className="mt-3"
        >
          <Form.Control type="number" placeholder="Mobile No." />
        </FloatingLabel>
      </div>
    </div>
  );
};

export default Step1;
