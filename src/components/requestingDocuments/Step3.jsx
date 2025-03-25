import axios from "axios";
import React, { useEffect, useState } from "react";
import { FloatingLabel, ToggleButton, Form, Button } from "react-bootstrap";

const Step3 = ({
  docType,
  setDocType,
  setFile,
  setInputsLength,
  inputsLength,
  formData,
  handleChange,
  setHasSelection,
  setHasFile,
  setHasInput,
}) => {
  const [selectedOption, setSelectedOption] = useState(
    formData.selection || ""
  );
  const [purposeData, setPurposeData] = useState([]);
  const [selection, setSelection] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [uploadsState, setUploadsState] = useState([]);

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

  // Move setInputsLength into useEffect to avoid rendering issues
  useEffect(() => {
    setInputsLength(inputs?.length);
  }, [inputs, setInputsLength]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/fetchingDocuments/fetchPurposeData`, {
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
      axios.get(`http://localhost:5000/api/fetchingDocuments/fetchSelections`, {
        params: { purposeID },
      }),
      axios.get(`http://localhost:5000/api/fetchingDocuments/fetchInputs`, {
        params: { purposeID },
      }),
      axios.get(`http://localhost:5000/api/fetchingDocuments/fetchUploads`, {
        params: { purposeID },
      }),
    ])
      .then(([selectionsRes, inputsRes, uploadsRes]) => {
        // Only update state if component is still mounted
        if (!isActive.current) return;

        if (selectionsRes.data.Status === "Success") {
          setHasSelection(true);
          setSelection(selectionsRes.data.data);
        }
        if (inputsRes.data.Status === "Success") {
          setHasInput(true);
          setInputs(inputsRes.data.data);
        }
        if (uploadsRes.data.Status === "Success") {
          setHasFile(true);
          const uploadData = uploadsRes.data.data;
          setUploads(uploadData);
          setUploadsState(uploadData); // Initialize uploadsState with the fetched data
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

  const handleFileChange = (event, uploadID) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file); // Set the file in parent component

      const reader = new FileReader();
      reader.onload = () => {
        setUploadsState((prevUploads) =>
          prevUploads.map((upload) =>
            upload.uploadID === uploadID
              ? { ...upload, preview: reader.result, file: file }
              : upload
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to remove uploaded photo
  const handleRemoveFile = (uploadID) => {
    // Reset the file input
    const fileInput = document.getElementById(`inputGroupFile${uploadID}`);
    if (fileInput) {
      fileInput.value = "";
    }

    // Remove the preview and file from the upload state
    setUploadsState((prevUploads) =>
      prevUploads.map((upload) =>
        upload.uploadID === uploadID
          ? { ...upload, preview: null, file: null }
          : upload
      )
    );

    // If this was the active file in the parent component, clear it
    setFile(null);
  };

  return (
    <div className="mb-3 p-3">
      <h3 className="fw-bold" style={{ color: "var(--main-color)" }}>
        {formData.purpose}
      </h3>
      <div className="d-flex flex-column gap-3">
        {selection?.length > 0 ? (
          <div className="d-flex flex-column gap-2">
            {/* <h5 className="mt-3">
              <strong>Selected document types:</strong>{" "}
              {docType.length > 0 ? docType.join(", ") : "None"}
            </h5> */}
            {selection.map((select) => (
              <ToggleButton
                key={select.selectionID}
                type="checkbox"
                id={`checkbox-${select.selectionID}`}
                label={select.selectionName}
                checked={docType.includes(select.selectionName)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setDocType([...docType, select.selectionName]);
                  } else {
                    setDocType(
                      docType.filter((item) => item !== select.selectionName)
                    );
                  }
                }}
              >
                {select.selectionName}
              </ToggleButton>
            ))}
          </div>
        ) : null}

        {inputs.length > 0 && (
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

        {uploadsState.length > 0 && (
          <div className="d-flex flex-column gap-2">
            <h5 className="m-0">Upload necessary files:</h5>
            {uploadsState.map((upload) => (
              <div key={upload.uploadID} className="input-group mb-3">
                <div className="w-100 border rounded p-3">
                  {/* Show upload description and button only if no preview */}
                  {!upload.preview ? (
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="m-0">{upload.uploadDescription}</h5>
                      <label
                        className="btn btn-md btn-primary m-0"
                        htmlFor={`inputGroupFile${upload.uploadID}`}
                      >
                        Upload
                      </label>
                    </div>
                  ) : (
                    <div className="mt-3 position-relative">
                      <div className="d-flex justify-content-center position-relative">
                        <div className="position-relative">
                          <img
                            src={upload.preview}
                            alt="Uploaded Preview"
                            className="img-fluid rounded shadow-sm"
                            style={{ maxWidth: "clamp( 5rem , 40dvh, 15rem)" }}
                          />
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleRemoveFile(upload.uploadID)}
                            style={{
                              position: "absolute",
                              top: "0",
                              right: "0",
                              borderRadius: "50%",
                              width: "30px",
                              height: "30px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "0",
                              fontWeight: "bold",
                              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                            }}
                          >
                            X
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <input
                  hidden
                  type="file"
                  className="form-control"
                  id={`inputGroupFile${upload.uploadID}`}
                  onChange={(e) => handleFileChange(e, upload.uploadID)}
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
