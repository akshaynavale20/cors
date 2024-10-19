// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import MCQPage from "./components/MCQPage";
import AdminPage from "./components/AdminPage";  // Importing Admin Page

function App() {
  const [studentName, setStudentName] = useState("");

  return (
    <Router>
      <Navbar studentName={studentName} />
      <Routes>
        <Route path="/" element={<LoginPage setStudentName={setStudentName} />} />
        <Route path="/mcqs" element={<MCQPage studentName={studentName} />} />
        <Route path="/admin" element={<AdminPage />} />  {/* Route to Admin Page */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
