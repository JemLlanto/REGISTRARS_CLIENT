import React from 'react';

const CommentsStep = ({ formData, handleChange }) => {
    return (
        <>
            <h5 className="mb-3">Comments and Suggestions</h5>
            <div className="mb-4">
                <label className="form-label">Please share your comments or suggestions:</label>
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
                    Characters remaining: {150 - formData.comments.length}
                </div>
            </div>

            <div className="border p-3 mb-3 bg-light">
                <h6>Summary of Your Feedback</h6>
                <p className="mb-1"><strong>Name:</strong> {formData.name}</p>
                <p className="mb-1"><strong>Agency:</strong> {formData.agency}</p>
                <p className="mb-1"><strong>Date of Visit:</strong> {formData.dateVisit}</p>
                <p className="mb-1"><strong>Purpose:</strong> {formData.purposeOfVisit}</p>
            </div>
        </>
    );
};

export default CommentsStep;