import React from "react";

const TrustMessage = () => (
  <section className="tm-trust" aria-labelledby="tm-trust-title">
    <div className="tm-trust__inner">
      <div className="tm-trust__copy">
        <div className="tm-hiw__badge">
          <span className="tm-hiw__badge-dot"></span>
          <span className="tm-hiw__badge-text">Yaklaşımımız</span>
        </div>
        <h2 className="tm-trust__title" id="tm-trust-title">
          AKNA, lojistiğin dağınık
          <br />
          iletişim süreçlerini{" "}
          <em>tek ve izlenebilir</em>
          <br />
          bir operasyona dönüştürür.
        </h2>
        <p className="tm-trust__desc">
          Teklif, eşleştirme ve takip aynı platformda birleşir. Telefon
          trafiği ve dağınık tablo takibi yerine; her adımı görünür,
          ölçülebilir ve yönetilebilir hale getiren tek bir dijital operasyon
          akışı kurulur.
        </p>
        <div className="tm-trust__points">
          <div className="tm-trust__point">
            <span className="tm-trust__point-dot"></span>
            Tek panelden uçtan uca süreç yönetimi
          </div>
          <div className="tm-trust__point">
            <span className="tm-trust__point-dot"></span>
            Taşıyıcı ve müşteri için ortak görünürlük
          </div>
          <div className="tm-trust__point">
            <span className="tm-trust__point-dot"></span>
            Operasyon verisiyle sürekli iyileşen eşleştirme
          </div>
        </div>
      </div>

      <div className="tm-trust__visual">
        <div className="tm-trust__panel">
          <div className="tm-trust__panel-badge">
            <span className="tm-trust__panel-dot"></span>
            Canlı Operasyon
          </div>
          <div className="tm-trust__panel-row">
            <span>Aktif sevkiyat</span>
            <strong>128</strong>
          </div>
          <div className="tm-trust__panel-row">
            <span>Uygun araç</span>
            <strong>83</strong>
          </div>
          <div className="tm-trust__panel-bar">
            <div className="tm-trust__panel-fill" style={{ width: "72%" }}></div>
          </div>
          <div className="tm-trust__panel-row tm-trust__panel-row--muted">
            <span>İstanbul</span>
            <span>Ankara</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default TrustMessage;
