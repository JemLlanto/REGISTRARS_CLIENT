import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useLocation } from "react-router-dom";
import DateSelection from "../../components/Dashboard/DateSelection";
import RequestHeaders from "../../components/studentRequest/RequestHeaders";
import { Spinner, InputGroup, Form } from "react-bootstrap";
import RequestDatepicker from "../../components/studentRequest/RequestDatepicker";
import SearchBar from "./search";
import MainHeaders from "../../components/studentRequest/MainHeaders";
import RequestedDocumentsDownload from "../../components/DownloadButton/RequestedDocumentsDownload";

export default function StudentRequests() {
  const { user } = useOutletContext();
  const [requestedDocuments, setRequestedDocuments] = useState([]);
  const [adminPrograms, setAdminPrograms] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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

  const fetchAdminPrograms = async (userID) => {
    try {
      setIsLoading(true);
      // console.log("Fetching admin programs for userID:", userID);
      const res = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/dashboard/fetchAdminPrograms`,
        {
          params: {
            adminID: userID,
          },
        }
      );
      if (res.status === 200) {
        // console.log("Admin Programs", res.data);
        setAdminPrograms(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch documents whenever dates change
  useEffect(() => {
    if (user) {
      fetchAdminPrograms(user.userID);
    }
  }, [user]);

  // Separate function for the API call that can be called directly
  const fetchRequestedDocuments = async () => {
    if (startDate && endDate) {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/dashboard/fetchRequestedDocuments`,
          {
            params: {
              startDate: startDate,
              endDate: endDate,
            },
          }
        );

        if (res.data.Status === "Success") {
          if (res.data.data.length === 0) {
            // console.log("requestedDocuments not found");
            setRequestedDocuments([]);
          } else {
            setRequestedDocuments(res.data.data);
            // console.log("requestedDocuments", res.data.data);
          }
        } else {
          // console.log("requestedDocuments not found");
          setRequestedDocuments([]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    }
  };
  // Fetch documents whenever dates change
  useEffect(() => {
    if (startDate && endDate) {
      fetchRequestedDocuments();
    }
  }, [startDate, endDate]);

  const setDefaultMonthDates = () => {
    const today = new Date();

    // First day of the current month
    const start = new Date(today.getFullYear(), today.getMonth(), 2);

    // Last day of the current month
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 1);

    // Format dates as YYYY-MM-DD
    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(end.toISOString().split("T")[0]);
    fetchRequestedDocuments();
  };

  // Set default dates on mount
  useEffect(() => {
    setDefaultMonthDates();
  }, []);

  // Filter documents based on search input
  useEffect(() => {
    setIsLoading(true); // Start loading

    const timer = setTimeout(() => {
      const filtered = requestedDocuments
        .filter((request) => {
          const matchesSearch =
            `${request.firstName} ${request.lastName} ${request.email}`
              .toLowerCase()
              .includes(searchTerm.toLowerCase());

          const matchesStatus =
            !status ||
            status.toLowerCase() === "all" ||
            request.status.toLowerCase() === status.toLowerCase();

          return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
          const statusPriority = {
            pending: 1,
            processing: 2,
            completed: 3,
          };

          const priorityA = statusPriority[a.status.toLowerCase()] || 999;
          const priorityB = statusPriority[b.status.toLowerCase()] || 999;

          return priorityA - priorityB;
        });

      setFilteredRequests(filtered);
      setIsLoading(false); // Stop loading after processing
    }, 500); // Simulate loading delay

    return () => clearTimeout(timer); // Cleanup function to avoid race conditions
  }, [requestedDocuments, searchTerm, status]); // Dependencies

  // Function to set date range based on period selection
  const handlePeriodChange = (e) => {
    const period = e.target.value;
    setSelectedPeriod(period);

    const today = new Date();
    let start = new Date();
    let end = new Date();

    if (period === "week") {
      // Set to first day of current week (Sunday)
      const day = today.getDay(); // 0 for Sunday, 1 for Monday, etc.
      start.setDate(today.getDate() - day); // Go back to Sunday
      end.setDate(start.getDate() + 6); // Saturday is 6 days after Sunday
    } else if (period === "month") {
      // Set to first day of current month
      start.setDate(1);
      // Set to last day of current month
      end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    } else if (period === "year") {
      // Set to first day of current year
      start = new Date(today.getFullYear(), 0, 1);
      // Set to last day of current year
      end = new Date(today.getFullYear(), 11, 31);
    }

    // Format dates as YYYY-MM-DD for input fields
    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(end.toISOString().split("T")[0]);
    // fetchRequestedDocuments();
  };

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
    <div
      className="p-1 p-sm-4 w-100 position-relative"
      style={{ height: "100%" }}
    >
      <div
        className="rounded-2 shadow-sm text-white p-2 mb-2 d-flex align-items-center justify-content-between"
        style={{ backgroundColor: "var(--main-color)" }}
      >
        <h5
          className="m-0 p-2 fade-in"
          style={{ color: "var(--secondMain-color)" }}
        >
          Student Request List (
          {isLoading ? (
            <>
              <Spinner animation="border" variant="light" size="sm" />
            </>
          ) : (
            <>{filteredRequests.length}</>
          )}
          )
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
              <div className="mx-0">
                <RequestedDocumentsDownload
                  filteredRequests={filteredRequests}
                  startDate={startDate}
                  endDate={endDate}
                />
              </div>
            </div>
          </div>
          <div className="d-block d-md-none d-flex align-items-center justify-content-center ">
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
        <div className="d-block d-md-none  d-flex justify-content-between align-items-center">
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
        <div className="mt-1 bg-warning p-1 rounded d-block d-md-none  d-flex justify-content-between align-items-center gap-2">
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
