# Animation Libraries — Setup & Download Guide

This project uses the following animation libraries. All are installed via `npm install`.

---

## Quick Setup (One Command)

```bash
npm install
```

This reads `package.json` and installs everything automatically.

---

## Manual Install (if needed)

```bash
npm install gsap @gsap/react framer-motion
```

---

## 1. GSAP (GreenSock Animation Platform) — v3.14.2

The **primary animation engine** used in every component.

| | Link |
|---|---|
| **npm** | https://www.npmjs.com/package/gsap |
| **Official Site** | https://gsap.com/ |
| **Docs** | https://gsap.com/docs/v3/ |
| **ScrollTrigger Plugin** | https://gsap.com/docs/v3/Plugins/ScrollTrigger/ |
| **GitHub** | https://github.com/greensock/GSAP |
| **CDN (fallback)** | https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js |
| **ScrollTrigger CDN** | https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/ScrollTrigger.min.js |

### Install

```bash
npm install gsap
```

### What it does in this project

- **ScrollTrigger reveals** — Elements fade/slide in when scrolled into viewport
- **Pinning + scrub** — Hero section pins and morphs via clipPath
- **Stagger animations** — Children animate in sequence with delays
- **Entry animations** — Navbar slides down, Hero text fades in on page load
- **Infinite marquee** — Breaking news ticker scrolls endlessly
- **3D transforms** — Phone mockup with rotateY + perspective
- **Bounce/spring easing** — `back.out(1.7)` for elastic effects
- **matchMedia** — Different animations for mobile vs desktop

---

## 2. @gsap/react — v2.1.2

Official GSAP React integration helper.

| | Link |
|---|---|
| **npm** | https://www.npmjs.com/package/@gsap/react |
| **Docs** | https://gsap.com/resources/React/ |

### Install

```bash
npm install @gsap/react
```

---

## 3. Framer Motion — v12.34.3

Used only in `useMouseParallax.js` hook (currently **unused** by any component).

| | Link |
|---|---|
| **npm** | https://www.npmjs.com/package/framer-motion |
| **Official Site** | https://motion.dev/ |
| **Docs** | https://motion.dev/docs |
| **GitHub** | https://github.com/motiondivision/motion |
| **CDN** | https://cdn.jsdelivr.net/npm/framer-motion@12/dist/framer-motion.js |

### Install

```bash
npm install framer-motion
```

### What it does in this project

- `useMotionValue` — Tracks cursor position
- `useSpring` — Adds spring physics to motion values
- `useTransform` — Maps cursor X/Y to translate offsets

---

## 4. Tailwind CSS — v4.2.1

Handles CSS transitions for hover/focus micro-interactions.

| | Link |
|---|---|
| **npm** | https://www.npmjs.com/package/tailwindcss |
| **Official Site** | https://tailwindcss.com/ |
| **Vite Plugin** | https://www.npmjs.com/package/@tailwindcss/vite |

### Install

```bash
npm install tailwindcss @tailwindcss/vite
```

### CSS transition classes used

- `transition-all duration-300` / `duration-500`
- `transition-colors duration-300`
- `transition-transform duration-500` / `duration-700`
- `transition-opacity duration-500`

---

## 5. Google Fonts — Inter

Loaded via CDN in `index.html` (no npm install needed).

| | Link |
|---|---|
| **Google Fonts** | https://fonts.google.com/specimen/Inter |
| **Direct CSS** | https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap |
| **Download .ttf/.woff2** | https://github.com/rsms/inter/releases |

---

## Animation Map by Component

| Component | GSAP | ScrollTrigger | Framer Motion | CSS Transitions |
|---|---|---|---|---|
| App.jsx | ✅ | ✅ (refresh) | — | — |
| Navbar | ✅ (entry) | — | — | ✅ (7x) |
| Hero | ✅ (10+ tweens) | ✅ (pin, scrub) | — | ✅ |
| BreakingTicker | ✅ (marquee) | — | — | — |
| FeaturesSection | ✅ (3 tweens) | ✅ | — | ✅ |
| LatestNews | ✅ (3 tweens) | ✅ | — | ✅ |
| FeaturedVideo | ✅ (3 tweens) | ✅ | — | ✅ |
| TrustSection | ✅ (3 tweens) | ✅ | — | ✅ |
| AppPromo | ✅ (3D tilt) | ✅ | — | ✅ |
| ImageGallery | ✅ (stagger) | ✅ | — | ✅ |
| CategorySection | ✅ (stagger) | ✅ | — | ✅ |
| Newsletter | ✅ (reveal) | ✅ | — | ✅ |
| Footer | ✅ (stagger) | ✅ | — | ✅ |

---

## Troubleshooting — Animations Not Working

### Problem: Content is invisible / no animations play

**Cause:** Every component sets `opacity: 0` via GSAP before animating in. If GSAP fails to load, content stays hidden.

### Fix checklist:

1. **Run `npm install`** — dependencies are NOT included in the repo (`node_modules` is gitignored)
2. **Run `npm run dev`** — starts the Vite dev server
3. **Check Node.js version** — requires Node.js 18+ (run `node -v`)
4. **Clear cache** — `npm cache clean --force` then re-run `npm install`
5. **Delete and reinstall** — `rm -rf node_modules package-lock.json && npm install`

### If still broken, check browser console for errors:

```
F12 → Console tab → look for red errors
```

Common errors:
- `Cannot find module 'gsap'` → npm install wasn't run
- `ScrollTrigger is not defined` → GSAP didn't load properly
- `Unexpected token` → Node.js version too old

---

## CDN Fallback (if npm doesn't work)

Add these to `index.html` inside `<head>`:

```html
<!-- GSAP -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/ScrollTrigger.min.js"></script>
```

> ⚠️ CDN approach won't work with the current Vite/React import setup — only use as reference.
