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
    <div
      className="px-1 w-100 d-flex flex-column gap-2"
      style={{ height: "100%" }}
    >
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
      <div
        className="w-100 d-flex flex-column gap-2 p-3 mx-0 bg-white shadow-sm rounded-2 fade-in-section"
        style={{ animationDelay: `${1 * 0.2}s` }}
      >
        <div
          className="d-flex  flex-column gap-2 mb-3"
          style={{ border: "2px black" }}
        >
          <h6 className="m-0 fw-bold">Form Open and Close switch</h6>
          <AutomaticSwitch user={user} fetchUserData={fetchUserData} />
          <FormSwitch user={user} fetchUserData={fetchUserData} />
        </div>
      </div>
      <div
        className="w-100 d-flex flex-column gap-2 p-3 mx-0 bg-white shadow-sm rounded-2 fade-in-section"
        style={{ animationDelay: `${1 * 0.5}s` }}
      >
        <div>
          <h6 className="mb-1">Programs and Courses</h6>
          <ProgramModal />
        </div>

        <div>
          <h6 className="mb-1">Year Graduated</h6>
          <YearGraduatedModal />
        </div>
        <div>
          <h6 className="mb-1">Purposes</h6>
          <PurposeModal />
        </div>
      </div>
    </div>
  );
};

export default ManageRequestForm;
