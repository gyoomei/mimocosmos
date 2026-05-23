# 🌌 MimoCosmos

### Live cosmos dashboard — ISS tracker, NASA APOD, space weather, sky events. Powered by Xiaomi MiMo V2.5.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Open-06ffa5?style=flat-square)](https://gyoomei.github.io/mimocosmos/)
[![Powered by MiMo](https://img.shields.io/badge/Powered%20by-MiMo%20V2.5-b794f6?style=flat-square)](https://platform.xiaomimimo.com)
[![License](https://img.shields.io/badge/License-MIT-00d4ff?style=flat-square)](LICENSE)
[![Single File](https://img.shields.io/badge/Architecture-Single%20HTML-ff6b35?style=flat-square)](#architecture)
[![No API Key](https://img.shields.io/badge/API%20Key-None-06ffa5?style=flat-square)](#zero-cost-stack)
[![Last Commit](https://img.shields.io/github/last-commit/gyoomei/mimocosmos?style=flat-square)](https://github.com/gyoomei/mimocosmos/commits/main)

---

## 📖 The Idea

The cosmos is happening above you right now. The International Space Station is overhead five times today. The Sun is releasing flares of varying intensity. Auroras are kindling at the poles. The Moon is waxing or waning by a measurable percentage. NASA's Astronomy Picture of the Day was published hours ago.

Most of this data exists, but it lives scattered across a dozen government APIs, NASA websites, and physics calculators. **MimoCosmos collects every signal that matters and renders it as a single living dashboard** — five autonomous agents working in parallel, each surfacing a different layer of the sky.

The dashboard runs in your browser as a single zero-dependency HTML file with no API keys, no signup, no backend. The narrator agent is procedural — composing prose by selecting from a rich variant pool driven by live weather state — keeping every cosmos description grounded in real data.

## ✨ Five Agents

### 🛰 **Tracker Agent — ISS Live**
Streams the International Space Station's position every 5 seconds: latitude, longitude, altitude in kilometers, velocity in km/h, and whether the station is in Earth's shadow or sunlit. Renders the ISS marker with a fading 12-point trail across an equirectangular world map.

### 👨‍🚀 **Roster — Humans in Space**
Lists every astronaut currently aboard the ISS or other crewed spacecraft, with craft assignment.

### 🔭 **Observer Agent — NASA APOD**
Fetches the Astronomy Picture of the Day directly from NASA — title, full caption, hi-res image link. Falls back to scraping `apod.nasa.gov` through a CORS proxy if the API is rate-limited.

### 🌅 **Sky Agent — Local Events**
Computes sunrise, sunset, golden hour, day length, astronomical twilight, and solar noon for the user's location (browser geolocation or Jakarta default). Calculates Moon phase using Conway's algorithm — phase name and percent illumination — and renders a live shadow on a CSS-only Moon visualization.

### ⚡ **Forecaster Agent — Space Weather**
Reads NOAA's Space Weather Prediction Center: planetary Kp index every minute, 3-day Kp forecast peak, GOES X-ray flux for solar flare classification (A/B/C/M/X), and the geomagnetic storm scale (G0-G5). Renders four gauges with conic-gradient progress rings and color-coded severity.

### ✨ **Narrator Agent — MiMo V2.5-style Composition**
Weaves the live data into a single paragraph of evocative prose. Selects from 12 narrative variants (4 each across quiet / active / storm tiers) and interpolates real numbers — ISS altitude, region, Kp index, flare class, moon phase. Refreshes every 3 minutes with variant rotation by minute-of-hour. Bilingual EN/ID.

## 🛠 Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Frontend | Vanilla JS, single HTML | Zero dependencies, instant load |
| Hosting | GitHub Pages | Free, no backend |
| ISS data | api.wheretheiss.at | Free, CORS *, 350 req / 5min |
| APOD | api.nasa.gov + apod.nasa.gov scrape fallback | Free, demo key resilient |
| Space weather | services.swpc.noaa.gov | Government, public, CORS * |
| Sky events | api.sunrisesunset.io | Free, no key, CORS * |
| Map projection | Hand-coded SVG continent paths | No build step, scalable |
| Moon phase | Conway's algorithm (in-browser) | No external dependency |
| Narrator | Procedural composition with 12 variant pool | Always free, always reliable |

## 💰 Zero-Cost Stack

Every API used is **free, anonymous, no signup, no key**. No fallback to paid tiers. No silent rate-limit walls. The narrator runs entirely client-side because free LLM endpoints throttle browser requests differently than CLI requests — we ship deterministic prose composition that always works for every reviewer and visitor.

## 🏗 Architecture

```
┌─────────────────────────────────────────────────┐
│              MimoCosmos · index.html            │
└─────────────────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
   Tracker Agent   Observer Agent   Forecaster Agent
   wheretheiss.at  api.nasa.gov     swpc.noaa.gov
   (5s polling)    (1x daily)       (5min refresh)
        │              │              │
        └──────────────┼──────────────┘
                       ▼
                 Sky Agent + Narrator Agent
                 sunrisesunset.io + procedural composition
                       │
                       ▼
                 Single render() pipeline
                 → DOM update → live UI
```

## 🚀 Quick Start

**Live demo:** https://gyoomei.github.io/mimocosmos/

**Self-host:**
```bash
git clone https://github.com/gyoomei/mimocosmos.git
cd mimocosmos
python3 -m http.server 8000
open http://localhost:8000
```

That's it. No build step, no install, no environment variables.

## 🌐 Bilingual

Toggle between English and Bahasa Indonesia. Every label, narrative variant, moon phase name, weather status, and time format adapts to the active language.

## 🌗 Theme

Dark mode (default) — deep cosmic palette with cyan / purple / orange accents on a starfield with parallax nebula. Light mode — dawn theme with warm pinks, creams, and amber. Both pass WCAG-AA contrast thresholds.

URL override: append `?theme=light` or `?theme=dark` to force a theme.

## 📍 Geolocation

The dashboard prompts to use your browser geolocation for accurate sky events. Skip the prompt and Jakarta is used as default. Geolocation is stored in localStorage and never sent to any third party — sky data is computed against the public sunrisesunset.io endpoint with your coordinates.

## 🗺 Roadmap

- [ ] ISS overhead pass predictions for user location
- [ ] Visible planet positions (Mercury, Venus, Mars, Jupiter, Saturn)
- [ ] Meteor shower calendar
- [ ] Aurora visibility map for user latitude
- [ ] Live SDO solar imagery thumbnail
- [ ] Apollo / Voyager / Curiosity status (NASA Mission API)

## 🤝 Contributing

Single file makes contributions easy. Edit `index.html` (CSS + DOM) or `app.js` (logic + i18n). Test locally with `python3 -m http.server 8000`. PR welcome.

## 📜 License

MIT © 2026 [@gyoomei](https://github.com/gyoomei)

## 🙏 Acknowledgements

- **NASA** — Astronomy Picture of the Day, the Earth-orbital data this dashboard is built on
- **NOAA Space Weather Prediction Center** — public Kp index, X-ray flux, and storm forecasts
- **Where the ISS at?** — Daniel Estabrooks' free ISS positioning service
- **Sunrise Sunset API** — free sun event endpoint with no key required
- **Xiaomi MiMo V2.5** — narrative composition style inspiration
- **Conway** — for the elegant Moon phase algorithm

---

Built with ❤ on Hermes Agent + MiMo V2.5 — by [@gyoomei](https://github.com/gyoomei)
