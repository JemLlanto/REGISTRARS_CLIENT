import { use, useEffect, useState } from "react";
import { Button, Accordion, Modal, FloatingLabel, Form } from "react-bootstrap";
import axios from "axios";
import PurposeSelections from "./PurposeSelections";
import PurposeInput from "./PurposeInput";
import PurposeUpload from "./PurposeUpload";

function purposeModal() {
  const [showPurpose, setShowPurpose] = useState(false);
  const [purposes, setPurposes] = useState([]);
  const [editPurpose, setEditPurpose] = useState(null);
  const [addPurpose, setAddPurpose] = useState(false);
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
          alert(res.data.Message);
          setAddPurpose(false);
          setShowPurpose(true);
          setFormData({ purposeName: "" });
          fetchPurposes();
        } else if (res.data.Status === "Failed") {
          alert(res.data.Message);
          setFormData({ purposeName: "" });
        } else if (res.data.Message) {
          console.log("Error:", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error adding purpose:", err);
      });
  };
  const handleUpdatePurpose = () => {
    axios
      .post("http://localhost:5000/api/documents/updatePurpose", formData)
      .then((res) => {
        if (res.data.Status === "Success") {
          alert(res.data.Message);
          setEditPurpose(null);
          setFormData({ purposeName: "", purposeID: "" });
          fetchPurposes();
        } else if (res.data.Status === "Failed") {
          alert(res.data.Message);
        } else if (res.data.Message) {
          console.log("Error:", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error updating purpose:", err);
      });
  };
  const handleDeletePurpose = (purposeID, purposeName) => {
    if (!window.confirm(`Are you sure you want to delete ${purposeName}?`))
      return;

    axios
      .post("http://localhost:5000/api/documents/deletePurpose", {
        purposeID,
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          alert(res.data.Message);
          fetchPurposes();
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
      <Button
        className="shadow-sm p-3  d-flex justify-content-between align-items-center"
        variant="light"
        onClick={handleShowPurpose}
      >
        <h5 className="m-0">Purpose</h5>
        <h4 className="m-0 d-flex align-items-center">
          <i class="bx bxs-chevron-right"></i>
        </h4>
      </Button>

      {/* MAIN MODAL FOR PURPOSE */}
      <Modal size="lg" show={showPurpose} onHide={handleClosePurpose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4 className="m-0">Manage Purposes</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="d-flex flex-column gap-1 overflow-y-scroll p-2"
            style={{ height: "60dvh" }}
          >
            <Accordion>
              {purposes.map((purpose) => (
                <Accordion.Item
                  eventKey={`${purpose.purposeID}`}
                  key={purpose.purposeID}
                >
                  <Accordion.Header>
                    <div className="w-100 d-flex justify-content-between align-items-center pe-2">
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
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditPurpose(null);
                              }}
                            >
                              <i class="bx bx-x"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-success"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUpdatePurpose();
                              }}
                              disabled={
                                formData.purposeName === purpose.purposeName
                              }
                            >
                              <i class="bx bx-check"></i>
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <h5 className="m-0">
                            {purpose.purposeName} {purpose.purposeID}
                          </h5>
                          <div className="d-flex gap-1">
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditPurpose(purpose);
                              }}
                            >
                              <i class="bx bx-edit-alt"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeletePurpose(
                                  purpose.purposeID,
                                  purpose.purposeName
                                );
                              }}
                            >
                              <i class="bx bx-trash"></i>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <PurposeSelections purpose={purpose} />
                    <PurposeInput purpose={purpose} />
                    <PurposeUpload purpose={purpose} />
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePurpose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddPurpose}>
            Add Purpose
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL FOR ADDING PURPOSE */}
      <Modal show={addPurpose} onHide={handleCancelAddPurpose} centered size="">
        <Modal.Header>
          <Modal.Title>
            <h4 className="m-0">Add Purpose</h4>
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
          <Button variant="primary" onClick={handleSavePurpose}>
            <p className="m-0">Save</p>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default purposeModal;
