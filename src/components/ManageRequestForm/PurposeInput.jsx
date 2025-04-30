import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Table, FloatingLabel } from "react-bootstrap";
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
      .get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/fetchingDocuments/fetchInputs`,
        {
          params: {
            purposeID: purpose.purposeID,
          },
        }
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          // console.log(res.data.data);
          setInputs(res.data.data);
          setIsLoading(false);
        } else if (res.data.Message) {
          // console.log("Error: ", res.data.Message);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        // console.log("Error fetching inputs:", err);
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
      .post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/documents/addInput`,
        formData
      )
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
      .post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/documents/updateInput`,
        formData
      )
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
          .post(
            `${
              import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
            }/api/documents/deleteInput`,
            { inputID }
          )
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
      <Table
        striped
        bordered
        hover
        variant="white"
        className="m-0 mb-1 mb-md-2"
      >
        <thead>
          <tr>
            <th className="">
              <h5 className="m-0 fw-bold">Required Questions</h5>
            </th>
            <th className="text-center align-middle">
              <h5 className="m-0 fw-bold">Action</h5>
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <>
              <tr>
                <td className="text-center" colSpan={2}>
                  Loading required questions...
                </td>
              </tr>
            </>
          ) : (
            <>
              {inputs.length === 0 ? (
                <>
                  <tr>
                    <td className="text-center" colSpan={2}>
                      No required questions.
                    </td>
                  </tr>
                </>
              ) : (
                <>
                  {inputs.map((input, index) => (
                    <tr key={index}>
                      <td className="align-middle">
                        {editInput === input.inputID ? (
                          <FloatingLabel
                            controlId="inputDescription"
                            label="New Question"
                            className="w-100 me-2"
                          >
                            <Form.Control
                              className="w-100 mt-3"
                              placeholder="New Question"
                              name="inputDescription"
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  inputDescription: e.target.value,
                                })
                              }
                              value={formData.inputDescription}
                              aria-label="inputDescription"
                              aria-describedby="basic-addon1"
                            />
                          </FloatingLabel>
                        ) : (
                          <p className="m-0">{input.inputDescription}</p>
                        )}
                      </td>
                      <td className="align-middle">
                        <div className="d-flex justify-content-center gap-1">
                          {editInput === input.inputID ? (
                            <>
                              <button
                                className="btn btn-sm btn-danger  px-2 px-md-3"
                                onClick={() => {
                                  setEditInput(null),
                                    setFormData({
                                      inputDescription: "",
                                    });
                                }}
                              >
                                <p className="m-0">
                                  <span className="d-none d-md-block">
                                    Cancel
                                  </span>
                                  <span className="d-md-none">
                                    {" "}
                                    <i className="bx bx-x iconFont"></i>
                                  </span>
                                </p>
                              </button>
                              <button
                                className="btn btn-sm btn-success  px-2 px-md-3"
                                disabled={
                                  formData.inputDescription === "" ||
                                  formData.inputDescription ===
                                    input.inputDescription
                                }
                                onClick={handleUpdateInput}
                              >
                                <p className="m-0">
                                  <span className="d-none d-md-block">
                                    Save
                                  </span>
                                  <span className="d-md-none">
                                    {" "}
                                    <i className="bx bx-save iconFont"></i>
                                  </span>
                                </p>
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="btn btn-sm text-white px-2 px-md-3"
                                style={{ backgroundColor: "var(--main-color)" }}
                                onClick={() => handleEditInput(input)}
                              >
                                <p className="m-0">
                                  <span className="d-none d-md-block">
                                    Edit
                                  </span>
                                  <span className="d-md-none">
                                    <i className="bx bx-edit-alt iconFont"></i>
                                  </span>
                                </p>
                              </button>
                              <button
                                className="btn btn-sm btn-danger px-2 px-md-3"
                                onClick={() =>
                                  handleDeleteInput(
                                    input.inputID,
                                    input.inputDescription
                                  )
                                }
                              >
                                <p className="m-0">
                                  <span className="d-none d-md-block">
                                    Delete
                                  </span>
                                  <span className="d-md-none">
                                    <i className="bx bx-trash iconFont"></i>
                                  </span>
                                </p>
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </>
          )}

          <tr>
            {addInput ? (
              <>
                <td>
                  <Form.Control
                    className="w-100"
                    placeholder="New Question"
                    name="inputDescription"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        inputDescription: e.target.value,
                      })
                    }
                    value={formData.inputDescription}
                    aria-label="inputDescription"
                    aria-describedby="basic-addon1"
                  />
                </td>
                <td>
                  <div className="d-flex align-items-center justify-content-center gap-1 mb-1">
                    <button
                      className="btn btn-sm btn-danger  px-2 px-md-3"
                      onClick={() => {
                        setAddInput(false),
                          setFormData({ inputDescription: "" });
                      }}
                    >
                      <p className="m-0">
                        <span className="d-none d-md-block">Cancel</span>
                        <span className="d-md-none">
                          <i className="bx bx-x iconFont"></i>
                        </span>
                      </p>
                    </button>
                    <button
                      className="btn btn-sm btn-primary  px-2 px-md-3"
                      onClick={handleAddInput}
                      disabled={formData.inputDescription === ""}
                    >
                      <p className="m-0">
                        <span className="d-none d-md-block">Add</span>
                        <span className="d-md-none">
                          <i className="bx bx-plus-circle iconFont"></i>
                        </span>
                      </p>
                    </button>
                  </div>
                </td>
              </>
            ) : (
              <>
                <td colSpan={2}>
                  <button
                    className="btn btn-sm primaryButton w-100"
                    onClick={() => {
                      setAddInput(true),
                        setEditInput(null),
                        setFormData({
                          inputDescription: "",
                          purposeID: purpose.purposeID,
                        });
                    }}
                  >
                    <p className="m-0">Add</p>
                  </button>
                </td>
              </>
            )}
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default PurposeInput;
