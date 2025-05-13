import React, { useEffect, useState } from "react";
import LocationAndContactModal from "./modal/LocationAndContactModal";
import axios from "axios";
const LocationAndContact = () => {
  const [location, setLocation] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/about/fetchLocationAndContacts`
      );
      if (res.status === 200) {
        console.log(res.data.result);
        setLocation(res.data.result);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div
      className="mt-2 pt-4 pb-2 pb-sm-4 px-2 px-sm-4 rounded text-white fade-in-section position-relative "
      style={{ backgroundColor: "var(--main-color)" }}
    >
      <LocationAndContactModal location={location} fetchData={fetchData} />

      <h4 className="text-center fw-bold text-warning">{location.title}</h4>
      <p className="text-md-center ">{location.description}</p>
      <div className="position-relative overflow-hidden rounded">
        <button
          type="button"
          className="btn btn-light px-md-4 position-absolute end-0 top-0 m-2 m-md-3"
        >
          <p className="m-0">
            <span className="d-none d-md-block">Replace</span>
          </p>
          <h5 className="m-0">
            <span className="d-md-none d-flex align-items-center justify-content-center my-1">
              <i class="bx  bx-edit"></i>
            </span>
          </h5>
        </button>
        <img
          src="/studentCenter.png"
          alt="Registrar Office"
          className="img-fluid w-100"
        />
        <div></div>
      </div>
    </div>
  );
};

export default LocationAndContact;
