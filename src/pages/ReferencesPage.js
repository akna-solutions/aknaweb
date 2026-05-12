import React, { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const carrierReferences = [
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
    company: "Hızır Kargo",
    initial: "H",
    sector: "Kargo & Kurye",
    meta: "85 araç",
    testimonial:
      "Rota optimizasyonu sayesinde yakıt maliyetlerimizde ciddi tasarruf sağladık. Teslimat süreçleri artık çok daha öngörülebilir; müşteri beklentisini karşılamak kolaylaştı.",
    person: "Zeynep Kara",
    role: "Genel Müdür",
  },
  {
    company: "Şehirlerarası Yük",
    initial: "Ş",
    sector: "Şehirlerarası Taşımacılık",
    meta: "200+ araç",
    testimonial:
      "Analitik raporlama filo yönetimini merkezi hale getirdi. Sürücü performansını ve rota verimliliğini tek ekrandan takip etmek operasyon yükümüzü önemli ölçüde azalttı.",
    person: "Mehmet Öztürk",
    role: "Filo Yöneticisi",
  },
  {
    company: "Çelik Dağıtım",
    initial: "Ç",
    sector: "Dağıtım & Lojistik",
    meta: "60 araç",
    testimonial:
      "Büyüme döneminde operasyonu kontrol altında tutmak zordu. Akna'nın sistemi bu süreçte hem esneklik hem de görünürlük sağladı. Destek ekibi de her adımda yanımızdaydı.",
    person: "Fatma Demir",
    role: "İşletme Sahibi",
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
    company: "Express Kargo",
    initial: "E",
    sector: "Hızlı Teslimat",
    meta: "150+ araç",
    testimonial:
      "Saha ekiplerimiz mobil uygulama sayesinde her yerden sisteme erişebiliyor. Teslimat süreleri kısaldı, müşteri şikayetleri azaldı; bunları sayısal olarak görmek motive edici.",
    person: "Deniz Akar",
    role: "IT Direktörü",
  },
];

const ownerReferences = [
  {
    company: "Yılmaz Mobilya",
    initial: "Y",
    sector: "Mobilya & Dekorasyon",
    meta: "Aylık 40+ sevkiyat",
    testimonial:
      "Yurt geneline düzenli sevkiyat yapıyoruz. Akna sayesinde yüklerimizin nerede olduğunu anlık görebiliyor, müşterilerimize kesin teslimat saati verebiliyoruz. Bu bizi rakiplerimizden ayırıyor.",
    person: "Serkan Yılmaz",
    role: "Lojistik Müdürü",
  },
  {
    company: "Akdeniz Gıda",
    initial: "A",
    sector: "Gıda & İçecek",
    meta: "Soğuk zincir taşıma",
    testimonial:
      "Soğuk zincir taşımada en kritik şey güvenilirlik. Akna platformuyla hem nakliyecileri hızlı bulabiliyoruz hem de taşıma sürecini uçtan uca izleyebiliyoruz.",
    person: "Pınar Arslan",
    role: "Tedarik Zinciri Direktörü",
  },
  {
    company: "Türkmen İnşaat",
    initial: "T",
    sector: "İnşaat & Yapı",
    meta: "Ağır ekipman taşıma",
    testimonial:
      "Şantiyelerimize zamanında malzeme ulaşması kritik. Akna ile doğru tonajda nakliyeciye çok daha hızlı ulaşıyoruz. Geç teslimat kaynaklı iş durmalarımız neredeyse sıfırlandı.",
    person: "Mustafa Türkmen",
    role: "Satın Alma Müdürü",
  },
  {
    company: "Batı Tekstil",
    initial: "B",
    sector: "Tekstil & Hazır Giyim",
    meta: "Haftada 20+ sevkiyat",
    testimonial:
      "Sezon değişimlerinde yük hacmimiz ciddi artıyor. Platform sayesinde anlık fiyat kıyaslaması yapabiliyoruz ve güvenilir taşıyıcılarla anında anlaşabiliyoruz.",
    person: "Elif Şahin",
    role: "Operasyon Koordinatörü",
  },
  {
    company: "Kuzey Elektronik",
    initial: "K",
    sector: "Elektronik & Teknoloji",
    meta: "Hassas yük taşıma",
    testimonial:
      "Yüksek değerli ve hassas ürünler taşıyoruz. Akna'nın taşıyıcı profilleri ve değerlendirme sistemi sayesinde güvendiğimiz nakliyecilerle çalışmak artık çok kolay.",
    person: "Berk Koçak",
    role: "Lojistik ve Depo Yöneticisi",
  },
  {
    company: "Güneş Tarım",
    initial: "G",
    sector: "Tarım & Gıda",
    meta: "Mevsimsel yüksek hacim",
    testimonial:
      "Hasat döneminde çok sayıda araç aynı anda gerekiyor. Akna'da ihtiyacımızı paylaşıyoruz, saatler içinde birden fazla teklif geliyor. Bu hız bizim için paha biçilmez.",
    person: "Hasan Güneş",
    role: "Genel Müdür",
  },
];

const stats = [
  { value: "500+", label: "Aktif Müşteri" },
  { value: "2.000+", label: "Takip Edilen Araç" },
  { value: "%98", label: "Müşteri Memnuniyeti" },
  { value: "6+", label: "Yıllık Deneyim" },
];

const ReferencesPage = ({ setPage }) => {
  const [activeTab, setActiveTab] = useState("carriers");

  const activeRefs = activeTab === "carriers" ? carrierReferences : ownerReferences;
  const badgeLabel = activeTab === "carriers" ? "Taşıyıcı Firmaları" : "Yük Sahipleri";

  return (
    <div className="page">
      <Navigation currentPage="references" setPage={setPage} />

      <section className="references-hero">
        <div className="container">
          <h1>Referanslar</h1>
          <p>Türkiye genelinde lojistik sektörünün tercih ettiği platform</p>
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
            <div className="tm-ref-tabs">
              <button
                className={`tm-ref-tab${activeTab === "carriers" ? " tm-ref-tab--active" : ""}`}
                onClick={() => setActiveTab("carriers")}
              >
                Taşıyıcı Firmaları
              </button>
              <button
                className={`tm-ref-tab${activeTab === "owners" ? " tm-ref-tab--active" : ""}`}
                onClick={() => setActiveTab("owners")}
              >
                Yük Sahipleri
              </button>
            </div>

            <div className="tm-ref-badge">
              <span className="tm-ref-badge__dot"></span>
              <span className="tm-ref-badge__txt">{badgeLabel} Deneyimleri</span>
            </div>
            <h2 className="tm-ref-title">
              Onlar anlatsın,
              <br />
              <em>siz değerlendirin.</em>
            </h2>
          </div>

          <div className="tm-ref-grid">
            {activeRefs.map((ref) => (
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

      <Footer setPage={setPage} />
    </div>
  );
};

export default ReferencesPage;
