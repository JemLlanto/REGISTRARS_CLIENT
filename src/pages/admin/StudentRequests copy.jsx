import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useLocation } from "react-router-dom";
import DateSelection from "../../components/Dashboard/DateSelection";
import RequestHeaders from "../../components/studentRequest/requestHeaders";
import { Dropdown } from "react-bootstrap";
import RequestDatepicker from "../../components/studentRequest/RequestDatepicker";

export default function StudentRequests() {
  const { user } = useOutletContext();
  const [requestedDocuments, setRequestedDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const location = useLocation();
  const [status, setStatus] = useState("all");

  // IDENTIFY IF THE USER IS ADMIN
  useEffect(() => {
    if (user) {
      if (!user?.isAdmin) {
        navigate("/home");
      }
    }
  }, [user, navigate]);

  // Separate function for the API call that can be called directly
  const fetchRequestedDocuments = () => {
    console.log(startDate, endDate);
    if (startDate && endDate) {
      axios
        .get("http://localhost:5000/api/dashboard/fetchRequestedDocuments", {
          params: {
            startDate: startDate,
            endDate: endDate,
          },
        })
        .then((res) => {
          if (res.data.Status === "Success") {
            setRequestedDocuments(res.data.data);
            console.log("requestedDocuments", res.data.data);
          } else {
            setRequestedDocuments([]);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

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

  // Fetch documents whenever dates change
  useEffect(() => {
    if (startDate && endDate) {
      fetchRequestedDocuments();
    }
  }, [startDate, endDate]);

  // Filter documents based on search input
  const filteredRequests = requestedDocuments
    .filter((request) => {
      const matchesSearch =
        `${request.firstName} ${request.lastName} ${request.email}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      // If status is "all" or empty, show all requests
      const matchesStatus =
        !status ||
        status.toLowerCase() === "all" ||
        request.status.toLowerCase() === status.toLowerCase();

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      // Define the priority order
      const statusPriority = {
        pending: 1,
        processing: 2,
        completed: 3,
      };

      // Get the priority value for each request's status
      // Use lowercase for case-insensitive comparison
      const priorityA = statusPriority[a.status.toLowerCase()] || 999;
      const priorityB = statusPriority[b.status.toLowerCase()] || 999;

      // Sort based on priority (lower number comes first)
      return priorityA - priorityB;
    });

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
    fetchRequestedDocuments();
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
    <div className="p-1 p-sm-4 w-100 ">
      <div
        className="rounded-2 shadow-sm text-white p-2 mb-3 d-flex align-items-center justify-content-between"
        style={{ backgroundColor: "var(--main-color)" }}
      >
        <h5 className="m-0 p-2 fade-in" style={{ color: "var(--secondMain-color)" }}>
          Student Request List
        </h5>
        {/* Search Bar */}
        <div className="d-none d-md-block  rounded">
          <div className="d-flex align-items-center rounded border ">
            <div className="px-2">
              <i className="bx bx-search-alt fw-bold"></i>
            </div>
            <input
              type="text"
              className="form-control rounded-0 border-0 shadow-none"
              id="searchInput"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ borderRadius: "8px" }}
            />
          </div>
        </div>
      </div>
      <div>
        {/* Search Bar phone*/}
        <div className="d-block d-md-none mb-2 rounded p-2 mt-2 bg-black">
          <div
            className="d-flex align-items-center rounded border mx-0"
            style={{ backgroundColor: "var(--main-color)" }}
          >
            <div className="px-2">
              <i className="bx bx-search-alt fw-bold text-white"></i>
            </div>
            <input
              type="text"
              className="form-control rounded-0 border-0 shadow-none"
              id="searchInput"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ borderRadius: "8px" }}
            />
          </div>
        </div>
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
        <div className="d-block d-md-none">
          <RequestDatepicker
            startDate={startDate}
            endDate={endDate}
            selectedPeriod={selectedPeriod}
            handlePeriodChange={handlePeriodChange}
            setSelectedPeriod={setSelectedPeriod}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            fetchRequestedDocuments={fetchRequestedDocuments}
          />
        </div>
      </div>

      <div
        className="p-2 text-start w-100 rounded-2 p-2 d-none d-sm-block mt-3"
        style={{ backgroundColor: "var(--yellow-color)" }}
      >
        <div
          className="m-0 d-flex align-items-center justify-content-center"
          style={{ color: "var(--background-color)" }}
        >
          <div className="w-100 d-flex align-items-center justify-content-center">
            <h5 className="m-0">Name</h5>
          </div>
          <div className="w-100 d-flex align-items-center justify-content-center">
            <h5 className="m-0">Purpose</h5>
          </div>
          <div className="w-100 d-flex align-items-center justify-content-center">
            <h5 className="m-0">Date</h5>
          </div>
          <div className="w-100 d-flex align-items-center justify-content-center">
            <Dropdown>
              <Dropdown.Toggle
                className="d-flex align-items-center text-white"
                variant="transparent"
                id="dropdown-basic"
                bsPrefix=""
              >
                <h5 className="m-0">Status{status ? <>({status})</> : null}</h5>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleSelect(null)}>
                  All
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSelect("pending")}>
                  Pending
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSelect("processing")}>
                  Processing
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSelect("completed")}>
                  Completed
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSelect("cancelled")}>
                  cancelled
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>

      <RequestHeaders filteredRequests={filteredRequests} />
    </div>
  );
}
