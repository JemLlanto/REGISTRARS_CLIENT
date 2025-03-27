import axios from "axios";
import React, { useState, useEffect } from "react";
import { FloatingLabel, Form, Row, Col } from "react-bootstrap";

const Step1 = ({ formData, handleChange }) => {
  return (
    <div className="requestForm form-label p-3">
      {/* Email and Student ID */}
      <Row className="mb-1">
        <Col md={6}>
          <FloatingLabel controlId="floatingEmail" label="Email address">
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              placeholder="name@example.com"
              onChange={handleChange}
              className="mb-2"
              autoComplete="none"
            />
          </FloatingLabel>
        </Col>
        <Col md={6}>
          <FloatingLabel controlId="floatingStudentID" label="Student ID No">
            <Form.Control
              type="number"
              name="studentID"
              value={formData.studentID}
              onChange={handleChange}
              placeholder="Student ID"
            />
          </FloatingLabel>
          <h6 className=" text-secondary mt-1">
            <span className="fw-bold">Note: </span> If your student number is
            not available, kindly indicate the last school year
            attended/graduated in the University.
          </h6>
        </Col>
      </Row>
      {/* Name Fields in a Row */}
      <Row className="mb-1">
        <Col lg={"4"}>
          <FloatingLabel controlId="floatingFirstname" label="Firstname">
            <Form.Control
              type="text"
              placeholder="Firstname"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mb-2"
            />
          </FloatingLabel>
        </Col>
        <Col lg={"4"}>
          <FloatingLabel controlId="floatingMiddlename" label="Middlename">
            <Form.Control
              type="text"
              placeholder="Middlename"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              className="mb-2"
            />
          </FloatingLabel>
          <h6 className=" text-secondary mt-1">
            <span className="fw-bold">Note:</span> If unavailable, please leave
            this field blank.
          </h6>
        </Col>
        <Col lg={"4"}>
          <FloatingLabel controlId="floatingLastname" label="Lastname">
            <Form.Control
              type="text"
              placeholder="Lastname"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
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
        className="mb-2"
      >
        <Form.Control
          type="date"
          placeholder="Date of Birth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
      </FloatingLabel>

      {/* Sex Selection */}
      <FloatingLabel controlId="floatingSelect" label="Sex">
        <Form.Select
          aria-label="Floating label select example"
          name="sex"
          value={formData.sex}
          onChange={handleChange}
        >
          <option>Choose...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Form.Select>
      </FloatingLabel>

      <div>
        {/* Mobile Number */}
        <FloatingLabel
          controlId="floatingMobile"
          label="Mobile No.(+63XXXXX)"
          className="mt-2"
        >
          <Form.Control
            type="text"
            name="mobileNum"
            value={formData.mobileNum}
            onChange={handleChange}
            placeholder="Mobile No."
          />
        </FloatingLabel>
      </div>
    </div>
  );
};

export default Step1;
