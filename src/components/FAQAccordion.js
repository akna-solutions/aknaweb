import React, { useState } from "react";

const faqs = [
  {
    q: "Teklif almak için hangi bilgiler gerekiyor?",
    a: "Yük tipi, çıkış ve varış noktası, araç tipi ve yükleme tarihi yeterlidir. Bu bilgilerle sistem otomatik olarak fiyatlama sürecini başlatır.",
  },
  {
    q: "Teklif ne kadar sürede hazırlanıyor?",
    a: "Rota, tonaj ve araç uygunluğu analiz edilerek teklif dakikalar içinde hazırlanır; manuel telefon trafiğine gerek kalmaz.",
  },
  {
    q: "Hangi şehirlere taşıma yapıyorsunuz?",
    a: "Türkiye genelinde geniş bir taşıyıcı ağı ile şehirlerarası ve bölgesel taşıma hizmeti sunuyoruz.",
  },
  {
    q: "Parsiyel ve komple yük taşıyor musunuz?",
    a: "Evet, hem parsiyel hem de komple yük taşımacılığı yapılabilmektedir. Yük detaylarınıza göre en uygun araç önerilir.",
  },
  {
    q: "Sevkiyatımı nasıl takip edebilirim?",
    a: "Araç Takip sayfasından yük kodunuzu girerek sevkiyatınızın güncel durumunu ve konumunu anlık olarak görüntüleyebilirsiniz.",
  },
  {
    q: "Taşıma sigortası sunuluyor mu?",
    a: "Yük ve rotaya bağlı sigorta seçenekleri teklif aşamasında görüşülüp netleştirilir.",
  },
  {
    q: "Araç ve sürücü nasıl belirleniyor?",
    a: "Geniş taşıyıcı ağı içinden yükünüzün tonaj, mesafe ve uygunluk kriterlerine en iyi denk düşen araç ve sürücü eşleştirilir.",
  },
  {
    q: "Teklif sonradan değişebilir mi?",
    a: "Yük veya rota bilgilerinde değişiklik olması durumunda teklif güncellenerek yeniden değerlendirilir.",
  },
];

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => setOpenIndex(openIndex === i ? -1 : i);

  return (
    <section className="tm-faq" aria-labelledby="tm-faq-title">
      <div className="tm-faq__inner">
        <div className="tm-hiw__top">
          <div className="tm-hiw__badge">
            <span className="tm-hiw__badge-dot"></span>
            <span className="tm-hiw__badge-text">Sık Sorulan Sorular</span>
          </div>
          <h2 className="tm-hiw__title" id="tm-faq-title">
            Merak ettiklerinize
            <br />
            <em>kısa ve net yanıtlar.</em>
          </h2>
        </div>

        <div className="tm-faq__list">
          {faqs.map((f, i) => {
            const isOpen = openIndex === i;
            const panelId = `tm-faq-panel-${i}`;
            const btnId = `tm-faq-btn-${i}`;
            return (
              <div className="tm-faq__item" key={f.q}>
                <h3 className="tm-faq__q-wrap">
                  <button
                    type="button"
                    id={btnId}
                    className="tm-faq__q"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(i)}
                  >
                    <span>{f.q}</span>
                    <span
                      className={`tm-faq__icon${isOpen ? " tm-faq__icon--open" : ""}`}
                      aria-hidden="true"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2 4.5 6 8.5 10 4.5"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className={`tm-faq__a-wrap${isOpen ? " tm-faq__a-wrap--open" : ""}`}
                >
                  <p className="tm-faq__a">{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
