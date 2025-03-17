import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap";
import "react-bootstrap";

// STYLES
import "./layouts/style/style.css";
import "./layouts/style/animations.css";
import "./layouts/style/Side&NavBar.css";
import "./App.css";
import "./layouts/style/Imports.css";
import "./layouts/style/PhoneSidebar.css";

// UNIVERSAL ROUTES
import Index from "./pages/auth/Index";
import MainLayout from "./layouts/MainLayout";
import RequestDetails from "./layouts/requestDetails/requestDetails";
import ProfileSetup from "./pages/user/ProfileSetup";

// USER ROUTES
import Home from "./pages/user/Home";
import RequestDocuments from "./pages/user/RequestDocument";
import About from "./pages/user/About";

// ADMIN ROUTES
import AdminHome from "./pages/admin/Home";
import StudentRequests from "./pages/admin/StudentRequests";
import ManageRequestForm from "./pages/admin/ManageRequestForm";
import ManageAdmin from "./pages/admin/ManageAdmin";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Register and Login page */}
        <Route path="/" element={<Index />} />

        {/* Routes that need MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/profilesetup" element={<ProfileSetup />} />
          <Route
            path="/request-details/:requestID"
            element={<RequestDetails />}
          />

          {/* user */}
          <Route path="*" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/request-documents" element={<RequestDocuments />} />
          <Route path="/about" element={<About />} />

          {/* admin */}
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/manage-admin" element={<ManageAdmin />} />
          <Route
            path="/admin/manage-request-form"
            element={<ManageRequestForm />}
          />
          <Route path="/admin/student-requests" element={<StudentRequests />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
