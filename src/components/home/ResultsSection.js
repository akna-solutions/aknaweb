import React from "react";

const capabilities = [
  {
    title: "Daha kısa teklif süresi",
    desc: "Yük ve rota bilgisi girildiği anda fiyatlama süreci otomatik başlar; telefon trafiği beklemesi ortadan kalkar.",
  },
  {
    title: "Canlı sevkiyat görünürlüğü",
    desc: "Yükün nerede olduğu, hangi aşamada bulunduğu platform üzerinden anlık olarak izlenebilir.",
  },
  {
    title: "Otomatik taşıyıcı eşleştirme",
    desc: "Geniş araç ve sürücü ağı; tonaj, mesafe ve uygunluğa göre en doğru eşleşmeyi önerir.",
  },
  {
    title: "Tek panelden operasyon",
    desc: "Teklif, eşleştirme, takip ve iletişim aynı ekranda birleşir; dağınık araçlara ihtiyaç kalmaz.",
  },
];

const ResultsSection = () => (
  <section className="tm-results" aria-labelledby="tm-results-title">
    <div className="tm-results__inner">
      <div className="tm-hiw__top">
        <div className="tm-hiw__badge">
          <span className="tm-hiw__badge-dot"></span>
          <span className="tm-hiw__badge-text">Platform Yetkinlikleri</span>
        </div>
        <h2 className="tm-hiw__title" id="tm-results-title">
          Daha hızlı teklifler,
          <br />
          <em>daha görünür operasyonlar.</em>
        </h2>
      </div>

      <div className="tm-results__grid" role="list">
        {capabilities.map((c) => (
          <div className="tm-results-card" role="listitem" key={c.title}>
            <h3 className="tm-results-card__title">{c.title}</h3>
            <p className="tm-results-card__desc">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ResultsSection;
