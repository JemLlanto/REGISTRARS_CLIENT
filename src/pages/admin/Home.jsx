import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useOutletContext, Link, useNavigate } from "react-router-dom";
import { Row, Col, Container, FloatingLabel, Form } from "react-bootstrap";
import axios from "axios";
import DateSelection from "../../components/Dashboard/DateSelection";
import StatusLabels from "../../components/Dashboard/StatusLabels";
import PurposeStats from "../../components/Dashboard/PurposeStats";
import RequestDatepicker from "../../components/studentRequest/RequestDatepicker";

// FUNCTIONS
import {
  fetchAdminPrograms,
  fetchRequestedDocuments,
  setMonthDefault,
  handlePeriodChange,
} from "../../utils/documentServices";

export default function Home() {
  const { user } = useOutletContext();
  const timeFiltersData = localStorage.getItem("timeFilters")
    ? JSON.parse(localStorage.getItem("timeFilters"))
    : null;
  const navigate = useNavigate();
  const [adminPrograms, setAdminPrograms] = useState([]);
  const [requestedDocuments, setRequestedDocuments] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(
    timeFiltersData ? timeFiltersData?.period : "month"
  );
  const [startDate, setStartDate] = useState(timeFiltersData?.start || "");
  const [endDate, setEndDate] = useState(timeFiltersData?.end || "");
  const [isLoading, setIsLoading] = useState(true);

  // IDENTIFY IF THE USER IS ADMIN
  useEffect(() => {
    if (user) {
      if (!user?.isAdmin) {
        navigate(-1);
      }
    }
  }, [user, navigate]);

  // Fetch documents whenever dates change
  useEffect(() => {
    if (user) {
      fetchAdminPrograms(
        user.isAdmin,
        user.userID,
        import.meta.env.VITE_REACT_APP_BACKEND_BASEURL,
        setIsLoading,
        setAdminPrograms
      );
    }
  }, [user]);

  // Fetch documents whenever dates change
  useEffect(() => {
    const isProgramAdmin = user?.isAdmin === 1;

    if (
      startDate &&
      endDate &&
      (!isProgramAdmin || (isProgramAdmin && adminPrograms.length > 0))
    ) {
      fetchRequestedDocuments(
        startDate,
        endDate,
        user,
        import.meta.env.VITE_REACT_APP_BACKEND_BASEURL,
        adminPrograms,
        setRequestedDocuments,
        setFilteredRequests,
        setIsLoading
      );
    }
  }, [startDate, endDate, user, adminPrograms]);

  // Set default dates on mount
  useEffect(() => {
    setMonthDefault(startDate, setStartDate, endDate, setEndDate);
  }, [timeFiltersData]);

  // Separate function for the API call that can be called directly
  // const fetchRequestedDocuments = () => {
  //   console.log(startDate, endDate);
  //   if (startDate && endDate) {
  //     axios
  //       .get(
  //         `${
  //           import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
  //         }/api/dashboard/fetchRequestedDocuments`,
  //         {
  //           params: {
  //             startDate: startDate,
  //             endDate: endDate,
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         if (res.data.Status === "Success") {
  //           setIsLoading(false);
  //           setRequestedDocuments(res.data.data);
  //           console.log("requestedDocuments", res.data.data);
  //         } else {
  //           setRequestedDocuments([]);
  //         }
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   }
  // };

  return (
    <div
      className="custom-scrollbar w-100 overflow-y-scroll overflow-x-hidden rounded px-0"
      style={{ height: "92%" }}
    >
      <div
        className="rounded-2 d-flex justify-content-between align-items-center text-white p-2 mx-1"
        style={{ backgroundColor: "var(--main-color)" }}
      >
        <h5
          className="m-0 p-2 fade-in "
          style={{ color: "var(--secondMain-color)" }}
        >
          Dashboard
          {/* {isLoading ? "loading" : ""} */}
        </h5>
        <div className="d-block d-md-none rounded ">
          <div className="d-flex align-items-center rounded  ">
            <RequestDatepicker
              startDate={startDate}
              endDate={endDate}
              selectedPeriod={selectedPeriod}
              handlePeriodChange={handlePeriodChange}
              setSelectedPeriod={setSelectedPeriod}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </div>
        </div>
      </div>

      <div className=" d-none d-md-block mt-2 px-1" style={{ zIndex: "0" }}>
        <DateSelection
          startDate={startDate}
          endDate={endDate}
          selectedPeriod={selectedPeriod}
          handlePeriodChange={handlePeriodChange}
          setSelectedPeriod={setSelectedPeriod}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </div>

      <StatusLabels requestedDocuments={requestedDocuments} />

      {/* Left side: Chart */}
      <div className="w-100 d-flex align-items-center justify-content-center px-1 mt-1">
        <PurposeStats
          requestedDocuments={requestedDocuments}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
}
