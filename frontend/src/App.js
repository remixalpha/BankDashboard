import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard.jsx";
import EmployeeEditor from "./pages/EmployeeEditor.jsx";
import Uploadings from "./pages/Uploadings.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact index element={<Dashboard />} />
        <Route
          path="/employeeEditor"
          exact
          index
          element={<EmployeeEditor />}
        />
        <Route path="/uploadings" exact index element={<Uploadings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
