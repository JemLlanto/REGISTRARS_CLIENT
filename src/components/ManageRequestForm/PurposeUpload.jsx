import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Table, FloatingLabel, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";

const PurposeUpload = ({ purpose }) => {
  const [uploads, setUploads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addUpload, setAddUpload] = useState(false);
  const [editUpload, setEditUpload] = useState(null);
  const [selectedUpload, setSelectedUpload] = useState(null);
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
          // // console.log(res.data.data);
          setUploads(res.data.data);
          setIsLoading(false);
        } else if (res.data.Message) {
          // // console.log("Error: ", res.data.Message);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        // console.log("Error fetching uploads:", err);
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

  const handleAddUpload = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/documents/addUpload`,
        formData
      );

      if (res.data.Status === "Success") {
        setAddUpload(false);
        setFormData({
          uploadDescription: "",
          purposeID: purpose.purposeID,
        });
        fetchUploads();

        Swal.fire({
          icon: "success",
          title: `Success`,
          text: `"${formData.uploadDescription}" added successfully!`,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: res.data.Message,
        });
      }
    } catch (err) {
      // console.log("Error adding uploads:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while adding uploads.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateUpload = async (uploadID) => {
    try {
      setIsLoading(true);
      setSelectedUpload(uploadID);
      const res = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/documents/updateUpload`,
        formData
      );

      if (res.data.Status === "Success") {
        setEditUpload(false);
        setFormData({
          uploadDescription: "",
          purposeID: purpose.purposeID,
        });
        fetchUploads();

        Swal.fire({
          icon: "success",
          title: `Success.`,
          text: `Updated to "${formData.uploadDescription}" successfully!`,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: res.data.Message,
        });
      }
    } catch (err) {
      // console.log("Error updating uploads:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while updating uploads.",
      });
    } finally {
      setIsLoading(false);
      setSelectedUpload(null);
    }
  };

  const handleDeleteUpload = async (uploadID, uploadDescription) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete "${uploadDescription}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        setIsLoading(true);
        setSelectedUpload(uploadID);
        const res = await axios.post(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/documents/deleteUpload`,
          {
            uploadID,
          }
        );

        if (res.data.Status === "Success") {
          Swal.fire({
            icon: "success",
            title: `Deleted!`,
            text: `"${uploadDescription}" deleted successfully!`,
          });
          fetchUploads();
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: res.data.Message,
          });
        }
      } catch (err) {
        // console.log("Error deleting upload:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong while deleting the upload.",
        });
      } finally {
        setIsLoading(false);
        setSelectedUpload(null);
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
              <h5 className="m-0 fw-bold">Required File(5 files max)</h5>
            </th>
            <th className="text-center align-middle w-25">
              <h5 className="m-0 fw-bold">Action</h5>
            </th>
          </tr>
        </thead>
        <tbody>
          <>
            {uploads.length === 0 ? (
              <>
                {isLoading ? (
                  <>
                    <tr>
                      <td className="text-center" colSpan={2}>
                        <p className="m-0">Loading required files...</p>
                      </td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <td className="text-center" colSpan={2}>
                      <p className="m-0">No required files for this purpose.</p>
                    </td>
                  </tr>
                )}
              </>
            ) : (
              <>
                {uploads.map((upload, index) => (
                  <tr key={index}>
                    <td className="align-middle">
                      {editUpload === upload.uploadID ? (
                        <FloatingLabel
                          controlId="uploadDescription"
                          label="New Question"
                          className="w-100 me-2"
                        >
                          <Form.Control
                            className="w-100"
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
                        </FloatingLabel>
                      ) : (
                        <p className="m-0">{upload.uploadDescription}</p>
                      )}
                    </td>
                    <td className="align-middle">
                      <div className="d-flex justify-content-center gap-1">
                        {editUpload === upload.uploadID ? (
                          <>
                            <button
                              className="btn btn-sm btn-danger  px-2 px-md-3"
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
                              className="btn btn-sm btn-success d-flex align-items-center justify-content-center gap-md-1 px-2 px-md-3"
                              disabled={
                                formData.uploadDescription === "" ||
                                formData.uploadDescription ===
                                  upload.uploadDescription
                              }
                              onClick={() =>
                                handleUpdateUpload(upload.uploadID)
                              }
                            >
                              {isLoading &&
                              selectedUpload === upload.uploadID ? (
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
                              className="btn btn-sm btn-danger d-flex align-items-center justify-content-center gap-md-1 px-2 px-md-3"
                              onClick={() =>
                                handleDeleteUpload(
                                  upload.uploadID,
                                  upload.uploadDescription
                                )
                              }
                              disabled={isLoading}
                            >
                              {isLoading &&
                              selectedUpload === upload.uploadID ? (
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
            {addUpload ? (
              <>
                <td>
                  <Form.Control
                    className="w-100"
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
                </td>
                <td>
                  <div className="d-flex align-items-center justify-content-center gap-1">
                    <button
                      className="btn btn-sm btn-danger  px-2 px-md-3"
                      onClick={() => {
                        setAddUpload(false),
                          setFormData({ uploadDescription: "" });
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
                      onClick={handleAddUpload}
                      disabled={formData.uploadDescription === "" || isLoading}
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
                    className="btn btn-sm primaryButton w-100"
                    onClick={() => {
                      setAddUpload(true),
                        setEditUpload(null),
                        setFormData({
                          uploadDescription: "",
                          purposeID: purpose.purposeID,
                        });
                    }}
                    disabled={uploads.length >= 5}
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

export default PurposeUpload;
