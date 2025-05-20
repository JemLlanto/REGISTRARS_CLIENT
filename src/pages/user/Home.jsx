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
  const [isLoading, setIsLoading] = useState(true);
  const [requestedDocuments, setRequestedDocuments] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredRequests, setFilteredRequests] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // IDENTIFY IF THE USER IS ADMIN
  useEffect(() => {
    if (user) {
      if (user?.isAdmin) {
        navigate(-1);
      }
    }
  }, [user, navigate]);

  const userID = user?.userID;

  useEffect(() => {
    if (userID) {
      const fetchRequestedDocuments = async () => {
        setIsLoading(true);
        try {
          const res = await axios.get(
            `${
              import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
            }/api/fetchingDocuments/fetchRequestedDocuments/${userID}`
          );
          if (res.data.Status === "Success") {
            setRequestedDocuments(res.data.data);
            setFilteredRequests(res.data.data);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchRequestedDocuments();
    }
  }, [userID]);

  // Filter documents based on search input
  useEffect(() => {
    // console.log("Filtering documents");

    const normalizeStatus = (status) => status.toLowerCase().trim();

    const filtered = requestedDocuments
      .filter((request) => {
        const matchesStatus =
          !status ||
          status.toLowerCase() === "all" ||
          normalizeStatus(request.status) === normalizeStatus(status);

        return matchesStatus;
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
  }, [status, requestedDocuments]);

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
    <div className="w-100 px-1" style={{ height: "92%" }}>
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
