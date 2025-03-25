import { use, useEffect, useState } from "react";
import { Button, Accordion, Modal, FloatingLabel, Form } from "react-bootstrap";
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
    setShowPurpose(true)
  };

  const fetchPurposes = () => {
    axios
      .get("http://localhost:5000/api/fetchingDocuments/fetchPurposes")
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.data);
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

  const handleSavePurpose = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/documents/addPurpose", formData)
      .then((res) => {
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
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Something went wrong. Please try again.",
          confirmButtonColor: "#d33",
        });

        console.log("Error adding purpose:", err);
      });
  };

  const handleUpdatePurpose = () => {
    axios
      .post("http://localhost:5000/api/documents/updatePurpose", formData)
      .then((res) => {
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
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Something went wrong while updating the purpose.",
          confirmButtonColor: "#d33",
        });

        console.log("Error updating purpose:", err);
      });
  };

  const handleDeletePurpose = (purposeID, purposeName) => {
    Swal.fire({
      title: `Delete "${purposeName}"?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("http://localhost:5000/api/documents/deletePurpose", {
            purposeID,
          })
          .then((res) => {
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
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "Something went wrong while deleting.",
              confirmButtonColor: "#d33",
            });

            console.log("Error deleting purpose:", err);
          });
      }
    });
  };

  return (
    <>
      <Button
        className="customize shadow-sm p-2 w-100 border-0 d-flex justify-content-between align-items-center"
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
        <Modal.Body>
          <div
            className="custom-scrollbar d-flex flex-column gap-1 overflow-y-scroll p-2"
            style={{ height: "60dvh" }}
          >
            {purposes.map((purpose) => (
              <div
                key={purpose.purposeID}
                className="d-flex justify-content-between align-items-center border rounded p-2"
              >
                {editPurpose === purpose.purposeID ? (
                  <>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Purpose Name"
                      className="w-75"
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
                    <div className="d-flex gap-1">
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => setEditPurpose(null)}
                      >
                        <i className="bx bx-x"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={handleUpdatePurpose}
                        disabled={formData.purposeName === purpose.purposeName}
                      >
                        <i className="bx bx-check"></i>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h5 className="m-0">{purpose.purposeName}</h5>
                    <div className="d-flex gap-1">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleEditPurpose(purpose)}
                      >
                        <p className="m-0"><span className="d-none d-md-block">Edit</span><span className="d-md-none">  <i className="bx bx-edit-alt"></i></span></p>
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeletePurpose(purpose.purposeID, purpose.purposeName)}
                      >
                        <p className="m-0"><span className="d-none d-md-block">remove</span><span className="d-md-none">  <i className="bx bx-trash"></i></span></p>
                      </button>
                      <button
                        className="rounded-1 px-2 text-white border-0"
                        style={{ backgroundColor: "var(--main-color)" }}
                        onClick={(e) => openDetailModal(purpose, e)}
                      >
                        <p className="m-0"><span className=" d-none d-md-block ">Manage</span><span className="d-block d-md-none"><i className="bx bx-edit"></i></span></p>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePurpose}>
            Close
          </Button>
          <Button
            style={{ backgroundColor: "var(--main-color)" }}
            onClick={handleAddPurpose}
          >
            Add Purpose
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL FOR ADDING PURPOSE */}
      <Modal show={addPurpose} onHide={handleCancelAddPurpose} centered size="">
        <Modal.Header style={{ backgroundColor: "var(--main-color)" }}>
          <Modal.Title>
            <h4 className="m-0 text-white">Add Purpose</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingInput"
            label="Purpose Name"
            className="mb-3"
          >
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
          <Button variant="secondary" onClick={handleCancelAddPurpose}>
            <p className="m-0">Cancel</p>
          </Button>
          <Button
            style={{ backgroundColor: "var(--main-color)" }}
            onClick={handleSavePurpose}
          >
            <p className="m-0">Save</p>
          </Button>
        </Modal.Footer>
      </Modal>

      {/* NEW MODAL FOR PURPOSE DETAILS */}
      {/* exp: for transfer */}
      <Modal size="lg" show={showDetailModal} onHide={closeDetailModal} centered>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "var(--main-color)" }}
        >
          <Modal.Title>
            <h4 className="m-0 text-white">
              {selectedPurpose?.purposeName} Details
            </h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPurpose && (
            <>
              <PurposeSelections purpose={selectedPurpose} />
              <PurposeInput purpose={selectedPurpose} />
              <PurposeUpload purpose={selectedPurpose} />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDetailModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default purposeModal;