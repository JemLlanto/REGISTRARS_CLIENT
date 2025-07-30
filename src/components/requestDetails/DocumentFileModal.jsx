import { useState } from "react";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";

const DocumentFileModal = ({ documentFiles, documentDetails, user }) => {
  const [imageModal, setImageModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleShow = (file) => {
    setImageModal(true);
    setSelectedFile(file);
  };
  const handleClose = () => setImageModal(false);

  // Add this function to your component
  const handleDownloadImage = async (file) => {
    try {
      // Get the image URL
      const imageUrl = `${file.cloudinary_url}`;

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
      <div className="d-flex flex-column gap-3 py-4 py-md-2">
        {documentFiles.map((file, index) => (
          <div key={index} className="">
            <h5 className="m-0 text-secondary">
              {file.fileName ? file.fileName : "Untitled Document"}
            </h5>
            <div
              key={index}
              className="d-flex align-items-center justify-content-center gap-3"
              style={{
                width: "clamp(15rem, 60dvw, 60rem)",
                height: "clamp(15rem, 30dvw, 30rem)",
              }}
              onClick={() => handleShow(file)}
            >
              <img
                src={file?.cloudinary_url}
                alt="Document"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "0.5rem",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <Modal show={imageModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 className="m-0">
              {selectedFile?.fileName
                ? selectedFile?.fileName
                : "Untitled Document"}
            </h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "clamp(15rem, 35dvw, 40rem)" }}>
          <div
            className="d-flex align-items-center justify-content-center gap-3"
            style={{ width: "100%", height: "100%" }}
          >
            <img
              src={selectedFile?.cloudinary_url}
              alt="Document"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: "1rem",
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
              onClick={() => handleDownloadImage(selectedFile)}
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
