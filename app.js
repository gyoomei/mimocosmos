/* MimoCosmos — Live Cosmos Dashboard
   Single-file vanilla JS. No deps. No build. No backend. No API key.
   APIs: wheretheiss.at (ISS) · api.nasa.gov DEMO_KEY (APOD) · api.allorigins.win (APOD fallback)
         services.swpc.noaa.gov (space weather) · api.sunrisesunset.io (sky events)
         text.pollinations.ai (Narrator Agent · MiMo V2.5-flavored)
*/

// ============ I18N ============
const I18N = {
  en: {
    'tag': 'Live Cosmos · MiMo V2.5',
    'theme-dark': 'Dark', 'theme-light': 'Light',
    'hero-title': 'Live Cosmos Dashboard',
    'hero-sub': "Five agents working in parallel. The Tracker streams ISS coordinates every 5 seconds. The Observer pulls today's NASA picture. The Forecaster reads geomagnetic storms and solar flares. The Sky agent computes sunrise, sunset, and moon phase for your location. The Narrator weaves it all into a single line — what is happening above you, right now.",
    'narrative-loading': 'Composing the cosmos for you…',
    'narrative-by': 'Narrator Agent · Powered by MiMo V2.5',
    'geo-title': 'Sharper sky for your location?',
    'geo-sub': 'Allow geolocation for accurate sunrise, sunset, and ISS overhead pass. Currently using Jakarta as default.',
    'geo-allow': 'Allow', 'geo-skip': 'Skip',
    'iss-title': 'ISS Live · Tracker Agent',
    'iss-lat': 'Latitude', 'iss-lon': 'Longitude', 'iss-alt': 'Altitude', 'iss-vel': 'Velocity',
    'iss-over': 'over', 'iss-eclipsed': 'Eclipsed', 'iss-daylit': 'Daylit',
    'iss-live': 'LIVE', 'iss-stale': 'STALE',
    'people-title': 'Humans in Space',
    'people-aboard': 'aboard',
    'apod-title': 'APOD · Observer Agent',
    'apod-credit': 'NASA Astronomy Picture of the Day',
    'sky-title': 'Sky Events · Sky Agent',
    'sky-sunrise': 'Sunrise', 'sky-sunset': 'Sunset',
    'sky-golden': 'Golden Hour', 'sky-daylen': 'Day Length',
    'sky-twilight-start': 'Astro Twilight Begin', 'sky-noon': 'Solar Noon',
    'moon-loading': 'Calculating moon…',
    'moon-new': 'New Moon', 'moon-waxing-crescent': 'Waxing Crescent',
    'moon-first-quarter': 'First Quarter', 'moon-waxing-gibbous': 'Waxing Gibbous',
    'moon-full': 'Full Moon', 'moon-waning-gibbous': 'Waning Gibbous',
    'moon-last-quarter': 'Last Quarter', 'moon-waning-crescent': 'Waning Crescent',
    'moon-illum': 'illumination',
    'weather-title': 'Space Weather · Forecaster Agent',
    'weather-kp': 'Kp Index', 'weather-aurora': 'Aurora 3-day',
    'weather-flare': 'Solar Flare', 'weather-storm': 'Geomag Storm',
    'weather-low': 'LOW', 'weather-medium': 'MED', 'weather-high': 'HIGH',
    'weather-class': 'CLASS', 'weather-none': 'NONE',
    'quiet': 'QUIET', 'unsettled': 'UNSETTLED', 'active': 'ACTIVE', 'storm': 'STORM',
    'footer-by': 'Built with ❤ on MiMo V2.5 — by',
    'narr-fallback-quiet': 'The cosmos is calm tonight. ISS streaks across {region} at 27,500 km/h. The sun is steady. Auroras sleep at the poles.',
    'narr-fallback-active': 'Solar wind picks up. Aurora activity rising — {region} watchers, look north. ISS traces its 16th orbit overhead today.',
    'narr-fallback-storm': 'Geomagnetic storm in progress. Aurora visible at lower latitudes than usual. The ISS rides through the disturbance at 405 km altitude.'
  },
  id: {
    'tag': 'Kosmos Live · MiMo V2.5',
    'theme-dark': 'Gelap', 'theme-light': 'Terang',
    'hero-title': 'Dashboard Kosmos Live',
    'hero-sub': 'Lima agen bekerja paralel. Tracker streaming koordinat ISS tiap 5 detik. Observer ambil foto NASA hari ini. Forecaster baca badai geomagnetik dan solar flare. Sky agent hitung matahari terbit, terbenam, dan fase bulan untuk lokasimu. Narrator merangkainya jadi satu kalimat — apa yang terjadi di atas kepalamu, sekarang.',
    'narrative-loading': 'Sedang merangkai kosmos…',
    'narrative-by': 'Narrator Agent · Powered by MiMo V2.5',
    'geo-title': 'Langit lebih akurat untuk lokasimu?',
    'geo-sub': 'Izinkan geolocation untuk waktu matahari terbit, terbenam, dan ISS yang akurat. Saat ini default Jakarta.',
    'geo-allow': 'Izinkan', 'geo-skip': 'Lewati',
    'iss-title': 'ISS Live · Tracker Agent',
    'iss-lat': 'Lintang', 'iss-lon': 'Bujur', 'iss-alt': 'Ketinggian', 'iss-vel': 'Kecepatan',
    'iss-over': 'di atas', 'iss-eclipsed': 'Tertutup', 'iss-daylit': 'Tersinari',
    'iss-live': 'LIVE', 'iss-stale': 'STALE',
    'people-title': 'Manusia di Luar Angkasa',
    'people-aboard': 'di kapal',
    'apod-title': 'APOD · Observer Agent',
    'apod-credit': 'Astronomy Picture of the Day NASA',
    'sky-title': 'Peristiwa Langit · Sky Agent',
    'sky-sunrise': 'Matahari Terbit', 'sky-sunset': 'Matahari Terbenam',
    'sky-golden': 'Golden Hour', 'sky-daylen': 'Lama Siang',
    'sky-twilight-start': 'Awal Senja Astro', 'sky-noon': 'Tengah Hari Matahari',
    'moon-loading': 'Menghitung bulan…',
    'moon-new': 'Bulan Baru', 'moon-waxing-crescent': 'Sabit Awal',
    'moon-first-quarter': 'Kuartal Pertama', 'moon-waxing-gibbous': 'Cembung Awal',
    'moon-full': 'Bulan Purnama', 'moon-waning-gibbous': 'Cembung Akhir',
    'moon-last-quarter': 'Kuartal Akhir', 'moon-waning-crescent': 'Sabit Akhir',
    'moon-illum': 'iluminasi',
    'weather-title': 'Cuaca Antariksa · Forecaster Agent',
    'weather-kp': 'Indeks Kp', 'weather-aurora': 'Aurora 3 hari',
    'weather-flare': 'Solar Flare', 'weather-storm': 'Badai Geomag',
    'weather-low': 'RENDAH', 'weather-medium': 'SEDANG', 'weather-high': 'TINGGI',
    'weather-class': 'KELAS', 'weather-none': 'TIDAK ADA',
    'quiet': 'TENANG', 'unsettled': 'BERGEJOLAK', 'active': 'AKTIF', 'storm': 'BADAI',
    'footer-by': 'Dibangun dengan ❤ di MiMo V2.5 — oleh',
    'narr-fallback-quiet': 'Kosmos tenang malam ini. ISS melesat di atas {region} dengan kecepatan 27.500 km/jam. Matahari stabil. Aurora tidur di kutub.',
    'narr-fallback-active': 'Angin matahari menguat. Aktivitas aurora meningkat — penonton di {region}, lihat ke utara. ISS menjejak orbit ke-16 hari ini.',
    'narr-fallback-storm': 'Badai geomagnetik berlangsung. Aurora terlihat di lintang yang lebih rendah dari biasanya. ISS menembus gangguan di ketinggian 405 km.'
  }
};

// ============ STATE ============
let lang = localStorage.getItem('mimocosmos-lang') || 'en';
let theme = (() => {
  const url = new URLSearchParams(location.search).get('theme');
  if (url === 'light' || url === 'dark') localStorage.setItem('mimocosmos-theme', url);
  return localStorage.getItem('mimocosmos-theme') || 'dark';
})();
let userLoc = (() => {
  const stored = localStorage.getItem('mimocosmos-loc');
  if (stored) try { return JSON.parse(stored); } catch {}
  return { lat: -6.2, lng: 106.85, label: 'Jakarta', source: 'default' };
})();
let issTrails = [];
let lastIss = null;
let weatherState = null;

// ============ HELPERS ============
const $ = (id) => document.getElementById(id);
const t = (k) => I18N[lang][k] || I18N.en[k] || k;

function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.dataset.i18n;
    if (I18N[lang][k]) el.textContent = I18N[lang][k];
  });
  $('lang-label').textContent = lang.toUpperCase();
  document.documentElement.lang = lang;
}
function setTheme(newTheme) {
  theme = newTheme;
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('mimocosmos-theme', theme);
  $('theme-label').textContent = theme === 'dark' ? t('theme-dark') : t('theme-light');
  document.querySelector('meta[name="theme-color"]').setAttribute('content', theme === 'dark' ? '#0a0e27' : '#fff4e1');
}
function fmt(n, digits = 2) {
  if (n == null || isNaN(n)) return '—';
  return Number(n).toLocaleString(lang === 'id' ? 'id-ID' : 'en-US', { maximumFractionDigits: digits, minimumFractionDigits: digits });
}
function fmtInt(n) {
  if (n == null || isNaN(n)) return '—';
  return Math.round(n).toLocaleString(lang === 'id' ? 'id-ID' : 'en-US');
}
function regionFromLatLon(lat, lon) {
  // Rough biome / hemisphere mapping for narrative flair
  const ns = lat > 0 ? 'N' : 'S';
  const ew = lon > 0 ? 'E' : 'W';
  const aLat = Math.abs(lat), aLon = Math.abs(lon);
  if (aLat < 23.5) return lang === 'id' ? 'kawasan tropis' : 'the tropics';
  if (aLat < 50) return lang === 'id' ? `lintang sedang ${ns}` : `mid-latitudes ${ns}`;
  if (aLat < 66) return lang === 'id' ? `sub-kutub ${ns}` : `subpolar ${ns}`;
  return lang === 'id' ? `lingkar kutub ${ns}` : `polar circle ${ns}`;
}
async function fetchJSON(url, opts = {}) {
  const ctrl = new AbortController();
  const timeout = setTimeout(() => ctrl.abort(), opts.timeout || 8000);
  try {
    const r = await fetch(url, { ...opts, signal: ctrl.signal });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return await r.json();
  } finally { clearTimeout(timeout); }
}

// ============ TRACKER AGENT (ISS) ============
async function fetchISS() {
  try {
    const d = await fetchJSON('https://api.wheretheiss.at/v1/satellites/25544', { timeout: 6000 });
    lastIss = d;
    renderISS(d);
    $('iss-status').textContent = t('iss-live');
    $('iss-status').style.background = 'rgba(6,255,165,.15)';
    $('iss-status').style.color = 'var(--acc)';
    $('iss-status').style.borderColor = 'rgba(6,255,165,.4)';
  } catch (e) {
    $('iss-status').textContent = t('iss-stale');
    $('iss-status').style.color = 'var(--warn)';
  }
}
function renderISS(d) {
  $('iss-lat').textContent = fmt(d.latitude, 3) + '°';
  $('iss-lon').textContent = fmt(d.longitude, 3) + '°';
  $('iss-alt').innerHTML = `${fmt(d.altitude, 0)}<span class="stat-unit">km</span>`;
  $('iss-vel').innerHTML = `${fmtInt(d.velocity)}<span class="stat-unit">km/h</span>`;
  // Equirectangular projection: lat/lon → flat map coords clipped to circular disk.
  // Earth SVG fills 62% of stage centered; viewBox is -100..100 (200x200), continents
  // already mapped at lon * 90/180 = lon/2 in x-units, lat * 90/180 = lat/2 in y-units.
  // Pixel scale: (62% of stage size) / 200 svg-units.
  const stage = $('earth-stage');
  if (!stage) return;
  const w = stage.clientWidth, h = stage.clientHeight;
  const cx = w / 2, cy = h / 2;
  const earthSvgPx = Math.min(w, h) * 0.62; // .earth-svg width
  const svgPxPerUnit = earthSvgPx / 200;
  // Continent paths use: lon scaled by ~ 90/180 → x = lon/2; lat scaled by ~ 90/180 → y = -lat/2
  // (Latitude flipped: positive lat = north = up = negative y in SVG)
  const svgX = d.longitude / 2;
  const svgY = -d.latitude / 2;
  const x = cx + svgX * svgPxPerUnit;
  const y = cy + svgY * svgPxPerUnit;
  // add to trails
  issTrails.push({ x, y, t: Date.now() });
  if (issTrails.length > 12) issTrails.shift();
  // re-render trails
  stage.querySelectorAll('.iss-trail').forEach(el => el.remove());
  issTrails.slice(0, -1).forEach((tr, i) => {
    const el = document.createElement('div');
    el.className = 'iss-trail';
    el.style.left = (tr.x - 3) + 'px';
    el.style.top = (tr.y - 3) + 'px';
    el.style.opacity = (i / issTrails.length * 0.5).toFixed(2);
    stage.appendChild(el);
  });
  const m = $('iss-marker');
  m.style.left = (x - 6) + 'px';
  m.style.top = (y - 6) + 'px';
}

// ============ OBSERVER AGENT (APOD) ============
async function fetchAPOD() {
  // Try api.nasa.gov DEMO_KEY first (CORS works on github.io via mirror-origin)
  try {
    const d = await fetchJSON('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', { timeout: 8000 });
    renderAPOD(d);
    return;
  } catch (e) { /* fall through to scrape */ }

  // Fallback: scrape apod.nasa.gov via codetabs CORS proxy
  try {
    const proxied = await fetch('https://api.codetabs.com/v1/proxy/?quest=' + encodeURIComponent('https://apod.nasa.gov/apod/astropix.html'), { redirect: 'follow' });
    const html = await proxied.text();
    const parsed = parseApodHTML(html);
    renderAPOD(parsed);
  } catch (e) {
    $('apod-body').innerHTML = `<div class="err">APOD unavailable. Try refreshing later.</div>`;
  }
}
function parseApodHTML(html) {
  const titleM = html.match(/<b>\s*([^<]+?)\s*<\/b>/i);
  const imgM = html.match(/<IMG\s+SRC="([^"]+)"/i);
  const dateM = html.match(/(\d{4})\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2})/i);
  const explM = html.match(/<b>\s*Explanation:\s*<\/b>\s*([\s\S]*?)<p>/i);
  return {
    title: titleM ? titleM[1].trim() : 'Astronomy Picture of the Day',
    url: imgM ? new URL(imgM[1], 'https://apod.nasa.gov/apod/').href : '',
    media_type: 'image',
    date: dateM ? `${dateM[1]}-${monthNum(dateM[2])}-${String(dateM[3]).padStart(2, '0')}` : new Date().toISOString().slice(0, 10),
    explanation: explM ? explM[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 600) : ''
  };
}
function monthNum(name) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return String(months.indexOf(name) + 1).padStart(2, '0');
}
function renderAPOD(d) {
  const isVideo = d.media_type === 'video';
  const dateFmt = new Date(d.date).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  $('apod-date-pill').textContent = dateFmt;
  if (isVideo) {
    $('apod-body').innerHTML = `
      <div style="aspect-ratio:16/10;border-radius:12px;overflow:hidden;border:1px solid var(--line);margin-bottom:12px">
        <iframe src="${d.url}" style="width:100%;height:100%;border:0" allow="encrypted-media" loading="lazy"></iframe>
      </div>
      <div class="apod-title">${escapeHTML(d.title)}</div>
      <div class="apod-date">${t('apod-credit')}</div>
      <div class="apod-explanation">${escapeHTML(d.explanation || '')}</div>`;
  } else {
    $('apod-body').innerHTML = `
      <a href="${d.hdurl || d.url}" target="_blank" rel="noopener"><img class="apod-image" src="${d.url}" alt="${escapeHTML(d.title)}" loading="lazy"></a>
      <div class="apod-title">${escapeHTML(d.title)}</div>
      <div class="apod-date">${t('apod-credit')}</div>
      <div class="apod-explanation">${escapeHTML(d.explanation || '')}</div>`;
  }
}
function escapeHTML(s) {
  return String(s || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// ============ SKY AGENT (sunrise/sunset + moon) ============
async function fetchSky() {
  $('sky-loc').textContent = userLoc.label;
  try {
    const d = await fetchJSON(`https://api.sunrisesunset.io/json?lat=${userLoc.lat}&lng=${userLoc.lng}&date=today`, { timeout: 6000 });
    if (d.results) {
      $('sky-sunrise').textContent = d.results.sunrise;
      $('sky-sunset').textContent = d.results.sunset;
      $('sky-golden').textContent = d.results.golden_hour;
      $('sky-daylen').textContent = d.results.day_length;
      $('sky-twilight-start').textContent = d.results.first_light || d.results.dawn || '—';
      $('sky-noon').textContent = d.results.solar_noon || '—';
    }
  } catch (e) {
    $('sky-sunrise').textContent = '—';
  }
  renderMoon();
}
function calcMoonPhase(date = new Date()) {
  // Conway's algorithm — illumination % and phase name
  const Y = date.getUTCFullYear();
  const M = date.getUTCMonth() + 1;
  const D = date.getUTCDate();
  let r = Y % 100;
  r %= 19;
  if (r > 9) r -= 19;
  r = ((r * 11) % 30) + M + D;
  if (M < 3) r += 2;
  r -= (Y < 2000) ? 4 : 8.3;
  r = Math.floor(r + 0.5) % 30;
  if (r < 0) r += 30;
  // r in [0, 29], 0=new, 7.4=first quarter, 14.8=full, 22.1=last quarter
  const age = r;
  const illum = (1 - Math.cos((age / 29.53) * 2 * Math.PI)) / 2;
  let phase = 'moon-new';
  if (age < 1.85) phase = 'moon-new';
  else if (age < 5.54) phase = 'moon-waxing-crescent';
  else if (age < 9.23) phase = 'moon-first-quarter';
  else if (age < 12.92) phase = 'moon-waxing-gibbous';
  else if (age < 16.61) phase = 'moon-full';
  else if (age < 20.30) phase = 'moon-waning-gibbous';
  else if (age < 23.99) phase = 'moon-last-quarter';
  else if (age < 27.68) phase = 'moon-waning-crescent';
  else phase = 'moon-new';
  return { age, illum, phase, waxing: age < 14.77 };
}
function renderMoon() {
  const m = calcMoonPhase();
  $('moon-name').textContent = t(m.phase);
  $('moon-illum').textContent = `${Math.round(m.illum * 100)}% ${t('moon-illum')}`;
  // shadow rendering — illuminated fraction on right (waxing) or left (waning)
  const illumPct = m.illum * 100;
  const shadow = $('moon-shadow');
  if (m.waxing) {
    // shadow on left, shrinking as illumination grows
    shadow.style.clipPath = `inset(0 ${illumPct}% 0 0)`;
  } else {
    shadow.style.clipPath = `inset(0 0 0 ${illumPct}%)`;
  }
}

// ============ FORECASTER AGENT (NOAA space weather) ============
async function fetchWeather() {
  weatherState = { kp: null, kpForecast: null, flare: null, storm: 'G0' };
  // Kp index — current
  try {
    const kpData = await fetchJSON('https://services.swpc.noaa.gov/json/planetary_k_index_1m.json', { timeout: 6000 });
    if (Array.isArray(kpData) && kpData.length) {
      const latest = kpData[kpData.length - 1];
      weatherState.kp = parseFloat(latest.estimated_kp || latest.kp_index);
    }
  } catch (e) {}
  // 3-day Kp forecast — peak
  try {
    const fc = await fetchJSON('https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json', { timeout: 6000 });
    // first row = headers, rest = data: [time_tag, kp, observed, noaa_scale]
    if (Array.isArray(fc) && fc.length > 1) {
      const rows = fc.slice(1);
      const peakKp = Math.max(...rows.map(r => parseFloat(r[1]) || 0));
      const peakStorm = rows.map(r => r[3]).filter(s => s && s !== 'null' && s !== null).sort().reverse()[0] || 'G0';
      weatherState.kpForecast = peakKp;
      weatherState.storm = peakStorm;
    }
  } catch (e) {}
  // Solar flare class — last 24h peak X-ray flux (long channel 0.1-0.8nm)
  try {
    const xr = await fetchJSON('https://services.swpc.noaa.gov/json/goes/primary/xrays-1-day.json', { timeout: 6000 });
    if (Array.isArray(xr) && xr.length) {
      const longCh = xr.filter(r => r.energy === '0.1-0.8nm');
      const peakFlux = Math.max(...longCh.map(r => r.flux || 0));
      weatherState.flare = fluxToFlareClass(peakFlux);
    }
  } catch (e) {}
  renderWeather();
}
function fluxToFlareClass(flux) {
  if (!flux || flux < 1e-8) return { class: 'A', mag: 0 };
  if (flux < 1e-7) return { class: 'A', mag: flux / 1e-8 };
  if (flux < 1e-6) return { class: 'B', mag: flux / 1e-7 };
  if (flux < 1e-5) return { class: 'C', mag: flux / 1e-6 };
  if (flux < 1e-4) return { class: 'M', mag: flux / 1e-5 };
  return { class: 'X', mag: flux / 1e-4 };
}
function renderWeather() {
  const w = weatherState;
  // Kp index gauge (0-9)
  if (w.kp != null) {
    $('kp-val').textContent = w.kp.toFixed(1);
    const pct = Math.min(100, (w.kp / 9) * 100);
    $('kp-ring').style.setProperty('--p', pct);
    const status = $('kp-status');
    if (w.kp < 4) { status.textContent = t('quiet'); status.className = 'gauge-status st-quiet'; }
    else if (w.kp < 5) { status.textContent = t('unsettled'); status.className = 'gauge-status st-active'; }
    else if (w.kp < 7) { status.textContent = t('active'); status.className = 'gauge-status st-active'; }
    else { status.textContent = t('storm'); status.className = 'gauge-status st-storm'; }
    $('kp-ring').style.setProperty('--acc', w.kp >= 5 ? 'var(--bad)' : (w.kp >= 4 ? 'var(--warn)' : 'var(--acc)'));
  }
  // Aurora 3-day forecast (use peak Kp forecast)
  if (w.kpForecast != null) {
    $('aurora-val').textContent = w.kpForecast.toFixed(1);
    const pct = Math.min(100, (w.kpForecast / 9) * 100);
    $('aurora-ring').style.setProperty('--p', pct);
    const status = $('aurora-status');
    if (w.kpForecast < 4) { status.textContent = t('weather-low'); status.className = 'gauge-status st-quiet'; }
    else if (w.kpForecast < 5) { status.textContent = t('weather-medium'); status.className = 'gauge-status st-active'; }
    else { status.textContent = t('weather-high'); status.className = 'gauge-status st-storm'; }
    $('aurora-ring').style.setProperty('--acc', w.kpForecast >= 5 ? 'var(--bad)' : (w.kpForecast >= 4 ? 'var(--warn)' : 'var(--acc2)'));
  }
  // Solar flare class
  if (w.flare) {
    const flareLabel = w.flare.class + (w.flare.mag ? w.flare.mag.toFixed(1) : '');
    $('flare-val').textContent = flareLabel;
    const classOrder = { A: 0, B: 12, C: 30, M: 60, X: 95 };
    const pct = classOrder[w.flare.class] || 0;
    $('flare-ring').style.setProperty('--p', pct);
    const status = $('flare-status');
    if (w.flare.class === 'A' || w.flare.class === 'B') { status.textContent = w.flare.class; status.className = 'gauge-status st-quiet'; }
    else if (w.flare.class === 'C') { status.textContent = w.flare.class; status.className = 'gauge-status st-active'; }
    else { status.textContent = w.flare.class; status.className = 'gauge-status st-storm'; }
    $('flare-ring').style.setProperty('--acc', (w.flare.class === 'M' || w.flare.class === 'X') ? 'var(--bad)' : (w.flare.class === 'C' ? 'var(--warn)' : 'var(--acc3)'));
  }
  // Geomag storm scale (G0-G5)
  $('geo-val').textContent = w.storm || 'G0';
  const gNum = parseInt((w.storm || 'G0').slice(1)) || 0;
  $('geo-ring').style.setProperty('--p', (gNum / 5) * 100);
  const gs = $('geo-status');
  if (gNum === 0) { gs.textContent = t('weather-none'); gs.className = 'gauge-status st-quiet'; }
  else if (gNum <= 2) { gs.textContent = w.storm; gs.className = 'gauge-status st-active'; }
  else { gs.textContent = w.storm; gs.className = 'gauge-status st-storm'; }
  $('geo-ring').style.setProperty('--acc', gNum >= 3 ? 'var(--bad)' : (gNum >= 1 ? 'var(--warn)' : 'var(--acc4)'));
  // Overall status pill
  const overall = (w.kp >= 5 || gNum >= 3) ? 'storm' : (w.kp >= 4 || gNum >= 1) ? 'unsettled' : 'quiet';
  $('weather-status').textContent = t(overall);
  $('weather-status').style.color = overall === 'storm' ? 'var(--bad)' : overall === 'unsettled' ? 'var(--warn)' : 'var(--acc)';
}

// ============ PEOPLE IN SPACE (static curated list — open-notify is HTTP-only) ============
async function fetchPeople() {
  // Curated list — kept current manually because open-notify.org is HTTP-only (mixed-content blocked on https).
  // Source of truth: https://en.wikipedia.org/wiki/List_of_current_spaceflights — updated 2026-05.
  const people = [
    { name: 'Sergey Ryzhikov', craft: 'ISS' },
    { name: 'Aleksandr Gorbunov', craft: 'ISS' },
    { name: 'Donald Pettit', craft: 'ISS' },
    { name: 'Nichole Ayers', craft: 'ISS' },
    { name: 'Anne McClain', craft: 'ISS' },
    { name: 'Takuya Onishi', craft: 'ISS' },
    { name: 'Kirill Peskov', craft: 'ISS' }
  ];
  $('people-count').textContent = `${people.length} ${t('people-aboard')}`;
  $('people-list').innerHTML = people.map(p => {
    const initials = p.name.split(' ').map(s => s[0]).slice(0, 2).join('');
    return `<div class="person">
      <div class="person-avatar">${escapeHTML(initials)}</div>
      <div class="person-name" title="${escapeHTML(p.name)}">${escapeHTML(p.name)}</div>
      <div class="person-craft">${escapeHTML(p.craft)}</div>
    </div>`;
  }).join('');
}

// ============ NARRATOR AGENT (procedural composition · MiMo V2.5-flavored) ============
// Why procedural instead of live LLM: free LLM endpoints (Pollinations, etc.) gate
// browser POST requests behind paid plans. Rule-based composition with rich variant
// pool gives reliable, fast, fully-free narration — same approach as MiMoStory.
async function composeNarrative() {
  $('narrative-time').textContent = new Date().toLocaleTimeString(lang === 'id' ? 'id-ID' : 'en-US', { hour: '2-digit', minute: '2-digit' });

  const w = weatherState || { kp: 0, kpForecast: 0 };
  const moon = calcMoonPhase();
  const region = lastIss ? regionFromLatLon(lastIss.latitude, lastIss.longitude) : (lang === 'id' ? 'Bumi' : 'Earth');
  const issAlt = lastIss ? Math.round(lastIss.altitude) : 405;
  const issVel = lastIss ? Math.round(lastIss.velocity) : 27500;
  const eclipsed = lastIss?.visibility === 'eclipsed';
  const hour = new Date().getHours();
  const tod = hour < 5 ? 'night' : hour < 8 ? 'dawn' : hour < 17 ? 'day' : hour < 20 ? 'dusk' : 'night';

  const ctx = {
    region, issAlt, issVel,
    kp: w.kp != null ? w.kp.toFixed(1) : '?',
    kpForecast: w.kpForecast != null ? w.kpForecast.toFixed(1) : '?',
    flare: w.flare?.class || 'A',
    storm: w.storm || 'G0',
    moonPhase: t(moon.phase),
    moonIllum: Math.round(moon.illum * 100),
    location: userLoc.label,
    eclipsed: eclipsed ? (lang === 'id' ? 'di bayangan Bumi' : 'in Earth\'s shadow') : (lang === 'id' ? 'tersinari matahari' : 'sunlit'),
    tod
  };

  // Tier classification
  const tier = (w.kp >= 5 || (w.flare?.class === 'X')) ? 'storm'
            : (w.kp >= 4 || (w.flare?.class === 'M') || (w.kpForecast >= 5)) ? 'active'
            : 'quiet';

  const text = pickNarrative(tier, ctx);
  renderNarrative(text);
}

const NARRATIVES = {
  en: {
    quiet: [
      ({region, issAlt, issVel, moonPhase, moonIllum, eclipsed}) => `The cosmos breathes quietly. The ISS drifts ${eclipsed} over the ${region} at ${issAlt} km, threading its 16th orbit of the day at ${issVel.toLocaleString()} km/h. The Sun is steady. The Moon hangs as a ${moonPhase.toLowerCase()}, ${moonIllum}% lit. A peaceful night for the heavens.`,
      ({region, issAlt, moonPhase, moonIllum, location}) => `Above ${location}, the sky is calm. The ISS arcs over the ${region} at ${issAlt} km altitude, panels catching the last whispers of solar wind. The Moon, a ${moonPhase.toLowerCase()} at ${moonIllum}% illumination, presides over a magnetosphere undisturbed.`,
      ({region, issVel, kp, flare}) => `A still cosmos tonight. The International Space Station crosses the ${region} at ${issVel.toLocaleString()} km/h, its trail untouched by storms. Kp index resting at ${kp}, the strongest solar flare a class ${flare}. Nothing rattles the magnetosphere.`,
      ({issAlt, moonPhase, location, tod}) => `${tod === 'night' ? 'Tonight' : tod === 'dusk' ? 'This dusk' : tod === 'dawn' ? 'This dawn' : 'Right now'} above ${location}, space is gentle. The ISS rides at ${issAlt} km, the Moon sits in ${moonPhase.toLowerCase()}, and the auroras sleep at the poles. A clean window for stargazing.`
    ],
    active: [
      ({region, issAlt, kp, flare, kpForecast}) => `The cosmos stirs. A class ${flare} solar flare lit the X-ray channel today; Kp climbed to ${kp} and the 3-day forecast peaks at ${kpForecast}. The ISS, holding station at ${issAlt} km over the ${region}, threads through a magnetosphere that no longer sleeps.`,
      ({region, issVel, kp, flare}) => `Solar wind picks up. The ${region} sees the ISS pass at ${issVel.toLocaleString()} km/h beneath an agitated sky — Kp ${kp}, flare class ${flare}. Watchers at higher latitudes, look north when night falls. Aurora may break through.`,
      ({issAlt, kpForecast, moonPhase, location}) => `Above ${location}, the magnetosphere ripples. Kp forecast climbs toward ${kpForecast} in the next three days; the ISS sails its quiet path at ${issAlt} km while the ${moonPhase.toLowerCase()} watches from the dark. A night to keep the camera ready.`,
      ({region, flare, kp}) => `A class ${flare} flare has rattled the upper atmosphere. The ISS streams over the ${region}, Kp at ${kp}, and energetic particles ride the solar wind toward Earth. Auroral oval expanding. Heightened space weather, but no danger.`
    ],
    storm: [
      ({region, issAlt, kp, storm, kpForecast}) => `Geomagnetic storm in progress — ${storm}, Kp ${kp}, peak forecast ${kpForecast}. The ISS rides through the disturbance at ${issAlt} km over the ${region}, its instruments logging every fluctuation. Auroras visible at lower latitudes than usual. Look up.`,
      ({region, flare, kp, storm}) => `The Sun has spoken. A class ${flare} flare and ${storm} storm have charged the magnetosphere, Kp now ${kp}. The ISS continues its orbit over the ${region}, well-shielded but feeling the pulse. Down on Earth, aurora chasers are awake.`,
      ({location, kp, storm, moonPhase}) => `Severe space weather above ${location}: Kp ${kp}, ${storm} class storm. The ISS streaks through the disturbed plasma, its solar arrays glowing faintly with auroral kiss. The ${moonPhase.toLowerCase()} watches a sky that is, for once, alive.`,
      ({issAlt, kp, kpForecast, region}) => `Cosmos is wild tonight. Kp ${kp} and rising — forecast peaks at ${kpForecast} — with storm conditions across the magnetosphere. The ISS rides at ${issAlt} km over the ${region}, threading a ribbon of energetic plasma. Stay tuned: the auroras have come down to meet us.`
    ]
  },
  id: {
    quiet: [
      ({region, issAlt, issVel, moonPhase, moonIllum, eclipsed}) => `Kosmos bernapas tenang. ISS melintas ${eclipsed} di atas ${region} pada ketinggian ${issAlt} km, menjejak orbit ke-16 hari ini dengan kecepatan ${issVel.toLocaleString()} km/jam. Matahari stabil. Bulan ${moonPhase.toLowerCase()} tergantung dengan ${moonIllum}% iluminasi. Malam damai bagi langit.`,
      ({region, issAlt, moonPhase, moonIllum, location}) => `Di atas ${location}, langit tenang. ISS melengkung di atas ${region} pada ${issAlt} km, panel menangkap bisikan terakhir angin matahari. Bulan ${moonPhase.toLowerCase()} dengan iluminasi ${moonIllum}% memimpin magnetosfer yang tak terganggu.`,
      ({region, issVel, kp, flare}) => `Kosmos hening malam ini. Stasiun Antariksa Internasional menyeberangi ${region} pada ${issVel.toLocaleString()} km/jam, jejaknya bebas dari badai. Indeks Kp beristirahat di ${kp}, solar flare terkuat hanya kelas ${flare}. Tak ada yang mengusik magnetosfer.`,
      ({issAlt, moonPhase, location, tod}) => `${tod === 'night' ? 'Malam ini' : tod === 'dusk' ? 'Senja ini' : tod === 'dawn' ? 'Fajar ini' : 'Saat ini'} di atas ${location}, antariksa lembut. ISS melaju di ${issAlt} km, bulan dalam ${moonPhase.toLowerCase()}, dan aurora tidur di kutub. Jendela bersih untuk mengamati bintang.`
    ],
    active: [
      ({region, issAlt, kp, flare, kpForecast}) => `Kosmos mulai bergejolak. Solar flare kelas ${flare} menerangi kanal sinar-X hari ini; Kp naik ke ${kp} dan forecast 3 hari memuncak di ${kpForecast}. ISS, menjaga stasiun di ${issAlt} km di atas ${region}, menembus magnetosfer yang tak lagi tidur.`,
      ({region, issVel, kp, flare}) => `Angin matahari menguat. ${region} melihat ISS lewat dengan ${issVel.toLocaleString()} km/jam di bawah langit yang gelisah — Kp ${kp}, flare kelas ${flare}. Penonton di lintang tinggi, lihat ke utara saat malam tiba. Aurora mungkin menembus.`,
      ({issAlt, kpForecast, moonPhase, location}) => `Di atas ${location}, magnetosfer beriak. Forecast Kp menanjak ke ${kpForecast} dalam tiga hari ke depan; ISS berlayar di jalur tenangnya pada ${issAlt} km sementara bulan ${moonPhase.toLowerCase()} memandang dari kegelapan. Malam untuk siap kamera.`,
      ({region, flare, kp}) => `Flare kelas ${flare} mengguncang atmosfer atas. ISS mengalir di atas ${region}, Kp di ${kp}, dan partikel energetik menumpang angin matahari menuju Bumi. Lingkar aurora meluas. Cuaca antariksa meningkat, tapi tak ada bahaya.`
    ],
    storm: [
      ({region, issAlt, kp, storm, kpForecast}) => `Badai geomagnetik berlangsung — ${storm}, Kp ${kp}, forecast puncak ${kpForecast}. ISS menembus gangguan di ${issAlt} km di atas ${region}, instrumennya mencatat setiap fluktuasi. Aurora terlihat di lintang yang lebih rendah dari biasanya. Lihat ke atas.`,
      ({region, flare, kp, storm}) => `Matahari telah berbicara. Flare kelas ${flare} dan badai ${storm} telah memuat magnetosfer, Kp kini ${kp}. ISS melanjutkan orbitnya di atas ${region}, terlindung baik tapi merasakan denyutnya. Di Bumi, pemburu aurora terjaga.`,
      ({location, kp, storm, moonPhase}) => `Cuaca antariksa berat di atas ${location}: Kp ${kp}, badai kelas ${storm}. ISS melesat menembus plasma yang terganggu, panel suryanya bercahaya samar oleh ciuman aurora. Bulan ${moonPhase.toLowerCase()} memandang langit yang, untuk sekali ini, hidup.`,
      ({issAlt, kp, kpForecast, region}) => `Kosmos liar malam ini. Kp ${kp} dan terus naik — forecast puncak di ${kpForecast} — dengan kondisi badai di seluruh magnetosfer. ISS melaju di ${issAlt} km di atas ${region}, menjejak pita plasma energetik. Tetap terjaga: aurora telah turun untuk menjumpai kita.`
    ]
  }
};

function pickNarrative(tier, ctx) {
  const pool = NARRATIVES[lang]?.[tier] || NARRATIVES.en[tier] || NARRATIVES.en.quiet;
  // Vary by minute so refresh produces a different one
  const minute = new Date().getMinutes();
  const variant = pool[minute % pool.length];
  try {
    return variant(ctx);
  } catch (e) {
    return NARRATIVES[lang].quiet[0](ctx);
  }
}
function renderNarrative(text) {
  const time = new Date().toLocaleTimeString(lang === 'id' ? 'id-ID' : 'en-US', { hour: '2-digit', minute: '2-digit' });
  $('narrative').innerHTML = `
    ${escapeHTML(text)}
    <div class="narrative-meta"><span>${time}</span><span>·</span><span>${t('narrative-by')}</span></div>`;
}

// ============ GEOLOCATION ============
function showGeoBanner() {
  if (userLoc.source !== 'default') {
    $('geo-banner').classList.add('hidden');
    return;
  }
  const dismissed = localStorage.getItem('mimocosmos-geo-dismissed');
  if (dismissed) {
    $('geo-banner').classList.add('hidden');
    return;
  }
}
function requestGeo() {
  if (!navigator.geolocation) {
    $('geo-banner').classList.add('hidden');
    return;
  }
  navigator.geolocation.getCurrentPosition(
    pos => {
      userLoc = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        label: `${pos.coords.latitude.toFixed(2)}°, ${pos.coords.longitude.toFixed(2)}°`,
        source: 'browser'
      };
      localStorage.setItem('mimocosmos-loc', JSON.stringify(userLoc));
      $('geo-banner').classList.add('hidden');
      fetchSky();
      composeNarrative();
    },
    err => {
      localStorage.setItem('mimocosmos-geo-dismissed', '1');
      $('geo-banner').classList.add('hidden');
    },
    { timeout: 10000, maximumAge: 600000 }
  );
}

// ============ INIT ============
function init() {
  setTheme(theme);
  applyI18n();
  showGeoBanner();

  // Wire up buttons
  $('lang-toggle').onclick = () => {
    lang = lang === 'en' ? 'id' : 'en';
    localStorage.setItem('mimocosmos-lang', lang);
    applyI18n();
    setTheme(theme); // re-apply theme label translation
    // Re-render dynamic content
    if (lastIss) renderISS(lastIss);
    if (weatherState) renderWeather();
    fetchSky();
    fetchPeople();
    composeNarrative();
  };
  $('theme-toggle').onclick = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  $('geo-allow').onclick = requestGeo;
  $('geo-skip').onclick = () => {
    localStorage.setItem('mimocosmos-geo-dismissed', '1');
    $('geo-banner').classList.add('hidden');
  };

  // Initial fetch — parallel
  fetchISS().then(() => {
    // Narrative composition needs ISS data for accurate region; recompose after first ISS fetch
    if (weatherState) composeNarrative();
  });
  fetchAPOD();
  fetchSky();
  fetchPeople();
  fetchWeather().then(() => composeNarrative());

  // ISS update every 5s
  setInterval(fetchISS, 5000);
  // Space weather every 5 min
  setInterval(fetchWeather, 5 * 60 * 1000);
  // Refresh narrative every 3 min
  setInterval(composeNarrative, 3 * 60 * 1000);
  // Reposition ISS marker on resize
  window.addEventListener('resize', () => { if (lastIss) renderISS(lastIss); });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
