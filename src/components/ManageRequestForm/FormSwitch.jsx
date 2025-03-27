import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";

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

  // New function to automatically open form at 8 AM
  const checkAndOpenForm = async () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Check if it's exactly 8:00 AM
    if (hours === 17 && minutes === 55 && user.isOn === 0) {
      try {
        setIsLoading(true);
        const res = await axios.post(
          "http://localhost:5000/api/managingRequest/switchForm",
          {
            userID: user.userID,
            isOn: 1,
          }
        );

        if (res.status === 200) {
          fetchUserData();
          alert("Form automatically opened at 8 AM");
        }
      } catch (error) {
        console.error("Error automatically opening form:", error);
        alert("Could not automatically open form");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Set up interval to check time periodically
  useEffect(() => {
    // Check every minute
    const intervalId = setInterval(checkAndOpenForm, 60000);

    // Initial check
    if (user.isOn === 0) {
      checkAndOpenForm();
    }

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [user]);

  const handleSwitchForm = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/managingRequest/switchForm",
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
      <button className="btn btn-warning" onClick={handleShow}>
        {user.isOn ? "Close" : "Open"} the form
      </button>

      <Modal show={switchModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 className="m-0">Notice!</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {user.isOn === 0
              ? " Are you sure you want to open the form?"
              : " Are you sure you want to close the form?"}
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

export default FormSwitch;
