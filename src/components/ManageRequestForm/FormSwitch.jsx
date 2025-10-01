import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2

const FormSwitch = ({ user, fetchUserData }) => {
  const [switchModal, setSwitchModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const handleShow = () => {
    setSwitchModal(true);
  };

  const handleClose = () => {
    setSwitchModal(false);
  };

  useEffect(() => {
    if (user) {
      setFormData({
        userID: user.userID,
        isOn: user.isOn,
      });
    }
  }, [user]);

  const handleSwitchForm = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/managingRequest/switchForm`,
        formData
      );
      if (res.status === 200) {
        fetchUserData();

        // Using SweetAlert2 instead of regular alert
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data.message,
          timer: 1500,
          showConfirmButton: false,
        });

        handleClose();
      }
    } catch (error) {
      // SweetAlert2 for error
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          "Error inserting inputs: " +
          (error.response?.data?.message || error.message),
      });
      console.error("Error inserting inputs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <p className="m-0">Manual </p>
        <div
          className="toggle-switch ms-2"
          onClick={user.isAutomatic ? null : handleShow}
          style={{
            position: "relative",
            display: "inline-block",
            width: "50px",
            height: "24px",
            cursor: user.isAutomatic ? "not-allowed" : "pointer",
            opacity: user.isAutomatic ? "0.6" : "1",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              backgroundColor: user.isOn ? "#FFC107" : "#ccc",
              borderRadius: "34px",
              transition: "0.4s",
            }}
          >
            <div
              style={{
                position: "absolute",
                content: "",
                height: "18px",
                width: "18px",
                left: user.isOn ? "28px" : "4px",
                bottom: "3px",
                backgroundColor: "white",
                borderRadius: "50%",
                transition: "0.4s",
              }}
            />
          </div>
        </div>
      </div>

      <Modal show={switchModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 className="m-0">Notice!</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {user.isOn === 0
              ? "Are you sure you want to open the form?"
              : "Are you sure you want to close the form?"}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            <span className="m-0">Cancel</span>
          </button>
          <button
            className="btn primaryButton"
            onClick={handleSwitchForm}
            disabled={isLoading}
          >
            <span className="m-0">{isLoading ? "Processing" : "Confirm"}</span>
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FormSwitch;
