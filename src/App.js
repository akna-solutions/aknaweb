import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import QuotePage from "./pages/QuotePage";
import ContactPage from "./pages/ContactPage";
import ReferencesPage from "./pages/ReferencesPage";
import TrackingPage from "./pages/TrackingPage";
import LoadTrackingPage from "./pages/LoadTrackingPage";

const VALID_PAGES = ["home", "quote", "contact", "references", "tracking"];

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

function getPageFromHash() {
  const hash = window.location.hash.replace("#", "").split("?")[0];
  return VALID_PAGES.includes(hash) ? hash : null;
}

const urlToken = getTokenFromUrl();

console.log("[LoadTracking] pathname:", window.location.pathname);
console.log("[LoadTracking] search:", window.location.search);
console.log("[LoadTracking] urlToken:", urlToken);

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    if (urlToken) return "load-tracking";
    return getPageFromHash() || "home";
  });
  const [loadTrackingToken, setLoadTrackingToken] = useState(urlToken || null);

  // Sayfa değiştiğinde URL hash'ini güncelle (yenileme sonrası geri dönmek için)
  const navigateTo = useCallback((page) => {
    setCurrentPage(page);
    if (page === "home") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    } else if (page !== "load-tracking") {
      history.replaceState(null, "", "#" + page);
    }
  }, []);

  // Tarayıcı geri/ileri tuşları için hash değişikliklerini dinle
  useEffect(() => {
    const onHashChange = () => {
      const page = getPageFromHash();
      if (page) setCurrentPage(page);
      else if (!window.location.hash) setCurrentPage("home");
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigateToLoadTracking = (token) => {
    setLoadTrackingToken(token);
    setCurrentPage("load-tracking");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage
            setPage={navigateTo}
            navigateToLoadTracking={navigateToLoadTracking}
          />
        );
      case "quote":
        return <QuotePage setPage={navigateTo} />;
      case "contact":
        return <ContactPage setPage={navigateTo} />;
      case "references":
        return <ReferencesPage setPage={navigateTo} />;
      case "tracking":
        return <TrackingPage setPage={navigateTo} />;
      case "load-tracking":
        return <LoadTrackingPage accessToken={loadTrackingToken} />;
      default:
        return <HomePage setPage={navigateTo} />;
    }
  };

  return <div className="App">{renderPage()}</div>;
}

export default App;
