import React, { useState } from "react";
import Navigation from "../components/Navigation";

const TrackingPage = ({ setPage }) => {
  const [trackingCode, setTrackingCode] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Demo araç verileri
  const demoVehicles = {
    AK001: {
      plate: "34 ABC 123",
      driver: "Mehmet Yılmaz",
      location: "İstanbul, Kadıköy",
      status: "Hareket Halinde",
      speed: "65 km/h",
      lastUpdate: "2 dakika önce",
      route: "İstanbul → Ankara",
      progress: 45,
      estimatedArrival: "14:30",
      fuel: 75,
    },
    AK002: {
      plate: "06 XYZ 456",
      driver: "Ayşe Demir",
      location: "Ankara, Çankaya",
      status: "Park Halinde",
      speed: "0 km/h",
      lastUpdate: "5 dakika önce",
      route: "Ankara → İzmir",
      progress: 0,
      estimatedArrival: "18:00",
      fuel: 90,
    },
    AK003: {
      plate: "35 DEF 789",
      driver: "Ali Kaya",
      location: "İzmir, Bornova",
      status: "Teslimat Yapıyor",
      speed: "0 km/h",
      lastUpdate: "1 dakika önce",
      route: "İzmir → Manisa",
      progress: 80,
      estimatedArrival: "16:45",
      fuel: 45,
    },
  };

  const handleTracking = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const vehicle = demoVehicles[trackingCode.toUpperCase()];
      setTrackingResult(vehicle || "notfound");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="page">
      <Navigation currentPage="tracking" setPage={setPage} />

      <section className="tracking-hero">
        <div className="container">
          <h1>Gerçek Zamanlı Araç Takibi</h1>
          <p>Filonuzdaki tüm araçları anlık olarak takip edin</p>
        </div>
      </section>

      <section className="tracking-section">
        <div className="container">
          <div className="tracking-search">
            <h2>Araç Sorgulama</h2>
            <form onSubmit={handleTracking}>
              <div className="search-box">
                <input
                  type="text"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  placeholder="Araç kodunu girin (örn: AK001, AK002, AK003)"
                  required
                />
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? "Sorgulanıyor..." : "Sorgula"}
                </button>
              </div>
              <p className="help-text">
                Demo için kullanabilirsiniz: AK001, AK002, AK003
              </p>
            </form>
          </div>

          {trackingResult && trackingResult !== "notfound" && (
            <div className="tracking-result">
              <div className="result-header">
                <h3>🚛 {trackingResult.plate}</h3>
                <span
                  className={`status-badge ${trackingResult.status === "Hareket Halinde" ? "moving" : trackingResult.status === "Park Halinde" ? "parked" : "delivering"}`}
                >
                  {trackingResult.status}
                </span>
              </div>

              <div className="result-grid">
                <div className="result-item">
                  <div className="item-label">Sürücü</div>
                  <div className="item-value">👤 {trackingResult.driver}</div>
                </div>

                <div className="result-item">
                  <div className="item-label">Mevcut Konum</div>
                  <div className="item-value">📍 {trackingResult.location}</div>
                </div>

                <div className="result-item">
                  <div className="item-label">Hız</div>
                  <div className="item-value">⚡ {trackingResult.speed}</div>
                </div>

                <div className="result-item">
                  <div className="item-label">Son Güncelleme</div>
                  <div className="item-value">
                    🕐 {trackingResult.lastUpdate}
                  </div>
                </div>
              </div>

              <div className="route-info">
                <h4>Rota Bilgisi</h4>
                <div className="route-display">
                  <span className="route-text">{trackingResult.route}</span>
                </div>

                <div className="progress-section">
                  <div className="progress-header">
                    <span>Rota İlerlemesi</span>
                    <span className="progress-percent">
                      {trackingResult.progress}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${trackingResult.progress}%` }}
                    ></div>
                  </div>
                  <div className="progress-info">
                    <span>
                      Tahmini Varış: {trackingResult.estimatedArrival}
                    </span>
                  </div>
                </div>

                <div className="fuel-section">
                  <div className="fuel-header">
                    <span>⛽ Yakıt Seviyesi</span>
                    <span>{trackingResult.fuel}%</span>
                  </div>
                  <div className="fuel-bar">
                    <div
                      className="fuel-fill"
                      style={{
                        width: `${trackingResult.fuel}%`,
                        backgroundColor:
                          trackingResult.fuel > 50
                            ? "#10b981"
                            : trackingResult.fuel > 25
                              ? "#f59e0b"
                              : "#ef4444",
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="map-placeholder">
                <div className="map-icon">🗺️</div>
                <p>Harita Görünümü</p>
                <small>
                  Gerçek uygulamada buraya canlı harita entegre edilir
                </small>
              </div>
            </div>
          )}

          {trackingResult === "notfound" && (
            <div className="not-found">
              <div className="not-found-icon">❌</div>
              <h3>Araç Bulunamadı</h3>
              <p>Girdiğiniz kod ile eşleşen bir araç bulunamadı.</p>
              <p>Lütfen araç kodunu kontrol edip tekrar deneyin.</p>
            </div>
          )}
        </div>
      </section>

      <section className="tracking-features">
        <div className="container">
          <h2>Araç Takip Sistemi Özellikleri</h2>

          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">📡</div>
              <h3>Gerçek Zamanlı Takip</h3>
              <p>GPS teknolojisi ile araçlarınızı saniye saniye takip edin</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <h3>Detaylı Raporlama</h3>
              <p>Sürüş davranışı, yakıt tüketimi ve performans raporları</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">🔔</div>
              <h3>Akıllı Bildirimler</h3>
              <p>Hız aşımı, rota sapması ve önemli olaylar için anında uyarı</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">🗺️</div>
              <h3>Rota Optimizasyonu</h3>
              <p>En kısa ve verimli rotaları otomatik hesaplama</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">💾</div>
              <h3>Geçmiş Veriler</h3>
              <p>Tüm sürüş verilerinizi arşivleyip analiz edebilme</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">🔒</div>
              <h3>Güvenli Erişim</h3>
              <p>Şifreli bağlantı ve çok katmanlı güvenlik sistemi</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Araç Takip Sistemi Hakkında Daha Fazla Bilgi İster misiniz?</h2>
          <p>Size özel demo sunumu için hemen iletişime geçin</p>
          <button
            className="btn-primary large"
            onClick={() => setPage("contact")}
          >
            Bizimle İletişime Geçin
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

export default TrackingPage;
