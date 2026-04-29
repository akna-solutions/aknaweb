import React from "react";

const Footer = ({ setPage }) => (
  <div className="tm-footer-wrap" role="contentinfo">
    <div className="tm-footer-inner">
      {/* CTA Panel */}
      <div className="tm-footer-cta-panel">
        <div className="tm-footer-cta-copy">
          <div className="tm-footer-cta-badge">
            <span className="tm-footer-cta-badge-dot"></span>
            <span className="tm-footer-cta-badge-txt">
              Lojistik Operasyonlarını Dijitalleştirin
            </span>
          </div>
          <h2 className="tm-footer-cta-title">
            Tekliften takibe kadar
            <br />
            <em>daha görünür, daha hızlı</em>
            <br />
            bir operasyon kurun.
          </h2>
          <p className="tm-footer-cta-desc">
            AKNA Lojistik ile fiyatlama, taşıyıcı eşleştirme ve sevkiyat
            takibini tek platformda yönetin. Manuel koordinasyonu azaltın,
            operasyonu ölçeklendirin.
          </p>
        </div>
        <div className="tm-footer-cta-actions">
          <button
            className="tm-footer-btn-dark"
            type="button"
            onClick={() => setPage("quote")}
          >
            Teklif Al
          </button>
          <button
            className="tm-footer-btn-outline"
            type="button"
            onClick={() => setPage("contact")}
          >
            Demo Talep Et
          </button>
        </div>
      </div>

      {/* Footer Body */}
      <div className="tm-footer-body">
        <div className="tm-footer-brand">
          <div className="tm-footer-brand-logo">
            <span className="tm-footer-brand-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect
                  x="1"
                  y="6"
                  width="10"
                  height="7"
                  rx="1.5"
                  stroke="#D8C7A8"
                  strokeWidth="1.2"
                  fill="none"
                />
                <path
                  d="M11 9h4l2 3v2h-6V9z"
                  stroke="#D8C7A8"
                  strokeWidth="1.2"
                  fill="none"
                  strokeLinejoin="round"
                />
                <circle cx="4.5" cy="14.5" r="1.5" fill="#D8C7A8" />
                <circle cx="13.5" cy="14.5" r="1.5" fill="#D8C7A8" />
              </svg>
            </span>
            <span className="tm-footer-brand-name">
              AKNA<span> Lojistik</span>
            </span>
          </div>
          <p className="tm-footer-brand-desc">
            Nakliye süreçlerini tekliften teslimata kadar dijitalleştiren akıllı
            lojistik platformu.
          </p>
          <div className="tm-footer-social" aria-label="Sosyal medya">
            {["LinkedIn", "Twitter", "Instagram"].map((s) => (
              <button
                key={s}
                className="tm-footer-social-btn"
                aria-label={s}
                type="button"
              />
            ))}
          </div>
        </div>

        <div className="tm-footer-col">
          <h5>Platform</h5>
          <ul>
            <li>
              <button type="button" onClick={() => setPage("home")}>
                Ana Sayfa
              </button>
            </li>
            <li>
              <button type="button" onClick={() => setPage("home")}>
                Nasıl Çalışır
              </button>
            </li>
            <li>
              <button type="button" onClick={() => setPage("tracking")}>
                Araç Takip
              </button>
            </li>
            <li>
              <button type="button" onClick={() => setPage("quote")}>
                Teklif Al
              </button>
            </li>
          </ul>
        </div>

        <div className="tm-footer-col">
          <h5>Çözümler</h5>
          <ul>
            <li>
              <button type="button">AI Fiyatlama</button>
            </li>
            <li>
              <button type="button">Yük Takibi</button>
            </li>
            <li>
              <button type="button">Taşıyıcı Ağı</button>
            </li>
            <li>
              <button type="button">Operasyon Yönetimi</button>
            </li>
          </ul>
        </div>

        <div className="tm-footer-col">
          <h5>Kurumsal</h5>
          <ul>
            <li>
              <button type="button" onClick={() => setPage("references")}>
                Referanslar
              </button>
            </li>
            <li>
              <button type="button" onClick={() => setPage("contact")}>
                İletişim
              </button>
            </li>
            <li>
              <button type="button">SSS</button>
            </li>
          </ul>
        </div>

        <div className="tm-footer-col">
          <h5>İletişim</h5>
          <ul>
            <li>
              <div className="tm-contact-item">
                <span className="tm-contact-label">Konum</span>
                <span className="tm-contact-val">İstanbul, Türkiye</span>
              </div>
            </li>
            <li>
              <div className="tm-contact-item">
                <span className="tm-contact-label">E-posta</span>
                <a href="mailto:info@akna.com">info@akna.com</a>
              </div>
            </li>
            <li>
              <div className="tm-contact-item">
                <span className="tm-contact-label">Telefon</span>
                <a href="tel:+905xx">+90 (5xx) xxx xx xx</a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="tm-footer-bottom">
        <span className="tm-footer-copy">
          © 2026 AKNA. Tüm hakları saklıdır.
        </span>
        <nav className="tm-footer-legal" aria-label="Yasal linkler">
          <button type="button">Gizlilik Politikası</button>
          <button type="button">Kullanım Koşulları</button>
        </nav>
      </div>
    </div>
  </div>
);

export default Footer;
