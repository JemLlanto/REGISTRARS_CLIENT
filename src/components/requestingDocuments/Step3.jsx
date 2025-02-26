import axios from "axios";
import React, { useEffect, useState } from "react";
import { FloatingLabel, ToggleButton, Form } from "react-bootstrap";

const Step3 = ({
  setFile,
  setInputsLength,
  inputsLength,
  formData,
  handleChange,
}) => {
  const [selectedOption, setSelectedOption] = useState(
    formData.selection || ""
  );
  const [purposeData, setPurposeData] = useState([]);
  const [selection, setSelection] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [uploads, setUploads] = useState([]);

  // Handle selection change
  const handleSelectionChange = (value) => {
    setSelectedOption(value);
    handleChange({
      target: {
        name: "selection",
        value: value,
      },
    });
  };
  setInputsLength(inputs?.length);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/documents/fetchPurposeData`, {
        params: { purposeName: formData.purpose }, // Pass purposeName as a query param
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.data);
          setPurposeData(res.data.data);
        } else if (res.data.Status === "Error") {
          console.log("Error: ", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error fetching purposeData: ", err);
      });
  }, [formData.purpose]);

  const purposeID = purposeData.purposeID;

  useEffect(() => {
    if (!purposeID) return;

    const isActive = { current: true };

    Promise.all([
      axios.get(`http://localhost:5000/api/documents/fetchSelections`, {
        params: { purposeID },
      }),
      axios.get(`http://localhost:5000/api/documents/fetchInputs`, {
        params: { purposeID },
      }),
      axios.get(`http://localhost:5000/api/documents/fetchUploads`, {
        params: { purposeID },
      }),
    ])
      .then(([selectionsRes, inputsRes, uploadsRes]) => {
        // Only update state if component is still mounted
        if (!isActive.current) return;

        if (selectionsRes.data.Status === "Success") {
          setSelection(selectionsRes.data.data);
        }
        if (inputsRes.data.Status === "Success") {
          setInputs(inputsRes.data.data);
        }
        if (uploadsRes.data.Status === "Success") {
          setUploads(uploadsRes.data.data);
        }
      })
      .catch((err) => {
        console.log("Error fetching data: ", err);
      });

    // Cleanup function
    return () => {
      isActive.current = false;
    };
  }, [purposeID]);

  useEffect(() => {
    console.log("formData updated:", formData);
  }, [formData]);

  return (
    <div className="mb-3 p-3">
      <h3 className="fw-bold" style={{ color: "var(--main-color)" }}>
        {formData.purpose} {inputsLength}
      </h3>
      <div className="d-flex flex-column gap-3">
        {selection?.length > 0 ? (
          <>
            <div className="d-flex  flex-column gap-2">
              <h5 className="m-0">Type of document: {formData.selection}</h5>
              {selection.map((select) => (
                <ToggleButton
                  key={select.selectionID}
                  id={`radio-${select.selectionID}`}
                  type="radio"
                  name="employmentOptions"
                  value={select.selectionName}
                  checked={selectedOption === select.selectionName}
                  onChange={(e) => handleSelectionChange(e.currentTarget.value)}
                >
                  {select.selectionName}
                </ToggleButton>
              ))}
            </div>
          </>
        ) : null}

        {inputsLength > 0 && (
          <div className="d-flex flex-column gap-2">
            <h5 className="m-0">Complete all fields:</h5>
            {inputs.map((input, index) => {
              return (
                <FloatingLabel
                  key={input.inputID}
                  controlId={`floatinginput${input.inputID}`}
                  label={input.inputDescription}
                >
                  <Form.Control
                    type="text"
                    placeholder={input.inputDescription}
                    name={`inputValue${index + 1}`}
                    value={formData[`inputValue${index + 1}`] || ""} // Correctly reference formData
                    onChange={handleChange}
                  />
                </FloatingLabel>
              );
            })}
          </div>
        )}

        {uploads.length > 0 && (
          <div className="d-flex  flex-column gap-2">
            <h5 className="m-0">Upload necessary files:</h5>
            {uploads.map((upload) => (
              <div key={upload.fileID} class="input-group mb-3">
                <label
                  class="w-100 border rounded p-3"
                  htmlFor={`inputGroupFile${upload.uploadID}`}
                >
                  <div className="">
                    <h5 className="m-0">{upload.uploadDescription}</h5>
                  </div>
                </label>
                <input
                  hidden
                  type="file"
                  class="form-control"
                  id={`inputGroupFile${upload.uploadID}`}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Step3;
