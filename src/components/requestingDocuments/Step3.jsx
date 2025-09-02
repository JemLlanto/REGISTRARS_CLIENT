import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FloatingLabel,
  ToggleButton,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import Swal from "sweetalert2";

const Step3 = ({
  docType,
  setDocType,
  setFile,
  setInputsLength,
  inputsLength,
  setInputs,
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
  const [inputs, setInputsQuestions] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [uploadsState, setUploadsState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");

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
      .get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/fetchingDocuments/fetchPurposeData`,
        {
          params: { purposeName: formData.purpose }, // Pass purposeName as a query param
        }
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          // // console.log(res.data.data);
          setPurposeData(res.data.data);
        } else if (res.data.Status === "Error") {
          // // console.log("Error: ", res.data.Message);
        }
      })
      .catch((err) => {
        // console.log("Error fetching purposeData: ", err);
      });
  }, [formData.purpose]);

  const purposeID = purposeData.purposeID;

  useEffect(() => {
    if (!purposeID) return;

    const isActive = { current: true };

    const fetchData = async () => {
      try {
        setIsLoading(true);

        setLoadingMessage("Loading document types...");
        const selectionsRes = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/fetchingDocuments/fetchSelections`,
          { params: { purposeID } }
        );

        setLoadingMessage("Loading input fields...");
        const inputsRes = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/fetchingDocuments/fetchInputs`,
          { params: { purposeID } }
        );

        setLoadingMessage("Loading file uploads...");
        const uploadsRes = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/fetchingDocuments/fetchUploads`,
          { params: { purposeID } }
        );

        if (!isActive.current) return;

        if (selectionsRes.data.Status === "Success") {
          setHasSelection(true);
          setSelection(selectionsRes.data.data);
        }

        if (inputsRes.data.Status === "Success") {
          setHasInput(true);
          setInputs(inputsRes.data.data);
          setInputsQuestions(inputsRes.data.data);
        }

        if (uploadsRes.data.Status === "Success") {
          setHasFile({ hasFile: true, length: uploadsRes.data.data.length });
          const uploadData = uploadsRes.data.data;
          setUploads(uploadData);
          setUploadsState(uploadData);
        }
      } catch (err) {
        // console.log("Error fetching data: ", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isActive.current = false;
    };
  }, [purposeID]);

  // useEffect(() => {
  //   // console.log("formData updated:", formData);
  // }, [formData]);

  const handleFileChange = (event, uploadID, uploadDescription) => {
    const file = event.target.files[0];
    if (file) {
      // Allowed file types
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const maxSize = 2 * 1024 * 1024; // 1MB

      if (file.size > maxSize) {
        Swal.fire({
          icon: "warning",
          title: "File Too Large",
          text: "File size should not exceed 2MB.",
        });
        setFile((prevFiles) => {
          const newFiles = { ...prevFiles };
          delete newFiles[uploadID];
          return newFiles;
        });
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        Swal.fire({
          icon: "error",
          title: "Invalid File Type",
          text: "Only JPEG, JPG, and PNG files are allowed.",
        });
        setFile((prevFiles) => {
          const newFiles = { ...prevFiles };
          delete newFiles[uploadID];
          return newFiles;
        });
        return;
      }

      // Set the file for this specific uploadID
      setFile((prevFiles) => ({
        ...prevFiles,
        [uploadID]: { file, description: uploadDescription },
      }));

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
    setFile((prevFiles) => {
      const newFiles = { ...prevFiles };
      delete newFiles[uploadID];
      return newFiles;
    });
  };

  return (
    <div className="">
      <h3 className="fw-bold m-0" style={{ color: "var(--main-color)" }}>
        {formData.purpose}
      </h3>
      {isLoading ? (
        <>
          <div
            className="w-100 d-flex justify-content-center align-items-center "
            style={{ height: "20dvw" }}
          >
            <Spinner animation="border" variant="dark" size="sm" />
            <p className="m-0 ms-1">{loadingMessage}</p>
          </div>
        </>
      ) : (
        <>
          <div className="d-flex flex-column gap-3">
            {selection?.length > 0 ? (
              <div className="customToggleButton d-flex flex-column gap-2">
                <h5 className="m-0 mt-2 fw-bold">
                  Document types:{" "}
                  {/* {docType.length > 0 ? docType.join(", ") : "None"} */}
                </h5>
                {selection.map((select, index) => (
                  <ToggleButton
                    key={index}
                    type="checkbox"
                    id={`checkbox-${select.selectionID}`}
                    value={select.selectionName}
                    label={select.selectionName}
                    checked={docType.includes(select.selectionName)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setDocType([...docType, select.selectionName]);
                      } else {
                        setDocType(
                          docType.filter(
                            (item) => item !== select.selectionName
                          )
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
                <h5 className="m-0 mt-2 fw-bold">Complete all fields:</h5>
                {inputs.map((input, index) => {
                  return (
                    <FloatingLabel
                      key={index}
                      controlId={`floatinginput${input.inputID}`}
                      label={input.inputDescription}
                    >
                      <Form.Control
                        className={`${
                          formData[`inputValue${index + 1}`] === ""
                            ? "border-danger"
                            : ""
                        }`}
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
                <h5 className="m-0 mt-2 fw-bold">Upload necessary files:</h5>
                {uploadsState.map((upload, index) => (
                  <div key={index} className="input-group mb-1">
                    <div className="w-100 border rounded p-3">
                      {/* Show upload description and button only if no preview */}
                      {!upload.preview ? (
                        <div className="d-flex justify-content-between align-items-center gap-2">
                          <p className="m-0">{upload.uploadDescription}</p>
                          <label
                            className="primaryButton btn py-2 d-flex justify-content-center"
                            htmlFor={`inputGroupFile${upload.uploadID}`}
                          >
                            <p className="m-0">Upload</p>
                          </label>
                        </div>
                      ) : (
                        <div className=" position-relative">
                          <p className="m-0">{upload.uploadDescription}</p>
                          <div className="d-flex justify-content-center position-relative">
                            <div
                              className="position-relative overflow-hidden rounded"
                              style={{
                                height: "clamp(10rem, 50dvw, 20rem)",
                                width: "clamp(10rem, 50dvw, 35rem)",
                              }}
                            >
                              <img
                                src={upload.preview}
                                alt="Uploaded Preview"
                                className="shadow-sm rounded"
                                style={{
                                  height: "100%",
                                  width: "100%",
                                  objectFit: "contain",
                                }}
                              />
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() =>
                                  handleRemoveFile(upload.uploadID)
                                }
                                style={{
                                  position: "absolute",
                                  top: ".2rem",
                                  right: ".2rem",
                                  width: "1.5rem",
                                  height: "1.5rem",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  padding: "0",
                                  fontWeight: "",
                                }}
                              >
                                x
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
                      onChange={(e) =>
                        handleFileChange(
                          e,
                          upload.uploadID,
                          upload.uploadDescription
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Step3;
