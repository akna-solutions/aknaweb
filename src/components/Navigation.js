import React from "react";

const Navigation = ({ currentPage, setPage }) => {
  const menuItems = [
    { id: "home", label: "Ana Sayfa" },
    { id: "tracking", label: "Araç Takip" },
    { id: "quote", label: "Teklif Al" },
    { id: "references", label: "Referanslar" },
    { id: "contact", label: "İletişim" },
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="logo">
          <span className="logo-icon">🚛</span>
          <span className="logo-text">AKNA</span>
        </div>
        <ul className="nav-menu">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={currentPage === item.id ? "active" : ""}
                onClick={() => setPage(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <button className="demo-button" onClick={() => setPage("quote")}>
          Hemen Teklif Al
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
