import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table, Form, FloatingLabel } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { motion, AnimatePresence } from "framer-motion";

function programModal() {
  const [show, setShow] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [direction, setDirection] = useState(1);
  const [addProgram, setAddProgram] = useState(false);

  // Function to go to the next step
  const handleAddProgram = () => {
    setDirection(1);
    setAddProgram(true);
  };
  // Function to go to the previous step
  const handleViewProgram = () => {
    setDirection(-1);
    setAddProgram(false);
  };

  // FOR ANIMATIONS
  const stepVariants = {
    hidden: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: { duration: 0.4, ease: "easeIn" },
    }),
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/fetchingDocuments/fetchPrograms`
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.data);
          setPrograms(res.data.data);
        } else if (res.data.Message) {
          console.log("Error:", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error fetching Programs: ", err);
      });
  }, []);

  return (
    <>
      <Button
        className="shadow-sm p-3  d-flex justify-content-between align-items-center"
        variant="light"
        onClick={handleShow}
      >
        <h5 className="m-0">Program/Course</h5>
        <h4 className="m-0 d-flex align-items-center">
          <i className="bx bxs-chevron-right"></i>
        </h4>
      </Button>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <h4 className="m-0">Manage Program/Course</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              {addProgram === false && (
                <motion.div
                  key="viewPrograms"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={direction}
                >
                  <div
                    className="d-flex flex-column gap-1 overflow-y-scroll overflow-x-hidden p-2"
                    style={{ height: "60dvh" }}
                  >
                    <Table striped bordered hover variant="white">
                      <thead>
                        <tr>
                          <th className="">
                            <h5 className="m-0 fw-bold">Program/Course</h5>
                          </th>
                          <th className="text-center align-middle">
                            <h5 className="m-0 fw-bold">Action</h5>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {programs.map((program) => (
                          <tr key={program.id}>
                            <td className="align-middle">
                              <p className="m-0">{program.programName}</p>
                            </td>
                            <td className="align-middle">
                              <div className="d-flex justify-content-center gap-1">
                                <button className="btn btn-success text-white ">
                                  <p className="m-0">Edit</p>
                                </button>
                                <button className="btn btn-danger text-white ">
                                  <p className="m-0">Delete</p>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </motion.div>
              )}
              {addProgram === true && (
                <motion.div
                  key="addPrograms"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={direction}
                >
                  <div
                    className="d-flex justify-content-center gap-1"
                    style={{}}
                  >
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Program Name"
                      className="mb-3"
                    >
                      <Form.Control
                        type="email"
                        placeholder="name@example.com"
                      />
                    </FloatingLabel>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {addProgram ? (
            <Button variant="secondary" onClick={handleViewProgram}>
              <p className="m-0">View Programs</p>
            </Button>
          ) : (
            <Button variant="secondary" onClick={handleClose}>
              <p className="m-0">Close</p>
            </Button>
          )}

          {addProgram ? (
            <Button variant="primary" onClick={handleClose}>
              <p className="m-0">Save</p>
            </Button>
          ) : (
            <Button variant="primary" onClick={handleAddProgram}>
              <p className="m-0">Add new program</p>
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default programModal;
