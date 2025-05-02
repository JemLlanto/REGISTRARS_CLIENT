import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useLocation } from "react-router-dom";
import DateSelection from "../../components/Dashboard/DateSelection";
import RequestHeaders from "../../components/studentRequest/RequestHeaders";
import { Spinner, InputGroup, Form } from "react-bootstrap";
import RequestDatepicker from "../../components/studentRequest/RequestDatepicker";
import CountUp from "react-countup";
import MainHeaders from "../../components/studentRequest/MainHeaders";
import RequestedDocumentsDownload from "../../components/DownloadButton/RequestedDocumentsDownload";

// FUNCTIONS
import {
  fetchAdminPrograms,
  fetchRequestedDocuments,
  setMonthDefault,
  handlePeriodChange,
} from "../../utils/documentServices";

export default function StudentRequests() {
  const { user } = useOutletContext();
  const timeFiltersData = localStorage.getItem("timeFilters")
    ? JSON.parse(localStorage.getItem("timeFilters"))
    : null;
  const [requestedDocuments, setRequestedDocuments] = useState([]);
  const [adminPrograms, setAdminPrograms] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState(
    timeFiltersData ? timeFiltersData.period : "month"
  );
  const [startDate, setStartDate] = useState(timeFiltersData.start || "");
  const [endDate, setEndDate] = useState(timeFiltersData.end || "");
  const location = useLocation();
  const [status, setStatus] = useState("all");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // IDENTIFY IF THE USER IS ADMIN
  useEffect(() => {
    if (user) {
      if (!user?.isAdmin) {
        navigate("/home");
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

  // Filter documents based on search input and status
  useEffect(() => {
    // console.log("Filtering documents");

    const normalizeStatus = (status) => status.toLowerCase().trim();

    const filtered = requestedDocuments
      .filter((request) => {
        const matchesSearch =
          searchTerm === "" ||
          `${request.firstName} ${request.lastName} ${request.email}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesStatus =
          !status ||
          status.toLowerCase() === "all" ||
          normalizeStatus(request.status) === normalizeStatus(status);

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const statusPriority = {
          pending: 1,
          processing: 2,
          "ready to pickup": 3,
          completed: 4,
          cancelled: 5,
        };

        const priorityA = statusPriority[normalizeStatus(a.status)] || 999;
        const priorityB = statusPriority[normalizeStatus(b.status)] || 999;

        return priorityA - priorityB;
      });

    // console.log("Filtered Requests", filtered);
    setFilteredRequests(filtered);
  }, [searchTerm, status, requestedDocuments]);

  // Set default dates on mount
  useEffect(() => {
    setMonthDefault(startDate, setStartDate, endDate, setEndDate);
  }, [timeFiltersData]);

  // Read the status from URL on component mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const statusFromUrl = params.get("status");
    if (statusFromUrl) {
      setStatus(statusFromUrl);
    }
  }, [location.search]);

  // Update state and URL when user selects a status
  const handleSelect = (selectedStatus) => {
    if (selectedStatus != null) {
      navigate(`?status=${selectedStatus}`); // Updates the URL query param
    } else {
      setStatus("all");
      navigate(``);
    }
  };

  return (
    <div className="mx-1 w-100 position-relative" style={{ height: "92%" }}>
      <div
        className="rounded-2 shadow-sm text-white p-2 mb-2 d-flex align-items-center justify-content-between"
        style={{ backgroundColor: "var(--main-color)" }}
      >
        <h5
          className="m-0 p-2 fade-in d-flex align-items-center justify-content-center"
          style={{ color: "var(--secondMain-color)" }}
        >
          Student Request List {timeFiltersData.period}{" "}
          {isLoading ? (
            <>
              <span className="d-flex align-items-center justify-content-center">
                (<Spinner animation="border" variant="light" size="sm" />)
              </span>
            </>
          ) : (
            <>
              (<CountUp end={filteredRequests.length} duration={1.5} />)
            </>
          )}
        </h5>

        <div className="d-flex align-items-center justify-content-center gap-2">
          {/* DATE SELECTION FOR SMALL SCREENS */}
          {/* Search Bar */}
          <div className="d-none d-md-block">
            <div className="d-flex align-items-center gap-1 ">
              {/* Search Icon - Click to toggle input field */}
              <div
                className="d-flex align-items-center justify-content-center pe-2"
                onClick={() => setIsSearchVisible(!isSearchVisible)}
                style={{ cursor: "pointer", width: "2rem", height: "2rem" }}
              >
                <i className="bx bx-search-alt bx-sm"></i>
              </div>
              <input
                type="text"
                className="form-control border-0 shadow-none"
                id="searchInput"
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  borderRadius: "8px",
                  width: isSearchVisible ? "15rem" : "0px",
                  opacity: isSearchVisible ? 1 : 0,
                  transition:
                    "width 0.3s ease-in-out, opacity 0.3s ease-in-out",
                  padding: isSearchVisible ? "5px 10px" : "0",
                  overflow: "hidden",
                }}
              />
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center ">
            <RequestedDocumentsDownload
              filteredRequests={filteredRequests}
              startDate={startDate}
              endDate={endDate}
            />
          </div>
        </div>
      </div>

      <div>
        {/* Search Bar phone*/}
        {/* Mobile layout container */}
        <div className="d-block d-md-none d-flex justify-content-between align-items-center">
          {/* Search Icon - Click to toggle input field */}
          <InputGroup className="">
            <InputGroup.Text
              id="basic-addon1"
              style={{ backgroundColor: "var(--main-color)", color: "white" }}
            >
              <i className="bx bx-search-alt"></i>
            </InputGroup.Text>
            <Form.Control
              type="text"
              className=" shadow-none "
              id="searchInputMobile"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </div>
        <div className="mt-2 bg-warning p-1 rounded d-block d-md-none  d-flex justify-content-between align-items-center gap-2">
          {/* Status for mobile */}
          <div className="d-block d-md-none  d-flex align-items-center justify-content-center">
            <MainHeaders status={status} handleSelect={handleSelect} />
          </div>
          <div className="d-flex align-items-center justify-content-center">
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

        {/* large  device*/}
        <div className="d-none d-md-block">
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
      </div>

      <div className="d-none d-md-block mt-2">
        <MainHeaders status={status} handleSelect={handleSelect} />
      </div>
      <RequestHeaders
        status={status}
        filteredRequests={filteredRequests}
        isLoading={isLoading}
      />
    </div>
  );
}
