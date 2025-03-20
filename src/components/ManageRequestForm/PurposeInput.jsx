import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import Swal from "sweetalert2";

const PurposeInput = ({ purpose }) => {
  const [inputs, setInputs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addInput, setAddInput] = useState(false);
  const [editInput, setEditInput] = useState(null);
  const [formData, setFormData] = useState({
    inputDescription: "",
    purposeID: purpose.purposeID,
    inputID: "",
  });

  const fetchInputs = () => {
    setIsLoading(true);
    setInputs([]);

    axios
      .get("http://localhost:5000/api/fetchingDocuments/fetchInputs", {
        params: {
          purposeID: purpose.purposeID,
        },
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.data);
          setInputs(res.data.data);
          setIsLoading(false);
        } else if (res.data.Message) {
          console.log("Error: ", res.data.Message);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log("Error fetching inputs:", err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchInputs();
  }, []);

  const handleEditInput = (inputs) => {
    setEditInput(inputs.inputID);
    setFormData({
      inputDescription: inputs.inputDescription,
      purposeID: purpose.purposeID,
      inputID: inputs.inputID,
    });
    setAddInput(false);
  };

  const handleAddInput = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/documents/addInput", formData)
      .then((res) => {
        if (res.data.Status === "Success") {
          setAddInput(false);
          setFormData({
            inputDescription: "",
            purposeID: purpose.purposeID,
          });
          fetchInputs();

          Swal.fire({
            icon: "success",
            title: "Success",
            text: res.data.Message,
          });
        } else if (res.data.Status === "Failed") {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: res.data.Message,
          });
        } else if (res.data.Message) {
          console.log("Error: ", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error adding inputs:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong while adding inputs.",
        });
      });
  };

  const handleUpdateInput = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/documents/updateInput", formData)
      .then((res) => {
        if (res.data.Status === "Success") {
          setEditInput(false);
          setFormData({
            inputDescription: "",
            purposeID: purpose.purposeID,
          });
          fetchInputs();

          Swal.fire({
            icon: "success",
            title: "Success",
            text: res.data.Message,
          });
        } else if (res.data.Status === "Failed") {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: res.data.Message,
          });
        } else if (res.data.Message) {
          console.log("Error: ", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error updating inputs:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong while updating inputs.",
        });
      });
  };
  const handleDeleteInput = (inputID, inputDescription) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete "${inputDescription}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("http://localhost:5000/api/documents/deleteInput", { inputID })
          .then((res) => {
            if (res.data.Status === "Success") {
              Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: res.data.Message,
              });
              fetchInputs();
            } else {
              Swal.fire({
                icon: "error",
                title: "Failed",
                text: res.data.Message,
              });
            }
          })
          .catch((err) => {
            console.log("Error deleting input:", err);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Something went wrong while deleting the input.",
            });
          });
      }
    });
  };
  return (
    <>
      <div className="border p-2 rounded">
        <div className="d-flex align-items-center justify-content-start gap-1">
          <h5 className="m-0 fw-bold">Required Questions</h5>
        </div>
        {isLoading ? (
          <>
            <p>Loading...</p>
          </>
        ) : (
          // FOR DISPLAYING INPUTS
          <>
            {inputs.length === 0 ? (
              <>
                <p className="m-0">No questions</p>
              </>
            ) : (
              <>
                <div className="d-flex flex-column gap-1">
                  {inputs.map((input) => (
                    <div
                      key={input.inputID}
                      className="d-flex align-items-center justify-content-between"
                    >
                      {editInput === input.inputID ? (
                        <>
                          {/* FOR EDITING INPUT */}
                          <Form.Control
                            className="w-75"
                            placeholder="inputDescription"
                            name="inputDescription"
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                inputDescription: e.target.value,
                              });
                            }}
                            value={formData.inputDescription}
                            aria-label="inputDescription"
                            aria-describedby="basic-addon1"
                          />
                          <div className="d-flex gap-1">
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => {
                                setEditInput(null),
                                  setFormData({
                                    inputDescription: "",
                                  });
                              }}
                            >
                              Cancel
                            </button>
                            <button
                              className="btn btn-sm btn-primary px-3"
                              disabled={
                                formData.inputDescription === "" ||
                                formData.inputDescription ===
                                input.inputDescription
                              }
                              onClick={handleUpdateInput}
                            >
                              Save
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="m-0">{input.inputDescription}</p>
                          <div className="d-flex gap-1">
                            <button
                              className="btn btn-sm btn-primary px-3"
                              onClick={() => handleEditInput(input)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-danger px-3"
                              onClick={() =>
                                handleDeleteInput(
                                  input.inputID,
                                  input.inputDescription
                                )
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* FOR ADDING NEW INPUT */}
        <div className="d-flex align-items-end justify-content-end gap-2 mt-1">
          {addInput ? (
            <>
              <Form.Control
                className="w-100 mt-3"
                placeholder="New Question"
                name="inputDescription"
                onChange={(e) =>
                  setFormData({ ...formData, inputDescription: e.target.value })
                }
                value={formData.inputDescription}
                aria-label="inputDescription"
                aria-describedby="basic-addon1"
              />
              <div className="d-flex gap-1  mb-1">
                <button
                  className="btn btn-sm btn-danger px-1"
                  onClick={() => {
                    setAddInput(false), setFormData({ inputDescription: "" });
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-sm btn-primary px-4"
                  onClick={handleAddInput}
                  disabled={formData.inputDescription === ""}
                >
                  Add
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                className="btn btn-sm btn-primary"
                style={{ width: "8.9rem" }}
                onClick={() => {
                  setAddInput(true),
                    setEditInput(null),
                    setFormData({
                      inputDescription: "",
                      purposeID: purpose.purposeID,
                    });
                }}
              >
                Add
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PurposeInput;
