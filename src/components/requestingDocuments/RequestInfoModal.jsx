import { useState } from "react";
import {
  Modal,
  Row,
  Col,
  FloatingLabel,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import Swal from "sweetalert2";

const RequestInfoModal = ({
  handleSubmit,
  formData,
  inputsLength,
  inputs,
  docType,
  file,
  isSelectionFilled,
  isFileFilled,
  isInputsFilled,
  isLoading,
  hasSelection,
  hasFile,
  hasInput,
}) => {
  const [imageModal, setImageModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleShow = (file) => {
    setImageModal(true);
    setSelectedFile(file);
  };
  const handleClose = () => setImageModal(false);
  const birthDate = formData?.dateOfBirth
    ? new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
      }).format(new Date(formData?.dateOfBirth))
    : "";
  // console.log("Doc types: ", docType);
  // console.log("Files: ", file);
  // console.log("inputs:", inputs);

  return (
    <>
      <button
        type="button"
        className="primaryButton btn d-flex align-items-center justify-content-center gap-1"
        onClick={handleShow}
        disabled={!(isSelectionFilled() && isFileFilled() && isInputsFilled())}
        style={{ width: "10rem" }}
      >
        {isLoading ? (
          <>
            <Spinner animation="border" variant="light" size="sm" />
            <p className="m-0 ">Submitting...</p>
          </>
        ) : (
          <p className="m-0 ">Submit</p>
        )}
      </button>

      <Modal show={imageModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 className="m-0">Request {formData.purpose}</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="overflow-auto"
          style={{ height: "clamp(20rem, 30dvw, 35rem)" }}
        >
          {/* USER INFO */}
          <div>
            <Row className="px-2">
              <Col lg={4} sm={12} className="px-1 mb-2">
                <FloatingLabel controlId="firstName" label="First Name">
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    disabled
                    placeholder=""
                  />
                </FloatingLabel>
              </Col>
              <Col lg={4} sm={12} className="px-1 mb-2">
                <FloatingLabel controlId="middleName" label="Middle Name">
                  <Form.Control
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    disabled
                    placeholder=""
                  />
                </FloatingLabel>
              </Col>
              <Col lg={4} sm={12} className="px-1 mb-2">
                <FloatingLabel controlId="lastName" label="Last Name">
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    disabled
                    placeholder=""
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="px-2">
              <Col lg={3} sm={12} className="px-1 mb-2">
                <FloatingLabel controlId="mobileNum" label="Mobile Number">
                  <Form.Control
                    type="text"
                    name="mobileNum"
                    value={formData.mobileNum}
                    disabled
                    placeholder=""
                  />
                </FloatingLabel>
              </Col>
              <Col lg={4} sm={12} className="px-1 mb-2">
                <FloatingLabel controlId="email" label="Email">
                  <Form.Control
                    type="text"
                    name="email"
                    value={formData.email}
                    disabled
                    placeholder=""
                  />
                </FloatingLabel>
              </Col>
              <Col lg={2} sm={12} className="px-1 mb-2">
                <FloatingLabel controlId="dateOfBirth" label="Date of Birth">
                  <Form.Control
                    type="text"
                    name="dateOfBirth"
                    value={birthDate}
                    disabled
                    placeholder=""
                  />
                </FloatingLabel>
              </Col>
              <Col lg={3} sm={12} className="px-1 mb-2">
                <FloatingLabel controlId="sex" label="Sex Assigned at Birth">
                  <Form.Control
                    type="text"
                    name="sex"
                    value={formData.sex}
                    disabled
                    placeholder=""
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="px-2">
              <Col lg={6} sm={12} className="px-1 mb-2">
                <FloatingLabel controlId="program" label="Program/Course">
                  <Form.Control
                    type="text"
                    name="program"
                    value={formData.program}
                    disabled
                    placeholder=""
                  />
                </FloatingLabel>
              </Col>
              <Col lg={6} sm={12} className="px-1 mb-2">
                <FloatingLabel controlId="studentID" label="Student ID">
                  <Form.Control
                    type="text"
                    name="studentID"
                    value={formData.studentID}
                    disabled
                    placeholder=""
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="px-2">
              <Col lg={4} sm={12} className="px-1 mb-2">
                <FloatingLabel
                  controlId="classification"
                  label="Classification"
                >
                  <Form.Control
                    type="text"
                    name="classification"
                    value={formData.classification}
                    disabled
                    placeholder=""
                  />
                </FloatingLabel>
              </Col>
              {formData.classification === "graduated" ? (
                <Col lg={4} sm={12} className="px-1 mb-2">
                  <FloatingLabel
                    controlId="yearGraduated"
                    label="Year Graduated"
                  >
                    <Form.Control
                      type="text"
                      name="yearGraduated"
                      value={formData.yearGraduated}
                      disabled
                      placeholder=""
                    />
                  </FloatingLabel>
                </Col>
              ) : (
                <Col lg={4} sm={12} className="px-1 mb-2">
                  <FloatingLabel controlId="yearLevel" label="Year Level">
                    <Form.Control
                      type="text"
                      name="yearLevel"
                      value={formData.yearLevel}
                      disabled
                      placeholder=""
                    />
                  </FloatingLabel>
                </Col>
              )}

              <Col lg={4} sm={12} className="px-1 mb-2">
                <FloatingLabel
                  controlId="schoolYearAttended"
                  label=" Last School Year Attended"
                >
                  <Form.Control
                    type="text"
                    name="schoolYearAttended"
                    value={formData.schoolYearAttended}
                    disabled
                    placeholder=""
                  />
                </FloatingLabel>
              </Col>
            </Row>
          </div>
          {/* FOR DOCUMENT TYPES */}
          {docType && hasSelection ? (
            <>
              <div>
                <h5 className="m-0 mt-2 fw-bold">Document types requested:</h5>

                {docType.map((type, index) => (
                  <div key={index}>
                    <p className="m-0">- {type}</p>
                  </div>
                ))}
              </div>
            </>
          ) : null}
          {/* FOR INPUTS */}
          {inputs && hasInput ? (
            <div className="d-flex flex-column gap-2">
              <h5 className="m-0 mt-2 fw-bold">Request Questions:</h5>
              {inputs.map((input, index) => {
                return (
                  <>
                    <h6 key={index} className="m-0">
                      {input.inputDescription}
                    </h6>
                    <p className="m-0">
                      - {formData[`inputValue${index + 1}`]}
                    </p>
                  </>
                );
              })}
            </div>
          ) : null}
          {/* FOR FILES UPLOADED */}
          {file && Object.values(file).length > 0 && hasFile ? (
            <div className="d-flex flex-column gap-2">
              <h5 className="m-0 mt-2 fw-bold">Files to be uploaded:</h5>
              {Object.values(file).map((upload, index) => (
                <div className="position-relative" key={index}>
                  <p className="m-0">{upload.description}</p>
                  <div className="d-flex justify-content-center position-relative">
                    <div
                      className="position-relative overflow-hidden rounded"
                      style={{
                        height: "clamp(10rem, 50dvw, 20rem)",
                        width: "clamp(20rem, 50dvw, 35rem)",
                      }}
                    >
                      <img
                        src={upload.preview || URL.createObjectURL(upload.file)}
                        alt="Uploaded Preview"
                        className="shadow-sm rounded"
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            <p className="m-0" onClick={handleClose}>
              Close
            </p>
          </button>
          <button
            type="button"
            className="primaryButton btn d-flex align-items-center justify-content-center gap-1"
            onClick={handleSubmit}
            disabled={
              !isSelectionFilled() && !isFileFilled() && !isInputsFilled()
            }
          >
            {isLoading ? (
              <>
                <Spinner animation="border" variant="light" size="sm" />
                <p className="m-0 ">Submitting</p>
              </>
            ) : (
              <p className="m-0 ">Confirm</p>
            )}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RequestInfoModal;
