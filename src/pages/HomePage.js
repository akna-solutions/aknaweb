import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import FAQAccordion from "../components/FAQAccordion";
import HeroSection from "../components/home/HeroSection";
import TrustBar from "../components/home/TrustBar";
import FeatureAdvantages from "../components/home/FeatureAdvantages";
import HowItWorksSection from "../components/home/HowItWorksSection";
import TrustMessage from "../components/home/TrustMessage";
import ResultsSection from "../components/home/ResultsSection";
import ReferencesTeaser from "../components/home/ReferencesTeaser";
import QuoteTeaser from "../components/home/QuoteTeaser";

const HomePage = ({ setPage }) => {
  return (
    <div className="page">
      <Navigation currentPage="home" setPage={setPage} />

      {/* 6.1 Hero */}
      <HeroSection setPage={setPage} />

      {/* 6.2 Güven ve metrik satırı */}
      <TrustBar />

      {/* 6.3 Hizmet avantajları */}
      <FeatureAdvantages />

      {/* 6.4 Süreç bölümü */}
      <HowItWorksSection setPage={setPage} />

      {/* 6.5 Güven mesajı ve platform tanıtımı */}
      <TrustMessage />

      {/* 6.6 Sonuçlar ve metrikler */}
      <ResultsSection />

      {/* 6.7 Referanslar galerisi */}
      <ReferencesTeaser setPage={setPage} />

      {/* 6.8 Teklif alanı */}
      <QuoteTeaser setPage={setPage} />

      {/* 6.9 Sık sorulan sorular */}
      <FAQAccordion />

      {/* 6.10 Final CTA (Footer içinde) */}
      <Footer setPage={setPage} />
    </div>
  );
};

export default HomePage;
