import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import HeroSection from "../components/home/HeroSection";
import HowItWorksSection from "../components/home/HowItWorksSection";

const HomePage = ({ setPage }) => {
  return (
    <div className="page">
      <Navigation currentPage="home" setPage={setPage} />

      {/* Hero Section */}
      <HeroSection setPage={setPage} />

      {/* How It Work Section */}
      <HowItWorksSection setPage={setPage} />

      <Footer setPage={setPage} />
    </div>
  );
};

export default HomePage;
