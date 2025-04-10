import React from "react";
import ProgramModal from "../../components/ManageRequestForm/programModal";
import PurposeModal from "../../components/ManageRequestForm/purposeModal";
import YearGraduatedModal from "../../components/ManageRequestForm/YearGraduatedModal";
import FormSwitch from "../../components/ManageRequestForm/FormSwitch";
import { useOutletContext } from "react-router-dom";
import AutomaticSwitch from "../../components/ManageRequestForm/AutomaticSwitch";

const ManageRequestForm = () => {
  const { user, fetchUserData } = useOutletContext();

  return (
    <div className="p-1 p-sm-4 w-100 " style={{ height: "100%" }}>
      <div
        className="rounded-2 shadow-sm text-white p-2 d-flex justify-content-between align-items-center"
        style={{ backgroundColor: "var(--main-color)" }}
      >
        <h5
          className="m-0 p-2 fade-in"
          style={{ color: "var(--secondMain-color)" }}
        >
          Manage Request Form
        </h5>

      </div>
      <div className="w-100 d-flex flex-column gap-2 p-3 mt-3 mx-0 bg-white shadow-sm rounded-2 fade-in-section">
        <div className="d-flex  flex-column gap-2 mb-3" style={{ border: "2px black" }}>
          <label>Form Open and Close switch</label>
          <AutomaticSwitch user={user} fetchUserData={fetchUserData} />
          <FormSwitch user={user} fetchUserData={fetchUserData} />
        </div>
      </div>
      <div className="w-100 d-flex flex-column gap-2 p-3 mt-3 mx-0 bg-white shadow-sm rounded-2 fade-in-section">
        <label>Programs and Courses</label>
        <ProgramModal />

        <label className="mt-3">Year Graduated</label>
        <YearGraduatedModal />

        <label className="mt-3">Purposes</label>
        <PurposeModal />
      </div>
    </div>
  );
};

export default ManageRequestForm;
