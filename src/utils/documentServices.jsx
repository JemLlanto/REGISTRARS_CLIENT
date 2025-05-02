// utils/programService.js or similar file
import axios from "axios";

export const fetchAdminPrograms = async (
  isAdmin,
  userID,
  baseUrl,
  setIsLoading,
  setAdminPrograms
) => {
  try {
    if (isAdmin === 1) {
      setIsLoading(true);
      // console.log("Fetching admin programs for userID:", userID);

      const res = await axios.get(
        `${baseUrl}/api/dashboard/fetchAdminPrograms`,
        {
          params: {
            adminID: userID,
          },
        }
      );

      if (res.status === 200) {
        // console.log("Admin Programs", res.data.data);
        setAdminPrograms(res.data.data);
        return res.data.data;
      }
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    setIsLoading(false);
  }
};
export const fetchRequestedDocuments = async (
  startDate,
  endDate,
  user,
  baseUrl,
  adminPrograms,
  setRequestedDocuments,
  setFilteredRequests,
  setIsLoading
) => {
  if (startDate && endDate && user) {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${baseUrl}/api/dashboard/fetchRequestedDocuments`,
        {
          params: {
            startDate: startDate,
            endDate: endDate,
          },
        }
      );

      if (res.data.Status === "Success") {
        if (user.isAdmin === 1) {
          // Create a Set of program names for faster lookup
          // console.log("Fetching documents for admins");
          const adminProgramNames = new Set(
            adminPrograms.map((program) => program.programName)
          );
          // console.log("Admin Programs", adminPrograms);
          // console.log("Admin Program Names", adminProgramNames);
          const filteredDocuments = res.data.data.filter((document) => {
            return adminProgramNames.has(document.program);
          });

          // console.log(
          //   `Filtered from ${res.data.data.length} to ${filteredDocuments.length} documents`
          // );
          // console.log("Filtered Documents", filteredDocuments);
          setRequestedDocuments(filteredDocuments);
          setFilteredRequests(filteredDocuments);
        } else {
          // For non-admin users, show all documents
          // console.log("Fetching documents for non-admins", res.data.data);
          setRequestedDocuments(res.data.data);
          setFilteredRequests(res.data.data);
        }
      } else {
        // console.log("No documents found");

        setRequestedDocuments([]);
        setFilteredRequests([]);
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
export const setMonthDefault = (
  startDate,
  setStartDate,
  endDate,
  setEndDate
) => {
  if (startDate === "" && endDate === "") {
    const today = new Date();

    // First day of the current month
    const start = new Date(today.getFullYear(), today.getMonth(), 2);

    // Last day of the current month
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 1);

    // Format dates as YYYY-MM-DD
    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(end.toISOString().split("T")[0]);
  }
};
// Function to set date range based on period selection
export const handlePeriodChange = (
  e,
  setStartDate,
  setEndDate,
  setSelectedPeriod
) => {
  const period = e.target.value;
  setSelectedPeriod(period);

  const today = new Date();
  let start = new Date();
  let end = new Date();

  if (period === "week") {
    // Calculate days to subtract to get to Sunday
    const day = today.getDay();
    // Create a new date for Sunday (start of week)
    start = new Date(today);
    start.setDate(today.getDate() - day);

    // Create a new date for Saturday (end of week)
    end = new Date(start);
    end.setDate(start.getDate() + 6);

    // console.log(
    //   `Week period: ${start.toDateString()} to ${end.toDateString()}`
    // );
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

  const formattedStartDate = start.toISOString().split("T")[0];
  const formattedEndDate = end.toISOString().split("T")[0];
  // Format dates as YYYY-MM-DD for input fields
  setStartDate(formattedStartDate);
  setEndDate(formattedEndDate);
  // fetchRequestedDocuments();

  const timeFilters = {
    period: period,
    start: formattedStartDate,
    end: formattedEndDate,
  };

  localStorage.setItem("timeFilters", JSON.stringify(timeFilters));
};
