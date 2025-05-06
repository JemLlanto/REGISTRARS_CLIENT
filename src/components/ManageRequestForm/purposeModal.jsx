import { use, useEffect, useState } from "react";
import {
  Button,
  Spinner,
  Modal,
  FloatingLabel,
  Form,
  Table,
} from "react-bootstrap";
import axios from "axios";
import PurposeSelections from "./PurposeSelections";
import PurposeInput from "./PurposeInput";
import PurposeUpload from "./PurposeUpload";
import Swal from "sweetalert2";

function purposeModal() {
  const [showPurpose, setShowPurpose] = useState(false);
  const [purposes, setPurposes] = useState([]);
  const [editPurpose, setEditPurpose] = useState(null);
  const [addPurpose, setAddPurpose] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [formData, setFormData] = useState({
    purposeName: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleAddPurpose = () => {
    setAddPurpose(true);
    setShowPurpose(false);
    setEditPurpose(null);
    setFormData({ purposeName: "" });
  };
  const handleCancelAddPurpose = () => {
    setAddPurpose(false);
    setShowPurpose(true);
  };

  const handleEditPurpose = (purpose) => {
    setEditPurpose(purpose.purposeID);
    setFormData({
      purposeName: purpose.purposeName,
      purposeID: purpose.purposeID,
    });
  };

  // New functions to handle the detail modal
  const openDetailModal = (purpose, e) => {
    e.stopPropagation(); // Prevent accordion from toggling
    setSelectedPurpose(purpose);
    setShowDetailModal(true);
    setShowPurpose(false);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedPurpose(null);
    setShowPurpose(true);
  };

  const fetchPurposes = () => {
    axios
      .get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/fetchingDocuments/fetchPurposes`
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          // console.log(res.data.data);
          setPurposes(res.data.data);
        } else if (res.data.Message) {
          console.log("Error: ", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error fetching purposes:", err);
      });
  };

  useEffect(() => {
    fetchPurposes();
  }, []);

  const handleClosePurpose = () => setShowPurpose(false);
  const handleShowPurpose = () => setShowPurpose(true);

  const handleSavePurpose = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/documents/addPurpose`,
        formData
      );

      if (res.data.Status === "Success") {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: res.data.Message,
          confirmButtonColor: "#3085d6",
        });

        setAddPurpose(false);
        setShowPurpose(true);
        setFormData({ purposeName: "" });
        fetchPurposes();
      } else if (res.data.Status === "Failed") {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: res.data.Message,
          confirmButtonColor: "#d33",
        });

        setFormData({ purposeName: "" });
      } else if (res.data.Message) {
        console.log("Error:", res.data.Message);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#d33",
      });

      console.log("Error adding purpose:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePurpose = async (purposeName) => {
    try {
      setIsLoading(true);
      setSelectedPurpose(purposeName);
      const res = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/documents/updatePurpose`,
        formData
      );

      if (res.data.Status === "Success") {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: res.data.Message,
          confirmButtonColor: "#3085d6",
        });

        setEditPurpose(null);
        setFormData({ purposeName: "", purposeID: "" });
        fetchPurposes();
      } else if (res.data.Status === "Failed") {
        Swal.fire({
          icon: "error",
          title: "Update Failed!",
          text: res.data.Message,
          confirmButtonColor: "#d33",
        });
      } else if (res.data.Message) {
        console.log("Error:", res.data.Message);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong while updating the purpose.",
        confirmButtonColor: "#d33",
      });

      console.log("Error updating purpose:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePurpose = async (purposeID, purposeName) => {
    const confirmation = await Swal.fire({
      title: `Delete "${purposeName}"?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirmation.isConfirmed) {
      try {
        setIsLoading(true);
        setSelectedPurpose(purposeName);
        const res = await axios.post(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/documents/deletePurpose`,
          {
            purposeID,
          }
        );

        if (res.data.Status === "Success") {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: res.data.Message,
            confirmButtonColor: "#3085d6",
          });

          fetchPurposes();
        } else {
          Swal.fire({
            icon: "error",
            title: "Deletion Failed!",
            text: res.data.Message,
            confirmButtonColor: "#d33",
          });
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Something went wrong while deleting.",
          confirmButtonColor: "#d33",
        });

        console.log("Error deleting purpose:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Button
        className="customize-section customize shadow-sm p-2 w-100 border-0 d-flex justify-content-between align-items-center"
        style={{ backgroundColor: "var(--main-color)" }}
        onClick={handleShowPurpose}
      >
        <h5 className="m-0 ms-3">customize</h5>
        <h4 className="m-0 d-flex align-items-center">
          <i className="bx bxs-chevron-right me-2"></i>
        </h4>
      </Button>

      {/* MAIN MODAL FOR PURPOSE */}
      <Modal size="lg" show={showPurpose} onHide={handleClosePurpose} centered>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "var(--main-color)" }}
        >
          <Modal.Title>
            <h4 className="m-0 text-white">Manage Purposes</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-1 p-md-3">
          <div
            className="custom-scrollbar d-flex flex-column gap-1 overflow-y-scroll p-0"
            style={{ height: "60dvh" }}
          >
            <Table striped bordered hover variant="white" className="m-0">
              <thead>
                <tr>
                  <th className="">
                    <h5 className="m-0 fw-bold">Purpose</h5>
                  </th>
                  <th className="text-center align-middle">
                    <h5 className="m-0 fw-bold">Action</h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                {purposes.map((purpose, index) => (
                  <tr key={index}>
                    <td className="align-middle">
                      {editPurpose === purpose.purposeID ? (
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Purpose Name"
                          className="w-100 me-2"
                        >
                          <Form.Control
                            type="text"
                            name="purposeName"
                            value={formData.purposeName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                purposeName: e.target.value,
                              })
                            }
                            placeholder=""
                          />
                        </FloatingLabel>
                      ) : (
                        <p className="m-0">{purpose.purposeName}</p>
                      )}
                    </td>
                    <td className="align-middle">
                      <div className="d-flex justify-content-center gap-1">
                        {editPurpose === purpose.purposeID ? (
                          <>
                            <button
                              className="btn btn-sm btn-secondary text-white"
                              onClick={() => setEditPurpose(null)}
                            >
                              <p className="m-0">
                                <span className="d-none d-md-block">
                                  Cancel
                                </span>
                                <span className="d-md-none d-flex justify-content-center align-items-center">
                                  <i className="bx bx-x iconFont"></i>
                                </span>
                              </p>
                            </button>
                            <button
                              className="btn btn-sm btn-success text-white d-flex justify-content-center align-items-center gap-md-1"
                              onClick={() =>
                                handleUpdatePurpose(purpose.purposeName)
                              }
                              disabled={
                                purpose.purposeName === formData.purposeName
                              }
                            >
                              {isLoading &&
                              purpose.purposeName === selectedPurpose ? (
                                <>
                                  <Spinner
                                    animation="border"
                                    variant="light"
                                    size="sm"
                                  />
                                  <p className="m-0">
                                    <span className="d-none d-md-block">
                                      Saving
                                    </span>
                                  </p>
                                </>
                              ) : (
                                <p className="m-0">
                                  <span className="d-none d-md-block">
                                    Save
                                  </span>
                                  <span className="d-md-none d-flex justify-content-center align-items-center">
                                    <i className="bx bx-save iconFont"></i>
                                  </span>
                                </p>
                              )}
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => handleEditPurpose(purpose)}
                            >
                              <p className="m-0">
                                <span className="d-none d-md-block">Edit</span>
                                <span className="d-md-none">
                                  {" "}
                                  <i className="bx bx-edit-alt"></i>
                                </span>
                              </p>
                            </button>
                            <button
                              className="btn btn-sm btn-danger text-white d-flex justify-content-center align-items-center gap-md-1"
                              onClick={() =>
                                handleDeletePurpose(
                                  purpose.purposeID,
                                  purpose.purposeName
                                )
                              }
                            >
                              {isLoading &&
                              selectedPurpose === purpose.purposeName ? (
                                <>
                                  <Spinner
                                    animation="border"
                                    variant="light"
                                    size="sm"
                                  />
                                  <p className="m-0">
                                    <span className="d-none d-md-block">
                                      Removing
                                    </span>
                                  </p>
                                </>
                              ) : (
                                <p className="m-0">
                                  <span className="d-none d-md-block">
                                    Remove
                                  </span>
                                  <span className="d-md-none d-flex justify-content-center align-items-center">
                                    <i className="bx bx-trash iconFont"></i>
                                  </span>
                                </p>
                              )}
                            </button>
                            <button
                              className="btn btn-sm primaryButton"
                              style={{ backgroundColor: "var(--main-color)" }}
                              onClick={(e) => openDetailModal(purpose, e)}
                            >
                              <p className="m-0">
                                <span className=" d-none d-md-block ">
                                  Manage
                                </span>
                                <span className="d-block d-md-none">
                                  <i className="bx bx-edit"></i>
                                </span>
                              </p>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            className="border-0"
            variant="secondary"
            onClick={handleClosePurpose}
          >
            <p className="m-0">Close</p>
          </Button>
          <button className="btn primaryButton" onClick={handleAddPurpose}>
            <p className="m-0"> Add Purpose</p>
          </button>
        </Modal.Footer>
      </Modal>

      {/* MODAL FOR ADDING PURPOSE */}
      <Modal show={addPurpose} onHide={handleCancelAddPurpose} centered size="">
        <Modal.Header>
          <Modal.Title>
            <h4 className="m-0 text-white">Add Purpose</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingInput" label="Purpose Name">
            <Form.Control
              type="text"
              name="purposeName"
              value={formData.purposeName}
              onChange={(e) =>
                setFormData({ ...formData, purposeName: e.target.value })
              }
              placeholder=""
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="border-0"
            variant="secondary"
            onClick={handleCancelAddPurpose}
          >
            <p className="m-0">Cancel</p>
          </Button>
          <button
            className="btn primaryButton d-flex justify-content-center align-items-center gap-1"
            disabled={formData.purposeName === "" || isLoading}
            onClick={handleSavePurpose}
          >
            {isLoading ? (
              <>
                <Spinner animation="border" variant="light" size="sm" />
                <p className="m-0">Saving</p>
              </>
            ) : (
              <>
                <p className="m-0">Save</p>
              </>
            )}
          </button>
        </Modal.Footer>
      </Modal>

      {/* NEW MODAL FOR PURPOSE DETAILS */}
      {/* exp: for transfer */}
      <Modal
        size="lg"
        show={showDetailModal}
        onHide={closeDetailModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 className="m-0 text-white">
              {selectedPurpose?.purposeName} Details
            </h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-1 p-md-3">
          <div
            className="custom-scrollbar d-flex flex-column gap-1 overflow-y-scroll"
            style={{ maxHeight: "60dvh" }}
          >
            {selectedPurpose && (
              <>
                <PurposeSelections purpose={selectedPurpose} />
                <PurposeInput purpose={selectedPurpose} />
                <PurposeUpload purpose={selectedPurpose} />
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="border-0"
            variant="secondary"
            onClick={closeDetailModal}
          >
            <p className="m-0">Close</p>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default purposeModal;
