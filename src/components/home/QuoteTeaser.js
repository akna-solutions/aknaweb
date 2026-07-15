import React from "react";

const perks = [
  "Dakikalar içinde ön fiyatlama",
  "Uygun araç ve taşıyıcı eşleşmesi",
  "Canlı konum görünürlüğü",
  "Operasyon boyunca destek",
  "Tek panelden süreç yönetimi",
];

const QuoteTeaser = ({ setPage }) => (
  <section className="tm-qt" aria-labelledby="tm-qt-title">
    <div className="tm-qt__inner">
      <div className="tm-qt__visual" aria-hidden="true">
        <div className="tm-qt__card tm-qt__card--1">
          <span className="tm-qt__card-label">İstanbul → Ankara</span>
          <span className="tm-qt__card-sub">TIR · 40T</span>
        </div>
        <div className="tm-qt__card tm-qt__card--2">
          <span className="tm-trust__panel-dot"></span>
          Canlı fiyatlama
        </div>
      </div>

      <div className="tm-qt__copy">
        <div className="tm-hiw__badge">
          <span className="tm-hiw__badge-dot"></span>
          <span className="tm-hiw__badge-text">Hızlı Teklif</span>
        </div>
        <h2 className="tm-qt__title" id="tm-qt-title">
          Size özel
          <br />
          <em>lojistik teklifi.</em>
        </h2>
        <p className="tm-qt__desc">
          Sabit bir fiyat listesi yerine; yük, mesafe ve rotanıza göre
          hazırlanan gerçek zamanlı bir teklif alırsınız.
        </p>
        <ul className="tm-qt__perks">
          {perks.map((p) => (
            <li key={p}>
              <span className="tm-hero__value-check">
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path
                    d="M1.5 4.5L3.5 6.5L7.5 2.5"
                    stroke="#D8C7A8"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {p}
            </li>
          ))}
        </ul>
        <button
          className="tm-btn-primary tm-qt__cta"
          type="button"
          onClick={() => setPage("quote")}
        >
          Ücretsiz Teklif Al
        </button>
      </div>
    </div>
  </section>
);

export default QuoteTeaser;
