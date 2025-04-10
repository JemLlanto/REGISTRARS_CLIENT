import React, { useEffect, useState } from "react";
import {
  useOutletContext,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import MainHeaders from "../../components/studentRequest/MainHeaders";
import RequestList from "../../components/user/RequestList";

export default function Home() {
  const { user } = useOutletContext();
  const [isLoading, setIsLoading] = useState(false);
  const [requestedDocuments, setRequestedDocuments] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredRequests, setFilteredRequests] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user.isAdmin) {
      navigate("/admin/home");
    }
  }, [user.isAdmin, navigate]);

  const userID = user?.userID;

  useEffect(() => {
    if (userID) {
      axios
        .get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/fetchingDocuments/fetchRequestedDocuments/${userID}`
        )
        .then((res) => {
          if (res.data.Status === "Success") {
            // console.log(res.data.data);
            setRequestedDocuments(res.data.data);
            setFilteredRequests(res.data.data);
          } else if (res.data.Message) {
            console.log("Error:", res.data.Message);
          }
        })
        .catch((err) => {
          console.log("Error fetching Programs: ", err);
        });
    }
  }, [userID]);

  // Filter documents based on search input
  useEffect(() => {
    setIsLoading(true); // Start loading

    const timer = setTimeout(() => {
      const filtered = requestedDocuments
        .filter((request) => {
          const matchesStatus =
            !status ||
            status.toLowerCase() === "all" ||
            request.status.toLowerCase() === status.toLowerCase();

          return matchesStatus;
        })
        .sort((a, b) => {
          const statusPriority = {
            pending: 1,
            processing: 2,
            "ready to pickup": 3,
            completed: 4,
          };

          const priorityA = statusPriority[a.status.toLowerCase()] || 999;
          const priorityB = statusPriority[b.status.toLowerCase()] || 999;

          return priorityA - priorityB;
        });

      setFilteredRequests(filtered);
      setIsLoading(false); // Stop loading after processing
    }, 500); // Simulate loading delay

    return () => clearTimeout(timer); // Cleanup function to avoid race conditions
  }, [requestedDocuments, status]); // Dependencies

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
    <div className="p-1 p-sm-4 w-100 " style={{ height: "100%" }}>
      <div
        className="rounded-2 shadow-sm mb-2 text-white p-2 mb-2 d-flex align-items-center justify-content-between"
        style={{ backgroundColor: "var(--main-color)" }}
      >
        <h5
          className="m-0 p-2 fade-in"
          style={{ color: "var(--secondMain-color)" }}
        >
          Requested Documents
        </h5>
      </div>

      <MainHeaders status={status} handleSelect={handleSelect} />

      <RequestList
        status={status}
        filteredRequests={filteredRequests}
        isLoading={isLoading}
      />
    </div>
  );
}
