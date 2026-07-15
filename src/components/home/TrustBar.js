import React from "react";

const items = [
  "Türkiye geneli taşıyıcı ağı",
  "7/24 teklif akışı",
  "Canlı sevkiyat görünürlüğü",
  "Dakikalar içinde eşleşme",
  "Güvenli operasyon",
];

const TrustBar = () => (
  <section className="tm-trustbar" aria-label="Platform güven noktaları">
    <div className="tm-trustbar__inner">
      {items.map((item, i) => (
        <React.Fragment key={item}>
          <span className="tm-trustbar__item">{item}</span>
          {i < items.length - 1 && (
            <span className="tm-trustbar__dot" aria-hidden="true"></span>
          )}
        </React.Fragment>
      ))}
    </div>
  </section>
);

export default TrustBar;
