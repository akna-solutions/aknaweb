import React, { useState } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import QuotePage from "./pages/QuotePage";
import ContactPage from "./pages/ContactPage";
import ReferencesPage from "./pages/ReferencesPage";
import TrackingPage from "./pages/TrackingPage";
import LoadTrackingPage from "./pages/LoadTrackingPage";

function getTokenFromUrl() {
  // Önce ?token= query param'a bak
  const params = new URLSearchParams(window.location.search);
  const queryToken = params.get("token");
  if (queryToken) return queryToken;

  // Sonra hash'e bak: /#/load-tracking?token=xxx
  const hashParams = new URLSearchParams(
    window.location.hash.split("?")[1] || "",
  );
  const hashToken = hashParams.get("token");
  if (hashToken) return hashToken;

  return null;
}

const urlToken = getTokenFromUrl();

console.log("[LoadTracking] pathname:", window.location.pathname);
console.log("[LoadTracking] search:", window.location.search);
console.log("[LoadTracking] urlToken:", urlToken);

function App() {
  const [currentPage, setCurrentPage] = useState(
    urlToken ? "load-tracking" : "home",
  );
  const [loadTrackingToken, setLoadTrackingToken] = useState(urlToken || null);

  const navigateToLoadTracking = (token) => {
    setLoadTrackingToken(token);
    setCurrentPage("load-tracking");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage
            setPage={setCurrentPage}
            navigateToLoadTracking={navigateToLoadTracking}
          />
        );
      case "quote":
        return <QuotePage setPage={setCurrentPage} />;
      case "contact":
        return <ContactPage setPage={setCurrentPage} />;
      case "references":
        return <ReferencesPage setPage={setCurrentPage} />;
      case "tracking":
        return <TrackingPage setPage={setCurrentPage} />;
      case "load-tracking":
        return <LoadTrackingPage accessToken={loadTrackingToken} />;
      default:
        return <HomePage setPage={setCurrentPage} />;
    }
  };

  return <div className="App">{renderPage()}</div>;
}

export default App;
