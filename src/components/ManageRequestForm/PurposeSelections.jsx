import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";

const SelectionSelections = ({ purpose }) => {
  const [selections, setSelections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addSelection, setAddSelection] = useState(false);
  const [editSelection, setEditSelection] = useState(null);
  const [formData, setFormData] = useState({
    selectionName: "",
    purposeID: purpose.purposeID,
    selectionID: "",
  });

  const fetchSelections = () => {
    setIsLoading(true);
    setSelections([]);

    axios
      .get("http://localhost:5000/api/fetchingDocuments/fetchSelections", {
        params: {
          purposeID: purpose.purposeID,
        },
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.data);
          setSelections(res.data.data);
          setIsLoading(false);
        } else if (res.data.Message) {
          console.log("Error: ", res.data.Message);
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

  const handleAddSelection = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/documents/addSelection", formData)
      .then((res) => {
        if (res.data.Status === "Success") {
          setAddSelection(false);
          setFormData({
            selectionName: "",
            purposeID: purpose.purposeID,
          });
          fetchSelections();
          alert(res.data.Message);
        } else if (res.data.Status === "Failed") {
          alert(res.data.Message);
        } else if (res.data.Message) {
          console.log("Error: ", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error adding selection:", err);
      });
  };
  const handleUpdateSelection = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/documents/updateSelection", formData)
      .then((res) => {
        if (res.data.Status === "Success") {
          setEditSelection(false);
          setFormData({
            selectionName: "",
            purposeID: purpose.purposeID,
          });
          fetchSelections();
          alert(res.data.Message);
        } else if (res.data.Status === "Failed") {
          alert(res.data.Message);
        } else if (res.data.Message) {
          console.log("Error: ", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error adding selection:", err);
      });
  };
  const handleDeleteSelection = (selectionID, selectionName) => {
    if (!window.confirm(`Are you sure you want to delete ${selectionName}?`))
      return;

    axios
      .post("http://localhost:5000/api/documents/deleteSelection", {
        selectionID,
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          alert(res.data.Message);
          fetchSelections();
        } else if (res.data.Status === "Failed") {
          alert(res.data.Message);
        } else if (res.data.Message) {
          console.log("Error:", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error adding purpose:", err);
      });
  };

  return (
    <>
      <div className="border p-2 rounded">
        <div className="d-flex align-items-center justify-content-start gap-1">
          <h5 className="m-0 fw-bold">Type of Documents</h5>
        </div>
        {isLoading ? (
          <>
            <p>Loading...</p>
          </>
        ) : (
          // FOR DISPLAYING SELECTIONS
          <>
            {selections.length === 0 ? (
              <>
                <p className="m-0">No Selections</p>
              </>
            ) : (
              <>
                <div className="d-flex flex-column gap-1">
                  {selections.map((selection) => (
                    <div
                      key={selection.selectionID}
                      className="d-flex align-items-center justify-content-between"
                    >
                      {editSelection === selection.selectionID ? (
                        <>
                          {/* FOR EDITING SELECTION */}
                          <Form.Control
                            className="w-75"
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
                          <div className="d-flex gap-1">
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => {
                                setEditSelection(null),
                                  setFormData({
                                    selectionName: "",
                                  });
                              }}
                            >
                              Cancel
                            </button>
                            <button
                              className="btn btn-sm btn-primary"
                              disabled={
                                formData.selectionName === "" ||
                                formData.selectionName ===
                                  selection.selectionName
                              }
                              onClick={handleUpdateSelection}
                            >
                              Save
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="m-0">{selection.selectionName}</p>
                          <div className="d-flex gap-1">
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => handleEditSelection(selection)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() =>
                                handleDeleteSelection(
                                  selection.selectionID,
                                  selection.selectionName
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

        {/* FOR ADDING NEW SELECTION */}
        <div className="d-flex align-items-center justify-content-between mt-1">
          {addSelection ? (
            <>
              <Form.Control
                className="w-75"
                placeholder="Selection Name"
                name="selectionName"
                onChange={(e) =>
                  setFormData({ ...formData, selectionName: e.target.value })
                }
                value={formData.selectionName}
                aria-label="selectionName"
                aria-describedby="basic-addon1"
              />
              <div className="d-flex gap-1">
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => {
                    setAddSelection(false), setFormData({ selectionName: "" });
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={handleAddSelection}
                  disabled={formData.selectionName === ""}
                >
                  Add
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                className="w-100 btn btn-sm btn-primary"
                onClick={() => {
                  setAddSelection(true),
                    setEditSelection(null),
                    setFormData({
                      selectionName: "",
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

export default SelectionSelections;
