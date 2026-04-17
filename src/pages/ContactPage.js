import React, { useState } from "react";
import Navigation from "../components/Navigation";

const ContactPage = ({ setPage }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
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
        name: "",
        email: "",
        phone: "",
        subject: "general",
        message: "",
      });
    }, 3000);
  };

  return (
    <div className="page">
      <Navigation currentPage="contact" setPage={setPage} />

      <section className="contact-hero">
        <div className="container">
          <h1>İletişim</h1>
          <p>Size yardımcı olmak için buradayız</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-layout">
            <div className="contact-info">
              <h2>Bize Ulaşın</h2>

              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <h3>Adres</h3>
                  <p>Merkez Mah. Lojistik Cad. No:123</p>
                  <p>Kadıköy / İstanbul</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <h3>Telefon</h3>
                  <p>+90 212 XXX XX XX</p>
                  <p>+90 216 XXX XX XX</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div>
                  <h3>E-posta</h3>
                  <p>info@aknalojistik.com</p>
                  <p>destek@aknalojistik.com</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">🕐</div>
                <div>
                  <h3>Çalışma Saatleri</h3>
                  <p>Pazartesi - Cuma: 08:00 - 18:00</p>
                  <p>Cumartesi: 09:00 - 14:00</p>
                  <p>Teknik Destek: 7/24</p>
                </div>
              </div>

              <div className="social-media">
                <h3>Sosyal Medya</h3>
                <div className="social-icons">
                  <button className="social-btn">📘 Facebook</button>
                  <button className="social-btn">🐦 Twitter</button>
                  <button className="social-btn">📷 Instagram</button>
                  <button className="social-btn">💼 LinkedIn</button>
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              {submitted ? (
                <div className="success-message">
                  <div className="success-icon">✓</div>
                  <h3>Mesajınız Gönderildi!</h3>
                  <p>En kısa sürede size geri dönüş yapacağız.</p>
                  <p>İlginiz için teşekkür ederiz.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <h3>İletişim Formu</h3>

                  <div className="form-group">
                    <label>Ad Soyad *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Adınızı ve soyadınızı girin"
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
                        placeholder="ornek@email.com"
                      />
                    </div>

                    <div className="form-group">
                      <label>Telefon</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+90 5XX XXX XX XX"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Konu *</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="general">Genel Bilgi</option>
                      <option value="demo">Demo Talebi</option>
                      <option value="support">Teknik Destek</option>
                      <option value="sales">Satış ve Fiyatlandırma</option>
                      <option value="partnership">İş Ortaklığı</option>
                      <option value="other">Diğer</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Mesajınız *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      required
                      placeholder="Mesajınızı buraya yazın..."
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-primary full-width">
                    Gönder
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="departments">
        <div className="container">
          <h2>Departmanlarımız</h2>

          <div className="departments-grid">
            <div className="department-card">
              <div className="dept-icon">💼</div>
              <h3>Satış Departmanı</h3>
              <p>Yeni müşteri başvuruları ve teklif süreçleri için</p>
              <a href="mailto:satis@aknalojistik.com">satis@aknalojistik.com</a>
            </div>

            <div className="department-card">
              <div className="dept-icon">🛠️</div>
              <h3>Teknik Destek</h3>
              <p>7/24 teknik yardım ve sistem sorunları için</p>
              <a href="mailto:destek@aknalojistik.com">
                destek@aknalojistik.com
              </a>
            </div>

            <div className="department-card">
              <div className="dept-icon">📋</div>
              <h3>Muhasebe</h3>
              <p>Fatura ve ödeme işlemleri için</p>
              <a href="mailto:muhasebe@aknalojistik.com">
                muhasebe@aknalojistik.com
              </a>
            </div>

            <div className="department-card">
              <div className="dept-icon">🎓</div>
              <h3>Eğitim</h3>
              <p>Kullanıcı eğitimleri ve dokümanlar için</p>
              <a href="mailto:egitim@aknalojistik.com">
                egitim@aknalojistik.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <h2>Sıkça Sorulan Sorular</h2>

          <div className="faq-grid">
            <div className="faq-item">
              <h4>❓ Sistem nasıl çalışır?</h4>
              <p>
                Araçlarınıza GPS cihazları takılır ve bulut tabanlı sistemimiz
                üzerinden tüm bilgilere erişirsiniz. Kurulum 1-2 gün sürer.
              </p>
            </div>

            <div className="faq-item">
              <h4>💰 Fiyatlandırma nasıl?</h4>
              <p>
                Araç sayınıza ve seçtiğiniz pakete göre aylık abonelik sistemi.
                İlk 3 ay ücretsiz deneme imkanı.
              </p>
            </div>

            <div className="faq-item">
              <h4>📱 Mobil uygulama var mı?</h4>
              <p>
                Evet, hem iOS hem de Android için ücretsiz mobil uygulamamız
                mevcut.
              </p>
            </div>

            <div className="faq-item">
              <h4>🔧 Kurulum süresi ne kadar?</h4>
              <p>
                Ortalama 1-2 gün içinde tüm araçlarınız sisteme dahil edilir ve
                eğitimler tamamlanır.
              </p>
            </div>

            <div className="faq-item">
              <h4>📞 Destek nasıl alırım?</h4>
              <p>
                7/24 telefon, email ve canlı chat desteği sunuyoruz. Acil
                durumlar için özel hat mevcuttur.
              </p>
            </div>

            <div className="faq-item">
              <h4>🔒 Verilerim güvende mi?</h4>
              <p>
                Tüm verileriniz şifreli olarak saklanır ve ISO 27001 sertifikalı
                sistemlerimizde korunur.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="container">
          <h2>Ofis Konumumuz</h2>
          <div className="map-placeholder">
            <div className="map-icon">🗺️</div>
            <p>Kadıköy, İstanbul</p>
            <small>Gerçek uygulamada buraya Google Maps entegre edilir</small>
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

export default ContactPage;
