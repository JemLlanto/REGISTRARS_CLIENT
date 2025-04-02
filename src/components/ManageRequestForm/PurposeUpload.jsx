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
      .get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/fetchingDocuments/fetchUploads`,
        {
          params: {
            purposeID: purpose.purposeID,
          },
        }
      )
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
      .post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/documents/addUpload`,
        formData
      )
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
      .post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/documents/updateUpload`,
        formData
      )
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
          .post(
            `${
              import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
            }/api/documents/deleteUpload`,
            {
              uploadID,
            }
          )
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
                              className="btn btn-sm btn-primary  px-2 px-md-3"
                              disabled={
                                formData.uploadDescription === "" ||
                                formData.uploadDescription ===
                                  upload.uploadDescription
                              }
                              onClick={handleUpdateUpload}
                            >
                              <p className="m-0">
                                <span className="d-none d-md-block">Save</span>
                                <span className="d-md-none">
                                  {" "}
                                  <i className="bx bx-save iconFont"></i>
                                </span>
                              </p>
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="m-0">{upload.uploadDescription}</p>
                          <div className="d-flex gap-1">
                            <button
                              className="btn btn-sm text-white px-2 px-md-3"
                              style={{ backgroundColor: "var(--main-color)" }}
                              onClick={() => handleEditUpload(upload)}
                            >
                              <p className="m-0">
                                <span className="d-none d-md-block">Edit</span>
                                <span className="d-md-none">
                                  <i className="bx bx-edit-alt iconFont"></i>
                                </span>
                              </p>
                            </button>
                            <button
                              className="btn btn-sm btn-danger  px-2 px-md-3"
                              onClick={() =>
                                handleDeleteUpload(
                                  upload.uploadID,
                                  upload.uploadDescription
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
                  className="btn btn-sm btn-danger  px-2 px-md-3"
                  onClick={() => {
                    setAddUpload(false), setFormData({ uploadDescription: "" });
                  }}
                >
                  <p className="m-0">
                    <span className="d-none d-md-block">Cancel</span>
                    <span className="d-md-none">
                      {" "}
                      <i className="bx bx-x iconFont"></i>
                    </span>
                  </p>
                </button>
                <button
                  className="btn btn-sm btn-primary px-2 px-md-3"
                  onClick={handleAddUpload}
                  disabled={formData.uploadDescription === ""}
                >
                  <p className="m-0">
                    <span className="d-none d-md-block">Add</span>
                    <span className="d-md-none">
                      <i className="bx bx-plus-circle iconFont"></i>
                    </span>
                  </p>
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                className="btn btn-sm w-100 text-white"
                style={{ backgroundColor: "var(--main-color)" }}
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
                <p className="m-0">Add</p>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PurposeUpload;
