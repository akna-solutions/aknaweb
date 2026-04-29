import React, { useState, useEffect, useCallback } from "react";

// ─────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────
const API_BASE = "http://192.168.0.194:5001";

// ─────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────
function formatDate(iso) {
  if (!iso) return null;
  try {
    return new Intl.DateTimeFormat("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function formatDateShort(iso) {
  if (!iso) return null;
  try {
    return new Intl.DateTimeFormat("tr-TR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function getStatus(load) {
  if (load.completedAt)
    return {
      key: "completed",
      label: "Tamamlandı",
      cls: "lt-status--completed",
    };
  if (load.matchedAt)
    return { key: "transit", label: "Yolda", cls: "lt-status--transit" };
  if (load.matchedUserId)
    return { key: "matched", label: "Planlandı", cls: "lt-status--matched" };
  if (load.publishedAt)
    return {
      key: "published",
      label: "Yayınlandı",
      cls: "lt-status--published",
    };
  return { key: "created", label: "Kaydedildi", cls: "lt-status--published" };
}

function getStopTypeLabel(type) {
  const map = { 0: "Yükleme Noktası", 1: "Teslimat Noktası", 2: "Ara Durak" };
  return map[type] ?? "Durak";
}

function getStopTypeCls(type) {
  const map = {
    0: "lt-stop-type--pickup",
    1: "lt-stop-type--delivery",
    2: "lt-stop-type--waypoint",
  };
  return map[type] ?? "";
}

function calcProgress(stops) {
  if (!stops || stops.length === 0) return 0;
  const done = stops.filter((s) => s.completedAt).length;
  return Math.round((done / stops.length) * 100);
}

function normalizeLoad(raw) {
  if (!raw) return null;
  const stops = (raw.loadStops || raw.LoadStops || [])
    .map((s) => ({
      stopType: s.stopType ?? s.StopType ?? 0,
      stopOrder: s.stopOrder ?? s.StopOrder ?? 0,
      contactPersonName: s.contactPersonName ?? s.ContactPersonName ?? null,
      contactPhone: s.contactPhone ?? s.ContactPhone ?? null,
      address: s.address ?? s.Address ?? "",
      city: s.city ?? s.City ?? "",
      district: s.district ?? s.District ?? "",
      country: s.country ?? s.Country ?? "",
      completedAt: s.completedAt ?? s.CompletedAt ?? null,
    }))
    .sort((a, b) => a.stopOrder - b.stopOrder);

  return {
    title: raw.title ?? raw.Title ?? "Yük",
    description: raw.description ?? raw.Description ?? null,
    weight: raw.weight ?? raw.Weight ?? null,
    volume: raw.volume ?? raw.Volume ?? null,
    totalDistanceKm: raw.totalDistanceKm ?? raw.TotalDistanceKm ?? null,
    contactPersonName: raw.contactPersonName ?? raw.ContactPersonName ?? null,
    contactPhone: raw.contactPhone ?? raw.ContactPhone ?? null,
    contactEmail: raw.contactEmail ?? raw.ContactEmail ?? null,
    publishedAt: raw.publishedAt ?? raw.PublishedAt ?? null,
    matchedAt: raw.matchedAt ?? raw.MatchedAt ?? null,
    completedAt: raw.completedAt ?? raw.CompletedAt ?? null,
    matchedUserId: raw.matchedUserId ?? raw.MatchedUserId ?? null,
    latitude: raw.latitude ?? raw.Latitude ?? null,
    longitude: raw.longitude ?? raw.Longitude ?? null,
    loadStops: stops,
  };
}

// ─────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────

const StatusBadge = ({ load }) => {
  const status = getStatus(load);
  return (
    <span className={`lt-status-badge ${status.cls}`} role="status">
      <span className="lt-status-dot" />
      {status.label}
    </span>
  );
};

const HeroSection = ({ load }) => {
  const stops = load.loadStops || [];
  const statsData = [
    {
      label: "Toplam Mesafe",
      value: load.totalDistanceKm
        ? `${Number(load.totalDistanceKm).toLocaleString("tr-TR")} km`
        : null,
    },
    {
      label: "Ağırlık",
      value: load.weight
        ? `${Number(load.weight).toLocaleString("tr-TR")} kg`
        : null,
    },
    {
      label: "Hacim",
      value: load.volume
        ? `${Number(load.volume).toLocaleString("tr-TR")} m³`
        : null,
    },
    {
      label: "Yayın Tarihi",
      value: load.publishedAt ? formatDateShort(load.publishedAt) : null,
    },
  ].filter((s) => s.value);

  return (
    <section className="lt-hero" aria-labelledby="lt-load-title">
      <div className="lt-hero__top">
        <div className="lt-hero__copy">
          <div className="lt-hero__meta">Yük Başlığı</div>
          <h1 className="lt-hero__title" id="lt-load-title">
            {load.title}
          </h1>
          {load.description && (
            <p className="lt-hero__desc">{load.description}</p>
          )}
        </div>
        <StatusBadge load={load} />
      </div>

      {statsData.length > 0 && (
        <div
          className="lt-hero__stats"
          style={{ gridTemplateColumns: `repeat(${statsData.length}, 1fr)` }}
        >
          {statsData.map((s) => (
            <div className="lt-hero__stat" key={s.label}>
              <div className="lt-hero__stat-label">{s.label}</div>
              <div className="lt-hero__stat-value">{s.value}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

const RouteBanner = ({ load }) => {
  const stops = load.loadStops || [];
  const firstStop = stops[0];
  const lastStop = stops[stops.length - 1];
  const progress = calcProgress(stops);

  if (!firstStop || !lastStop || firstStop === lastStop) return null;

  return (
    <div className="lt-route-banner" aria-label="Rota bilgisi">
      <span className="lt-route-city">{firstStop.city}</span>
      <div className="lt-route-mid">
        <div className="lt-route-line">
          <div className="lt-route-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="lt-route-pct">
          {progress > 0 ? `%${progress} tamamlandı` : "Başlamadı"}
        </span>
      </div>
      <span className="lt-route-city lt-route-city--right">
        {lastStop.city}
      </span>
    </div>
  );
};

const TimelineSection = ({ load }) => {
  const stops = load.loadStops || [];
  const completedStops = stops.filter((s) => s.completedAt).length;

  const steps = [
    {
      key: "created",
      label: "Kayıt",
      name: "Yük Kaydı Oluşturuldu",
      time: load.publishedAt,
      done: !!load.publishedAt,
      active: !!load.publishedAt && !load.matchedAt && !load.completedAt,
    },
    {
      key: "matched",
      label: "Eşleşme",
      name: load.matchedAt ? "Taşıyıcı Eşleşti" : "Taşıyıcı Bekleniyor",
      time: load.matchedAt,
      done: !!load.matchedAt,
      active: !!load.matchedAt && !load.completedAt,
    },
    {
      key: "transit",
      label: "Taşıma",
      name: load.completedAt
        ? "Teslimat Tamamlandı"
        : load.matchedAt
          ? "Yük Yolda"
          : "Yola Çıkış Bekleniyor",
      time: load.matchedAt,
      done: !!load.matchedAt,
      active: !!load.matchedAt && !load.completedAt,
    },
    {
      key: "stops",
      label: "Duraklar",
      name: `${completedStops} / ${stops.length} Durak Tamamlandı`,
      time: null,
      done: stops.length > 0 && completedStops === stops.length,
      active: completedStops > 0 && completedStops < stops.length,
    },
    {
      key: "done",
      label: "Teslim",
      name: load.completedAt ? "Yük Teslim Edildi" : "Teslimat Bekleniyor",
      time: load.completedAt,
      done: !!load.completedAt,
      active: false,
    },
  ];

  const doneCount = steps.filter((s) => s.done).length;

  return (
    <article className="lt-card" aria-labelledby="lt-progress-title">
      <div className="lt-card__head">
        <h2 className="lt-card__title" id="lt-progress-title">
          Süreç Akışı
        </h2>
        <span
          className={`lt-card__badge ${
            doneCount === steps.length ? "lt-badge-green" : "lt-badge-grey"
          }`}
        >
          {doneCount} / {steps.length} adım
        </span>
      </div>
      <div className="lt-divider" />

      <div className="lt-timeline" role="list">
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          let dotCls = "lt-tl-dot--pending";
          let labelCls = "";
          let nameCls = "lt-tl-name--pending";

          if (step.done) {
            dotCls = "lt-tl-dot--done";
            nameCls = "";
          } else if (step.active) {
            dotCls = "lt-tl-dot--active";
            labelCls = "lt-tl-label--active";
            nameCls = "";
          }

          return (
            <div className="lt-tl-item" role="listitem" key={step.key}>
              <div className="lt-tl-left" aria-hidden="true">
                <div className={`lt-tl-dot ${dotCls}`}>
                  {step.done ? (
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path
                        d="M2 6.5l3.5 3.5 5.5-6"
                        stroke="#F5F3EE"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : step.active ? (
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <circle
                        cx="6.5"
                        cy="6.5"
                        r="5"
                        stroke="#D8C7A8"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M6.5 3.5V6.5L8.5 8"
                        stroke="#D8C7A8"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                      <circle cx="3.5" cy="3.5" r="3" fill="#9E9A92" />
                    </svg>
                  )}
                </div>
                {!isLast && (
                  <div
                    className={`lt-tl-line ${step.done ? "lt-tl-line--done" : ""}`}
                  />
                )}
              </div>
              <div className="lt-tl-content">
                <div className={`lt-tl-label ${labelCls}`}>{step.label}</div>
                <div className={`lt-tl-name ${nameCls}`}>{step.name}</div>
                {step.time && (
                  <div className="lt-tl-time">{formatDate(step.time)}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
};

const StopsSection = ({ load }) => {
  const stops = load.loadStops || [];
  const completedCount = stops.filter((s) => s.completedAt).length;

  return (
    <article className="lt-card" aria-labelledby="lt-stops-title">
      <div className="lt-card__head">
        <h2 className="lt-card__title" id="lt-stops-title">
          Duraklar ve Rota
        </h2>
        <span
          className={`lt-card__badge ${
            completedCount === stops.length && stops.length > 0
              ? "lt-badge-green"
              : completedCount > 0
                ? "lt-badge-amber"
                : "lt-badge-grey"
          }`}
        >
          {completedCount}/{stops.length} tamamlandı
        </span>
      </div>
      <div className="lt-divider" />

      <div className="lt-stops" role="list">
        {stops.length === 0 ? (
          <div className="lt-empty-text">Durak bilgisi henüz eklenmemiş.</div>
        ) : (
          stops.map((stop, idx) => {
            const isDone = !!stop.completedAt;
            const isActive =
              !isDone && idx === stops.findIndex((s) => !s.completedAt);
            const isLast = idx === stops.length - 1;
            let numCls = isDone
              ? "lt-stop-num--done"
              : isActive
                ? "lt-stop-num--active"
                : "lt-stop-num--pending";

            return (
              <div
                className={`lt-stop-card ${isDone ? "lt-stop-card--done" : ""}`}
                role="listitem"
                key={idx}
              >
                <div className="lt-stop-num-wrap" aria-hidden="true">
                  <div className={`lt-stop-num ${numCls}`}>
                    {stop.stopOrder}
                  </div>
                  {!isLast && <div className="lt-stop-connector" />}
                </div>

                <div className="lt-stop-body">
                  <div
                    className={`lt-stop-type ${getStopTypeCls(stop.stopType)}`}
                  >
                    {getStopTypeLabel(stop.stopType)}
                  </div>
                  <div className="lt-stop-city">
                    {stop.city}
                    {stop.district ? `, ${stop.district}` : ""}
                  </div>
                  <div className="lt-stop-addr">
                    {stop.address}
                    {stop.country && stop.country !== "Türkiye"
                      ? `, ${stop.country}`
                      : ""}
                  </div>
                  <div className="lt-stop-meta">
                    {stop.contactPersonName && (
                      <span className="lt-stop-contact">
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 13 13"
                          fill="none"
                        >
                          <circle
                            cx="6.5"
                            cy="4.5"
                            r="2"
                            stroke="#6F6B63"
                            strokeWidth="1.1"
                          />
                          <path
                            d="M2 11c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4"
                            stroke="#6F6B63"
                            strokeWidth="1.1"
                            strokeLinecap="round"
                          />
                        </svg>
                        {stop.contactPersonName}
                      </span>
                    )}
                    {stop.contactPhone && (
                      <span className="lt-stop-contact">
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 13 13"
                          fill="none"
                        >
                          <rect
                            x="3.5"
                            y="1"
                            width="6"
                            height="11"
                            rx="1"
                            stroke="#6F6B63"
                            strokeWidth="1.1"
                          />
                          <circle cx="6.5" cy="10" r=".6" fill="#6F6B63" />
                        </svg>
                        <a href={`tel:${stop.contactPhone}`}>
                          {stop.contactPhone}
                        </a>
                      </span>
                    )}
                    {isDone ? (
                      <span className="lt-stop-done-tag">
                        ✓ {formatDateShort(stop.completedAt)}
                      </span>
                    ) : isActive ? (
                      <span className="lt-stop-pending-tag">Bekleniyor</span>
                    ) : (
                      <span className="lt-stop-pending-tag">Planlandı</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </article>
  );
};

const LocationSection = ({ load }) => (
  <article className="lt-card" aria-labelledby="lt-location-title">
    <div className="lt-card__head">
      <h2 className="lt-card__title" id="lt-location-title">
        Güncel Konum
      </h2>
    </div>
    <div className="lt-divider" />

    <div className="lt-loc-body">
      {load.latitude && load.longitude ? (
        <>
          <div
            className="lt-loc-map"
            role="img"
            aria-label="Harita placeholder alanı"
          >
            <div className="lt-loc-map-grid" aria-hidden="true" />
            <div className="lt-loc-map-icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1a5 5 0 0 1 5 5c0 4-5 9-5 9S3 10 3 6a5 5 0 0 1 5-5z"
                  stroke="#9E9A92"
                  strokeWidth="1.2"
                />
                <circle cx="8" cy="6" r="1.5" fill="#9E9A92" />
              </svg>
            </div>
            <p className="lt-loc-map-text">Canlı Konum Aktif</p>
            <p className="lt-loc-map-sub">
              Harita entegrasyonu için aktif edin
            </p>
          </div>

          <div className="lt-loc-coords">
            <div className="lt-loc-coord">
              <div className="lt-loc-coord-label">Enlem</div>
              <div className="lt-loc-coord-val">
                {Number(load.latitude).toFixed(6)}
              </div>
            </div>
            <div className="lt-loc-coord">
              <div className="lt-loc-coord-label">Boylam</div>
              <div className="lt-loc-coord-val">
                {Number(load.longitude).toFixed(6)}
              </div>
            </div>
          </div>

          <div className="lt-loc-live" role="status">
            <span className="lt-loc-live-dot" />
            Konum bilgisi mevcut
          </div>
        </>
      ) : (
        <div className="lt-empty-text">Konum bilgisi henüz paylaşılmadı.</div>
      )}
    </div>
  </article>
);

const ContactSection = ({ load }) => {
  const hasContact =
    load.contactPersonName || load.contactPhone || load.contactEmail;

  return (
    <article className="lt-card" aria-labelledby="lt-contact-title">
      <div className="lt-card__head">
        <h2 className="lt-card__title" id="lt-contact-title">
          İletişim Kişisi
        </h2>
      </div>
      <div className="lt-divider" />

      <div className="lt-contact-body">
        {!hasContact ? (
          <div className="lt-empty-text">İletişim bilgisi girilmemiş.</div>
        ) : (
          <>
            {load.contactPersonName && (
              <div className="lt-contact-row">
                <div className="lt-contact-icon" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <circle
                      cx="7.5"
                      cy="5.5"
                      r="2.5"
                      stroke="#6F6B63"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M2 13c0-3 2.5-5 5.5-5s5.5 2 5.5 5"
                      stroke="#6F6B63"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="lt-contact-info">
                  <label>İletişim Kişisi</label>
                  <span>{load.contactPersonName}</span>
                </div>
              </div>
            )}
            {load.contactPhone && (
              <div className="lt-contact-row">
                <div className="lt-contact-icon" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <rect
                      x="4"
                      y="1"
                      width="7"
                      height="13"
                      rx="1.5"
                      stroke="#6F6B63"
                      strokeWidth="1.2"
                    />
                    <circle cx="7.5" cy="12" r=".75" fill="#6F6B63" />
                  </svg>
                </div>
                <div className="lt-contact-info">
                  <label>Telefon</label>
                  <a href={`tel:${load.contactPhone}`}>{load.contactPhone}</a>
                </div>
              </div>
            )}
            {load.contactEmail && (
              <div className="lt-contact-row">
                <div className="lt-contact-icon" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <rect
                      x="1.5"
                      y="3.5"
                      width="12"
                      height="9"
                      rx="1.5"
                      stroke="#6F6B63"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M1.5 5l6 4.5 6-4.5"
                      stroke="#6F6B63"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="lt-contact-info">
                  <label>E-posta</label>
                  <a href={`mailto:${load.contactEmail}`}>
                    {load.contactEmail}
                  </a>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </article>
  );
};

// ─────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────
const LoadTrackingPage = ({ accessToken }) => {
  const [load, setLoad] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const fetchLoad = useCallback(async () => {
    if (!accessToken) {
      setErrorMsg(
        "Geçerli bir takip bağlantısı bulunamadı. Lütfen size gönderilen bağlantıyı kullanın.",
      );
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch(`${API_BASE}/api/load/by-token`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Sunucu hatası (${res.status})`);
      }

      const data = await res.json();

      if (!data.isSuccess) {
        throw new Error(data.message || "Yük bilgisi alınamadı.");
      }

      const normalized = normalizeLoad(data.load);
      if (!normalized) throw new Error("Yük verisi işlenemedi.");

      setLoad(normalized);
      setStatus("success");
    } catch (err) {
      setErrorMsg(
        err.message || "Bağlantı hatası. Lütfen daha sonra tekrar deneyiniz.",
      );
      setStatus("error");
    }
  }, [accessToken]);

  useEffect(() => {
    fetchLoad();
  }, [fetchLoad]);

  return (
    <>
      <style>{STYLES}</style>

      {/* TOP BAR */}
      <header className="lt-topbar" role="banner">
        <div className="lt-topbar__inner">
          <div className="lt-brand">
            <div className="lt-brand__icon" aria-hidden="true">
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
            </div>
            <span className="lt-brand__name">
              AKNA<span> Lojistik</span>
            </span>
            <span className="lt-brand__sub" aria-hidden="true">
              Yük Takip
            </span>
          </div>
          <div
            className="lt-trust-badge"
            role="status"
            aria-label="Güvenli erişim aktif"
          >
            <span className="lt-trust-dot" aria-hidden="true" />
            Token ile doğrulandı
          </div>
        </div>
      </header>

      {/* LOADING */}
      {status === "loading" && (
        <div className="lt-state-screen" role="status" aria-live="polite">
          <div className="lt-state-icon lt-state-icon--loading">
            <div className="lt-spinner" aria-hidden="true" />
          </div>
          <p className="lt-state-title">Yük bilgileri yükleniyor</p>
          <p className="lt-state-sub">Lütfen bekleyin.</p>
        </div>
      )}

      {/* ERROR */}
      {status === "error" && (
        <div className="lt-state-screen" role="alert">
          <div className="lt-state-icon lt-state-icon--error">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M11 2L21 19H1L11 2Z"
                stroke="#ef4444"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M11 9v4M11 15.5v.5"
                stroke="#ef4444"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <p className="lt-state-title">Yük bilgisi alınamadı</p>
          <p className="lt-state-sub">{errorMsg}</p>
        </div>
      )}

      {/* SUCCESS */}
      {status === "success" && load && (
        <main className="lt-page" aria-label="Yük takip sayfası">
          <HeroSection load={load} />
          <RouteBanner load={load} />

          <div className="lt-grid">
            {/* Sol kolon */}
            <div className="lt-col-left">
              <TimelineSection load={load} />
              <StopsSection load={load} />
            </div>

            {/* Sağ kolon */}
            <div className="lt-col-right">
              <LocationSection load={load} />
              <ContactSection load={load} />
            </div>
          </div>

          {/* Alt bilgi */}
          <div className="lt-footnote" role="contentinfo">
            <div className="lt-footnote__icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle
                  cx="7"
                  cy="7"
                  r="5.5"
                  stroke="#9E9A92"
                  strokeWidth="1.2"
                />
                <path
                  d="M7 5v3.5M7 10v.5"
                  stroke="#9E9A92"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="lt-footnote__text">
              <p>
                Bu takip bağlantısı size özel oluşturulmuştur. Üçüncü kişilerle
                paylaşmayınız.
              </p>
              <p>
                Yük durumunda değişiklik oldukça bilgiler otomatik olarak
                güncellenir.
              </p>
              <p className="lt-footnote__brand">
                © {new Date().getFullYear()} AKNA Lojistik — Yük Takip Sistemi
              </p>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default LoadTrackingPage;

// ─────────────────────────────────────────
// SCOPED STYLES
// ─────────────────────────────────────────
const STYLES = `
  .lt-topbar {
    position: sticky;
    top: 0;
    z-index: 100;
    height: 60px;
    background: rgba(245,245,243,0.92);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    padding: 0 24px;
  }
  .lt-topbar__inner {
    max-width: 1100px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .lt-brand {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .lt-brand__icon {
    width: 32px; height: 32px;
    background: var(--dark-2);
    border-radius: var(--r-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .lt-brand__name {
    font-family: var(--font-sans);
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.3px;
    color: var(--text-primary);
  }
  .lt-brand__name span { color: var(--text-secondary); font-weight: 500; }
  .lt-brand__sub {
    font-size: 11px;
    color: var(--text-muted);
    font-weight: 400;
    padding-left: 10px;
    margin-left: 10px;
    border-left: 1px solid var(--border);
  }
  .lt-trust-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(34,197,94,0.1);
    border: 1px solid rgba(34,197,94,0.2);
    padding: 5px 12px 5px 8px;
    border-radius: 100px;
    font-size: 11.5px;
    font-weight: 600;
    color: #16a34a;
    font-family: var(--font-sans);
  }
  .lt-trust-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 0 3px rgba(34,197,94,0.18);
    flex-shrink: 0;
  }

  /* STATE SCREENS */
  .lt-state-screen {
    min-height: calc(100vh - 60px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 24px;
    gap: 14px;
    text-align: center;
  }
  .lt-state-icon {
    width: 56px; height: 56px;
    border-radius: var(--r-lg);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .lt-state-icon--loading {
    background: rgba(216,199,168,0.12);
    border: 1px solid rgba(216,199,168,0.22);
  }
  .lt-state-icon--error {
    background: rgba(239,68,68,0.08);
    border: 1px solid rgba(239,68,68,0.18);
  }
  .lt-spinner {
    width: 22px; height: 22px;
    border: 2px solid rgba(216,199,168,0.28);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: lt-spin 0.8s linear infinite;
  }
  @keyframes lt-spin { to { transform: rotate(360deg); } }
  .lt-state-title {
    font-family: var(--font-sans);
    font-size: 18px;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.02em;
  }
  .lt-state-sub {
    font-family: var(--font-sans);
    font-size: 14px;
    color: var(--text-secondary);
    max-width: 360px;
    line-height: 1.65;
  }

  /* PAGE */
  .lt-page {
    max-width: 1100px;
    margin: 0 auto;
    padding: 28px 24px 64px;
    animation: lt-fade-up 0.4s ease both;
  }
  @keyframes lt-fade-up {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* HERO */
  .lt-hero {
    background: var(--dark-2);
    border-radius: var(--r-xl);
    padding: 32px;
    margin-bottom: 16px;
    position: relative;
    overflow: hidden;
  }
  .lt-hero::before {
    content: "";
    position: absolute;
    top: -80px; right: -80px;
    width: 320px; height: 320px;
    background: radial-gradient(circle, rgba(216,199,168,0.06) 0%, transparent 70%);
    pointer-events: none;
  }
  .lt-hero__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 22px;
    flex-wrap: wrap;
  }
  .lt-hero__meta {
    font-family: var(--font-sans);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-on-dark-dim);
    margin-bottom: 8px;
  }
  .lt-hero__title {
    font-family: var(--font-sans);
    font-size: clamp(18px, 3vw, 26px);
    font-weight: 800;
    color: var(--text-on-dark);
    letter-spacing: -0.03em;
    line-height: 1.2;
    margin-bottom: 8px;
  }
  .lt-hero__desc {
    font-family: var(--font-sans);
    font-size: 13.5px;
    color: var(--text-on-dark-dim);
    line-height: 1.65;
    max-width: 520px;
  }
  .lt-hero__stats {
    display: grid;
    gap: 10px;
    border-top: 1px solid rgba(255,255,255,0.06);
    padding-top: 18px;
  }
  .lt-hero__stat {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: var(--r-md);
    padding: 12px 14px;
  }
  .lt-hero__stat-label {
    font-family: var(--font-sans);
    font-size: 10px;
    color: rgba(245,243,238,0.32);
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
  .lt-hero__stat-value {
    font-family: var(--font-sans);
    font-size: 15px;
    font-weight: 800;
    color: var(--text-on-dark);
    letter-spacing: -0.02em;
  }

  /* STATUS BADGE */
  .lt-status-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 7px 14px 7px 10px;
    border-radius: 100px;
    font-family: var(--font-sans);
    font-size: 12px;
    font-weight: 700;
    flex-shrink: 0;
  }
  .lt-status-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
  .lt-status--published {
    background: rgba(59,130,246,0.14);
    border: 1px solid rgba(59,130,246,0.22);
    color: #60a5fa;
  }
  .lt-status--published .lt-status-dot { background: #60a5fa; }
  .lt-status--matched {
    background: rgba(245,158,11,0.14);
    border: 1px solid rgba(245,158,11,0.2);
    color: #fbbf24;
  }
  .lt-status--matched .lt-status-dot {
    background: #f59e0b;
    box-shadow: 0 0 0 3px rgba(245,158,11,0.14);
  }
  .lt-status--transit {
    background: rgba(216,199,168,0.14);
    border: 1px solid rgba(216,199,168,0.24);
    color: var(--accent);
  }
  .lt-status--transit .lt-status-dot {
    background: var(--accent);
    box-shadow: 0 0 0 3px rgba(216,199,168,0.14);
  }
  .lt-status--completed {
    background: rgba(34,197,94,0.13);
    border: 1px solid rgba(34,197,94,0.2);
    color: #4ade80;
  }
  .lt-status--completed .lt-status-dot { background: #22c55e; }

  /* ROUTE BANNER */
  .lt-route-banner {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-lg);
    padding: 16px 22px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 14px;
    box-shadow: var(--shadow-sm);
  }
  .lt-route-city {
    font-family: var(--font-sans);
    font-size: 17px;
    font-weight: 800;
    color: var(--text-primary);
    letter-spacing: -0.025em;
    flex-shrink: 0;
  }
  .lt-route-city--right { text-align: right; }
  .lt-route-mid {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }
  .lt-route-line {
    width: 100%;
    height: 2px;
    background: var(--border);
    border-radius: 2px;
    overflow: hidden;
    position: relative;
  }
  .lt-route-fill {
    position: absolute;
    left: 0; top: 0; bottom: 0;
    background: var(--dark-2);
    border-radius: 2px;
    transition: width 0.8s ease;
  }
  .lt-route-pct {
    font-family: var(--font-sans);
    font-size: 11px;
    font-weight: 600;
    color: var(--text-muted);
  }

  /* GRID */
  .lt-grid {
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: 16px;
    align-items: start;
  }
  .lt-col-left, .lt-col-right {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* CARD */
  .lt-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-xl);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
  }
  .lt-card__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px 0;
    margin-bottom: 14px;
  }
  .lt-card__title {
    font-family: var(--font-sans);
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--text-muted);
  }
  .lt-card__badge {
    font-family: var(--font-sans);
    font-size: 11px;
    font-weight: 600;
    padding: 2px 9px;
    border-radius: 20px;
  }
  .lt-badge-green { background: rgba(34,197,94,0.1); color: #16a34a; }
  .lt-badge-amber { background: rgba(245,158,11,0.09); color: #b45309; }
  .lt-badge-grey { background: var(--bg-base); color: var(--text-muted); border: 1px solid var(--border); }
  .lt-divider { height: 1px; background: var(--border); margin: 0 20px; }
  .lt-empty-text {
    padding: 24px 20px;
    font-family: var(--font-sans);
    font-size: 13px;
    color: var(--text-muted);
    text-align: center;
  }

  /* TIMELINE */
  .lt-timeline {
    padding: 16px 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .lt-tl-item {
    display: flex;
    gap: 14px;
  }
  .lt-tl-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    width: 34px;
  }
  .lt-tl-dot {
    width: 34px; height: 34px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    z-index: 1;
    border: 2px solid;
  }
  .lt-tl-dot--done { background: var(--dark-2); border-color: var(--dark-2); }
  .lt-tl-dot--active {
    background: rgba(216,199,168,0.1);
    border-color: var(--accent);
    box-shadow: 0 0 0 4px rgba(216,199,168,0.1);
  }
  .lt-tl-dot--pending { background: var(--bg-base); border-color: var(--border); }
  .lt-tl-line {
    flex: 1;
    width: 2px;
    background: var(--border);
    margin: 3px 0;
    min-height: 18px;
  }
  .lt-tl-line--done { background: var(--dark-2); opacity: 0.25; }
  .lt-tl-content {
    padding-bottom: 22px;
    flex: 1;
    min-width: 0;
  }
  .lt-tl-item:last-child .lt-tl-content { padding-bottom: 0; }
  .lt-tl-label {
    font-family: var(--font-sans);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 3px;
  }
  .lt-tl-label--active { color: var(--accent-hover); }
  .lt-tl-name {
    font-family: var(--font-sans);
    font-size: 13.5px;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 2px;
  }
  .lt-tl-name--pending { color: var(--text-muted); }
  .lt-tl-time {
    font-family: var(--font-sans);
    font-size: 11.5px;
    color: var(--text-secondary);
  }

  /* STOPS */
  .lt-stops {
    padding: 14px 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .lt-stop-card {
    background: var(--surface-muted);
    border: 1px solid var(--border);
    border-radius: var(--r-lg);
    padding: 14px;
    display: flex;
    gap: 12px;
    transition: box-shadow 0.18s;
  }
  .lt-stop-card:hover { box-shadow: var(--shadow-sm); }
  .lt-stop-card--done { opacity: 0.68; }
  .lt-stop-num-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    flex-shrink: 0;
    padding-top: 2px;
  }
  .lt-stop-num {
    width: 26px; height: 26px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-sans);
    font-size: 10px;
    font-weight: 700;
  }
  .lt-stop-num--done { background: var(--dark-2); color: var(--text-on-dark); }
  .lt-stop-num--active { background: var(--accent); color: var(--dark-1); }
  .lt-stop-num--pending { background: var(--bg-base); border: 1.5px solid var(--border); color: var(--text-muted); }
  .lt-stop-connector {
    width: 1px; flex: 1;
    background: var(--border);
    min-height: 10px;
  }
  .lt-stop-body { flex: 1; min-width: 0; }
  .lt-stop-type {
    font-family: var(--font-sans);
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 4px;
  }
  .lt-stop-type--pickup { color: #2563eb; }
  .lt-stop-type--delivery { color: #7c3aed; }
  .lt-stop-type--waypoint { color: #b45309; }
  .lt-stop-city {
    font-family: var(--font-sans);
    font-size: 14.5px;
    font-weight: 800;
    color: var(--text-primary);
    letter-spacing: -0.02em;
    margin-bottom: 2px;
  }
  .lt-stop-addr {
    font-family: var(--font-sans);
    font-size: 12px;
    color: var(--text-secondary);
    line-height: 1.5;
    margin-bottom: 7px;
    overflow-wrap: break-word;
  }
  .lt-stop-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    align-items: center;
  }
  .lt-stop-contact {
    display: flex;
    align-items: center;
    gap: 4px;
    font-family: var(--font-sans);
    font-size: 11.5px;
    color: var(--text-secondary);
  }
  .lt-stop-contact a {
    color: var(--text-primary);
    text-decoration: none;
    font-weight: 600;
    border-bottom: 1px solid var(--border);
    padding-bottom: 1px;
    transition: border-color 0.15s;
  }
  .lt-stop-contact a:hover { border-color: var(--text-primary); }
  .lt-stop-done-tag {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-family: var(--font-sans);
    font-size: 10.5px;
    font-weight: 600;
    background: rgba(34,197,94,0.1);
    color: #16a34a;
    padding: 2px 8px;
    border-radius: 20px;
  }
  .lt-stop-pending-tag {
    display: inline-flex;
    align-items: center;
    font-family: var(--font-sans);
    font-size: 10.5px;
    font-weight: 600;
    background: var(--bg-base);
    color: var(--text-muted);
    border: 1px solid var(--border);
    padding: 2px 8px;
    border-radius: 20px;
  }

  /* LOCATION */
  .lt-loc-body { padding: 14px 20px 20px; }
  .lt-loc-map {
    background: var(--bg-alt);
    border: 1.5px dashed var(--border);
    border-radius: var(--r-lg);
    height: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 7px;
    margin-bottom: 12px;
    position: relative;
    overflow: hidden;
  }
  .lt-loc-map-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px);
    background-size: 28px 28px;
  }
  .lt-loc-map-icon {
    position: relative; z-index: 1;
    width: 38px; height: 38px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-sm);
  }
  .lt-loc-map-text {
    position: relative; z-index: 1;
    font-family: var(--font-sans);
    font-size: 12px;
    font-weight: 600;
    color: var(--text-secondary);
  }
  .lt-loc-map-sub {
    position: relative; z-index: 1;
    font-family: var(--font-sans);
    font-size: 11px;
    color: var(--text-muted);
  }
  .lt-loc-coords {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 10px;
  }
  .lt-loc-coord {
    background: var(--bg-base);
    border: 1px solid var(--border);
    border-radius: var(--r-sm);
    padding: 10px 12px;
  }
  .lt-loc-coord-label {
    font-family: var(--font-sans);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 4px;
  }
  .lt-loc-coord-val {
    font-family: var(--font-sans);
    font-size: 13px;
    font-weight: 700;
    color: var(--text-primary);
    font-variant-numeric: tabular-nums;
  }
  .lt-loc-live {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-sans);
    font-size: 12px;
    font-weight: 600;
    color: #16a34a;
    background: rgba(34,197,94,0.09);
    border: 1px solid rgba(34,197,94,0.16);
    padding: 6px 12px;
    border-radius: 100px;
  }
  .lt-loc-live-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 0 3px rgba(34,197,94,0.16);
    flex-shrink: 0;
    animation: lt-pulse 2s infinite;
  }
  @keyframes lt-pulse {
    0%, 100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.16); }
    50% { box-shadow: 0 0 0 5px rgba(34,197,94,0.07); }
  }

  /* CONTACT */
  .lt-contact-body {
    padding: 14px 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .lt-contact-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .lt-contact-icon {
    width: 34px; height: 34px;
    border-radius: var(--r-sm);
    background: var(--bg-base);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .lt-contact-info label {
    display: block;
    font-family: var(--font-sans);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 2px;
  }
  .lt-contact-info a,
  .lt-contact-info span {
    font-family: var(--font-sans);
    font-size: 13.5px;
    font-weight: 600;
    color: var(--text-primary);
    text-decoration: none;
  }
  .lt-contact-info a:hover { text-decoration: underline; }

  /* FOOTNOTE */
  .lt-footnote {
    margin-top: 32px;
    padding: 18px 22px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-lg);
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }
  .lt-footnote__icon {
    width: 30px; height: 30px;
    border-radius: var(--r-sm);
    background: var(--bg-base);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .lt-footnote__text { flex: 1; }
  .lt-footnote__text p {
    font-family: var(--font-sans);
    font-size: 12.5px;
    color: var(--text-secondary);
    line-height: 1.65;
    margin-bottom: 4px;
  }
  .lt-footnote__text p:last-child { margin-bottom: 0; }
  .lt-footnote__brand {
    font-family: var(--font-sans);
    font-size: 11px !important;
    color: var(--text-muted) !important;
    font-weight: 600;
    padding-top: 8px;
    border-top: 1px solid var(--border);
    margin-top: 8px;
  }

  /* RESPONSIVE */
  @media (max-width: 820px) {
    .lt-grid { grid-template-columns: 1fr; }
    .lt-hero__stats { grid-template-columns: repeat(2, 1fr) !important; }
    .lt-page { padding: 16px 16px 48px; }
    .lt-topbar { padding: 0 16px; }
    .lt-hero { padding: 22px 18px; }
    .lt-brand__sub { display: none; }
  }
  @media (max-width: 480px) {
    .lt-hero__stats { grid-template-columns: 1fr 1fr !important; }
    .lt-hero__title { font-size: 19px; }
    .lt-route-banner { flex-direction: column; align-items: flex-start; gap: 8px; }
    .lt-route-mid { width: 100%; align-items: flex-start; }
    .lt-route-line { width: 100%; }
    .lt-loc-coords { grid-template-columns: 1fr; }
  }
`;
