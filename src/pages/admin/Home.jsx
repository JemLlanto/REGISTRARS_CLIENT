import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useOutletContext, Link, useNavigate } from "react-router-dom";
import { Row, Col, Container, FloatingLabel, Form } from "react-bootstrap";
import axios from "axios";
import DateSelection from "./Dashboard/DateSelection";
import StatusLabels from "./Dashboard/StatusLabels";
import PurposeStats from "./Dashboard/PurposeStats";

export default function Home() {
  const { user } = useOutletContext();
  const navigate = useNavigate();
  const [requestedDocuments, setRequestedDocuments] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // IDENTIFY IF THE USER IS ADMIN
  useEffect(() => {
    if (!user.isAdmin) {
      navigate("/home");
    }
  }, [user, navigate]);

  // Set default dates on mount
  useEffect(() => {
    setDefaultWeekDates();
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

  const setDefaultWeekDates = () => {
    const today = new Date();
    const start = new Date(today);
    const end = new Date(today);

    // Set to first day of current week (Sunday)
    const day = today.getDay();
    start.setDate(today.getDate() - day);
    // Set to last day of current week (Saturday)
    end.setDate(start.getDate() + 6);

    // Format dates as YYYY-MM-DD
    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(end.toISOString().split("T")[0]);
    fetchRequestedDocuments();
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
    fetchRequestedDocuments();
  };

  return (
    <Container fluid className="p-4 w-100">
      <div
        className="rounded-2 shadow-sm text-white p-2"
        style={{ backgroundColor: "var(--main-color)" }}
      >
        <h5 className="m-0 p-2" style={{ color: "var(--secondMain-color)" }}>
          Dashboard: {startDate} - {endDate}
        </h5>
      </div>
      <div
        className="overflow-y-scroll overflow-x-hidden mt-3"
        style={{ height: "77dvh" }}
      >


        <StatusLabels requestedDocuments={requestedDocuments} />

        <div className="row d-flex align-items-center justify-content-center gap-4 bg-light rounded shadow-sm p-3 mt-3">
          <div className="col-lg-5 col-md-6 col-sm-12">
            <div className="d-flex flex-column gap-3 p-3  rounded  bg-white">
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
          {/* Left side: Chart */}
          <div className="col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center">
            <PurposeStats requestedDocuments={requestedDocuments} />
          </div>

          {/* Right side: Date Selection */}

        </div>


      </div>
    </Container>
  );
}
