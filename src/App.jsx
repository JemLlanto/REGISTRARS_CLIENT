import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap";
import "react-bootstrap";
import "./layouts/style/style.css";
import "./layouts/style/Side&NavBar.css";
import "./App.css";
import "./layouts/style/Imports.css";
// USER ROUTES
import Index from "./pages/auth/Index";
import Home from "./pages/user/Home";
import RequestDocuments from "./pages/user/RequestDocument";
import About from "./pages/user/About";
import ProfileSetup from "./pages/user/ProfileSetup";
import PagesMainLayout from "./layouts/PagesMainLayout";
import MainLayout from "./layouts/MainLayout";
import AdminHome from "./pages/admin/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />

        {/* Routes that need MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/requestdocuments" element={<RequestDocuments />} />
          <Route path="/about" element={<About />} />
          <Route path="/profilesetup" element={<ProfileSetup />} />
          <Route path="/admin/home" element={<AdminHome />} />

          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
