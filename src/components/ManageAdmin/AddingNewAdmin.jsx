import React, { useEffect, useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import axios from "axios";

const AddingNewAdmin = ({ setAdminModal }) => {
  const [addingModal, setAddingModal] = useState(true);
  const [admins, setAdmins] = useState([]);

  const handleShow = () => {
    setAddingModal(true);
  };
  const handleClose = () => {
    setAddingModal(false);
  };

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/manageAdmin/fetchAdmin`
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          setAdmins(res.data.data);
          console.log(res.data.data);
        } else {
          console.log(res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error fetching admins: ", err);
      });
  }, []);
  return (
    <>
      <Button
        variant="primary"
        onClick={() => {
          handleShow(), setAdminModal(false);
        }}
      >
        Add admin
      </Button>

      <Modal show={addingModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Administrators</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Add admin</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddingNewAdmin;
