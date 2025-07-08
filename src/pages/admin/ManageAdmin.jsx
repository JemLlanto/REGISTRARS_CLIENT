import React, { useEffect, useState } from "react";
import { Table, Modal, Button, ToggleButton, Spinner } from "react-bootstrap";
import AdminModal from "../../components/ManageAdmin/AdminModal";
import axios from "axios";
import Swal from "sweetalert2";
import { useOutletContext, useNavigate } from "react-router-dom";
import ManageCourseAdmin from "../../components/ManageAdmin/ManageCourseAdmin";
import ManagePurposeAdmin from "../../components/ManageAdmin/ManagePurposeAdmin";

const ManageAdmin = () => {
  const { user } = useOutletContext();
  const [admins, setAdmins] = useState([]);
  const [programAdmins, setProgramAdmins] = useState([]);
  const [purposeAdmins, setPurposeAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // IDENTIFY IF THE USER IS ADMIN
  useEffect(() => {
    if (user) {
      if (!user?.isAdmin) {
        navigate(-1);
      }
    }
  }, [user, navigate]);

  const fetchAllAdmins = () => {
    const baseUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

    const programAdminsRequest = axios.get(
      `${baseUrl}/api/manageAdmin/fetchProgramAdmins`
    );

    const purposeAdminsRequest = axios.get(
      `${baseUrl}/api/manageAdmin/fetchPurposeAdmins`
    );

    const adminsRequest = axios.get(`${baseUrl}/api/manageAdmin/fetchAdmin`);

    Promise.all([programAdminsRequest, purposeAdminsRequest, adminsRequest])
      .then(([programAdminsRes, purposeAdminsRes, adminsRes]) => {
        if (programAdminsRes.data.Status === "Success") {
          setProgramAdmins(programAdminsRes.data.result);
          // // console.log("Program Admins: ", programAdminsRes.data.result);
        }
        if (purposeAdminsRes.data.Status === "Success") {
          setPurposeAdmins(purposeAdminsRes.data.result);
          // console.log("Program Admins: ", purposeAdminsRes.data.result);
        }
        if (adminsRes.data.Status === "Success") {
          setAdmins(adminsRes.data.data);
          // // console.log("Admins: ", adminsRes.data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchAllAdmins();
  }, []);

  return (
    <>
      <div className="w-100 px-1" style={{ height: "100%" }}>
        <div
          className="rounded-2 shadow-sm text-white p-2 d-flex justify-content-between align-items-center"
          style={{ backgroundColor: "var(--main-color)" }}
        >
          <h5
            className="m-0 p-2 fade-in"
            style={{ color: "var(--secondMain-color)" }}
          >
            Admin Panel
          </h5>
          <div className="d-flex align-items-center">
            <AdminModal admins={admins} fetchAllAdmins={fetchAllAdmins} />
          </div>
        </div>

        <div
          className="mt-2 rounded overflow-x-hidden overflow-y-auto custom-scrollbar pe-1 d-flex flex-column gap-2"
          style={{ height: "75dvh" }}
        >
          <ManageCourseAdmin
            fetchAllAdmins={fetchAllAdmins}
            programAdmins={programAdmins}
            admins={admins}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />

          <ManagePurposeAdmin
            fetchAllAdmins={fetchAllAdmins}
            purposeAdmins={purposeAdmins}
            admins={admins}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
      </div>
    </>
  );
};

export default ManageAdmin;
