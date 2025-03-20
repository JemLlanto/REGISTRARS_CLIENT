import React from "react";

const SQDFormComponent = ({ formData = {}, handleChange }) => {
    // Create default handleChange function if not provided
    const defaultHandleChange = (e) => {
        console.log("Form change:", e.target.name, e.target.value);
        // In a real app, you would update state here
    };

    // Use the provided handleChange or the default one
    const onChangeHandler = handleChange || defaultHandleChange;

    // Questions array for better maintainability
    const questions = [
        { id: "sqd0", label: "I am satisfied with the service that I availed." },
        { id: "sqd1", label: "I spent a reasonable amount of time for my transaction." },
        { id: "sqd2", label: "The office followed the transaction's requirements and steps." },
        { id: "sqd3", label: "The steps I needed to do for my transaction were easy and simple." },
        { id: "sqd4", label: "I easily found information about my transaction." },
        { id: "sqd5", label: "I paid a reasonable amount of fees for my transaction." },
        { id: "sqd6", label: "I feel like the office was fair to everyone during my transaction." },
        { id: "sqd7", label: "I was treated courteously by the staff." },
        { id: "sqd8", label: "I got what I needed from the government office." },
    ];

    // Rating options
    const ratingOptions = [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "3", label: "Neither Agree nor Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" },
        { value: "NA", label: "N/A" }
    ];

    return (
        <div className="container mt-4">
            <h4 className="fw-bold text-center" style={{ backgroundColor: "var(--main-color)", padding: "10px", color: "white" }}>
                CLIENT SATISFACTION MEASUREMENT
            </h4>

            <div className="table-responsive mt-4">
                <table className="table table-bordered">
                    <thead>
                        <tr className="bg-light">
                            <th style={{ width: "40%" }}>Questions</th>
                            {ratingOptions.map(option => (
                                <th key={option.value}>{option.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((question, index) => (
                            <tr key={question.id}>
                                <td>
                                    <strong>{`SQD${index}.`}</strong> {question.label}
                                </td>
                                {ratingOptions.map((option) => (
                                    <td key={option.value} className="text-center">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            name={question.id}
                                            value={option.value}
                                            checked={formData[question.id] === option.value}
                                            onChange={onChangeHandler}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mb-3 mt-4">
                <label htmlFor="suggestions" className="form-label">Suggestions on how we can improve our services (optional):</label>
                <textarea
                    className="form-control"
                    id="suggestions"
                    name="suggestions"
                    rows="3"
                    value={formData.suggestions || ""}
                    onChange={onChangeHandler}
                ></textarea>
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address (optional):</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={onChangeHandler}
                />
            </div>
        </div>
    );
};

export default SQDFormComponent;