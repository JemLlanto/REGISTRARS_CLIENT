import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";

const SQDFormComponent = ({ formData, handleChange, documentDetails }) => {
  // Create default handleChange function if not provided

  // Questions array for better maintainability
  const questions = [
    { id: "sqd0", label: "I am satisfied with the service that I availed." },
    {
      id: "sqd1",
      label: "I spent a reasonable amount of time for my transaction.",
    },
    {
      id: "sqd2",
      label: "The office followed the transaction's requirements and steps.",
    },
    {
      id: "sqd3",
      label:
        "The steps I needed to do for my transaction were easy and simple.",
    },
    { id: "sqd4", label: "I easily found information about my transaction." },
    {
      id: "sqd5",
      label: "I paid a reasonable amount of fees for my transaction.",
    },
    {
      id: "sqd6",
      label:
        "I feel like the office was fair to everyone during my transaction.",
    },
    { id: "sqd7", label: "I was treated courteously by the staff." },
    { id: "sqd8", label: "I got what I needed from the government office." },
  ];

  // Rating options
  const ratingOptions = [
    { value: 1, label: "Strongly Disagree" },
    { value: 2, label: "Disagree" },
    { value: 3, label: "Neither Agree nor Disagree" },
    { value: 4, label: "Agree" },
    { value: 5, label: "Strongly Agree" },
    { value: 6, label: "N/A" },
  ];

  return (
    <div className="container px-1">
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead>
            <tr className="bg-light">
              <th style={{ width: "40%" }}>
                <h6 className="m-0 fw-bold">Questions</h6>
              </th>
              {ratingOptions.map((option) => (
                <th key={option.value}>
                  <p className="m-0">{option.label}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr key={question.id}>
                <td>
                  <p className="m-0">
                    <strong>{`SQD${index + 1}.`}</strong> {question.label}
                  </p>
                </td>
                {ratingOptions.map((option) => (
                  <td
                    key={option.value}
                    className="text-center"
                    style={{ cursor: "pointer", padding: "10px" }} // Makes the entire cell clickable
                    onClick={() =>
                      handleChange({
                        target: { name: question.id, value: option.value },
                      })
                    }
                  >
                    <div className="d-flex justify-content-center align-items-center">
                      <input
                        type="radio"
                        className="form-check-input border border-dark d-none d-md-block"
                        name={question.id}
                        value={option.value}
                        checked={formData[question.id] === option.value}
                        onChange={() =>
                          handleChange({
                            target: { name: question.id, value: option.value },
                          })
                        }
                      />
                      <div
                        className={`${
                          formData[question.id] === option.value
                            ? "bg-primary"
                            : ""
                        } border border-dark d-flex justify-content-center align-items-center rounded-circle d-md-none`}
                        style={{ height: "1rem", width: "1rem" }}
                      >
                        <div
                          className="bg-white rounded-circle"
                          style={{ height: ".4rem", width: ".4rem" }}
                        ></div>
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-2">
        <FloatingLabel
          controlId="suggestions"
          label={`Comments or suggestions (${formData.suggestions.length}/150)`}
        >
          <Form.Control
            as="textarea"
            name="suggestions"
            rows="3"
            value={formData.suggestions || ""}
            onChange={handleChange}
            maxLength={150}
            placeholder="Leave a comment here"
            style={{ height: "100px" }}
          />
        </FloatingLabel>
      </div>

      <div className="">
        <FloatingLabel
          controlId="email"
          label="Email address (optional)"
          className=""
        >
          <Form.Control
            type="email"
            name="email"
            value={formData.email || documentDetails.email}
            onChange={handleChange}
            placeholder="Email address (optional)"
          />
        </FloatingLabel>
      </div>
    </div>
  );
};

export default SQDFormComponent;
