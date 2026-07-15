import React from "react";

const features = [
  {
    label: "Teklif Akışı",
    title: "Dakikalar içinde net fiyat",
    desc: "Manuel telefon trafiği yerine yük ve rota bilgisiyle otomatik hazırlanan teklif akışı, süreci baştan hızlandırır.",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
        <path
          d="M3 8a5 5 0 0 1 10 0"
          stroke="#D8C7A8"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="8" cy="8" r="2" stroke="#D8C7A8" strokeWidth="1.2" />
        <path d="M8 10v3" stroke="#D8C7A8" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Yük Görünürlüğü",
    title: "Sevkiyatı anlık izleyin",
    desc: "Yükün nerede olduğunu, hangi aşamada bulunduğunu platform üzerinden canlı görün; belirsizliğe bağlı telefon trafiğini azaltın.",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
        <path
          d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8z"
          stroke="#D8C7A8"
          strokeWidth="1.2"
        />
        <circle cx="8" cy="8" r="1.5" fill="#D8C7A8" />
      </svg>
    ),
  },
  {
    label: "Geniş Taşıyıcı Ağı",
    title: "Uygun araç her zaman yakında",
    desc: "Bağımsız sürücü ve araç ağı, yükünüze en uygun taşıyıcıyı tonaj, mesafe ve uygunluğa göre hızla eşleştirir.",
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
  },
  {
    label: "Daha Az Manuel İş",
    title: "Operasyonu tek panelden yönetin",
    desc: "Teklif, eşleştirme ve takip tek platformda birleşir; e-tablo ve dağınık telefon görüşmelerine olan ihtiyaç azalır.",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
        <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="#D8C7A8" strokeWidth="1.2" />
        <path d="M5 7h6M5 9.5h4" stroke="#D8C7A8" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
];

const FeatureAdvantages = () => (
  <section className="tm-feat" aria-labelledby="tm-feat-title">
    <div className="tm-feat__inner">
      <div className="tm-feat__top">
        <div className="tm-hiw__badge">
          <span className="tm-hiw__badge-dot"></span>
          <span className="tm-hiw__badge-text">Neden AKNA</span>
        </div>
        <h2 className="tm-feat__title" id="tm-feat-title">
          Operasyonu kolaylaştıran
          <br />
          <em>somut avantajlar.</em>
        </h2>
      </div>

      <div className="tm-feat__grid" role="list">
        {features.map((f) => (
          <div className="tm-feat-card" role="listitem" key={f.label}>
            <div className="tm-feat-card__icon">{f.icon}</div>
            <span className="tm-feat-card__label">{f.label}</span>
            <h3 className="tm-feat-card__title">{f.title}</h3>
            <p className="tm-feat-card__desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeatureAdvantages;
