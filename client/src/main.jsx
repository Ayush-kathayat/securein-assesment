import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CVEList from "./components/CVEList";
import CVEDetails from "./components/CVEDetails";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/cves/list" element={<CVEList />} />
        <Route path="/cves/:cveId" element={<CVEDetails />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
