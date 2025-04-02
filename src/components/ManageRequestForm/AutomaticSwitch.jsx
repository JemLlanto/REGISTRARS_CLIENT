import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";

const AutomaticSwitch = ({ user, fetchUserData }) => {
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
        isAutomatic: user.isAutomatic,
      });
    }
  }, [user]);

  const handleSwitchForm = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/managingRequest/switchFormAutomatic`,
        formData
      );
      if (res.status === 200) {
        fetchUserData();
        alert(res.data.message);
        handleClose();
      }
    } catch (error) {
      alert("Error inserting inputs:", error);
      console.error("Error inserting inputs:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <button className="btn btn-light" onClick={handleShow}>
        <p className="m-0">Automatic{user.isAutomatic ? "(on)" : "(off)"}</p>
      </button>

      <Modal show={switchModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 className="m-0">Notice!</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {user.isAutomatic === 0
              ? "Are you sure you want to switch the form to automatic mode?"
              : "Are you sure you want to switch the form to manual mode?"}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary">
            <p className="m-0" onClick={handleClose}>
              Cancel
            </p>
          </button>
          <button className="btn primaryButton">
            <p className="m-0" onClick={handleSwitchForm}>
              {isLoading ? "Turning On" : "Confirm"}
            </p>
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AutomaticSwitch;
