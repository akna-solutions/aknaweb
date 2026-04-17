import React from "react";
import Navigation from "../components/Navigation";

const HomePage = ({ setPage }) => {
  return (
    <div className="page">
      <Navigation currentPage="home" setPage={setPage} />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Filonuzu daha önce hiç olmadığı gibi kontrol edin.
          </h1>
          <p className="hero-subtitle">
            Gerçek zamanlı takip, gelişmiş analitik ve kusursuz yönetim - hepsi
            tek bir güçlü platformda.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => setPage("quote")}>
              Ücretsiz Teklif Al
            </button>
            <button
              className="btn-secondary"
              onClick={() => setPage("tracking")}
            >
              Araç Takip Sistemi
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=500&fit=crop"
            alt="Akna Lojistik Filo"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <h2 className="section-title">İş dünyası için vazgeçilmez.</h2>
          <p className="section-subtitle">
            Teknolojimiz iş verimliliğini artırır ve sürücü güvenliğini sağlar.
          </p>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Zaman tasarrufu</div>
              <div className="stat-value">%20</div>
              <div className="stat-desc">daha az verimsizlik</div>
              <p className="stat-detail">
                Süreç otomasyonu sayesinde diğer görevlere odaklanabilirsiniz.
              </p>
            </div>

            <div className="stat-card">
              <div className="stat-label">Güvenlik</div>
              <div className="stat-value">%50</div>
              <div className="stat-desc">daha az kaza</div>
              <p className="stat-detail">
                Sürüş davranışı analizi yol güvenliğini artırır.
              </p>
            </div>

            <div className="stat-card">
              <div className="stat-label">Verimlilik artışı</div>
              <div className="stat-value">%30</div>
              <div className="stat-desc">yakıt maliyetinde düşüş</div>
              <p className="stat-detail">
                Rota optimizasyonu ile teslimatta yakıt tasarrufu sağlar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">
            Filo yönetim çözümlerimiz şunları içerir:
          </h2>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📍</div>
              <h3>Gerçek Zamanlı Konum Takibi</h3>
              <p>
                Tüm araçlarınızın konumunu anlık olarak görün. GPS teknolojisi
                ile filonuzu 7/24 takip edin ve optimize edin.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Gelişmiş Analitik Raporlar</h3>
              <p>
                Detaylı raporlar ve analizlerle işletmenizin performansını
                artırın. Veri odaklı kararlar alın.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🛣️</div>
              <h3>Akıllı Rota Planlama</h3>
              <p>
                Trafik ve yol durumuna göre en optimal rotaları belirleyin.
                Zamandan ve yakıttan tasarruf edin.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Anlık Bildirimler</h3>
              <p>
                Önemli olaylar ve durumlarda anında bilgilendirilme. Proaktif
                filo yönetimi için kritik uyarılar.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔧</div>
              <h3>Bakım Yönetimi</h3>
              <p>
                Araç bakım takviminizi otomatik yönetin. Plansız arızaları
                önleyin, araç ömrünü uzatın.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobil Erişim</h3>
              <p>
                Her yerden, her cihazdan filonuza erişin. iOS ve Android
                uygulamalarıyla tam kontrol.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Akna Lojistik ile farkı yaşayın</h2>
          <p>
            Türkiye'nin en güvenilir lojistik çözüm ortağı. 15 yıllık tecrübe,
            binlerce mutlu müşteri.
          </p>
          <button
            className="btn-primary large"
            onClick={() => setPage("quote")}
          >
            Ücretsiz Demo Talep Edin
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>AKNA Lojistik</h4>
              <p>
                Türkiye'nin lider lojistik ve filo yönetim çözümleri
                sağlayıcısı.
              </p>
            </div>
            <div className="footer-section">
              <h4>Hızlı Linkler</h4>
              <ul>
                <li>
                  <button onClick={() => setPage("home")}>Ana Sayfa</button>
                </li>
                <li>
                  <button onClick={() => setPage("tracking")}>
                    Araç Takip
                  </button>
                </li>
                <li>
                  <button onClick={() => setPage("references")}>
                    Referanslar
                  </button>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>İletişim</h4>
              <p>Tel: +90 212 XXX XX XX</p>
              <p>Email: info@aknalojistik.com</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Akna Lojistik. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
