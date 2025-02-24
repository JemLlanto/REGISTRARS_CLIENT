import React, { useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

const Step5 = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const options = [
    {
      name: "Transcript of Records (For Employment Abroad)",
      value: "Strongly Agree",
    },
    {
      name: "Certification Authentication and Verification (CAV)",
      value: "Agree",
    },
    { name: "Graduation and Non-Special Order", value: "Neutral" },
    {
      name: "General Point Average/General Weighted Average",
      value: "Disagree",
    },
    {
      name: "English proficiency/English as medium of instruction",
      value: "Strongly Disagree",
    },
    { name: "Certification of Bonafide Student", value: "Bonafide" },
  ];

  return (
    <div className="mb-3 p-3">
      <h3>Step 5: For Employment - Abroad</h3>

      <div className="d-flex  flex-column gap-2">
        {options.map((option, idx) => (
          <ToggleButton
            key={idx}
            id={`option-${idx}`}
            type="radio"
            variant={
              selectedOption === option.value ? "primary" : "outline-primary"
            }
            name="employmentOptions"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={() => handleOptionChange(option.value)}
          >
            {option.name}
          </ToggleButton>
        ))}
      </div>
    </div>
  );
};

export default Step5;
