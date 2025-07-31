import React, { useEffect, useState } from "react";
import LocationAndContactModal from "./modal/LocationAndContactModal";
import Swal from "sweetalert2";
import axios from "axios";
const LocationAndContact = ({ isAdmin, isLoading, setIsLoading }) => {
  const [location, setLocation] = useState({});
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/about/fetchLocationAndContacts`
      );
      if (res.status === 200) {
        // // console.log(res.data.result);
        setLocation(res.data.result);
      }
    } catch (err) {
      // console.log(err);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const upload = async (file) => {
    // // console.log("Inserting Files...");

    const data = new FormData();
    data.append("file", file);
    try {
      setUploading(true);
      const res = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/about/uploadNewLocationImage`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (res.data.Status === "Success") {
        fetchData();
        Swal.fire({
          icon: "success",
          title: "Upload Successful",
          text: "The image has been uploaded successfully.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Upload Failed",
          text: "The server did not return a success status.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Upload Error",
        text: "Something went wrong while uploading the file.",
      });
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Allowed file types
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const maxSize = 10 * 1024 * 1024; // 1MB

      if (file.size > maxSize) {
        Swal.fire({
          icon: "warning",
          title: "File Too Large",
          text: "File size should not exceed 2MB.",
        });
        setFile(null);
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        Swal.fire({
          icon: "error",
          title: "Invalid File Type",
          text: "Only JPEG, JPG, and PNG files are allowed.",
        });
        setFile(null);
        return;
      }

      upload(file);
    }
  };
  return (
    <>
      {isLoading ? (
        <>{/* <i className="bx bx-loader bx-spin my-1"></i> */}</>
      ) : (
        <>
          <div
            className="mt-2 pt-4 pb-2 pb-sm-4 px-2 px-sm-4 rounded text-white fade-in-section position-relative "
            style={{ backgroundColor: "var(--main-color)", minHeight: "10rem" }}
          >
            {isAdmin ? (
              <>
                <LocationAndContactModal
                  isAdmin={isAdmin}
                  location={location}
                  fetchData={fetchData}
                />
              </>
            ) : (
              <></>
            )}

            <h4 className="text-center fw-bold text-warning">
              {location.title}
            </h4>
            <p className="text-center " style={{ whiteSpace: "pre-line" }}>
              {location.description}
            </p>
            <div className="position-relative overflow-hidden rounded ">
              {isAdmin ? (
                <>
                  {" "}
                  <label
                    as="button"
                    className={`btn btn-light ${
                      uploading ? "disabled" : ""
                    } px-md-4 position-absolute end-0 top-0 m-2 m-md-3`}
                    htmlFor="locImage"
                    style={{ zIndex: 1 }}
                  >
                    {uploading ? (
                      <>
                        <p className="m-0 d-flex align-items-center justify-content-center gap-1">
                          <i className="bx bx-loader bx-spin my-1"></i>
                          <span className="d-none d-md-block">Uploading</span>
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="m-0">
                          <span className="d-none d-md-block">Replace</span>
                        </p>
                        <h5 className="m-0">
                          <span className="d-md-none d-flex align-items-center justify-content-center my-1">
                            <i className="bx  bx-images"></i>
                          </span>
                        </h5>
                      </>
                    )}
                  </label>
                </>
              ) : (
                <></>
              )}

              <input
                type="file"
                id="locImage"
                name="locImage"
                hidden
                onChange={(e) => handleFileChange(e)}
              />
              <img
                src={location.imageFile}
                alt="Registrar Office"
                className="img-fluid w-100 fade-in-section"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LocationAndContact;
