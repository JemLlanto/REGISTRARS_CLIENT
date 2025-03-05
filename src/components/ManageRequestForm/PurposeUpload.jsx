import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const PurposeUpload = ({ purpose }) => {
  const [uploads, setUploads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addUpload, setAddUpload] = useState(false);
  const [editUpload, setEditUpload] = useState(null);
  const [formData, setFormData] = useState({
    uploadDescription: "",
    purposeID: purpose.purposeID,
    uploadID: "",
  });

  const fetchUploads = () => {
    setIsLoading(true);
    setUploads([]);

    axios
      .get("http://localhost:5000/api/fetchingDocuments/fetchUploads", {
        params: {
          purposeID: purpose.purposeID,
        },
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.data);
          setUploads(res.data.data);
          setIsLoading(false);
        } else if (res.data.Message) {
          console.log("Error: ", res.data.Message);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log("Error fetching uploads:", err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchUploads();
  }, []);

  const handleEditUpload = (uploads) => {
    setEditUpload(uploads.uploadID);
    setFormData({
      uploadDescription: uploads.uploadDescription,
      purposeID: purpose.purposeID,
      uploadID: uploads.uploadID,
    });
    setAddUpload(false);
  };

  const handleAddUpload = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/documents/addUpload", formData)
      .then((res) => {
        if (res.data.Status === "Success") {
          setAddUpload(false);
          setFormData({
            uploadDescription: "",
            purposeID: purpose.purposeID,
          });
          fetchUploads();
          alert(res.data.Message);
        } else if (res.data.Status === "Failed") {
          alert(res.data.Message);
        } else if (res.data.Message) {
          console.log("Error: ", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error adding uploads:", err);
      });
  };
  const handleUpdateUpload = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/documents/updateUpload", formData)
      .then((res) => {
        if (res.data.Status === "Success") {
          setEditUpload(false);
          setFormData({
            uploadDescription: "",
            purposeID: purpose.purposeID,
          });
          fetchUploads();
          alert(res.data.Message);
        } else if (res.data.Status === "Failed") {
          alert(res.data.Message);
        } else if (res.data.Message) {
          console.log("Error: ", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error adding uploads:", err);
      });
  };
  const handleDeleteUpload = (uploadID, uploadDescription) => {
    if (
      !window.confirm(`Are you sure you want to delete ${uploadDescription}?`)
    )
      return;

    axios
      .post("http://localhost:5000/api/documents/deleteUpload", {
        uploadID,
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          alert(res.data.Message);
          fetchUploads();
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
          <h5 className="m-0 fw-bold">Required File</h5>
        </div>
        {isLoading ? (
          <>
            <p>Loading...</p>
          </>
        ) : (
          // FOR DISPLAYING INPUTS
          <>
            {uploads.length === 0 ? (
              <>
                <p className="m-0">No questions</p>
              </>
            ) : (
              <>
                <div className="d-flex flex-column gap-1">
                  {uploads.map((upload) => (
                    <div
                      key={upload.uploadID}
                      className="d-flex align-items-center justify-content-between"
                    >
                      {editUpload === upload.uploadID ? (
                        <>
                          {/* FOR EDITING INPUT */}
                          <Form.Control
                            className="w-75"
                            placeholder="Upload Description"
                            name="uploadDescription"
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                uploadDescription: e.target.value,
                              });
                            }}
                            value={formData.uploadDescription}
                            aria-label="uploadDescription"
                            aria-describedby="basic-addon1"
                          />
                          <div className="d-flex gap-1">
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => {
                                setEditUpload(null),
                                  setFormData({
                                    uploadDescription: "",
                                  });
                              }}
                            >
                              Cancel
                            </button>
                            <button
                              className="btn btn-sm btn-primary"
                              disabled={
                                formData.uploadDescription === "" ||
                                formData.uploadDescription ===
                                  upload.uploadDescription
                              }
                              onClick={handleUpdateUpload}
                            >
                              Save
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="m-0">{upload.uploadDescription}</p>
                          <div className="d-flex gap-1">
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => handleEditUpload(upload)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() =>
                                handleDeleteUpload(
                                  upload.uploadID,
                                  upload.uploadDescription
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
        <div className="d-flex align-items-center justify-content-between mt-1">
          {addUpload ? (
            <>
              <Form.Control
                className="w-75"
                placeholder="New Question"
                name="uploadDescription"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    uploadDescription: e.target.value,
                  })
                }
                value={formData.uploadDescription}
                aria-label="uploadDescription"
                aria-describedby="basic-addon1"
              />
              <div className="d-flex gap-1">
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => {
                    setAddUpload(false), setFormData({ uploadDescription: "" });
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={handleAddUpload}
                  disabled={formData.uploadDescription === ""}
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
                  setAddUpload(true),
                    setEditUpload(null),
                    setFormData({
                      uploadDescription: "",
                      purposeID: purpose.purposeID,
                    });
                }}
                disabled={uploads.length > 0}
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

export default PurposeUpload;
