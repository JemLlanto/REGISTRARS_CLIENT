import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";

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

          Swal.fire({
            icon: "success",
            title: "Success",
            text: res.data.Message,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: res.data.Message,
          });
        }
      })
      .catch((err) => {
        console.log("Error adding uploads:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong while adding uploads.",
        });
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

          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: res.data.Message,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: res.data.Message,
          });
        }
      })
      .catch((err) => {
        console.log("Error updating uploads:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong while updating uploads.",
        });
      });
  };

  const handleDeleteUpload = (uploadID, uploadDescription) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete "${uploadDescription}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("http://localhost:5000/api/documents/deleteUpload", { uploadID })
          .then((res) => {
            if (res.data.Status === "Success") {
              Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: res.data.Message,
              });
              fetchUploads();
            } else {
              Swal.fire({
                icon: "error",
                title: "Failed",
                text: res.data.Message,
              });
            }
          })
          .catch((err) => {
            console.log("Error deleting upload:", err);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Something went wrong while deleting the upload.",
            });
          });
      }
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
                              className="btn btn-sm btn-primary  px-3"
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
                              className="btn btn-sm btn-primary px-3"
                              onClick={() => handleEditUpload(upload)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-danger px-3"
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
        <div className="d-flex align-items-end justify-content-end gap-2 mt-1">
          {addUpload ? (
            <>
              <Form.Control
                className="w-100 mt-3"
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
              <div className="d-flex gap-1 mb-1">
                <button
                  className="btn btn-sm btn-danger px-1"
                  onClick={() => {
                    setAddUpload(false), setFormData({ uploadDescription: "" });
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-sm btn-primary px-4"
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
                className="btn btn-sm btn-primary"
                style={{ width: "8.9rem" }}
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
