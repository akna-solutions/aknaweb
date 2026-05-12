import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const references = [
  {
    company: "Metro Nakliyat",
    initial: "M",
    sector: "Nakliyat",
    vehicles: "120+ araç",
    testimonial:
      "Akna ile çalışmaya başladığımızdan beri operasyonel süreçlerimiz belirgin biçimde hızlandı. Gerçek zamanlı takip sistemi müşterilerimize çok daha net bir görünürlük sunuyor.",
    person: "Ahmet Yılmaz",
    role: "Operasyon Müdürü",
  },
  {
    company: "Hızır Kargo",
    initial: "H",
    sector: "Kargo & Kurye",
    vehicles: "85 araç",
    testimonial:
      "Rota optimizasyonu sayesinde yakıt maliyetlerimizde ciddi tasarruf sağladık. Teslimat süreçleri artık çok daha öngörülebilir; müşteri beklentisini karşılamak kolaylaştı.",
    person: "Zeynep Kara",
    role: "Genel Müdür",
  },
  {
    company: "Şehirlerarası Yük",
    initial: "Ş",
    sector: "Şehirlerarası Taşımacılık",
    vehicles: "200+ araç",
    testimonial:
      "Analitik raporlama filo yönetimini merkezi hale getirdi. Sürücü performansını ve rota verimliliğini tek ekrandan takip etmek operasyon yükümüzü önemli ölçüde azalttı.",
    person: "Mehmet Öztürk",
    role: "Filo Yöneticisi",
  },
  {
    company: "Çelik Dağıtım",
    initial: "Ç",
    sector: "Dağıtım & Lojistik",
    vehicles: "60 araç",
    testimonial:
      "Büyüme döneminde operasyonu kontrol altında tutmak zordu. Akna'nın sistemi bu süreçte hem esneklik hem de görünürlük sağladı. Destek ekibi de her adımda yanımızdaydı.",
    person: "Fatma Demir",
    role: "İşletme Sahibi",
  },
  {
    company: "Soğuk Zincir",
    initial: "S",
    sector: "Soğuk Zincir Taşımacılığı",
    vehicles: "45 araç",
    testimonial:
      "Sektöre özgü gereksinimlerimize yönelik özelleştirilebilir yapısı en büyük avantajı. Sıcaklık takibi ve rota güvenliği konusunda aradığımız çözümü bulduk.",
    person: "Can Aydın",
    role: "Teknik Müdür",
  },
  {
    company: "Express Kargo",
    initial: "E",
    sector: "Hızlı Teslimat",
    vehicles: "150+ araç",
    testimonial:
      "Saha ekiplerimiz mobil uygulama sayesinde her yerden sisteme erişebiliyor. Teslimat süreleri kısaldı, müşteri şikayetleri azaldı; bunları sayısal olarak görmek motive edici.",
    person: "Deniz Akar",
    role: "IT Direktörü",
  },
];

const stats = [
  { value: "500+", label: "Aktif Müşteri" },
  { value: "2.000+", label: "Takip Edilen Araç" },
  { value: "%98", label: "Müşteri Memnuniyeti" },
  { value: "6+", label: "Yıllık Deneyim" },
];

const ReferencesPage = ({ setPage }) => {
  return (
    <div className="page">
      <Navigation currentPage="references" setPage={setPage} />

      <section className="references-hero">
        <div className="container">
          <h1>Referanslar</h1>
          <p>Türkiye genelinde lojistik firmalarının tercih ettiği platform</p>
        </div>
      </section>

      <section className="tm-ref-stats">
        <div className="tm-ref-stats__inner">
          {stats.map((s) => (
            <div className="tm-ref-stat" key={s.label}>
              <div className="tm-ref-stat__val">{s.value}</div>
              <div className="tm-ref-stat__lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="tm-ref-section">
        <div className="tm-ref-section__inner">
          <div className="tm-ref-head">
            <div className="tm-ref-badge">
              <span className="tm-ref-badge__dot"></span>
              <span className="tm-ref-badge__txt">Müşteri Deneyimleri</span>
            </div>
            <h2 className="tm-ref-title">
              Onlar anlatsın,
              <br />
              <em>siz değerlendirin.</em>
            </h2>
          </div>

          <div className="tm-ref-grid">
            {references.map((ref) => (
              <div className="tm-ref-card" key={ref.company}>
                <div className="tm-ref-card__top">
                  <div className="tm-ref-initial">{ref.initial}</div>
                  <div className="tm-ref-company">
                    <div className="tm-ref-company__name">{ref.company}</div>
                    <div className="tm-ref-company__meta">
                      <span>{ref.sector}</span>
                      <span className="tm-ref-sep">·</span>
                      <span>{ref.vehicles}</span>
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

      <Footer setPage={setPage} />
    </div>
  );
};

export default ReferencesPage;
