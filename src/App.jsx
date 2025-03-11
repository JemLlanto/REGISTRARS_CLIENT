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



// USER ROUTES
import Index from "./pages/auth/Index";
import Home from "./pages/user/Home";
import RequestDocuments from "./pages/user/RequestDocument";
import About from "./pages/user/About";
import ProfileSetup from "./pages/user/ProfileSetup";
import MainLayout from "./layouts/MainLayout";
import AdminHome from "./pages/admin/Home";
import Reports from "./pages/admin/Reports";
import ManageRequestForm from "./pages/admin/ManageRequestForm";
import StudentRequests from "./pages/admin/StudentRequests";
import RequestDetails from "./layouts/requestDetails/requestDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        {/* Routes that need MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/profilesetup" element={<ProfileSetup />} />
          {/* user */}
          <Route path="*" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/request-documents" element={<RequestDocuments />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/request-details/:requestID"
            element={<RequestDetails />}
          />
          {/* admin */}
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/reports" element={<Reports />} />
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
