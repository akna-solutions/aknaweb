import React from "react";

const teaserRefs = [
  {
    company: "Metro Nakliyat",
    initial: "M",
    sector: "Nakliyat",
    meta: "120+ araç",
    testimonial:
      "Akna ile çalışmaya başladığımızdan beri operasyonel süreçlerimiz belirgin biçimde hızlandı. Gerçek zamanlı takip sistemi müşterilerimize çok daha net bir görünürlük sunuyor.",
    person: "Ahmet Yılmaz",
    role: "Operasyon Müdürü",
  },
  {
    company: "Soğuk Zincir",
    initial: "S",
    sector: "Soğuk Zincir Taşımacılığı",
    meta: "45 araç",
    testimonial:
      "Sektöre özgü gereksinimlerimize yönelik özelleştirilebilir yapısı en büyük avantajı. Sıcaklık takibi ve rota güvenliği konusunda aradığımız çözümü bulduk.",
    person: "Can Aydın",
    role: "Teknik Müdür",
  },
  {
    company: "Yılmaz Mobilya",
    initial: "Y",
    sector: "Mobilya & Dekorasyon",
    meta: "Aylık 40+ sevkiyat",
    testimonial:
      "Yurt geneline düzenli sevkiyat yapıyoruz. Akna sayesinde yüklerimizin nerede olduğunu anlık görebiliyor, müşterilerimize kesin teslimat saati verebiliyoruz.",
    person: "Serkan Yılmaz",
    role: "Lojistik Müdürü",
  },
];

const ReferencesTeaser = ({ setPage }) => (
  <section className="tm-ref-teaser" aria-labelledby="tm-ref-teaser-title">
    <div className="tm-ref-teaser__inner">
      <div className="tm-ref-teaser__head">
        <div>
          <div className="tm-hiw__badge">
            <span className="tm-hiw__badge-dot"></span>
            <span className="tm-hiw__badge-text">Referanslar</span>
          </div>
          <h2 className="tm-hiw__title" id="tm-ref-teaser-title" style={{ marginBottom: 0 }}>
            Onlar anlatsın,
            <br />
            <em>siz değerlendirin.</em>
          </h2>
        </div>
        <button
          className="tm-ref-teaser__link"
          type="button"
          onClick={() => setPage("references")}
        >
          Tüm referansları gör
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M3 7h8M8 3.5 11.5 7 8 10.5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="tm-ref-grid tm-ref-grid--teaser">
        {teaserRefs.map((ref) => (
          <div className="tm-ref-card" key={ref.company}>
            <div className="tm-ref-card__top">
              <div className="tm-ref-initial">{ref.initial}</div>
              <div className="tm-ref-company">
                <div className="tm-ref-company__name">{ref.company}</div>
                <div className="tm-ref-company__meta">
                  <span>{ref.sector}</span>
                  <span className="tm-ref-sep">·</span>
                  <span>{ref.meta}</span>
                </div>
              </div>
            </div>
            <p className="tm-ref-quote">{ref.testimonial}</p>
            <div className="tm-ref-person">
              <span className="tm-ref-person__name">{ref.person}</span>
              <span className="tm-ref-person__role">{ref.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ReferencesTeaser;
