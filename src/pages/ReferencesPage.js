import React from "react";
import Navigation from "../components/Navigation";

const ReferencesPage = ({ setPage }) => {
  const references = [
    {
      company: "Metro Nakliyat A.Ş.",
      logo: "🚚",
      sector: "Nakliyat",
      vehicles: "120+ Araç",
      testimonial:
        "Akna Lojistik ile çalışmaya başladığımızdan beri operasyonel verimliliğimiz %40 arttı. Gerçek zamanlı takip sistemi sayesinde müşterilerimize daha iyi hizmet sunuyoruz.",
      person: "Ahmet Yılmaz - Operasyon Müdürü",
    },
    {
      company: "Hızır Kargo",
      logo: "📦",
      sector: "Kargo & Kurye",
      vehicles: "85 Araç",
      testimonial:
        "Rota optimizasyonu sayesinde yakıt maliyetlerimizde ciddi tasarruf sağladık. Müşteri memnuniyeti oranımız %95'e ulaştı. Kesinlikle tavsiye ediyoruz.",
      person: "Zeynep Kara - Genel Müdür",
    },
    {
      company: "Şehirlerarası Yük Taşıma Ltd.",
      logo: "🛣️",
      sector: "Şehirlerarası Taşımacılık",
      vehicles: "200+ Araç",
      testimonial:
        "Özellikle analitik raporlama sistemi çok işimize yarıyor. Sürücü performanslarını anlık takip edebiliyoruz. Kazalarımızda belirgin bir azalma oldu.",
      person: "Mehmet Öztürk - Filo Yöneticisi",
    },
    {
      company: "Çelik Dağıtım",
      logo: "🏭",
      sector: "Dağıtım & Lojistik",
      vehicles: "60 Araç",
      testimonial:
        "Küçük bir filo olarak başladık ama Akna'nın sistemleri büyüme sürecimizde çok değerli oldu. Müşteri destek ekibi her zaman yardımcı oluyor.",
      person: "Fatma Demir - İşletme Sahibi",
    },
    {
      company: "Soğuk Zincir Taşımacılık",
      logo: "❄️",
      sector: "Soğuk Zincir",
      vehicles: "45 Araç",
      testimonial:
        "Özel ihtiyaçlarımız için özelleştirilmiş çözümler sundular. Sıcaklık takibi ve rota güvenliği konusunda harika bir sistem kurduk.",
      person: "Can Aydın - Teknik Müdür",
    },
    {
      company: "Express Kargo Hizmetleri",
      logo: "⚡",
      sector: "Hızlı Teslimat",
      vehicles: "150+ Araç",
      testimonial:
        "Mobil uygulama sayesinde saha ekiplerimiz her yerden sisteme erişebiliyor. Teslimat sürelerimiz %30 kısaldı ve müşteri şikayetleri minimize oldu.",
      person: "Deniz Akar - IT Direktörü",
    },
  ];

  const stats = [
    { value: "500+", label: "Mutlu Müşteri" },
    { value: "2000+", label: "Takip Edilen Araç" },
    { value: "%98", label: "Müşteri Memnuniyeti" },
    { value: "32+", label: "Yıllık Tecrübe" },
  ];

  return (
    <div className="page">
      <Navigation currentPage="references" setPage={setPage} />

      <section className="references-hero">
        <div className="container">
          <h1>Referanslarımız</h1>
          <p>Türkiye'nin önde gelen lojistik firmalarının tercihi</p>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="stats-row">
            {stats.map((stat, index) => (
              <div key={index} className="stat-box">
                <div className="stat-number">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="references-section">
        <div className="container">
          <h2>Müşterilerimizden Gelen Geri Bildirimler</h2>

          <div className="references-grid">
            {references.map((ref, index) => (
              <div key={index} className="reference-card">
                <div className="reference-header">
                  <div className="company-logo">{ref.logo}</div>
                  <div className="company-info">
                    <h3>{ref.company}</h3>
                    <div className="company-meta">
                      <span className="sector">{ref.sector}</span>
                      <span className="vehicles">🚛 {ref.vehicles}</span>
                    </div>
                  </div>
                </div>

                <div className="testimonial">
                  <div className="quote-icon">"</div>
                  <p>{ref.testimonial}</p>
                </div>

                <div className="reference-footer">
                  <div className="person-info">
                    <div className="person-icon">👤</div>
                    <div className="person-name">{ref.person}</div>
                  </div>
                  <div className="rating">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sectors-section">
        <div className="container">
          <h2>Hizmet Verdiğimiz Sektörler</h2>

          <div className="sectors-grid">
            <div className="sector-item">
              <div className="sector-icon">🚚</div>
              <h3>Nakliyat</h3>
              <p>Şehirlerarası ve şehir içi nakliyat firmaları</p>
            </div>

            <div className="sector-item">
              <div className="sector-icon">📦</div>
              <h3>Kargo & Kurye</h3>
              <p>Express teslimat ve kargo hizmetleri</p>
            </div>

            <div className="sector-item">
              <div className="sector-icon">🏭</div>
              <h3>Üretim & Dağıtım</h3>
              <p>Fabrika ve depo dağıtım sistemleri</p>
            </div>
          </div>
        </div>
      </section>

      <section className="certifications">
        <div className="container">
          <h2>Sertifikalarımız ve Üyeliklerimiz</h2>
          <div className="cert-grid">
            <div className="cert-item">
              <div className="cert-badge">🏆</div>
              <p>ISO 9001 Kalite Yönetimi</p>
            </div>
            <div className="cert-item">
              <div className="cert-badge">🔒</div>
              <p>ISO 27001 Bilgi Güvenliği</p>
            </div>
            <div className="cert-item">
              <div className="cert-badge">🌍</div>
              <p>ISO 14001 Çevre Yönetimi</p>
            </div>
            <div className="cert-item">
              <div className="cert-badge">✓</div>
              <p>UND Üyesi</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Siz de Başarı Hikayemizin Parçası Olun</h2>
          <p>Türkiye'nin en büyük lojistik firmalarının güvendiği sistem</p>
          <button
            className="btn-primary large"
            onClick={() => setPage("quote")}
          >
            Ücretsiz Demo Talep Edin
          </button>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-bottom">
            <p>&copy; 2024 Akna Lojistik. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ReferencesPage;
