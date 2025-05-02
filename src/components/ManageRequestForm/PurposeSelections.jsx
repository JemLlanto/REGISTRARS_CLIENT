import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Table, FloatingLabel, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";

const SelectionSelections = ({ purpose }) => {
  const [selections, setSelections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addSelection, setAddSelection] = useState(false);
  const [editSelection, setEditSelection] = useState(null);
  const [selectedoption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState({
    selectionName: "",
    purposeID: purpose.purposeID,
    selectionID: "",
  });

  const fetchSelections = () => {
    setIsLoading(true);
    setSelections([]);

    axios
      .get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/fetchingDocuments/fetchSelections`,
        {
          params: {
            purposeID: purpose.purposeID,
          },
        }
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          // console.log(res.data.data);
          setSelections(res.data.data);
          setIsLoading(false);
        } else if (res.data.Message) {
          // console.log("Error: ", res.data.Message);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log("Error fetching selections:", err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchSelections();
  }, []);

  const handleEditSelection = (selection) => {
    setEditSelection(selection.selectionID);
    setFormData({
      selectionName: selection.selectionName,
      purposeID: purpose.purposeID,
      selectionID: selection.selectionID,
    });
    setAddSelection(false);
  };

  const handleAddSelection = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/documents/addSelection`,
        formData
      );
      if (res.data.Status === "Success") {
        setAddSelection(false);
        setFormData({
          selectionName: "",
          purposeID: purpose.purposeID,
        });
        fetchSelections();

        // Show success alert
        Swal.fire({
          title: "Success!",
          text: `"${formData.selectionName}" added successfully!`,
          icon: "success",
          confirmButtonText: "OK",
        });
      } else if (res.data.Status === "Failed") {
        // Show error alert
        Swal.fire({
          title: "Failed!",
          text: res.data.Message,
          icon: "error",
          confirmButtonText: "OK",
        });
      } else if (res.data.Message) {
        console.log("Error: ", res.data.Message);
      }
    } catch (err) {
      console.log("Error adding selection:", err);

      // Show error alert
      Swal.fire({
        title: "Error!",
        text: "An error occurred while adding the selection. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleUpdateSelection = async (selectionID) => {
    try {
      setIsLoading(true);
      setSelectedOption(selectionID);
      const res = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/documents/updateSelection`,
        formData
      );
      if (res.data.Status === "Success") {
        setEditSelection(false);
        setFormData({
          selectionName: "",
          purposeID: purpose.purposeID,
        });
        fetchSelections();

        // Show success alert
        Swal.fire({
          title: "Success!",
          text: `Updated to "${formData.selectionName}" successfully!`,
          icon: "success",
          confirmButtonText: "OK",
        });
      } else if (res.data.Status === "Failed") {
        // Show error alert
        Swal.fire({
          title: "Failed!",
          text: res.data.Message,
          icon: "error",
          confirmButtonText: "OK",
        });
      } else if (res.data.Message) {
        console.log("Error: ", res.data.Message);
      }
    } catch (err) {
      console.log("Error updating selection:", err);

      // Show error alert
      Swal.fire({
        title: "Error!",
        text: "An error occurred while updating the selection. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
      setSelectedOption(null);
    }
  };
  const handleDeleteSelection = async (selectionID, selectionName) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete "${selectionName}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      try {
        setIsLoading(true);
        setSelectedOption(selectionID);
        const res = await axios.post(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/documents/deleteSelection`,
          {
            selectionID,
          }
        );
        if (res.data.Status === "Success") {
          Swal.fire({
            title: "Deleted!",
            text: `"${selectionName}" deleted successfully!`,
            icon: "success",
            confirmButtonText: "OK",
          });
          fetchSelections();
        } else {
          Swal.fire({
            title: "Failed!",
            text: res.data.Message,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } catch (err) {
        console.log("Error deleting selection:", err);

        Swal.fire({
          title: "Error!",
          text: "An error occurred while deleting the selection. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        setIsLoading(false);
        setSelectedOption(null);
      }
    }
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
              <h5 className="m-0 fw-bold">Type of Documents</h5>
            </th>
            <th className="text-center align-middle w-25">
              <h5 className="m-0 fw-bold">Action</h5>
            </th>
          </tr>
        </thead>
        <tbody>
          <>
            {selections.length === 0 ? (
              <>
                {isLoading ? (
                  <>
                    <tr>
                      <td className="text-center" colSpan={2}>
                        <p className="m-0">
                          Loading document type selections...
                        </p>
                      </td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <td className="text-center" colSpan={2}>
                      <p className="m-0">
                        No document type selections for this purpose.
                      </p>
                    </td>
                  </tr>
                )}
              </>
            ) : (
              <>
                {selections.map((selection, index) => (
                  <tr key={index}>
                    <td className="align-middle">
                      {editSelection === selection.selectionID ? (
                        <FloatingLabel
                          controlId="selectionName"
                          label="Selection Name"
                          className="w-100 me-2"
                        >
                          <Form.Control
                            className="w-100"
                            placeholder="selectionName"
                            name="selectionName"
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                selectionName: e.target.value,
                              });
                            }}
                            value={formData.selectionName}
                            aria-label="selectionName"
                            aria-describedby="basic-addon1"
                          />
                        </FloatingLabel>
                      ) : (
                        <p className="m-0">{selection.selectionName}</p>
                      )}
                    </td>
                    <td className="align-middle">
                      <div className="d-flex justify-content-center gap-1">
                        {editSelection === selection.selectionID ? (
                          <>
                            <button
                              className="btn btn-sm btn-danger  px-2 px-md-3"
                              onClick={() => {
                                setEditSelection(null),
                                  setFormData({
                                    selectionName: "",
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
                              className="btn btn-sm btn-success d-flex align-items-center justify-content-center gap-md-1 px-2 px-md-3"
                              disabled={
                                formData.selectionName === "" ||
                                formData.selectionName ===
                                  selection.selectionName ||
                                isLoading
                              }
                              onClick={() =>
                                handleUpdateSelection(selection.selectionID)
                              }
                            >
                              {isLoading &&
                              selectedoption === selection.selectionID ? (
                                <>
                                  <span>
                                    <Spinner
                                      animation="border"
                                      variant="light"
                                      size="sm"
                                    />
                                  </span>
                                  <p className="m-0">
                                    <span className="d-none d-md-block">
                                      Saving
                                    </span>
                                  </p>
                                </>
                              ) : (
                                <>
                                  <p className="m-0">
                                    <span className="d-none d-md-block">
                                      Save
                                    </span>
                                    <span className="d-md-none">
                                      <i className="bx bx-save iconFont"></i>
                                    </span>
                                  </p>
                                </>
                              )}
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-sm  px-2 px-md-3 text-white"
                              style={{ backgroundColor: "var(--main-color)" }}
                              onClick={() => handleEditSelection(selection)}
                            >
                              <p className="m-0">
                                <span className="d-none d-md-block">Edit</span>
                                <span className="d-md-none">
                                  <i className="bx bx-edit-alt iconFont"></i>
                                </span>
                              </p>
                            </button>
                            <button
                              className="btn btn-sm btn-danger d-flex align-items-center justify-content-center gap-md-1 px-2 px-md-3"
                              onClick={() =>
                                handleDeleteSelection(
                                  selection.selectionID,
                                  selection.selectionName
                                )
                              }
                              disabled={
                                isLoading &&
                                selectedoption === selection.selectionID
                              }
                            >
                              {isLoading &&
                              selectedoption === selection.selectionID ? (
                                <>
                                  <Spinner
                                    animation="border"
                                    variant="light"
                                    size="sm"
                                  />
                                  <p className="m-0">
                                    <span className="d-none d-md-block">
                                      Deleting
                                    </span>
                                  </p>
                                </>
                              ) : (
                                <>
                                  <p className="m-0">
                                    <span className="d-none d-md-block">
                                      Delete
                                    </span>
                                    <span className="d-md-none d-flex justify-content-center align-items-center">
                                      <i className="bx bx-trash iconFont"></i>
                                    </span>
                                  </p>
                                </>
                              )}
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

          <tr>
            {addSelection ? (
              <>
                <td>
                  <Form.Control
                    className="w-100"
                    placeholder="Selection Name"
                    name="selectionName"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        selectionName: e.target.value,
                      })
                    }
                    value={formData.selectionName}
                    aria-label="selectionName"
                    aria-describedby="basic-addon1"
                  />
                </td>
                <td>
                  <div className="d-flex align-items-center justify-content-center gap-1 mb-1">
                    <button
                      className="btn btn-sm btn-danger  px-2 px-md-3"
                      onClick={() => {
                        setAddSelection(false),
                          setFormData({ selectionName: "" });
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
                      className="btn btn-sm primaryButton d-flex align-items-center justify-content-center gap-md-1 px-2 px-md-3"
                      onClick={handleAddSelection}
                      disabled={formData.selectionName === "" || isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span>
                            <Spinner
                              animation="border"
                              variant="light"
                              size="sm"
                            />
                          </span>
                          <p className="m-0">
                            <span className="d-none d-md-block">Adding</span>
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="m-0">
                            <span className="d-none d-md-block">Add</span>
                            <span className="d-md-none">
                              <i className="bx bx-plus-circle iconFont"></i>
                            </span>
                          </p>
                        </>
                      )}
                    </button>
                  </div>
                </td>
              </>
            ) : (
              <>
                <td colSpan={2}>
                  <button
                    className="btn btn-sm text-white w-100"
                    style={{ backgroundColor: "var(--main-color)" }}
                    onClick={() => {
                      setAddSelection(true),
                        setEditSelection(null),
                        setFormData({
                          selectionName: "",
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

export default SelectionSelections;
