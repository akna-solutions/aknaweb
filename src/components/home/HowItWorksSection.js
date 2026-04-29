import React from "react";

const steps = [
  {
    num: "01",
    label: "Talep",
    title: "Yük Bilgisi Sisteme Girilir",
    desc: "Yük tipi, çıkış ve varış noktası, araç tipi ve tarih birkaç adımda platforma aktarılır. Teklif süreci otomatik başlar.",
    details: ["Çıkış / varış noktası", "Araç tipi ve tonaj", "Yükleme tarihi"],
    icon: (
      <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
        <rect
          x="2"
          y="3"
          width="12"
          height="10"
          rx="1.5"
          stroke="#D8C7A8"
          strokeWidth="1.2"
        />
        <path
          d="M5 7h6M5 9.5h4"
          stroke="#D8C7A8"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
    mini: (
      <div className="tm-step-mini">
        <div className="tm-step-mini-row">
          <span className="tm-step-mini-label">Form tamamlama</span>
          <span className="tm-step-mini-val">~2 dk</span>
        </div>
        <div className="tm-step-mini-bar">
          <div className="tm-step-mini-fill" style={{ width: "30%" }}></div>
        </div>
      </div>
    ),
  },
  {
    num: "02",
    label: "Fiyatlama",
    title: "AI Destekli Teklif Hazırlanır",
    desc: "Mesafe, tonaj, araç tipi, rota yoğunluğu ve anlık uygunluk verileri analiz edilir. Teklif süresi önemli ölçüde kısalır.",
    details: [
      "Rota ve mesafe analizi",
      "Anlık kapasite uygunluğu",
      "Tutarlı fiyat önerisi",
    ],
    icon: (
      <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
        <path
          d="M3 8a5 5 0 0 1 10 0"
          stroke="#D8C7A8"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="8" cy="8" r="2" stroke="#D8C7A8" strokeWidth="1.2" />
        <path
          d="M8 10v3"
          stroke="#D8C7A8"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
    mini: (
      <div className="tm-step-mini">
        <div className="tm-step-mini-row">
          <span className="tm-step-mini-label">Teklif üretim süresi</span>
          <span className="tm-badge-green">Hızlı</span>
        </div>
        <div
          style={{
            marginTop: "6px",
            fontSize: "18px",
            fontWeight: 700,
            color: "#D8C7A8",
            letterSpacing: "-0.02em",
          }}
        >
          ₺ 4.850
        </div>
        <div style={{ fontSize: "10px", color: "#B9B2A6", marginTop: "2px" }}>
          İstanbul → Ankara · TIR 40T
        </div>
      </div>
    ),
  },
  {
    num: "03",
    label: "Eşleştirme",
    title: "Uygun Taşıyıcı Eşleştirilir",
    desc: "Yük, geniş bağımsız sürücü ve araç ağı içinde değerlendirilir. Maliyet, mesafe ve uygunluk açısından en doğru eşleşme seçilir.",
    details: [
      "Bölgesel araç ağı taraması",
      "Kapasite ve tip uyumu",
      "En iyi eşleşme seçimi",
    ],
    icon: (
      <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
        <circle cx="8" cy="6" r="2.5" stroke="#D8C7A8" strokeWidth="1.2" />
        <path
          d="M4 13c0-2.2 1.8-4 4-4s4 1.8 4 4"
          stroke="#D8C7A8"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
    mini: (
      <div className="tm-step-mini">
        <div className="tm-step-mini-row">
          <span className="tm-step-mini-label">Uygun araç</span>
          <span className="tm-step-mini-val">83 aktif</span>
        </div>
        <div className="tm-step-mini-bar">
          <div className="tm-step-mini-fill" style={{ width: "68%" }}></div>
        </div>
        <div style={{ marginTop: "4px", fontSize: "10px", color: "#B9B2A6" }}>
          Bölgenizde hazır taşıyıcılar
        </div>
      </div>
    ),
  },
  {
    num: "04",
    label: "Takip",
    title: "Sevkiyat Canlı Takip Edilir",
    desc: "Müşteri sevkiyatın hangi aşamada olduğunu platform üzerinden anlık görür. Telefon ve manuel takip ihtiyacı önemli ölçüde azalır.",
    details: [
      "Anlık konum güncellemesi",
      "Teslimat ilerleyiş görünürlüğü",
      "Azalan operasyon yükü",
    ],
    icon: (
      <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
        <path
          d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8z"
          stroke="#D8C7A8"
          strokeWidth="1.2"
        />
        <circle cx="8" cy="8" r="1.5" fill="#D8C7A8" />
        <path
          d="M8 2v1M8 13v1M2 8H1M15 8h-1"
          stroke="#D8C7A8"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    ),
    mini: (
      <div className="tm-step-mini">
        <div className="tm-step-mini-row">
          <span className="tm-step-mini-label">Sevkiyat durumu</span>
          <span className="tm-badge-blue">Canlı</span>
        </div>
        <div className="tm-step-mini-bar" style={{ marginTop: "8px" }}>
          <div className="tm-step-mini-fill" style={{ width: "72%" }}></div>
        </div>
        <div
          style={{
            marginTop: "4px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: "10px", color: "#B9B2A6" }}>İstanbul</span>
          <span style={{ fontSize: "10px", color: "#B9B2A6" }}>%72</span>
          <span style={{ fontSize: "10px", color: "#B9B2A6" }}>Ankara</span>
        </div>
      </div>
    ),
  },
];

const HowItWorksSection = ({ setPage }) => (
  <section className="tm-hiw" aria-labelledby="tm-hiw-title">
    <div className="tm-hiw__inner">
      <div className="tm-hiw__top">
        <div className="tm-hiw__badge">
          <span className="tm-hiw__badge-dot"></span>
          <span className="tm-hiw__badge-text">Süreç Akışı</span>
        </div>
        <h2 className="tm-hiw__title" id="tm-hiw-title">
          Tekliften teslimata
          <br />
          <em>tek bir dijital akış.</em>
        </h2>
        <p className="tm-hiw__desc">
          Telefonsuz koordinasyon, daha kısa teklif süresi, otomatik taşıyıcı
          eşleştirmesi ve müşteriye canlı sevkiyat görünürlüğü — dört adımda
          yönetilir.
        </p>
      </div>

      <div className="tm-hiw__steps" role="list">
        <div className="tm-hiw__connector" aria-hidden="true"></div>
        {steps.map((s) => (
          <div className="tm-hiw__step" role="listitem" key={s.num}>
            <div className="tm-step-num-wrap">
              <div className="tm-step-num">{s.num}</div>
            </div>
            <div className="tm-step-card">
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div className="tm-step-icon">{s.icon}</div>
                <span className="tm-step-label">{s.label}</span>
              </div>
              <div className="tm-step-title">{s.title}</div>
              <p className="tm-step-desc">{s.desc}</p>
              {s.mini}
            </div>
          </div>
        ))}
      </div>

      <div className="tm-hiw__cta">
        <p className="tm-hiw__cta-text">Operasyonunuzu bu akışla yönetin.</p>
        <p className="tm-hiw__cta-sub">
          Teklif sürecini görmek veya sistemi denemek için bizimle iletişime
          geçin. Kurulum hızlı, geçiş kolaydır.
        </p>
        <div className="tm-hiw__cta-btns">
          <button
            className="tm-btn-primary"
            type="button"
            onClick={() => setPage("contact")}
          >
            Demo Talep Et
          </button>
          <button
            className="tm-btn-secondary"
            type="button"
            onClick={() => setPage("quote")}
          >
            Teklif Al
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
