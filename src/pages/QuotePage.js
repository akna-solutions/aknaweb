import React, { useState } from "react";
import Navigation from "../components/Navigation";

const CITY_DIST = {
  "istanbul-ankara": 454,
  "istanbul-izmir": 483,
  "istanbul-bursa": 154,
  "istanbul-antalya": 726,
  "istanbul-konya": 660,
  "istanbul-adana": 940,
  "istanbul-trabzon": 1080,
  "istanbul-samsun": 742,
  "istanbul-kayseri": 772,
  "ankara-izmir": 590,
  "ankara-antalya": 549,
  "ankara-konya": 261,
  "ankara-adana": 495,
  "ankara-samsun": 420,
  "ankara-trabzon": 780,
  "ankara-kayseri": 320,
  "ankara-bursa": 390,
  "izmir-antalya": 491,
  "izmir-konya": 497,
  "izmir-adana": 720,
  "izmir-bursa": 331,
  "konya-antalya": 303,
  "konya-adana": 340,
};

const BASE_RATES = { Kamyonet: 8, Tır: 6.2, Parsiyel: 4.8 };

const DURATIONS = [
  [100, 2],
  [200, 3.5],
  [300, 5],
  [500, 7],
  [700, 9],
  [1000, 12],
];

const VEHICLES = [
  {
    id: "Kamyonet",
    sub: "≤ 3 ton",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="8" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 10h4l2 4v3h-6V10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="6" cy="18.5" r="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="18" cy="18.5" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "Tır",
    sub: "20–40 ton",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="1" y="7" width="13" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 9h6l3 4v4H14V9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="5" cy="18.5" r="1.8" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="18" cy="18.5" r="1.8" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "Parsiyel",
    sub: "Paylaşımlı",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 12h18M12 6v13" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
      </svg>
    ),
  },
];

const CARGO_TYPES = [
  "Genel Yük",
  "Gıda",
  "Soğuk Zincir",
  "Tehlikeli Madde",
  "Makine / Ekipman",
  "İnşaat Malzemesi",
];

function getDistance(a, b) {
  const key1 = `${a.toLowerCase().trim()}-${b.toLowerCase().trim()}`;
  const key2 = `${b.toLowerCase().trim()}-${a.toLowerCase().trim()}`;
  return CITY_DIST[key1] || CITY_DIST[key2] || Math.floor(Math.random() * 600 + 150);
}

function getDuration(km) {
  for (const [limit, hours] of DURATIONS) {
    if (km <= limit) return hours;
  }
  return Math.round(km / 80);
}

function calcPrice(dist, vtype, weight) {
  const base = (BASE_RATES[vtype] || 7) * dist;
  let wMul = weight > 0 ? Math.max(1, weight / 5) : 1;
  if (vtype === "Parsiyel") wMul = Math.max(0.4, wMul * 0.5);
  const price = Math.round((base * wMul) / 100) * 100;
  const low = Math.round((price * 0.92) / 100) * 100;
  const high = Math.round((price * 1.08) / 100) * 100;
  return { price, low, high };
}

function fmt(n) {
  return new Intl.NumberFormat("tr-TR").format(n);
}

const QuotePage = ({ setPage }) => {
  const [origin, setOrigin] = useState("");
  const [dest, setDest] = useState("");
  const [cargoType, setCargoType] = useState("");
  const [weight, setWeight] = useState("");
  const [pallet, setPallet] = useState("");
  const [loadDate, setLoadDate] = useState("");
  const [vehicle, setVehicle] = useState("Kamyonet");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!origin.trim()) e.origin = "Çıkış noktası gerekli";
    if (!dest.trim()) e.dest = "Varış noktası gerekli";
    if (!weight || parseFloat(weight) <= 0) e.weight = "Ağırlık gerekli";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) {
      setErrors(e2);
      return;
    }
    setErrors({});
    setLoading(true);
    setResult(null);

    const delay = 1200 + Math.random() * 600;
    setTimeout(() => {
      const dist = getDistance(origin, dest);
      const dur = getDuration(dist);
      const w = parseFloat(weight) || 0;
      const { price, low, high } = calcPrice(dist, vehicle, w);
      setResult({ dist, dur, price, low, high });
      setLoading(false);
    }, delay);
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      setResult(null);
      setOrigin("");
      setDest("");
      setWeight("");
      setPallet("");
      setCargoType("");
      setLoadDate("");
      setVehicle("Kamyonet");
    }, 3500);
  };

  const handleNewQuote = () => {
    setResult(null);
    setErrors({});
  };

  if (confirmed) {
    return (
      <div className="qp-wrap">
        <Navigation currentPage="quote" setPage={setPage} />
        <div className="qp-inner">
          <div className="qp-success-screen">
            <div className="qp-success-icon">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M4 14l7 7L24 7" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="qp-success-title">Talebiniz Alındı!</h2>
            <p className="qp-success-sub">Uzman ekibimiz en kısa sürede sizinle iletişime geçecek.</p>
          </div>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="qp-wrap">
        <Navigation currentPage="quote" setPage={setPage} />
        <div className="qp-inner">
          <div className="qp-result-card">
            <div className="qp-result-header">
              <div className="qp-result-route">
                <span className="qp-result-city">{origin}</span>
                <span className="qp-result-arrow">
                  <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
                    <path d="M1 5h16M13 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="qp-result-city">{dest}</span>
              </div>
              <div className="qp-result-tags">
                <span className="qp-result-tag">{vehicle}</span>
                {cargoType && <span className="qp-result-tag">{cargoType}</span>}
                <span className="qp-result-tag">{fmt(result.dist)} km · ~{result.dur} saat</span>
              </div>
            </div>

            <div className="qp-result-price-block">
              <div className="qp-result-price-lbl">Tahmini Fiyat</div>
              <div className="qp-result-price">₺ {fmt(result.price)}</div>
              <div className="qp-result-range">
                ₺ {fmt(result.low)} – ₺ {fmt(result.high)} aralığında
              </div>
            </div>

            <div className="qp-result-stats">
              <div className="qp-result-stat">
                <div className="qp-result-stat-val">{fmt(result.dist)} km</div>
                <div className="qp-result-stat-lbl">Mesafe</div>
              </div>
              <div className="qp-result-stat-div" />
              <div className="qp-result-stat">
                <div className="qp-result-stat-val">~{result.dur} saat</div>
                <div className="qp-result-stat-lbl">Tahmini Süre</div>
              </div>
              <div className="qp-result-stat-div" />
              <div className="qp-result-stat">
                <div className="qp-result-stat-val">{parseFloat(weight)} ton</div>
                <div className="qp-result-stat-lbl">Ağırlık</div>
              </div>
            </div>

            <div className="qp-result-notice">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="#9e9a92" strokeWidth="1.2" />
                <path d="M7 6v4M7 4.5v.5" stroke="#9e9a92" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Fiyat tahminidir, kesin teklif için uzmanımız sizi arar.
            </div>

            <div className="qp-result-actions">
              <button className="qp-cta-primary" onClick={handleConfirm}>
                Teklifi Onayla
              </button>
              <button className="qp-cta-secondary" onClick={handleNewQuote}>
                Yeni Teklif Al
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="qp-wrap">
      <Navigation currentPage="quote" setPage={setPage} />

      <div className="qp-inner">
        <div className="qp-header">
          <h1 className="qp-title">Teklif Al</h1>
          <p className="qp-sub">Birkaç bilgi girin, anında fiyat öğrenin.</p>
        </div>

        <form className="qp-form-card" onSubmit={handleSubmit} noValidate>
          {/* LOKASYON */}
          <div className="qp-section">
            <div className="qp-section-lbl">Lokasyon</div>
            <div className="qp-loc-row">
              <div className={`qp-field${errors.origin ? " qp-field-err" : ""}`}>
                <label htmlFor="qp-origin">Çıkış Noktası</label>
                <input
                  id="qp-origin"
                  type="text"
                  autoComplete="off"
                  placeholder="İstanbul"
                  value={origin}
                  onChange={(e) => { setOrigin(e.target.value); setErrors((p) => ({ ...p, origin: undefined })); }}
                />
                {errors.origin && <span className="qp-err-msg">{errors.origin}</span>}
              </div>
              <div className="qp-loc-arrow">
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                  <path d="M1 5h14M11 1l4 4-4 4" stroke="#9e9a92" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className={`qp-field${errors.dest ? " qp-field-err" : ""}`}>
                <label htmlFor="qp-dest">Varış Noktası</label>
                <input
                  id="qp-dest"
                  type="text"
                  autoComplete="off"
                  placeholder="Ankara"
                  value={dest}
                  onChange={(e) => { setDest(e.target.value); setErrors((p) => ({ ...p, dest: undefined })); }}
                />
                {errors.dest && <span className="qp-err-msg">{errors.dest}</span>}
              </div>
            </div>
          </div>

          {/* YÜK BİLGİSİ */}
          <div className="qp-section">
            <div className="qp-section-lbl">Yük Bilgisi</div>

            <div className="qp-field" style={{ marginBottom: 14 }}>
              <label htmlFor="qp-cargo">Yük Tipi</label>
              <div className="qp-select-wrap">
                <select
                  id="qp-cargo"
                  value={cargoType}
                  onChange={(e) => setCargoType(e.target.value)}
                >
                  <option value="">Seçiniz</option>
                  {CARGO_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <span className="qp-select-arrow">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1l5 5 5-5" stroke="#9e9a92" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="qp-input-row">
              <div className={`qp-field${errors.weight ? " qp-field-err" : ""}`}>
                <label htmlFor="qp-weight">Ağırlık (ton)</label>
                <input
                  id="qp-weight"
                  type="number"
                  placeholder="0.0"
                  step="0.5"
                  min="0"
                  value={weight}
                  onChange={(e) => { setWeight(e.target.value); setErrors((p) => ({ ...p, weight: undefined })); }}
                />
                {errors.weight && <span className="qp-err-msg">{errors.weight}</span>}
              </div>
              <div className="qp-field">
                <label htmlFor="qp-pallet">
                  Palet / Adet{" "}
                  <span className="qp-lbl-opt">(opsiyonel)</span>
                </label>
                <input
                  id="qp-pallet"
                  type="number"
                  placeholder="Örn: 12"
                  value={pallet}
                  onChange={(e) => setPallet(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* ARAÇ TİPİ */}
          <div className="qp-section">
            <div className="qp-section-lbl">Araç Tipi</div>
            <div className="qp-vehicles">
              {VEHICLES.map((v) => (
                <div
                  key={v.id}
                  className={`qp-vehicle${vehicle === v.id ? " active" : ""}`}
                  onClick={() => setVehicle(v.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setVehicle(v.id)}
                  aria-pressed={vehicle === v.id}
                >
                  <div className="qp-vehicle-icon">{v.icon}</div>
                  <div className="qp-vehicle-name">{v.id}</div>
                  <div className="qp-vehicle-sub">{v.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* TARİH */}
          <div className="qp-section">
            <div className="qp-section-lbl">Tarih</div>
            <div className="qp-field">
              <label htmlFor="qp-date">Yükleme Tarihi <span className="qp-lbl-opt">(opsiyonel)</span></label>
              <div className="qp-date-wrap">
                <input
                  id="qp-date"
                  type="date"
                  value={loadDate}
                  onChange={(e) => setLoadDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button className={`qp-submit${loading ? " qp-submit-loading" : ""}`} type="submit" disabled={loading}>
            {loading ? (
              <span className="qp-submit-inner">
                <span className="qp-spinner" />
                Hesaplanıyor…
              </span>
            ) : (
              <span className="qp-submit-inner">
                Teklif Al
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuotePage;
