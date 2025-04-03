import { useState } from "react";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";

const DocumentFileModal = ({ documentFile, documentDetails, user }) => {
  const [imageModal, setImageModal] = useState(false);

  const handleShow = () => setImageModal(true);
  const handleClose = () => setImageModal(false);

  // Add this function to your component
  const handleDownloadImage = async () => {
    try {
      // Get the image URL
      const imageUrl = `${documentFile.cloudinary_url}`;

      // Fetch the image as a blob
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();

      // Create a blob URL
      const blobUrl = window.URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement("a");

      // Set the href to the blob URL
      link.href = blobUrl;

      // Set the download attribute with a filename
      link.download = `${documentDetails.lastName}-${documentDetails.requestID}.jpg`;

      // Append to the document
      document.body.appendChild(link);

      // Trigger the click event
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      Swal.fire({
        title: "Download Failed",
        text: "Could not download the image. Please try again later.",
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center gap-3"
        style={{ width: "20rem", height: "20rem" }}
        onClick={handleShow}
      >
        <img
          src={documentFile.cloudinary_url}
          alt="Document"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "0.5rem",
          }}
        />
      </div>

      <Modal show={imageModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 className="m-0">Document File</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "25rem" }}>
          <div
            className="d-flex align-items-center justify-content-center gap-3"
            style={{ width: "100%", height: "100%" }}
          >
            <img
              src={documentFile.cloudinary_url}
              alt="Document"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "0.5rem",
              }}
            />
          </div>
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
          {user.isAdmin ? (
            <button
              className="btn primaryButton "
              onClick={handleDownloadImage}
            >
              <p className="m-0">Download</p>
            </button>
          ) : null}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DocumentFileModal;
