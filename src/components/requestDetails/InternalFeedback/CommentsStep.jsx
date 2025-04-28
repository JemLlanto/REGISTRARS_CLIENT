import React from "react";
import { Form, FloatingLabel } from "react-bootstrap";

const CommentsStep = ({ formData, handleChange }) => {
  return (
    <>
      <h5 className="my-2 fw-bold">Comments and Suggestions</h5>
      <div className="px-1">
        <FloatingLabel
          controlId="floatingTextarea2"
          label={`Comments or suggestions (${formData.comments.length}/150)`}
        >
          <Form.Control
            as="textarea"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            maxLength={150}
            placeholder="Leave a comment here"
            style={{ height: "100px" }}
          />
        </FloatingLabel>
      </div>
    </>
  );
};

export default CommentsStep;
