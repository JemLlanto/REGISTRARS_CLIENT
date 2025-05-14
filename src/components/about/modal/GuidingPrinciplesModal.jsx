import { Modal, FloatingLabel, Form, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const GuidingPrinciplesModal = ({ principle, fetchPrinciples }) => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: principle.id,
    title: "",
    description: "",
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      id: prevData.id || principle.id || "",
      title: prevData.title || principle.title || "",
      description: prevData.description || principle.description || "",
    }));
  }, [principle]);

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/about/updateGuidingPrinciples`,
        formData
      );
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Update Successful",
          text: "Location and contact details have been updated.",
        });
        fetchPrinciples();
        handleClose();
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "The server responded but the update was not successful.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while saving the data.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-light px-md-4 position-absolute end-0 top-0 m-2 m-md-3"
        onClick={handleShow}
        style={{ zIndex: "10" }}
      >
        <p className="m-0">
          <span className="d-none d-md-block">Edit</span>
        </p>
        <h5 className="m-0">
          <span className="d-md-none d-flex align-items-center justify-content-center my-1">
            <i className="bx  bx-edit"></i>
          </span>
        </h5>
      </button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 className="m-0">Edit {principle.title}</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="overflow-y-auto overflow-x-hidden p-2 p-sm-3">
          <FloatingLabel controlId="Title" label="Title" className="mb-2">
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              placeholder="Title"
              onChange={handleChange}
            />
          </FloatingLabel>
          <FloatingLabel controlId="Description" label="Description">
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              placeholder="Description"
              style={{ height: "200px" }}
              onChange={handleChange}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary">
            <p className="m-0">Cancel</p>
          </button>
          <button
            className="btn primaryButton d-flex align-items-center justify-content-center gap-1"
            disabled={
              (principle.title === formData.title &&
                principle.description === formData.description) ||
              isLoading
            }
            onClick={handleSave}
          >
            {isLoading ? (
              <>
                <span>
                  <i className="bx bx-loader bx-spin"></i>
                </span>
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
    </>
  );
};

export default GuidingPrinciplesModal;
