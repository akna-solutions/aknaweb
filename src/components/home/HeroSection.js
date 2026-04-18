import React from "react";

const HeroSection = ({ setPage }) => {
  return (
    <section className="tm-hero">
      <div className="tm-hero__inner">
        <div className="tm-hero__content">
          <div className="tm-hero__badge">
            <span className="tm-hero__badge-dot"></span>
            <span className="tm-hero__badge-text">
              AI Destekli Lojistik Platformu
            </span>
          </div>

          <h1 className="tm-hero__title">
            Tekliften teslimata
            <br />
            <em>her adım dijitalde,</em>
            <br />
            her yük yerli yerinde.
          </h1>

          <p className="tm-hero__desc">
            Manuel telefon trafiği olmadan dakikalar içinde fiyat teklifi alın.
            Uygun taşıyıcıyı otomatik eşleştirin. Yükünüzü anlık takip edin.
            AKNA, nakliye operasyonunuzu uçtan uca yönetir.
          </p>

          <div className="tm-hero__cta">
            <button
              className="tm-btn-primary"
              type="button"
              onClick={() => setPage("quote")}
            >
              Teklif Al
            </button>
            <button
              className="tm-btn-secondary"
              type="button"
              onClick={() => setPage("tracking")}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle
                  cx="7"
                  cy="7"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M5.5 5.2c0-.8.9-1.2 1.5-.7l2.5 1.8c.5.4.5 1 0 1.4L7 9.5c-.6.5-1.5.1-1.5-.7V5.2z"
                  fill="currentColor"
                />
              </svg>
              Nasıl Çalışır
            </button>
          </div>

          <div className="tm-hero__values">
            {[
              "Anlık yük takibi",
              "AI destekli hızlı fiyatlama",
              "Geniş sürücü ve araç ağı",
            ].map((v) => (
              <div className="tm-hero__value" key={v}>
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
                {v}
              </div>
            ))}
          </div>
        </div>

        <div className="tm-hero__visual">
          <div className="tm-panel-main">
            <div className="tm-panel-main__header">
              <span className="tm-panel-title">Teklif Özeti</span>
              <span className="tm-panel-status">
                <span className="tm-dot-live"></span>
                Canlı fiyatlama
              </span>
            </div>
            <div className="tm-panel-main__body">
              <div className="tm-route-row">
                <span className="tm-route-city">İstanbul</span>
                <div className="tm-route-arrow">
                  <div className="tm-route-line"></div>
                  <span className="tm-route-arrow-icon">›</span>
                </div>
                <span className="tm-route-city" style={{ textAlign: "right" }}>
                  Ankara
                </span>
              </div>
              <div className="tm-panel-meta">
                {[
                  ["Araç Tipi", "TIR 40T"],
                  ["Mesafe", "451 km"],
                  ["Teslim", "~8 saat"],
                ].map(([l, v]) => (
                  <div className="tm-meta-item" key={l}>
                    <div className="tm-meta-label">{l}</div>
                    <div className="tm-meta-value">{v}</div>
                  </div>
                ))}
              </div>
              <div className="tm-price-row">
                <div>
                  <div className="tm-price-label">Tahmini Teklif</div>
                  <div className="tm-price-sub">AI fiyatlaması</div>
                </div>
                <div className="tm-price-value">₺ 4.850</div>
              </div>
            </div>
          </div>

          <div className="tm-mini-cards">
            {[
              {
                label: "Aktif Sevkiyat",
                value: "247",
                sub: (
                  <>
                    <span className="tm-badge-up">+12</span> bugün
                  </>
                ),
              },
              { label: "Uygun Araç", value: "83", sub: "bölgenizde hazır" },
              {
                label: "Canlı Konum",
                value: (
                  <>
                    <span className="tm-badge-live"></span> Aktif
                  </>
                ),
                sub: "GPS takip açık",
              },
              {
                label: "Teklif Süresi",
                value: "< 2 dk",
                sub: "ortalama yanıt",
              },
            ].map(({ label, value, sub }) => (
              <div className="tm-mini-card" key={label}>
                <div className="tm-mini-card__label">{label}</div>
                <div className="tm-mini-card__value">{value}</div>
                <div className="tm-mini-card__sub">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="tm-hero__metrics">
        {[
          {
            icon: "clock",
            label: "7/24",
            title: "Teklif Akışı",
            desc: "Mesai saati beklenmeden anlık teklif üretimi",
          },
          {
            icon: "eye",
            label: "Canlı",
            title: "Yük Görünürlüğü",
            desc: "Müşteri, yükünün nerede olduğunu anlık görür",
          },
          {
            icon: "net",
            label: "Türkiye geneli",
            title: "Geniş Taşıyıcı Ağı",
            desc: "Bağımsız sürücüler tek platformda birleşiyor",
          },
          {
            icon: "auto",
            label: "Otomasyon",
            title: "Daha Az Manuel İş",
            desc: "Telefon trafiği azalır, operasyon ölçeklenir",
          },
        ].map(({ label, title, desc }) => (
          <div className="tm-metric-card" key={title}>
            <div className="tm-metric-icon">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <circle
                  cx="7.5"
                  cy="7.5"
                  r="5.5"
                  stroke="#D8C7A8"
                  strokeWidth="1.2"
                />
                <path
                  d="M7.5 4.5V7.5L9.5 9"
                  stroke="#D8C7A8"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="tm-metric-label">{label}</div>
            <div className="tm-metric-title">{title}</div>
            <div className="tm-metric-sep"></div>
            <div className="tm-metric-desc">{desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
