import React from "react";

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
    <div className="container mt-4">
      <div className="table-responsive mt-4">
        <table className="table table-bordered">
          <thead>
            <tr className="bg-light">
              <th style={{ width: "40%" }}>Questions</th>
              {ratingOptions.map((option) => (
                <th key={option.value}>{option.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr key={question.id}>
                <td>
                  <strong>{`SQD${index + 1}.`}</strong> {question.label}
                </td>
                {ratingOptions.map((option) => (
                  <td
                    key={option.value}
                    className="text-center"
                    style={{ cursor: "pointer", padding: "10px" }} // Makes the entire cell clickable
                    onClick={() => handleChange({ target: { name: question.id, value: option.value } })}
                  >
                    <label className="w-100 h-100 d-flex justify-content-center align-items-center" style={{ cursor: "pointer" }}>
                      <input
                        type="radio"
                        className="form-check-input position-absolute opacity-0"
                        name={question.id}
                        value={option.value}
                        checked={formData[question.id] === option.value}
                        onChange={handleChange}
                      />
                      <div className="border border-dark rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: "24px", height: "24px" }}>
                        {formData[question.id] === option.value && (
                          <div className="bg-primary rounded-circle" style={{ width: "12px", height: "12px" }}></div>
                        )}
                      </div>
                    </label>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>


        </table>
      </div>

      <div className="mb-3 mt-4">
        <label htmlFor="suggestions" className="form-label">
          Suggestions on how we can improve our services (optional):
        </label>
        <textarea
          className="form-control border-black"
          id="suggestions"
          name="suggestions"
          rows="3"
          value={formData.suggestions || ""}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address (optional):
        </label>
        <input
          type="email"
          className="form-control border-black"
          id="email"
          name="email"
          value={formData.email || documentDetails.email}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SQDFormComponent;
