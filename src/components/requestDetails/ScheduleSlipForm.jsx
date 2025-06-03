import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import cvsuLogo from "/cvsu-logo.png";
import axios from "axios";

const defaultRequirements = [
  "Original Form 137/SF10 with remark 'Copy for CVSU-CCAT Campus'.",
  "Return Slip Original Copy",
  "Please surrender the School ID",
  "Documentary Stamp (1 pc/s.) Available at registrar's office. 30/c pc.",
  "Balance of 2,725.00 pesos (1st Sem. 2009-2010)",
];

const ScheduleSlipForm = ({ documentDetails, user }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    controlNum: null,
    requestID: null,
    name: "",
    courseMajor: "",
    studentNum: "",
    dateRequested: "",
    purpose: "",
    dateRelease: "",
    timeRelease: "",
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
          console.log("Document Types:", res.data.data);
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
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDocChange = (index) => {
    setFormData((prev) => {
      const selected = prev.selectedDocs.includes(index)
        ? prev.selectedDocs.filter((i) => i !== index)
        : [...prev.selectedDocs, index];
      return { ...prev, selectedDocs: selected };
    });
  };

  // Editable document type handlers
  const handleDocTypeLabelChange = (idx, value) => {
    setDocumentTypes((prev) =>
      prev.map((doc, i) => (i === idx ? { ...doc, label: value } : doc))
    );
  };
  const handleDocTypeAmountChange = (idx, value) => {
    setDocumentTypes((prev) =>
      prev.map((doc, i) =>
        i === idx ? { ...doc, amount: parseFloat(value) || 0 } : doc
      )
    );
  };
  const handleAddDocType = () => {
    setDocumentTypes((prev) => [
      ...prev,
      { documentType: "New Document", amount: 0 },
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
  const handleMoveDocType = (idx, direction) => {
    setDocumentTypes((prev) => {
      const newArr = [...prev];
      const targetIdx = idx + direction;
      if (targetIdx < 0 || targetIdx >= newArr.length) return prev;
      [newArr[idx], newArr[targetIdx]] = [newArr[targetIdx], newArr[idx]];
      return newArr;
    });
    setFormData((prev) => ({
      ...prev,
      selectedDocs: prev.selectedDocs.map((i) => {
        if (i === idx) return idx + direction;
        if (i === idx + direction) return idx;
        return i;
      }),
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
    console.log(requirements);
  };

  const handleMoveRequirement = (idx, direction) => {
    setRequirements((prev) => {
      const newArr = [...prev];
      const targetIdx = idx + direction;
      if (targetIdx < 0 || targetIdx >= newArr.length) return prev;
      [newArr[idx], newArr[targetIdx]] = [newArr[targetIdx], newArr[idx]];
      return newArr;
    });
  };

  const getTotal = () => {
    return formData.selectedDocs.reduce(
      (sum, idx) => sum + (documentTypes[idx]?.amount || 0),
      0
    );
  };

  const uploadDetails = async () => {
    const res = await axios.post(
      `${
        import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
      }/api/scheduleSlip/sendScheduleSlipDetails`,
      formData
    );
    if (res.status === 200) {
      alert("Details uploaded...");
    } else if (res.status === 500) {
      alert("Error uploading details");
    }
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
      alert("Document types uploaded...");
    } else if (res.status === 500) {
      alert("Error uploading details");
    }
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
      alert("Requirements uploaded...");
    } else if (res.status === 500) {
      alert("Error uploading Requirements");
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await uploadDetails();
      await uploadDocTypes();
      await uploadRequirements();
    } catch (error) {
      alert(
        "Sending schedule slip failed please control number may already existed or try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button variant="warning" className="w-100 mb-2" onClick={handleShow}>
        <span>Open Schedule Slip Modal{formData.requestID}</span>
      </Button>
      <Modal show={show} onHide={handleClose} size="lg" scrollable centered>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "var(--main-color)" }}
        >
          <Modal.Title className="text-white">Schedule Slip Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-2">
              <label>Control No.:</label>
              <input
                type="number"
                className="form-control"
                name="controlNum"
                value={formData.controlNum}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label>Course & Major:</label>
              <input
                type="text"
                className="form-control"
                name="courseMajor"
                value={formData.courseMajor}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label>Student No.:</label>
              <input
                type="text"
                className="form-control"
                name="studentNum"
                value={formData.studentNum}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label>Date requested:</label>
              <input
                type="date"
                className="form-control"
                name="dateRequested"
                value={formData.dateRequested}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label>Purpose:</label>
              <input
                type="text"
                className="form-control"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label>Date of Release:</label>
              <input
                type="date"
                className="form-control"
                name="dateRelease"
                value={formData.dateRelease}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label>Time of Release:</label>
              <input
                type="text"
                className="form-control"
                name="timeRelease"
                value={formData.timeRelease}
                onChange={handleChange}
                placeholder="e.g. 02:00PM - 05:00PM"
              />
            </div>
            <div className="mb-2">
              <label>Processed by:</label>
              <input
                type="text"
                className="form-control"
                name="processedBy"
                value={formData.processedBy}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label>Types of documents requested:</label>
              {documentTypes.map((docType, idx) => (
                <div key={idx} className="d-flex align-items-center mb-1">
                  <input
                    type="text"
                    className="form-control me-2"
                    style={{ width: "70%" }}
                    value={docType.documentType}
                    onChange={(e) =>
                      handleDocTypeLabelChange(idx, e.target.value)
                    }
                  />
                  <input
                    type="number"
                    className="form-control me-2"
                    style={{ width: "30%" }}
                    value={docType.amount}
                    onChange={(e) =>
                      handleDocTypeAmountChange(idx, e.target.value)
                    }
                  />
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleMoveDocType(idx, -1)}
                    disabled={idx === 0}
                  >
                    &uarr;
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleMoveDocType(idx, 1)}
                    disabled={idx === documentTypes.length - 1}
                  >
                    &darr;
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleRemoveDocType(idx)}
                    disabled={documentTypes.length === 1}
                  >
                    &times;
                  </Button>
                </div>
              ))}
              <Button
                variant="outline-primary"
                size="sm"
                className="mt-2"
                onClick={handleAddDocType}
              >
                + Add Document Type
              </Button>
            </div>
            <div className="mb-2">
              <label>Requirements:</label>
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
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleMoveRequirement(idx, -1)}
                    disabled={idx === 0}
                  >
                    &uarr;
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleMoveRequirement(idx, 1)}
                    disabled={idx === requirements.length - 1}
                  >
                    &darr;
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleRemoveRequirement(idx)}
                    disabled={requirements.length === 1}
                  >
                    &times;
                  </Button>
                </div>
              ))}
              <Button
                variant="outline-primary"
                size="sm"
                className="mt-2"
                onClick={handleAddRequirement}
              >
                + Add Requirement
              </Button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button className="btn primaryButton" onClick={handleSubmit}>
            Send
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ScheduleSlipForm;
