import React from "react";

const CommentsStep = ({ formData, handleChange }) => {
  return (
    <>
      <h5 className="mb-3">Comments and Suggestions</h5>
      <div className="mb-4">
        <label className="form-label">
          Please share your comments or suggestions:
        </label>
        <textarea
          className="form-control"
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          maxLength={150}
          rows={4}
          placeholder="Enter your comments or suggestions here (max 150 characters)..."
        ></textarea>
        <div className="form-text text-muted">
          Max: {`${formData.comments.length}/150`}
        </div>
      </div>
    </>
  );
};

export default CommentsStep;
