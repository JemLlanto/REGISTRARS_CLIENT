import axios from "axios";
import React, { useState, useEffect } from "react";
import { FloatingLabel, Form, Row, Col } from "react-bootstrap";

const Step1 = ({ formData, handleChange }) => {
  return (
    <div className="requestForm form-label">
      {/* Email and Student ID */}
      <Row className="mb-1">
        <Col md={6}>
          {formData.email === "" ? (<FloatingLabel controlId="floatingEmail" label="Email address">
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              placeholder="name@example.com"
              onChange={handleChange}
              className="mb-2 border-danger"
              autoComplete="none"
            />
          </FloatingLabel>
          ) : (<FloatingLabel controlId="floatingEmail" label="Email address">
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              placeholder="name@example.com"
              onChange={handleChange}
              className="mb-2"
              autoComplete="none"
            />
          </FloatingLabel>)}

        </Col>
        <Col md={6}>
          {formData.studentID === "" ? (<FloatingLabel controlId="floatingStudentID" label="Student ID No">
            <Form.Control
              type="number"
              name="studentID"
              value={formData.studentID}
              onChange={handleChange}
              placeholder="Student ID"
              className="border-danger"
            />
          </FloatingLabel>) : (<FloatingLabel controlId="floatingStudentID" label="Student ID No">
            <Form.Control
              type="number"
              name="studentID"
              value={formData.studentID}
              onChange={handleChange}
              placeholder="Student ID"
            />
          </FloatingLabel>)}

          <p className=" text-secondary mx-2 my-1">
            <span
              className="fw-bold"
              style={{ fontSize: "clamp(0.6rem, 1dvw, .7rem)" }}
            >
              Note:{" "}
            </span>{" "}
            <span style={{ fontSize: "clamp(0.6rem, 1dvw, .7rem)" }}>
              If your student number is not available, kindly indicate the last
              school year attended/graduated in the University.
            </span>
          </p>
        </Col>
      </Row>
      {/* Name Fields in a Row */}
      <Row className="mb-1">
        <Col lg={"4"}>
          {formData.firstName === "" ? (
            <FloatingLabel controlId="floatingFirstname" label="Firstname">
              <Form.Control
                type="text"
                placeholder="Firstname"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mb-2 border-danger"
              />
            </FloatingLabel>) : (
            <FloatingLabel controlId="floatingFirstname" label="Firstname">
              <Form.Control
                type="text"
                placeholder="Firstname"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mb-2"
              />
            </FloatingLabel>)}
        </Col>
        <Col lg={"4"}>
          <FloatingLabel controlId="floatingMiddlename" label="Middlename">
            <Form.Control
              type="text"
              placeholder="Middlename"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
            />
          </FloatingLabel>
          <p className=" text-secondary mx-2 my-1">
            <span
              className="fw-bold"
              style={{ fontSize: "clamp(0.6rem, 1dvw, .7rem)" }}
            >
              Note:
            </span>{" "}
            <span style={{ fontSize: "clamp(0.6rem, 1dvw, .7rem)" }}>
              If unavailable, please leave this field blank.
            </span>
          </p>
        </Col>
        <Col lg={"4"}>
          {formData.lastName === "" ? (
            <FloatingLabel controlId="floatingLastname" label="Lastname">
              <Form.Control
                type="text"
                placeholder="Lastname"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="border-danger"

              />
            </FloatingLabel>) : (
            <FloatingLabel controlId="floatingLastname" label="Lastname">
              <Form.Control
                type="text"
                placeholder="Lastname"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </FloatingLabel>)}

          <p className=" text-secondary mx-2 my-1">
            <span
              className="fw-bold"
              style={{ fontSize: "clamp(0.6rem, 1dvw, .7rem)" }}
            >
              Note:
            </span>{" "}
            <span style={{ fontSize: "clamp(0.6rem, 1dvw, .7rem)" }}>
              For married woman, kindly use the name you used in the University.
            </span>
          </p>
        </Col>
      </Row>

      {/* Date of Birth */}
      {formData.dateOfBirth === "" ? (<FloatingLabel
        controlId="floatingDOB"
        label="Date of Birth"
        className="mb-2 border-danger"
      >
        <Form.Control
          type="date"
          placeholder="Date of Birth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
      </FloatingLabel>) : (<FloatingLabel
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
      </FloatingLabel>)}



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
