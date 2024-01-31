import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard.jsx";
import UploadForm from "./pages/UploadForm.jsx";
import UploadPdf from "./pages/UploadPdf.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact index element={<UploadPdf />} />
        <Route path="/uploadform" exact index element={<UploadForm />} />
        <Route path="/dashboard" exact index element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
