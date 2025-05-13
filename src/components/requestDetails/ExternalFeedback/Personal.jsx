import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";

const PersonalInfoStep = ({ formData, handleChange }) => {
  return (
    <div className=" p-1">
      <div className="mb-4">
        <h6 className="fw-bold">
          This Client Satisfaction Measurement (CSM) tracks the customer
          experience of government offices. Your feedback on your recently
          concluded transaction will help this office provide a better service.
          Personal information shared will be kept confidential.
          <br />
          <span
            className="fst-italic fw-normal text-muted"
            style={{ fontSize: "clamp(0.7rem, 1.75vw, .8rem)" }}
          >
            (Ang Client Satisfaction Measurement (CSM) ay sumusubaybay sa mga
            karanasan ng mga mamamayan hinggil sa kanilang pakikipagtransaksyon
            sa tanggapan ng pamahalaan. Makatutulong ang inyong puna sa
            katatapos lamang na transaksyon upang lalong mapagbuti namin ang
            aming serbisyo publiko. Ang personal na impormasyong iyong ibabahagi
            ay mananatiling kompidensyal.)
          </span>
        </h6>
      </div>

      {/* Client Type */}
      <div className="row mb-2 px-2 gap-2">
        <div className="col-md px-1">
          <FloatingLabel
            controlId="clientType"
            label="Client Type (Uri ng Kliyente)"
          >
            <Form.Select
              name="clientType"
              onChange={handleChange}
              aria-label="Floating label select example"
            >
              <option>Options...</option>
              <option value="Citizen">Citizen</option>
              <option value="Business">Business</option>
              <option value="Government">Government</option>
            </Form.Select>
          </FloatingLabel>
        </div>
        <div className="col-md px-1">
          <FloatingLabel controlId="date" label="Date (Petsa)">
            <Form.Control
              type="date"
              name="date"
              value={formData?.date || ""}
              onChange={handleChange}
            />
          </FloatingLabel>
        </div>
      </div>

      {/* Date, Sex, Age */}
      <div className="row mb-2 px-2 gap-2">
        <div className="col-md px-1">
          <FloatingLabel controlId="sex" label="Sex (Kasarian)">
            <Form.Select name="sex" onChange={handleChange}>
              <option>Options...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Select>
          </FloatingLabel>
        </div>
        <div className="col-md px-1">
          <FloatingLabel controlId="age" label="Age (Edad)">
            <Form.Control
              type="number"
              name="age"
              min={10}
              max={99}
              value={formData?.age || ""}
              onChange={handleChange}
              placeholder="Age (Edad)"
            />
          </FloatingLabel>
        </div>
      </div>

      {/* Service Availed */}
      <div className="row">
        <div className="col-md-12">
          <FloatingLabel
            controlId="floatingTextarea2"
            label="Service Availed (Uri ng transaksyon o serbisyo)"
          >
            <Form.Control
              as="textarea"
              name="serviceAvailed"
              value={formData?.serviceAvailed || ""}
              onChange={handleChange}
              placeholder="Service Availed (Uri ng transaksyon o serbisyo)"
            />
          </FloatingLabel>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
