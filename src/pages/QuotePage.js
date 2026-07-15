import React, { useState, useRef, useEffect } from "react";
import Navigation from "../components/Navigation";
import { State, City } from "country-state-city";

/* ── Distance lookup (km) ── */
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

const BASE_RATES = { Kamyonet: 8, Tır: 6.2, Panelvan: 4.8 };

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
    id: "Panelvan",
    sub: "0–2 ton",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="6" width="20" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 6v8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="6" cy="18.5" r="1.8" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="18" cy="18.5" r="1.8" stroke="currentColor" strokeWidth="1.5" />
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

/* ── Turkish character normalization for search ── */
function trNorm(str) {
  return str
    .replace(/[İIı]/g, "i")
    .replace(/[Şş]/g, "s")
    .replace(/[Ğğ]/g, "g")
    .replace(/[Üü]/g, "u")
    .replace(/[Öö]/g, "o")
    .replace(/[Çç]/g, "c")
    .toLowerCase();
}

/* ── Geography helpers (country-state-city) ── */
const TR_STATES = State.getStatesOfCountry("TR");
const CITY_NAME_FIXES = { Istanbul: "İstanbul" };
const STATE_NAMES = TR_STATES.map((s) => CITY_NAME_FIXES[s.name] || s.name);

function getDistricts(cityName) {
  const state = TR_STATES.find((s) => (CITY_NAME_FIXES[s.name] || s.name) === cityName);
  if (!state) return [];
  return City.getCitiesOfState("TR", state.isoCode).map((c) => c.name);
}

/* ── Calc helpers ── */
function getDistance(a, b) {
  const k1 = `${trNorm(a).trim()}-${trNorm(b).trim()}`;
  const k2 = `${trNorm(b).trim()}-${trNorm(a).trim()}`;
  return CITY_DIST[k1] || CITY_DIST[k2] || Math.floor(Math.random() * 600 + 150);
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
  if (vtype === "Panelvan") wMul = Math.max(0.4, wMul * 0.5);
  const price = Math.round((base * wMul) / 100) * 100;
  return {
    price,
    low: Math.round((price * 0.92) / 100) * 100,
    high: Math.round((price * 1.08) / 100) * 100,
  };
}

function fmt(n) {
  return new Intl.NumberFormat("tr-TR").format(n);
}

/* Turkish phone formatting: 0(5xx)xxx xxxx */
function formatPhoneNumber(value) {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length <= 1) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 1)}(${digits.slice(1)}`;
  if (digits.length <= 7) return `${digits.slice(0, 1)}(${digits.slice(1, 4)})${digits.slice(4)}`;
  return `${digits.slice(0, 1)}(${digits.slice(1, 4)})${digits.slice(4, 7)} ${digits.slice(7, 11)}`;
}

/* ══════════════════════════════════════════
   COMBOBOX — arama destekli açılır liste
══════════════════════════════════════════ */
const ComboBox = ({ options, value, onChange, placeholder, disabled, hasError }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value || "");
  const containerRef = useRef(null);

  /* Dışarıdan value değiştiğinde (ör. il seçilince ilçe sıfırlanır) */
  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  /* Dışarı tıklanınca/dokunulunca kapat ve geçersiz girişi geri al */
  useEffect(() => {
    const onOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        if (query && !options.includes(query)) setQuery(value || "");
      }
    };
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("touchstart", onOutside, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("touchstart", onOutside);
    };
  }, [query, value, options]);

  const filtered = query
    ? options.filter((o) => trNorm(o).includes(trNorm(query)))
    : options;

  const LIMIT = 10;
  const visible = filtered.slice(0, LIMIT);
  const extra = filtered.length - LIMIT;

  const select = (opt) => {
    setQuery(opt);
    onChange(opt);
    setOpen(false);
  };

  return (
    <div
      className={[
        "qp-combo",
        hasError ? "qp-combo-err" : "",
        disabled ? "qp-combo-disabled" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      ref={containerRef}
    >
      <input
        type="text"
        className="qp-combo-input"
        placeholder={placeholder}
        value={query}
        disabled={disabled}
        autoComplete="off"
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          if (!e.target.value) onChange("");
        }}
        onFocus={() => { if (!disabled) setOpen(true); }}
        onKeyDown={(e) => {
          if (e.key === "Escape") { setOpen(false); setQuery(value || ""); }
          if (e.key === "Enter" && visible.length === 1) select(visible[0]);
          if (e.key === "Tab") setOpen(false);
        }}
      />
      <span className="qp-combo-chevron" aria-hidden="true">
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>

      {open && !disabled && (
        <ul className="qp-combo-list" role="listbox">
          {visible.length === 0 ? (
            <li className="qp-combo-empty">Sonuç bulunamadı</li>
          ) : (
            <>
              {visible.map((opt) => (
                <li
                  key={opt}
                  className={`qp-combo-item${opt === value ? " selected" : ""}`}
                  role="option"
                  aria-selected={opt === value}
                  onPointerDown={(e) => { if (e.pointerType === "mouse") e.preventDefault(); }}
                  onClick={() => select(opt)}
                >
                  {opt}
                </li>
              ))}
              {extra > 0 && (
                <li className="qp-combo-more">+{extra} il daha — aramaya devam edin</li>
              )}
            </>
          )}
        </ul>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
const QuotePage = ({ setPage }) => {
  const [originCity, setOriginCity] = useState("");
  const [originDistrict, setOriginDistrict] = useState("");
  const [destCity, setDestCity] = useState("");
  const [destDistrict, setDestDistrict] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [cargoType, setCargoType] = useState("");
  const [weight, setWeight] = useState("");
  const [pallet, setPallet] = useState("");
  const [loadDate, setLoadDate] = useState("");
  const [vehicle, setVehicle] = useState("Kamyonet");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState({});

  const originCityRef = useRef(null);
  const destCityRef = useRef(null);
  const cargoTypeRef = useRef(null);
  const weightRef = useRef(null);
  const contactNameRef = useRef(null);
  const contactPhoneRef = useRef(null);

  const originDistricts = getDistricts(originCity);
  const destDistricts = getDistricts(destCity);

  const originLabel = originDistrict ? `${originCity} / ${originDistrict}` : originCity;
  const destLabel = destDistrict ? `${destCity} / ${destDistrict}` : destCity;

  const clearErr = (key) => setErrors((p) => { const n = { ...p }; delete n[key]; return n; });

  const validate = () => {
    const e = {};
    if (!originCity) e.originCity = "Yükleme ili seçiniz";
    if (!destCity) e.destCity = "Teslimat ili seçiniz";
    if (originDistrict && destDistrict && originDistrict === destDistrict) {
      e.districtSame = "Yük alınan ve bırakılan yer ilçeleri farklı olmalı";
    }
    if (!weight || parseFloat(weight) <= 0) e.weight = "Ağırlık gerekli";
    if (!contactName.trim()) e.contactName = "Ad Soyad gerekli";
    if (!contactPhone.trim()) {
      e.contactPhone = "Telefon numarası gerekli";
    } else if (contactPhone.replace(/\D/g, "").length < 10) {
      e.contactPhone = "En az 10 haneli numara giriniz";
    }
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const ORDER = ["originCity", "destCity", "weight", "contactName", "contactPhone"];
      const REFS = { originCity: originCityRef, destCity: destCityRef, weight: weightRef, contactName: contactNameRef, contactPhone: contactPhoneRef };
      const firstErr = ORDER.find((k) => errs[k]);
      if (firstErr && REFS[firstErr].current) {
        REFS[firstErr].current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }
    setErrors({});
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const dist = getDistance(originCity, destCity);
      const dur = getDuration(dist);
      const w = parseFloat(weight) || 0;
      const { price, low, high } = calcPrice(dist, vehicle, w);
      setResult({ dist, dur, price, low, high });
      setLoading(false);
    }, 1200 + Math.random() * 600);
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      setResult(null);
      setOriginCity(""); setOriginDistrict("");
      setDestCity(""); setDestDistrict("");
      setContactName(""); setContactPhone("");
      setWeight(""); setPallet(""); setCargoType(""); setLoadDate("");
      setVehicle("Kamyonet");
    }, 3500);
  };

  const handleNewQuote = () => { setResult(null); setErrors({}); };

  /* ── Başarı ekranı ── */
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
            <p className="qp-success-sub">
              Uzman ekibimiz en kısa sürede <strong>{contactName}</strong> ile iletişime geçecek.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ── Sonuç kartı ── */
  if (result) {
    return (
      <div className="qp-wrap">
        <Navigation currentPage="quote" setPage={setPage} />
        <div className="qp-inner">
          <div className="qp-result-card">
            <div className="qp-result-header">
              <div className="qp-result-route">
                <span className="qp-result-city">{originLabel}</span>
                <span className="qp-result-arrow">
                  <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
                    <path d="M1 5h16M13 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="qp-result-city">{destLabel}</span>
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
              <div className="qp-result-range">₺ {fmt(result.low)} – ₺ {fmt(result.high)} aralığında</div>
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

            {/* İletişim özeti */}
            <div className="qp-result-contact">
              <div className="qp-result-contact-row">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M1.5 12.5c0-2.485 2.462-4.5 5.5-4.5s5.5 2.015 5.5 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <span>{contactName}</span>
              </div>
              <div className="qp-result-contact-row">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2.5A1.5 1.5 0 013.5 1h1a1.5 1.5 0 011.5 1.5v1A1.5 1.5 0 014.5 5H4a8 8 0 005 5v-.5A1.5 1.5 0 0110.5 8h1A1.5 1.5 0 0113 9.5v1A1.5 1.5 0 0111.5 12C6.253 12 2 7.747 2 2.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                </svg>
                <span>{contactPhone}</span>
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
              <button className="qp-cta-primary" onClick={handleConfirm}>Teklifi Onayla</button>
              <button className="qp-cta-secondary" onClick={handleNewQuote}>Yeni Teklif Al</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <div className="qp-wrap">
      <Navigation currentPage="quote" setPage={setPage} />

      <div className="qp-inner">
        <div className="qp-header">
          <h1 className="qp-title">Teklif Al</h1>
          <p className="qp-sub">Güzergah ve yük bilgilerini girin, anında fiyat öğrenin.</p>
        </div>

        <form className="qp-form-card" onSubmit={handleSubmit} noValidate>

          {/* ── LOKASYON ── */}
          <div className="qp-section">
            <div className="qp-section-lbl">Lokasyon</div>
            <div className="qp-loc-panels">

              {/* Yükleme */}
              <div className={`qp-loc-panel${(errors.originCity || errors.originDistrict) ? " qp-loc-panel-err" : ""}`}>
                <div className="qp-loc-panel-title">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <circle cx="6.5" cy="5.5" r="2" stroke="currentColor" strokeWidth="1.3" />
                    <path d="M6.5 1C4.015 1 2 3.015 2 5.5c0 3.375 4.5 6.5 4.5 6.5s4.5-3.125 4.5-6.5C11 3.015 8.985 1 6.5 1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                  </svg>
                  Yük Alınacak Yer
                </div>

                <div ref={originCityRef} className={`qp-field${errors.originCity ? " qp-field-err" : ""}`}>
                  <label htmlFor="qp-origin-city">İl</label>
                  <ComboBox
                    options={STATE_NAMES}
                    value={originCity}
                    onChange={(v) => { setOriginCity(v); setOriginDistrict(""); clearErr("originCity"); }}
                    placeholder="İl seçin"
                    hasError={!!errors.originCity}
                  />
                  {errors.originCity && <span className="qp-err-msg">{errors.originCity}</span>}
                </div>

                <div className="qp-field">
                  <label>İlçe <span className="qp-lbl-opt">(opsiyonel)</span></label>
                  <ComboBox
                    options={originDistricts}
                    value={originDistrict}
                    onChange={setOriginDistrict}
                    placeholder={originCity ? "İlçe seçin" : "Önce il seçin"}
                    disabled={!originCity}
                  />
                </div>
              </div>

              {/* Ayırıcı ok */}
              <div className="qp-loc-divider" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Teslimat */}
              <div className={`qp-loc-panel${(errors.destCity || errors.destDistrict) ? " qp-loc-panel-err" : ""}`}>
                <div className="qp-loc-panel-title">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M6.5 11.5L2 6.5h9L6.5 11.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                    <path d="M6.5 1.5v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  Yük Bırakılacak Yer
                </div>

                <div ref={destCityRef} className={`qp-field${errors.destCity ? " qp-field-err" : ""}`}>
                  <label htmlFor="qp-dest-city">İl</label>
                  <ComboBox
                    options={STATE_NAMES}
                    value={destCity}
                    onChange={(v) => { setDestCity(v); setDestDistrict(""); clearErr("destCity"); }}
                    placeholder="İl seçin"
                    hasError={!!errors.destCity}
                  />
                  {errors.destCity && <span className="qp-err-msg">{errors.destCity}</span>}
                </div>

                <div className="qp-field">
                  <label>İlçe <span className="qp-lbl-opt">(opsiyonel)</span></label>
                  <ComboBox
                    options={destDistricts}
                    value={destDistrict}
                    onChange={setDestDistrict}
                    placeholder={destCity ? "İlçe seçin" : "Önce il seçin"}
                    disabled={!destCity}
                  />
                </div>
              </div>
            </div>
            {errors.districtSame && (
              <span className="qp-err-msg" style={{ display: "block", marginTop: 8 }}>
                {errors.districtSame}
              </span>
            )}
          </div>

          {/* ── YÜK BİLGİSİ ── */}
          <div className="qp-section">
            <div className="qp-section-lbl">Yük Bilgisi</div>

            <div ref={cargoTypeRef} className="qp-field" style={{ marginBottom: 14 }}>
              <label htmlFor="qp-cargo">Yük Tipi <span className="qp-lbl-opt">(opsiyonel)</span></label>
              <ComboBox
                options={CARGO_TYPES}
                value={cargoType}
                onChange={setCargoType}
                placeholder="Yük tipi seçin"
              />
            </div>

            <div className="qp-input-row">
              <div ref={weightRef} className={`qp-field${errors.weight ? " qp-field-err" : ""}`}>
                <label htmlFor="qp-weight">Ağırlık (ton)</label>
                <input
                  id="qp-weight"
                  type="number"
                  inputMode="decimal"
                  placeholder="0.0"
                  step="0.5"
                  min="0"
                  value={weight}
                  onChange={(e) => { setWeight(e.target.value); clearErr("weight"); }}
                />
                {errors.weight && <span className="qp-err-msg">{errors.weight}</span>}
              </div>
              <div className="qp-field">
                <label htmlFor="qp-pallet">Palet / Adet <span className="qp-lbl-opt">(opsiyonel)</span></label>
                <input id="qp-pallet" type="number" inputMode="numeric" placeholder="Örn: 12" value={pallet} onChange={(e) => setPallet(e.target.value)} />
              </div>
            </div>
          </div>

          {/* ── ARAÇ TİPİ ── */}
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

          {/* ── TARİH ── */}
          <div className="qp-section">
            <div className="qp-section-lbl">Tarih</div>
            <div className="qp-field">
              <label htmlFor="qp-date">Yükleme Tarihi <span className="qp-lbl-opt">(opsiyonel)</span></label>
              <div className="qp-date-wrap">
                <input id="qp-date" type="date" value={loadDate} onChange={(e) => setLoadDate(e.target.value)} />
              </div>
            </div>
          </div>

          {/* ── İLETİŞİM ── */}
          <div className="qp-section">
            <div className="qp-section-lbl">İletişim</div>
            <div className="qp-contact-row">
              <div ref={contactNameRef} className={`qp-field${errors.contactName ? " qp-field-err" : ""}`}>
                <label htmlFor="qp-contact-name">Yetkili Kişi</label>
                <input
                  id="qp-contact-name"
                  type="text"
                  placeholder="Ad Soyad"
                  autoComplete="name"
                  value={contactName}
                  onChange={(e) => { setContactName(e.target.value); clearErr("contactName"); }}
                />
                {errors.contactName && <span className="qp-err-msg">{errors.contactName}</span>}
              </div>

              <div ref={contactPhoneRef} className={`qp-field${errors.contactPhone ? " qp-field-err" : ""}`}>
                <label htmlFor="qp-contact-phone">Telefon Numarası</label>
                <input
                  id="qp-contact-phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="0(5xx)xxx xxxx"
                  autoComplete="tel"
                  value={contactPhone}
                  onChange={(e) => {
                    const formatted = formatPhoneNumber(e.target.value);
                    setContactPhone(formatted);
                    clearErr("contactPhone");
                  }}
                />
                {errors.contactPhone && <span className="qp-err-msg">{errors.contactPhone}</span>}
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
