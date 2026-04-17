import React, { useState } from "react";
import Navigation from "../components/Navigation";

const QuotePage = ({ setPage }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    vehicleCount: "",
    serviceType: "full",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        vehicleCount: "",
        serviceType: "full",
        message: "",
      });
    }, 3000);
  };

  return (
    <div className="page">
      <Navigation currentPage="quote" setPage={setPage} />

      <section className="quote-hero">
        <div className="container">
          <h1>Ücretsiz Teklif Alın</h1>
          <p>İhtiyaçlarınıza özel çözümler için bizimle iletişime geçin</p>
        </div>
      </section>

      <section className="quote-form-section">
        <div className="container">
          <div className="quote-layout">
            <div className="quote-info">
              <h2>Neden Akna Lojistik?</h2>

              <div className="info-item">
                <div className="info-icon">✓</div>
                <div>
                  <h3>15 Yıllık Tecrübe</h3>
                  <p>Sektörde uzun yıllara dayanan deneyim ve uzmanlık</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">✓</div>
                <div>
                  <h3>24/7 Destek</h3>
                  <p>Kesintisiz teknik destek ve müşteri hizmetleri</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">✓</div>
                <div>
                  <h3>Esnek Paketler</h3>
                  <p>İhtiyacınıza özel çözümler ve uygun fiyatlandırma</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">✓</div>
                <div>
                  <h3>Teknoloji Liderliği</h3>
                  <p>En güncel GPS ve takip teknolojileri</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">✓</div>
                <div>
                  <h3>Kolay Entegrasyon</h3>
                  <p>Mevcut sistemlerinizle sorunsuz uyum</p>
                </div>
              </div>
            </div>

            <div className="quote-form-container">
              {submitted ? (
                <div className="success-message">
                  <div className="success-icon">✓</div>
                  <h3>Talebiniz Alındı!</h3>
                  <p>En kısa sürede size geri dönüş yapacağız.</p>
                </div>
              ) : (
                <form className="quote-form" onSubmit={handleSubmit}>
                  <h3>Teklif Formu</h3>

                  <div className="form-group">
                    <label>Şirket Adı *</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      placeholder="Şirket adınızı girin"
                    />
                  </div>

                  <div className="form-group">
                    <label>Yetkili Kişi *</label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                      placeholder="Ad Soyad"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>E-posta *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="ornek@sirket.com"
                      />
                    </div>

                    <div className="form-group">
                      <label>Telefon *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+90 5XX XXX XX XX"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Araç Sayısı</label>
                    <select
                      name="vehicleCount"
                      value={formData.vehicleCount}
                      onChange={handleChange}
                    >
                      <option value="">Seçiniz</option>
                      <option value="1-5">1-5 araç</option>
                      <option value="6-20">6-20 araç</option>
                      <option value="21-50">21-50 araç</option>
                      <option value="50+">50+ araç</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Hizmet Türü</label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                    >
                      <option value="full">
                        Tam Paket (Takip + Analitik + Destek)
                      </option>
                      <option value="tracking">Sadece Araç Takibi</option>
                      <option value="analytics">Analitik ve Raporlama</option>
                      <option value="custom">Özel Çözüm</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Mesajınız</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Özel taleplerinizi ve sorularınızı buraya yazabilirsiniz..."
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-primary full-width">
                    Teklif Talep Et
                  </button>

                  <p className="form-note">
                    * Tüm bilgileriniz gizli tutulur ve üçüncü şahıslarla
                    paylaşılmaz.
                  </p>
                </form>
              )}
            </div>
          </div>
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

export default QuotePage;
