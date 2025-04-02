import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useOutletContext, Link, useNavigate } from "react-router-dom";
import { Row, Col, Container, FloatingLabel, Form } from "react-bootstrap";
import axios from "axios";
import DateSelection from "../../components/Dashboard/DateSelection";
import StatusLabels from "../../components/Dashboard/StatusLabels";
import PurposeStats from "../../components/Dashboard/PurposeStats";

export default function Home() {
  const { user } = useOutletContext();
  const navigate = useNavigate();
  const [requestedDocuments, setRequestedDocuments] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // IDENTIFY IF THE USER IS ADMIN
  useEffect(() => {
    if (!user.isAdmin) {
      navigate("/home");
    }
  }, [user, navigate]);

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

  // Separate function for the API call that can be called directly
  const fetchRequestedDocuments = () => {
    console.log(startDate, endDate);
    if (startDate && endDate) {
      axios
        .get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/dashboard/fetchRequestedDocuments`,
          {
            params: {
              startDate: startDate,
              endDate: endDate,
            },
          }
        )
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

  return (
    <Container
      fluid
      className="custom-scrollbar p-1 p-sm-4 w-100 overflow-y-scroll overflow-x-hidden "
      style={{ height: "90dvh" }}
    >
      <div
        className="rounded-2  text-white p-2"
        style={{ backgroundColor: "var(--main-color)" }}
      >
        <h5
          className="m-0 p-2 fade-in"
          style={{ color: "var(--secondMain-color)" }}
        >
          Dashboard
        </h5>
      </div>

      <div className="mt-3" style={{ zIndex: "0" }}>
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
      <div className="w-100 d-flex justify-content-center">
        <PurposeStats requestedDocuments={requestedDocuments} />
      </div>
    </Container>
  );
}
