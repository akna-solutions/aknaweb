import React, { useState, useEffect, useRef } from "react";
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
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect
          x="2"
          y="8"
          width="14"
          height="9"
          rx="2"
          stroke="#9C8E76"
          strokeWidth="1.5"
        />
        <path
          d="M16 10h4l2 4v3h-6V10z"
          stroke="#9C8E76"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="6" cy="18.5" r="2" stroke="#9C8E76" strokeWidth="1.5" />
        <circle cx="18" cy="18.5" r="2" stroke="#9C8E76" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "Tır",
    sub: "20–40 ton",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect
          x="1"
          y="7"
          width="13"
          height="10"
          rx="1.5"
          stroke="#9C8E76"
          strokeWidth="1.5"
        />
        <path
          d="M14 9h6l3 4v4H14V9z"
          stroke="#9C8E76"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="5" cy="18.5" r="1.8" stroke="#9C8E76" strokeWidth="1.5" />
        <circle cx="18" cy="18.5" r="1.8" stroke="#9C8E76" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "Parsiyel",
    sub: "Paylaşımlı",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="6"
          width="18"
          height="13"
          rx="2"
          stroke="#9C8E76"
          strokeWidth="1.5"
        />
        <path
          d="M3 12h18M12 6v13"
          stroke="#9C8E76"
          strokeWidth="1.2"
          strokeDasharray="2 2"
        />
      </svg>
    ),
  },
];

function getDistance(a, b) {
  const key1 = `${a.toLowerCase().trim()}-${b.toLowerCase().trim()}`;
  const key2 = `${b.toLowerCase().trim()}-${a.toLowerCase().trim()}`;
  return (
    CITY_DIST[key1] || CITY_DIST[key2] || Math.floor(Math.random() * 600 + 150)
  );
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
  return Math.round((base * wMul) / 100) * 100;
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
  const [quoteData, setQuoteData] = useState(null);
  const [fillWidth, setFillWidth] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const debounceRef = useRef(null);

  const compute = () => {
    if (!origin.trim() || !dest.trim()) {
      setQuoteData(null);
      return;
    }
    const dist = getDistance(origin, dest);
    const dur = getDuration(dist);
    const w = parseFloat(weight) || 0;
    const price = calcPrice(dist, vehicle, w);
    const progress = Math.min(100, Math.round((dist / 1000) * 100));
    setQuoteData({ dist, dur, price, progress });
    setTimeout(() => setFillWidth(progress), 80);
  };

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(compute, 320);
    return () => clearTimeout(debounceRef.current);
  }, [origin, dest, weight, vehicle]);

  useEffect(() => {
    if (!quoteData) setFillWidth(0);
  }, [quoteData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    compute();
  };

  const handleConfirm = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setOrigin("");
      setDest("");
      setWeight("");
      setPallet("");
      setCargoType("");
      setLoadDate("");
      setVehicle("Kamyonet");
      setQuoteData(null);
    }, 3000);
  };

  return (
    <div className="qp-wrap">
      <Navigation currentPage="quote" setPage={setPage} />

      <div className="qp-inner">
        <div className="qp-header">
          <h1 className="qp-title">Yeni Teklif Oluştur</h1>
          <p className="qp-sub">
            Yük bilgilerini girin, sistem otomatik fiyat hesaplasın.
          </p>
        </div>

        <div className="qp-grid">
          {/* ── FORM ── */}
          <form className="qp-form-card" onSubmit={handleSubmit} noValidate>
            <div className="qp-section">
              <div className="qp-section-lbl">Lokasyon</div>
              <div className="qp-loc-row">
                <div className="qp-loc-field">
                  <label htmlFor="qp-origin">Çıkış Noktası</label>
                  <input
                    id="qp-origin"
                    type="text"
                    autoComplete="off"
                    placeholder="İstanbul"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                  />
                </div>
                <div className="qp-loc-arrow">→</div>
                <div className="qp-loc-field">
                  <label htmlFor="qp-dest">Varış Noktası</label>
                  <input
                    id="qp-dest"
                    type="text"
                    autoComplete="off"
                    placeholder="Ankara"
                    value={dest}
                    onChange={(e) => setDest(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="qp-section">
              <div className="qp-section-lbl">Yük Bilgisi</div>
              <div className="qp-input-row">
                <div className="qp-field">
                  <label htmlFor="qp-cargo">Yük Tipi</label>
                  <select
                    id="qp-cargo"
                    value={cargoType}
                    onChange={(e) => setCargoType(e.target.value)}
                  >
                    <option value="">Seçiniz</option>
                    <option>Genel Yük</option>
                    <option>Gıda</option>
                    <option>Tehlikeli Madde</option>
                    <option>Soğuk Zincir</option>
                    <option>Makine / Ekipman</option>
                    <option>İnşaat Malzemesi</option>
                  </select>
                </div>
                <div className="qp-field">
                  <label htmlFor="qp-weight">Ağırlık (ton)</label>
                  <input
                    id="qp-weight"
                    type="number"
                    placeholder="0.0"
                    step="0.5"
                    min="0"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
              </div>
              <div style={{ marginTop: "14px" }}>
                <div className="qp-field">
                  <label htmlFor="qp-pallet">
                    Palet / Adet{" "}
                    <span style={{ fontWeight: 400, color: "#8B8880" }}>
                      (opsiyonel)
                    </span>
                  </label>
                  <input
                    id="qp-pallet"
                    type="number"
                    placeholder="Örn: 12"
                    value={pallet}
                    onChange={(e) => setPallet(e.target.value)}
                  />
                  <span className="qp-field-hint">Paket veya birim sayısı</span>
                </div>
              </div>
            </div>

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

            <div className="qp-section">
              <div className="qp-section-lbl">Tarih</div>
              <div className="qp-field">
                <label htmlFor="qp-date">Yükleme Tarihi</label>
                <input
                  id="qp-date"
                  type="date"
                  value={loadDate}
                  onChange={(e) => setLoadDate(e.target.value)}
                />
              </div>
            </div>

            <button className="qp-submit" type="submit">
              Teklifi Hesapla
            </button>
          </form>

          {/* ── PANEL ── */}
          <div className="qp-panel">
            <div className="qp-panel-head">
              <span className="qp-panel-title">Teklif Özeti</span>
              <span className="qp-panel-status">
                <span className="qp-dot-live"></span>
                {quoteData ? "Canlı fiyatlama aktif" : "Bilgi bekleniyor"}
              </span>
            </div>

            {submitted ? (
              <div className="qp-empty">
                <div
                  className="qp-empty-icon"
                  style={{
                    background: "rgba(34,197,94,0.13)",
                    borderColor: "rgba(34,197,94,0.25)",
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path
                      d="M3 11l5.5 5.5L19 6"
                      stroke="#22c55e"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="qp-empty-title">Talebiniz Alındı!</div>
                <div className="qp-empty-sub">
                  En kısa sürede size geri dönüş yapacağız.
                </div>
              </div>
            ) : quoteData ? (
              <>
                <div className="qp-panel-body">
                  <div className="qp-route">
                    <div className="qp-route-cities">
                      <div className="qp-route-city">{origin}</div>
                      <div className="qp-route-mid">
                        <div className="qp-route-bar">
                          <div
                            className="qp-route-fill"
                            style={{ width: `${fillWidth}%` }}
                          ></div>
                        </div>
                        <div className="qp-route-dist">
                          {fmt(quoteData.dist)} km
                        </div>
                      </div>
                      <div
                        className="qp-route-city"
                        style={{ textAlign: "right" }}
                      >
                        {dest}
                      </div>
                    </div>
                    <div className="qp-route-meta">
                      <div className="qp-meta">
                        <div className="qp-meta-lbl">Araç</div>
                        <div className="qp-meta-val">{vehicle}</div>
                      </div>
                      <div className="qp-meta">
                        <div className="qp-meta-lbl">Mesafe</div>
                        <div className="qp-meta-val">
                          {fmt(quoteData.dist)} km
                        </div>
                      </div>
                      <div className="qp-meta">
                        <div className="qp-meta-lbl">Süre</div>
                        <div className="qp-meta-val">~{quoteData.dur} saat</div>
                      </div>
                    </div>
                  </div>

                  <div className="qp-price-block">
                    <div className="qp-price-top">
                      <span className="qp-price-lbl">Tahmini Teklif</span>
                      <span className="qp-price-ai">AI fiyatlaması</span>
                    </div>
                    <div className="qp-price-main">
                      ₺ {fmt(quoteData.price)}
                    </div>
                    <div className="qp-price-sub">
                      {cargoType ? `${cargoType} · ` : ""}
                      {vehicle} · {fmt(quoteData.dist)} km
                    </div>
                  </div>

                  <div className="qp-mini-grid">
                    <div className="qp-mini">
                      <div className="qp-mini-lbl">Aktif Sevkiyat</div>
                      <div className="qp-mini-val">247</div>
                      <div className="qp-mini-sub">
                        <span className="qp-badge-g">+12</span>bugün
                      </div>
                    </div>
                    <div className="qp-mini">
                      <div className="qp-mini-lbl">Uygun Araç</div>
                      <div className="qp-mini-val">83</div>
                      <div className="qp-mini-sub">bölgede hazır</div>
                    </div>
                    <div className="qp-mini">
                      <div className="qp-mini-lbl">Canlı Konum</div>
                      <div
                        className="qp-mini-val"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <span
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            background: "#22c55e",
                            display: "inline-block",
                            flexShrink: 0,
                          }}
                        ></span>
                        Aktif
                      </div>
                      <div className="qp-mini-sub">GPS açık</div>
                    </div>
                    <div className="qp-mini">
                      <div className="qp-mini-lbl">Teklif Süresi</div>
                      <div className="qp-mini-val">&lt; 2 dk</div>
                      <div className="qp-mini-sub">ort. yanıt</div>
                    </div>
                  </div>
                </div>

                <div className="qp-panel-cta">
                  <button
                    className="qp-cta-primary"
                    type="button"
                    onClick={handleConfirm}
                  >
                    Teklifi Onayla
                  </button>
                  <button
                    className="qp-cta-secondary"
                    type="button"
                    onClick={handleConfirm}
                  >
                    Talep Gönder
                  </button>
                </div>
              </>
            ) : (
              <div className="qp-empty">
                <div className="qp-empty-icon">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path
                      d="M2 11a9 9 0 1 0 18 0A9 9 0 0 0 2 11z"
                      stroke="#D8C7A8"
                      strokeWidth="1.3"
                    />
                    <path
                      d="M11 7v4l2.5 2.5"
                      stroke="#D8C7A8"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="qp-empty-title">Fiyat hesaplamaya hazır</div>
                <div className="qp-empty-sub">
                  Çıkış noktası, varış ve araç tipini girin. Sistem otomatik
                  teklif üretir.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotePage;
