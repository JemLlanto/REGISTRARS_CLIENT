import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import axios from "axios";

const defaultRequirements = [
  "Original Form 137/SF10 with remark 'Copy for CVSU-CCAT Campus'.",
  "Return Slip Original Copy",
  "Please surrender the School ID",
  "Documentary Stamp (1 pc/s.) Available at registrar's office. 30/c pc.",
  "Balance of 2,725.00 pesos (1st Sem. 2009-2010)",
];

const ScheduleSlipForm = ({
  formDataForReleaseDate,
  setFormDataForReleaseDate,
  documentDetails,
  user,
  setIsScheduled,
  isScheduled,
}) => {
  const [show, setShow] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    controlNum: "",
    requestID: null,
    name: "",
    courseMajor: "",
    studentNum: "",
    dateRequested: "",
    purpose: "",
    timeRelease: "",
    timeReleaseStart: "",
    timeReleaseEnd: "",
    processedBy: "",
    selectedDocs: [],
  });
  const [documentTypes, setDocumentTypes] = useState([]);
  const [requirements, setRequirements] = useState(defaultRequirements);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let formattedDate = "";
    if (documentDetails.created) {
      try {
        const date = new Date(documentDetails.created);
        if (!isNaN(date.getTime())) {
          formattedDate = `${date.getFullYear()}-${String(
            date.getMonth() + 1
          ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        }
      } catch (error) {
        console.error("Error formatting date:", error);
      }
    }

    axios
      .get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/fetchingDocuments/fetchRequestedDocumentTypes/${
          documentDetails.requestID
        }`
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          setDocumentTypes(res.data.data);
          // console.log("Document Types:", res.data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching document types:", err);
      });

    setFormData({
      ...formData,
      requestID: documentDetails.requestID,
      name:
        documentDetails.firstName +
        " " +
        documentDetails.middleName +
        " " +
        documentDetails.lastName,
      courseMajor: documentDetails.program,
      studentNum: documentDetails.studentID,
      dateRequested: formattedDate,
      purpose: documentDetails.purpose,
      processedBy: user.firstName + " " + user.middleName + " " + user.lastName,
    });
  }, [documentDetails]);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setCurrentStep(1); // Reset to first step when closing
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const formatTo12Hour = (time) => {
    if (!time) return "";
    const [hourStr, minute] = time.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // Convert 0 to 12 for 12 AM
    return `${String(hour).padStart(2, "0")}:${minute} ${ampm}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    if (name === "timeRelease" || name === "timeReleaseEnd") {
      const startFormatted = formatTo12Hour(updatedFormData.timeReleaseStart);
      const endFormatted = formatTo12Hour(updatedFormData.timeReleaseEnd);
      updatedFormData.timeRelease = `${startFormatted} - ${endFormatted}`;
    }

    if (name === "dateRelease") {
      setFormDataForReleaseDate({
        ...formDataForReleaseDate,
        dateRelease: value,
      });
    }

    setFormData(updatedFormData);
  };

  // Editable document type handlers
  const handleDocTypeLabelChange = (idx, value) => {
    setDocumentTypes((prev) =>
      prev.map((doc, i) => (i === idx ? { ...doc, documentType: value } : doc))
    );
  };
  const handleDocTypeAmountChange = (idx, value) => {
    setDocumentTypes((prev) =>
      prev.map((doc, i) =>
        i === idx ? { ...doc, amount: parseFloat(value) } : doc
      )
    );
  };
  const handleDocTypePagesChange = (idx, value) => {
    setDocumentTypes((prev) =>
      prev.map((doc, i) =>
        i === idx ? { ...doc, page: parseInt(value) } : doc
      )
    );
  };
  const handleAddDocType = () => {
    setDocumentTypes((prev) => [
      ...prev,
      { documentType: "New Document", amount: 0, page: 1 },
    ]);
  };
  const handleRemoveDocType = (idx) => {
    setDocumentTypes((prev) => prev.filter((_, i) => i !== idx));
    setFormData((prev) => ({
      ...prev,
      selectedDocs: prev.selectedDocs
        .filter((i) => i !== idx)
        .map((i) => (i > idx ? i - 1 : i)),
    }));
  };

  // Add handlers for requirements
  const handleRequirementChange = (idx, value) => {
    setRequirements((prev) => prev.map((req, i) => (i === idx ? value : req)));
  };

  const handleAddRequirement = () => {
    setRequirements((prev) => [...prev, "New Requirement"]);
  };

  const handleRemoveRequirement = (idx) => {
    setRequirements((prev) => prev.filter((_, i) => i !== idx));
  };

  const isInvalidDocTypes =
    Array.isArray(documentTypes) &&
    documentTypes.length > 0 &&
    documentTypes.some(
      (doc) =>
        !doc.page ||
        Number(doc.page) <= 0 ||
        !doc.amount ||
        Number(doc.amount) <= 0
    );

  const isInvalidFormData =
    !formData.controlNum?.trim() ||
    !formData.name?.trim() ||
    !formData.studentNum?.trim() ||
    !formData.courseMajor?.trim() ||
    !formData.dateRequested?.trim() ||
    !formDataForReleaseDate?.dateRelease?.trim() ||
    !formData.timeReleaseStart?.trim() ||
    !formData.timeReleaseEnd?.trim() ||
    !formData.processedBy?.trim();

  const uploadDetails = async () => {
    const res = await axios.post(
      `${
        import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
      }/api/scheduleSlip/sendScheduleSlipDetails`,
      formData
    );
    if (res.status === 200) {
      // console.log("Details uploaded!");
    }
    return res.data;
  };

  const uploadDocTypes = async () => {
    const payload = {
      requestID: formData.requestID,
      documentTypes,
    };
    const res = await axios.post(
      `${
        import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
      }/api/scheduleSlip/sendScheduleSlipDocTypes`,
      payload
    );
    if (res.status === 200) {
      // console.log("Document types uploaded!");
    }
    return res.data;
  };

  const uploadRequirements = async () => {
    const payload = {
      requestID: formData.requestID,
      requirements,
    };
    const res = await axios.post(
      `${
        import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
      }/api/scheduleSlip/sendScheduleSlipRequirements`,
      payload
    );
    if (res.status === 200) {
      // console.log("Requirements uploaded!");
    }
    return res.data;
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      Swal.fire({
        title: "Uploading...",
        text: "Sending schedule slip details...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Upload details
      try {
        await uploadDetails();
      } catch (error) {
        throw new Error(
          "Failed to upload details. Control number already exist."
        );
      }

      if (documentTypes.length > 0) {
        Swal.getPopup().querySelector("div.swal2-html-container").textContent =
          "Uploading document types...";

        // Upload document types
        try {
          await uploadDocTypes();
        } catch (error) {
          throw new Error("Failed to upload document types.");
        }
      }

      Swal.getPopup().querySelector("div.swal2-html-container").textContent =
        "Uploading requirements...";

      // Upload requirements
      try {
        await uploadRequirements();
      } catch (error) {
        throw new Error("Failed to upload requirements.");
      }
      setIsScheduled(true);
      handleClose();
      Swal.fire({
        icon: "success",
        title: "Schedule slip saved!",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Upload failed",
        text: error.message || "An unknown error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h5 className="mb-3">Step 1: Basic Information</h5>
            <div className="row">
              <div className="mb-2 col-md-6">
                <label>Control No:</label>
                <input
                  type="text"
                  className={`form-control ${
                    formData.controlNum <= 0 ? "border-danger" : ""
                  }`}
                  name="controlNum"
                  value={formData.controlNum}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2 col-md-6">
                <label>Student No:</label>
                <input
                  type="text"
                  className={`form-control ${
                    formData.studentNum === "" ? "border-danger" : ""
                  }`}
                  name="studentNum"
                  value={formData.studentNum}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="mb-2 col-md-6">
                <label>Name:</label>
                <input
                  type="text"
                  className={`form-control ${
                    formData.name === "" ? "border-danger" : ""
                  }`}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2 col-md-6">
                <label>Course & Major:</label>
                <input
                  type="text"
                  className={`form-control ${
                    formData.courseMajor === "" ? "border-danger" : ""
                  }`}
                  name="courseMajor"
                  value={formData.courseMajor}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-2 col-md-4">
                <label>Date requested:</label>
                <input
                  type="date"
                  className={`form-control ${
                    formData.dateRequested === "" ? "border-danger" : ""
                  }`}
                  name="dateRequested"
                  value={formData.dateRequested}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2 col-md-4">
                <label>Date of Release:</label>
                <input
                  type="date"
                  className={`form-control ${
                    formDataForReleaseDate?.dateRelease === ""
                      ? "border-danger"
                      : ""
                  }`}
                  name="dateRelease"
                  value={formDataForReleaseDate?.dateRelease}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2 col-md-4">
                <label>Time of Release:</label>
                <div className="d-flex gap-2">
                  <input
                    type="time"
                    className={`form-control ${
                      formData.timeReleaseStart === "" ? "border-danger" : ""
                    }`}
                    name="timeReleaseStart"
                    value={formData.timeReleaseStart}
                    onChange={handleChange}
                    style={{ width: "50%" }}
                  />
                  <input
                    type="time"
                    className={`form-control ${
                      formData.timeReleaseEnd === "" ? "border-danger" : ""
                    }`}
                    name="timeReleaseEnd"
                    value={formData.timeReleaseEnd}
                    onChange={handleChange}
                    style={{ width: "50%" }}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="mb-2 col-md-6">
                <label>Purpose:</label>
                <input
                  type="text"
                  className={`form-control ${
                    formData.purpose === "" ? "border-danger" : ""
                  }`}
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2 col-md-6">
                <label>Processed by:</label>
                <input
                  type="text"
                  className={`form-control ${
                    formData.processedBy === "" ? "border-danger" : ""
                  }`}
                  name="processedBy"
                  value={formData.processedBy}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h5 className="mb-3">Step 2: Document Details</h5>
            <div className="mb-2">
              <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                <h6 className="m-0">Types of documents requested:</h6>
                <Button
                  variant="primary"
                  size="sm"
                  className="d-flex align-items-center gap-2"
                  onClick={handleAddDocType}
                >
                  + <span className="d-none d-sm-block">Add Document Type</span>
                </Button>
              </div>
              {documentTypes.length > 0 ? (
                <>
                  {documentTypes.map((docType, idx) => (
                    <div
                      key={idx}
                      className="d-flex align-items-center justify-content-between gap-1 mb-1"
                    >
                      <div className="w-100 d-flex align-items-center justify-content-between gap-1">
                        <input
                          type="text"
                          className="form-control"
                          value={docType.documentType}
                          onChange={(e) =>
                            handleDocTypeLabelChange(idx, e.target.value)
                          }
                        />
                        <input
                          type="number"
                          className="form-control w-25"
                          value={docType.page}
                          onChange={(e) =>
                            handleDocTypePagesChange(idx, e.target.value)
                          }
                          placeholder="Page/s"
                        />
                        <input
                          type="number"
                          className="form-control w-50"
                          placeholder="Price(PHP)"
                          value={docType.amount}
                          onChange={(e) =>
                            handleDocTypeAmountChange(idx, e.target.value)
                          }
                        />
                      </div>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveDocType(idx)}
                      >
                        <p className="m-0">&times;</p>
                      </Button>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <input
                    type="text"
                    className="form-control w-100"
                    placeholder="No document requested."
                    disabled
                  />
                </>
              )}
            </div>
            <div className="mb-2">
              <div className="d-flex justify-content-start align-items-center gap-2 mb-2 mt-3">
                <h6 className="m-0">Requirements </h6>
                <Button
                  variant="primary"
                  size="sm"
                  className="d-flex align-items-center gap-2"
                  onClick={handleAddRequirement}
                >
                  + <span className="d-none d-sm-block">Add Requirement</span>
                </Button>
              </div>

              {requirements.map((req, idx) => (
                <div key={idx} className="d-flex align-items-center mb-1">
                  <input
                    type="text"
                    className="form-control me-2"
                    value={req}
                    onChange={(e) =>
                      handleRequirementChange(idx, e.target.value)
                    }
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveRequirement(idx)}
                  >
                    <p className="m-0">&times;</p>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <>
      <button
        className="w-100 mb-2 btn btn-warning"
        onClick={handleShow}
        disabled={isScheduled || isLoading}
      >
        <p className="m-0">Send Schedule Slip</p>
      </button>
      <Modal show={show} onHide={handleClose} size="lg" scrollable centered>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "var(--main-color)" }}
        >
          <Modal.Title className="text-white">Schedule Slip Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderStep()}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <p className="m-0">Close</p>
          </Button>
          <div className="d-flex align-items-center gap-2">
            {currentStep > 1 && (
              <Button variant="secondary" onClick={prevStep} className="">
                <p className="m-0">Previous</p>
              </Button>
            )}
            {currentStep < 2 ? (
              <button
                className="btn primaryButton"
                onClick={nextStep}
                disabled={isInvalidFormData}
              >
                <p className="m-0">Next</p>
              </button>
            ) : (
              <button
                className="btn primaryButton d-flex align-items-center justify-content-center gap-1"
                onClick={handleSubmit}
                disabled={isLoading || isInvalidDocTypes || isInvalidFormData}
              >
                {isLoading ? (
                  <>
                    <span className="d-flex align-items-center">
                      <i className="bx bx-loader bx-spin"></i>
                    </span>
                    <p className="m-0">Sending</p>
                  </>
                ) : (
                  <>
                    <p className="m-0">Send</p>
                  </>
                )}
              </button>
            )}
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ScheduleSlipForm;
