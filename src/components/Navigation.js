import React, { useState, useEffect } from "react";

const Navigation = ({ currentPage, setPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Ana Sayfa" },
    { id: "tracking", label: "Araç Takip" },
    { id: "references", label: "Referanslar" },
    { id: "contact", label: "İletişim" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNav = (id) => {
    setPage(id);
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className={`tm-nav${scrolled ? " tm-nav--scrolled" : ""}`}
        role="navigation"
        aria-label="Ana gezinme"
      >
        <div className="tm-nav__inner">
          <button
            className="tm-logo"
            onClick={() => handleNav("home")}
            aria-label="AKNA ana sayfaya git"
          >
            <span className="tm-logo__icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect
                  x="1"
                  y="6"
                  width="10"
                  height="7"
                  rx="1.5"
                  stroke="#D8C7A8"
                  strokeWidth="1.2"
                  fill="none"
                />
                <path
                  d="M11 9h4l2 3v2h-6V9z"
                  stroke="#D8C7A8"
                  strokeWidth="1.2"
                  fill="none"
                  strokeLinejoin="round"
                />
                <circle cx="4.5" cy="14.5" r="1.5" fill="#D8C7A8" />
                <circle cx="13.5" cy="14.5" r="1.5" fill="#D8C7A8" />
              </svg>
            </span>
            <span className="tm-logo__name">
              AKNA<span> Lojistik</span>
            </span>
          </button>

          <ul className="tm-menu">
            {menuItems.map((item) => (
              <li key={item.id} className="tm-menu__item">
                <button
                  className={`tm-menu__link${currentPage === item.id ? " tm-menu__link--active" : ""}`}
                  onClick={() => handleNav(item.id)}
                  type="button"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="tm-actions">
            <button
              className="tm-cta"
              type="button"
              onClick={() => handleNav("quote")}
            >
              Teklif Al
            </button>
            <button
              className={`tm-hamburger${mobileOpen ? " tm-hamburger--active" : ""}`}
              type="button"
              aria-label={mobileOpen ? "Menüyü kapat" : "Gezinme menüsünü aç"}
              aria-expanded={mobileOpen}
              aria-controls="tm-mobile-panel"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span className="tm-hamburger__bar"></span>
              <span className="tm-hamburger__bar"></span>
              <span className="tm-hamburger__bar"></span>
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`tm-mobile-panel${mobileOpen ? " tm-mobile-panel--open" : ""}`}
        id="tm-mobile-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Mobil gezinme menüsü"
      >
        <div className="tm-mobile-panel__head">
          <button className="tm-logo" onClick={() => handleNav("home")}>
            <span className="tm-logo__icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect
                  x="1"
                  y="6"
                  width="10"
                  height="7"
                  rx="1.5"
                  stroke="#D8C7A8"
                  strokeWidth="1.2"
                  fill="none"
                />
                <path
                  d="M11 9h4l2 3v2h-6V9z"
                  stroke="#D8C7A8"
                  strokeWidth="1.2"
                  fill="none"
                  strokeLinejoin="round"
                />
                <circle cx="4.5" cy="14.5" r="1.5" fill="#D8C7A8" />
                <circle cx="13.5" cy="14.5" r="1.5" fill="#D8C7A8" />
              </svg>
            </span>
            <span className="tm-logo__name">
              AKNA<span> Lojistik</span>
            </span>
          </button>
          <button
            className="tm-hamburger tm-hamburger--active"
            type="button"
            aria-label="Menüyü kapat"
            onClick={() => setMobileOpen(false)}
          >
            <span className="tm-hamburger__bar"></span>
            <span className="tm-hamburger__bar"></span>
            <span className="tm-hamburger__bar"></span>
          </button>
        </div>

        <nav className="tm-mobile-panel__body" aria-label="Mobil ana gezinme">
          <ul className="tm-mobile-menu">
            {menuItems.map((item) => (
              <li key={item.id} className="tm-mobile-menu__item">
                <button
                  className={`tm-mobile-menu__link${currentPage === item.id ? " tm-mobile-menu__link--active" : ""}`}
                  type="button"
                  onClick={() => handleNav(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="tm-mobile-panel__foot">
          <button
            className="tm-cta-mobile"
            type="button"
            onClick={() => handleNav("quote")}
          >
            Teklif Al
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
