import React from "react";
import { InputGroup, Form } from "react-bootstrap";

const ForgotPassStep1 = ({ formData, setFormData }) => {
  return (
    <div className="">
      <InputGroup className="">
        <InputGroup.Text id="basic-addon1">
          <i className="bx bx-envelope"></i>
        </InputGroup.Text>
        <Form.Control
          type="email"
          placeholder="Account email"
          aria-label="Username"
          aria-describedby="basic-addon1"
          name="email"
          value={formData.receiverEmail}
          onChange={(e) =>
            setFormData({
              ...formData,
              receiverEmail: e.target.value,
              firstName: e.target.value,
            })
          }
          required
        />
      </InputGroup>
    </div>
  );
};

export default ForgotPassStep1;
