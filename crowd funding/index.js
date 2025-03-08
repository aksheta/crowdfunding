import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Import from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import CampaignList from "./components/CampaignList";
import CreateCampaign from "./components/CreateCampaign";
import CampaignDetail from "./components/CampaignDetail";
import "./index.css";

// ✅ Use createRoot() instead of ReactDOM.render()
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<CampaignList />} />
          <Route path="create" element={<CreateCampaign />} />
          <Route path="campaign/:id" element={<CampaignDetail />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
