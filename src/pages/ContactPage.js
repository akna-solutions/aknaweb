import React, { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.53 10.78 19.79 19.79 0 01.46 2.18 2 2 0 012.44.01h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l.77-.78a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    <path d="M12 12v2M8 12v2M16 12v2" />
  </svg>
);

const HeadsetIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0118 0v6" />
    <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z" />
  </svg>
);

const FileTextIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
  </svg>
);

const BookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
  </svg>
);

const departments = [
  {
    Icon: BriefcaseIcon,
    title: "Satış",
    desc: "Yeni müşteri başvuruları ve teklif süreçleri",
    email: "satis@aknalojistik.com",
  },
  {
    Icon: HeadsetIcon,
    title: "Teknik Destek",
    desc: "7/24 teknik yardım ve sistem sorunları",
    email: "destek@aknalojistik.com",
  },
  {
    Icon: FileTextIcon,
    title: "Muhasebe",
    desc: "Fatura ve ödeme işlemleri",
    email: "muhasebe@aknalojistik.com",
  },
  {
    Icon: BookIcon,
    title: "Eğitim",
    desc: "Kullanıcı eğitimleri ve dokümantasyon",
    email: "egitim@aknalojistik.com",
  },
];

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "general", message: "" });
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
                <div className="contact-icon"><LocationIcon /></div>
                <div>
                  <h3>Adres</h3>
                  <p>Merkez Mah. Lojistik Cad. No:123</p>
                  <p>Kadıköy / İstanbul</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><PhoneIcon /></div>
                <div>
                  <h3>Telefon</h3>
                  <p>+90 212 XXX XX XX</p>
                  <p>+90 216 XXX XX XX</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><MailIcon /></div>
                <div>
                  <h3>E-posta</h3>
                  <p>info@aknalojistik.com</p>
                  <p>destek@aknalojistik.com</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><ClockIcon /></div>
                <div>
                  <h3>Çalışma Saatleri</h3>
                  <p>Pazartesi – Cuma: 08:00 – 18:00</p>
                  <p>Cumartesi: 09:00 – 14:00</p>
                  <p>Teknik Destek: 7/24</p>
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              {submitted ? (
                <div className="success-message">
                  <div className="success-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3>Mesajınız Gönderildi</h3>
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
          <div className="tm-ref-badge" style={{ marginBottom: 12 }}>
            <span className="tm-ref-badge__dot"></span>
            <span className="tm-ref-badge__txt">Departmanlar</span>
          </div>
          <h2 style={{ fontSize: "clamp(22px, 2.8vw, 36px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 0 }}>
            Doğru ekiple<br /><em style={{ fontStyle: "normal", color: "var(--accent-hover)" }}>doğrudan iletişim.</em>
          </h2>

          <div className="departments-grid" style={{ marginTop: 40 }}>
            {departments.map(({ Icon, title, desc, email }) => (
              <div className="department-card" key={title}>
                <div className="dept-icon-wrap">
                  <Icon />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <a href={`mailto:${email}`}>{email}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer setPage={setPage} />
    </div>
  );
};

export default ContactPage;
