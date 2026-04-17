import React, { useState } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import QuotePage from "./pages/QuotePage";
import ContactPage from "./pages/ContactPage";
import ReferencesPage from "./pages/ReferencesPage";
import TrackingPage from "./pages/TrackingPage";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage setPage={setCurrentPage} />;
      case "quote":
        return <QuotePage setPage={setCurrentPage} />;
      case "contact":
        return <ContactPage setPage={setCurrentPage} />;
      case "references":
        return <ReferencesPage setPage={setCurrentPage} />;
      case "tracking":
        return <TrackingPage setPage={setCurrentPage} />;
      default:
        return <HomePage setPage={setCurrentPage} />;
    }
  };

  return <div className="App">{renderPage()}</div>;
}

export default App;
