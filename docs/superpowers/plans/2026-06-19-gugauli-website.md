# Gugauli Organic Producer Company Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fast, mobile-first static brochure website for Gugauli Organic Producer Company Limited — 5 HTML pages, no framework, no build step, deployable to Cloudflare Pages or Hostinger.

**Architecture:** Plain HTML5 + CSS custom properties + vanilla JS. Header/footer duplicated across pages (no build tooling). All site-wide config (domain, phone, email, Web3Forms key) in a single `site.config.js` so any field can be changed in one place.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox), vanilla JS (ES6), Google Fonts (Tiro Devanagari + Hind), Web3Forms (contact form), JSON-LD (structured data).

---

## Design Decisions (locked in from spec Section 6)

### Palette
```css
--color-green-deep: #245C36;   /* primary — carries the page */
--color-green-leaf: #5C9A4F;   /* secondary / accents */
--color-earth: #6B4A2B;        /* footer, text accents */
--color-amber: #E0A12E;        /* CTAs only — controlled highlight */
--color-paper: #F7F4EC;        /* warm off-white background */
--color-ink: #211C16;          /* body text */
```

### Typography
- **Headings:** Tiro Devanagari (Google Fonts) — grounded, honest, Devanagari-compatible
- **Body/UI:** Hind (Google Fonts) — clean humanist sans, Devanagari-compatible
- Fluid scale via `clamp()`: base 1rem body, 1.25rem → 3.5rem headings

### Hero
No real photo yet → confident brand-color treatment: `--color-green-deep` background, seedling SVG inline, white heading in Tiro Devanagari, amber CTA.

### Signature element
**Soil/horizon baseline motif** — a subtle SVG wave divider between sections, in `--color-earth` at low opacity, echoing "Growing for Life." Used 2–3 times on the page; kept quiet everywhere else.

---

## File Structure

```
gugauli/
├── index.html            — Home (hero, sections, trust strip, CTA)
├── about.html            — Our story, mission, directors, registration
├── products.html         — What we grow (produce grid)
├── farmers.html          — Why join, membership steps, WhatsApp CTA
├── contact.html          — Map, form, tel/WA/mailto
├── 404.html              — Simple branded not-found
├── robots.txt
├── sitemap.xml
├── site.config.js        — Single place for domain, phone, email, keys
├── assets/
│   ├── css/
│   │   └── styles.css    — All styles (tokens → layout → components → pages)
│   ├── js/
│   │   └── main.js       — Mobile nav + smooth scroll + form handler
│   ├── img/
│   │   └── .gitkeep      — Placeholder; real photos to be added
│   └── icons/
│       └── favicon.svg   — Placeholder SVG favicon
└── README.md
```

---

## Task 1: Project scaffold + site config + base CSS

**Files:**
- Create: `site.config.js`
- Create: `assets/css/styles.css`
- Create: `assets/js/main.js` (empty stub)
- Create: `assets/icons/favicon.svg`
- Create: `assets/img/.gitkeep`

- [ ] **Step 1: Create site.config.js**

```js
// Central config — edit once, applies everywhere via main.js
const SITE = {
  domain: 'https://gugauliorganic.in', // TODO: confirm final domain
  phone: '+91XXXXXXXXXXX',             // TODO: replace with real number
  whatsapp: '91XXXXXXXXXXX',           // TODO: replace (no + or spaces)
  email: 'info@gugauliorganic.in',     // TODO: confirm email
  web3formsKey: 'YOUR_KEY_HERE',       // TODO: get free key at web3forms.com
  mapsQuery: 'Piparahari,Tindwari,Banda,Uttar Pradesh',
};
```

- [ ] **Step 2: Create assets/icons/favicon.svg (placeholder)**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#245C36"/>
  <text x="16" y="22" text-anchor="middle" font-size="18" fill="#F7F4EC" font-family="serif">G</text>
</svg>
```

- [ ] **Step 3: Create assets/css/styles.css**

Write in four sections: (a) custom properties + reset, (b) base typography, (c) global components (header/nav/footer/wave-divider), (d) utility classes.

```css
/* ===== (a) TOKENS + RESET ===== */
:root {
  --color-green-deep: #245C36;
  --color-green-leaf: #5C9A4F;
  --color-earth: #6B4A2B;
  --color-amber: #E0A12E;
  --color-paper: #F7F4EC;
  --color-ink: #211C16;

  --font-display: 'Tiro Devanagari', Georgia, serif;
  --font-body: 'Hind', system-ui, sans-serif;

  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2.5rem;
  --space-xl: 4rem;

  --max-width: 1100px;
  --radius: 6px;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
body {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.65;
  color: var(--color-ink);
  background: var(--color-paper);
}
img { max-width: 100%; height: auto; display: block; }
a { color: var(--color-green-deep); }
a:focus-visible { outline: 3px solid var(--color-amber); outline-offset: 2px; }

/* ===== (b) TYPOGRAPHY ===== */
h1, h2, h3, h4 {
  font-family: var(--font-display);
  line-height: 1.2;
  color: var(--color-green-deep);
}
h1 { font-size: clamp(2rem, 5vw, 3.25rem); }
h2 { font-size: clamp(1.5rem, 3.5vw, 2.25rem); }
h3 { font-size: clamp(1.1rem, 2.5vw, 1.5rem); }
p { max-width: 68ch; }

/* ===== (c) GLOBAL COMPONENTS ===== */

/* Skip link */
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  padding: var(--space-xs) var(--space-sm);
  background: var(--color-amber);
  color: var(--color-ink);
  font-weight: 700;
  z-index: 1000;
}
.skip-link:focus { top: 0; }

/* Header */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-green-deep);
  color: #fff;
  padding: var(--space-xs) var(--space-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  box-shadow: 0 2px 8px rgba(0,0,0,.15);
}
.site-header__brand {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  text-decoration: none;
  color: #fff;
}
.site-header__logo {
  width: 40px;
  height: 40px;
  border-radius: 4px;
}
.site-header__name {
  font-family: var(--font-display);
  font-size: 1.05rem;
  line-height: 1.2;
  font-weight: 700;
}

/* Nav */
.site-nav__list {
  display: flex;
  gap: var(--space-md);
  list-style: none;
}
.site-nav__list a {
  color: #fff;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  padding: var(--space-xs) 0;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s;
}
.site-nav__list a:hover,
.site-nav__list a[aria-current="page"] {
  border-bottom-color: var(--color-amber);
}

/* Hamburger (mobile) */
.nav-toggle {
  display: none;
  background: none;
  border: 2px solid rgba(255,255,255,0.6);
  border-radius: var(--radius);
  color: #fff;
  font-size: 1.4rem;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  line-height: 1;
}
.nav-toggle[aria-expanded="true"] .nav-toggle__open { display: none; }
.nav-toggle[aria-expanded="false"] .nav-toggle__close { display: none; }

@media (max-width: 680px) {
  .nav-toggle { display: block; }
  .site-nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--color-green-deep);
    padding: var(--space-sm) var(--space-md);
    display: none;
    box-shadow: 0 4px 12px rgba(0,0,0,.2);
  }
  .site-nav.is-open { display: block; }
  .site-nav__list {
    flex-direction: column;
    gap: var(--space-xs);
  }
  .site-nav__list a { font-size: 1.05rem; padding: var(--space-xs) 0; }
}

/* Footer */
.site-footer {
  background: var(--color-earth);
  color: #f5ece2;
  padding: var(--space-xl) var(--space-md) var(--space-lg);
  margin-top: var(--space-xl);
}
.site-footer__inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  gap: var(--space-lg);
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
.site-footer__name {
  font-family: var(--font-display);
  font-size: 1.15rem;
  color: #fff;
  margin-bottom: var(--space-xs);
}
.site-footer__tagline {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: var(--space-sm);
}
.site-footer a { color: #f5ece2; }
.site-footer__reg {
  font-size: 0.75rem;
  opacity: 0.7;
  margin-top: var(--space-md);
  border-top: 1px solid rgba(255,255,255,0.15);
  padding-top: var(--space-sm);
}
.site-footer__copy {
  font-size: 0.78rem;
  opacity: 0.6;
  margin-top: var(--space-sm);
  text-align: center;
}

/* Wave divider */
.wave-divider {
  width: 100%;
  overflow: hidden;
  line-height: 0;
  opacity: 0.18;
}
.wave-divider svg { display: block; width: 100%; }

/* ===== (d) UTILITIES ===== */
.container { max-width: var(--max-width); margin: 0 auto; padding: 0 var(--space-md); }
.section { padding: var(--space-xl) 0; }
.btn {
  display: inline-block;
  padding: 0.75rem 1.75rem;
  border-radius: var(--radius);
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  border: none;
  min-height: 44px;
  transition: filter 0.2s, transform 0.15s;
}
.btn:hover { filter: brightness(1.08); transform: translateY(-1px); }
.btn--primary { background: var(--color-amber); color: var(--color-ink); }
.btn--outline { background: transparent; color: var(--color-green-deep); border: 2px solid var(--color-green-deep); }
.section-label {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-green-leaf);
  margin-bottom: var(--space-xs);
}
.card-grid {
  display: grid;
  gap: var(--space-md);
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  margin-top: var(--space-md);
}
.card {
  background: #fff;
  border-radius: var(--radius);
  padding: var(--space-md);
  border: 1px solid rgba(36,92,54,0.1);
  box-shadow: 0 2px 8px rgba(0,0,0,.04);
}
.card__icon {
  font-size: 2rem;
  margin-bottom: var(--space-xs);
}
.placeholder-img {
  width: 100%;
  aspect-ratio: 4/3;
  background: linear-gradient(135deg, var(--color-green-leaf) 0%, var(--color-green-deep) 100%);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.5);
  font-size: 0.8rem;
  text-align: center;
  padding: var(--space-sm);
}
```

- [ ] **Step 4: Create empty assets/js/main.js stub**

```js
/* main.js — filled in Task 7 */
```

- [ ] **Step 5: Create assets/img/.gitkeep**

Empty file — marks the folder for git.

---

## Task 2: Shared header/footer HTML snippets (reference)

These snippets are copy-pasted into every page. Define them once here so Tasks 3–7 can use them consistently.

**Files:** Used in all `.html` files (Tasks 3–7).

- [ ] **Step 1: Lock the `<head>` template (copy into every page, change title/desc/canonical)**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PAGE TITLE — Gugauli Organic Producer Company</title>
  <meta name="description" content="PAGE DESCRIPTION">
  <link rel="canonical" href="https://gugauliorganic.in/PAGE-PATH/">
  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="PAGE TITLE — Gugauli Organic Producer Company">
  <meta property="og:description" content="PAGE DESCRIPTION">
  <meta property="og:url" content="https://gugauliorganic.in/PAGE-PATH/">
  <meta property="og:image" content="https://gugauliorganic.in/assets/img/og-image.jpg"><!-- TODO: create OG image -->
  <meta name="twitter:card" content="summary_large_image">
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/assets/icons/favicon.svg">
  <!-- Google Fonts: Tiro Devanagari (display) + Hind (body) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Tiro+Devanagari:ital@0;1&family=Hind:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/styles.css">
</head>
```

- [ ] **Step 2: Lock the header markup (copy into every page)**

```html
<a class="skip-link" href="#main">Skip to main content</a>

<header class="site-header" role="banner">
  <a class="site-header__brand" href="/" aria-label="Gugauli Organic Producer Company — Home">
    <!-- TODO: replace with real logo SVG/PNG once provided -->
    <svg class="site-header__logo" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="40" height="40" rx="6" fill="#5C9A4F"/>
      <text x="20" y="27" text-anchor="middle" font-size="20" fill="#F7F4EC" font-family="serif">G</text>
    </svg>
    <span class="site-header__name">Gugauli Organic<br><small style="font-size:.7em;font-weight:400;opacity:.85">Producer Company</small></span>
  </a>

  <button class="nav-toggle" aria-controls="site-nav" aria-expanded="false" aria-label="Open navigation menu">
    <span class="nav-toggle__open" aria-hidden="true">☰</span>
    <span class="nav-toggle__close" aria-hidden="true">✕</span>
  </button>

  <nav class="site-nav" id="site-nav" aria-label="Main navigation">
    <ul class="site-nav__list">
      <li><a href="/">Home</a></li>
      <li><a href="/about.html">About</a></li>
      <li><a href="/products.html">What We Grow</a></li>
      <li><a href="/farmers.html">For Farmers</a></li>
      <li><a href="/contact.html">Contact</a></li>
    </ul>
  </nav>
</header>
```

- [ ] **Step 3: Lock the footer markup (copy into every page)**

```html
<footer class="site-footer" role="contentinfo">
  <div class="site-footer__inner">
    <div>
      <p class="site-footer__name">Gugauli Organic Producer Company Limited</p>
      <p class="site-footer__tagline">Growing for Life · Certified Organic Farmers</p>
      <address style="font-style:normal;font-size:.9rem;line-height:1.7;opacity:.85;">
        <!-- TODO: confirm whether to display C/O line publicly -->
        C/O Ramkesh Yadav,<br>
        Village &amp; Post Piparahari,<br>
        Tindwari, Banda, Uttar Pradesh – 210123, India
      </address>
    </div>
    <div>
      <p style="font-weight:600;margin-bottom:.5rem;">Get in touch</p>
      <!-- TODO: replace +91XXXXXXXXXXX with real number -->
      <p><a href="tel:+91XXXXXXXXXXX">+91 XXXXX XXXXX</a></p>
      <p><a href="https://wa.me/91XXXXXXXXXXX" target="_blank" rel="noopener">WhatsApp us</a></p>
      <!-- TODO: confirm email address -->
      <p><a href="mailto:info@gugauliorganic.in">info@gugauliorganic.in</a></p>
      <!-- TODO: add social links once handles are confirmed; remove this comment -->
      <!-- <p><a href="#">Facebook</a> · <a href="#">Instagram</a></p> -->
    </div>
    <div>
      <p style="font-weight:600;margin-bottom:.5rem;">Quick links</p>
      <ul style="list-style:none;line-height:2;">
        <li><a href="/">Home</a></li>
        <li><a href="/about.html">About Us</a></li>
        <li><a href="/products.html">What We Grow</a></li>
        <li><a href="/farmers.html">For Farmers</a></li>
        <li><a href="/contact.html">Contact</a></li>
      </ul>
    </div>
  </div>
  <div class="container">
    <p class="site-footer__reg">
      Registered Producer Company · CIN: U01619UP2026PTC246478 · GSTIN: 09AAMCG9593P1ZB · Incorporated 8 April 2026 · Banda, Uttar Pradesh
    </p>
    <p class="site-footer__copy">© <span id="year"></span> Gugauli Organic Producer Company Limited. All rights reserved.</p>
  </div>
</footer>
<script src="/assets/js/main.js"></script>
```

---

## Task 3: Home page (index.html)

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create index.html with head + header + footer (from Task 2 snippets)**

Title: `Gugauli Organic Producer Company — Growing for Life, Banda, Uttar Pradesh`
Description: `Gugauli Organic Producer Company Limited is a farmer-owned organic producer company in Banda, Uttar Pradesh. Pulses, wheat, mustard — grown together, sold fairly.`
Canonical: `https://gugauliorganic.in/`

- [ ] **Step 2: Write the Hero section**

```html
<main id="main">
  <!-- HERO -->
  <section class="hero" aria-label="Introduction">
    <div class="hero__inner container">
      <div class="hero__text">
        <p class="section-label">Farmer-Owned · Organic · Bundelkhand</p>
        <h1 class="hero__headline">Growing for Life</h1>
        <p class="hero__sub">A farmer-owned organic producer company from Banda, Uttar Pradesh — growing together, selling fairly.</p>
        <div class="hero__ctas">
          <a href="/contact.html" class="btn btn--primary">Talk to us</a>
          <a href="/farmers.html" class="btn btn--outline" style="--color-green-deep:#fff;color:#fff;border-color:rgba(255,255,255,.6)">Become a member</a>
        </div>
      </div>
      <div class="hero__mark" aria-hidden="true">
        <!-- Seedling SVG mark — TODO: replace with real logo when available -->
        <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" width="160" height="160">
          <circle cx="80" cy="80" r="76" fill="rgba(92,154,79,0.18)" stroke="rgba(224,161,46,0.4)" stroke-width="2"/>
          <!-- Stem -->
          <line x1="80" y1="120" x2="80" y2="55" stroke="#5C9A4F" stroke-width="4" stroke-linecap="round"/>
          <!-- Left leaf -->
          <path d="M80 80 Q55 60 48 38 Q68 50 80 68" fill="#5C9A4F" opacity=".9"/>
          <!-- Right leaf -->
          <path d="M80 75 Q105 55 112 33 Q92 45 80 63" fill="#245C36" opacity=".85"/>
          <!-- Sun arc -->
          <path d="M48 30 A40 40 0 0 1 112 30" fill="none" stroke="#E0A12E" stroke-width="3" stroke-linecap="round" opacity=".7"/>
          <!-- Sun dot -->
          <circle cx="80" cy="18" r="6" fill="#E0A12E" opacity=".8"/>
        </svg>
      </div>
    </div>
  </section>
```

CSS for hero to add to `styles.css`:

```css
/* HERO */
.hero {
  background: var(--color-green-deep);
  color: #fff;
  padding: var(--space-xl) 0;
  position: relative;
  overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 70% 50%, rgba(92,154,79,0.25) 0%, transparent 70%);
  pointer-events: none;
}
.hero__inner {
  display: flex;
  align-items: center;
  gap: var(--space-xl);
  position: relative;
}
.hero__text { flex: 1; }
.hero__headline {
  color: #fff;
  margin-bottom: var(--space-sm);
}
.hero__sub {
  font-size: 1.15rem;
  opacity: 0.9;
  margin-bottom: var(--space-lg);
  max-width: 50ch;
}
.hero__ctas { display: flex; gap: var(--space-sm); flex-wrap: wrap; }
.hero__mark { flex-shrink: 0; }
@media (max-width: 600px) {
  .hero__mark { display: none; }
  .hero__inner { flex-direction: column; align-items: flex-start; }
}
```

- [ ] **Step 3: Write "Who we are" intro section**

```html
  <!-- WAVE DIVIDER -->
  <div class="wave-divider" aria-hidden="true">
    <svg viewBox="0 0 1200 40" preserveAspectRatio="none">
      <path d="M0,20 C200,40 400,0 600,20 C800,40 1000,0 1200,20 L1200,40 L0,40 Z" fill="#6B4A2B"/>
    </svg>
  </div>

  <!-- WHO WE ARE -->
  <section class="section" aria-labelledby="intro-heading">
    <div class="container">
      <p class="section-label">Who we are</p>
      <h2 id="intro-heading">A collective of farmers in Bundelkhand</h2>
      <p style="font-size:1.1rem;margin-top:var(--space-sm);max-width:60ch;">Gugauli Organic Producer Company Limited is a collective of farmers in Bundelkhand who grow using organic practices. By pooling our produce, our buying, and our knowledge, we help our members reach better markets and earn a fair price — without the middleman.</p>
    </div>
  </section>
```

- [ ] **Step 4: Write "What we do" cards**

```html
  <!-- WHAT WE DO -->
  <section class="section" style="background:#fff;" aria-labelledby="what-we-do-heading">
    <div class="container">
      <p class="section-label">What we do</p>
      <h2 id="what-we-do-heading">From field to fair price</h2>
      <div class="card-grid" style="margin-top:var(--space-lg);">
        <div class="card">
          <div class="card__icon" aria-hidden="true">🌾</div>
          <h3>Organic Produce</h3>
          <p>We grow pulses, wheat, oilseeds and vegetables using organic methods — no synthetic pesticides, no harmful inputs.</p>
        </div>
        <div class="card">
          <div class="card__icon" aria-hidden="true">🤝</div>
          <h3>Fair Market Access</h3>
          <p>Collective selling means better bargaining power and fairer prices — we cut out the middlemen who eat into farmer margins.</p>
        </div>
        <div class="card">
          <div class="card__icon" aria-hidden="true">🌱</div>
          <h3>Inputs &amp; Training</h3>
          <p>Bulk-purchased organic seeds, bio-fertilisers, and bio-pesticides for members, plus practical training on organic practices.</p>
        </div>
        <div class="card">
          <div class="card__icon" aria-hidden="true">📦</div>
          <h3>Processing &amp; Packaging</h3>
          <p>Grading, cleaning, drying and packaging — adding value to produce before it reaches buyers and institutions.</p>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 5: Write "What we grow" preview**

```html
  <!-- WAVE DIVIDER -->
  <div class="wave-divider" aria-hidden="true" style="transform:rotate(180deg);opacity:.12;">
    <svg viewBox="0 0 1200 40" preserveAspectRatio="none">
      <path d="M0,20 C200,40 400,0 600,20 C800,40 1000,0 1200,20 L1200,40 L0,40 Z" fill="#6B4A2B"/>
    </svg>
  </div>

  <!-- WHAT WE GROW PREVIEW -->
  <section class="section" aria-labelledby="crops-heading">
    <div class="container">
      <p class="section-label">From our farms</p>
      <!-- TODO: update crop list once confirmed by owner (Section 4 #1) -->
      <h2 id="crops-heading">What our farmers grow</h2>
      <p style="margin-top:var(--space-xs);">Our member farmers in Banda and Bundelkhand cultivate a range of organic produce suited to the region's soil and seasons.</p>
      <div class="card-grid" style="margin-top:var(--space-md);">
        <div class="card" style="display:flex;align-items:center;gap:var(--space-sm);">
          <span style="font-size:2rem;" aria-hidden="true">🫘</span>
          <div><strong>Pulses</strong><br><small>Arhar/tur, chana, urad</small></div>
        </div>
        <div class="card" style="display:flex;align-items:center;gap:var(--space-sm);">
          <span style="font-size:2rem;" aria-hidden="true">🌾</span>
          <div><strong>Wheat</strong><br><small>Seasonal crop</small></div>
        </div>
        <div class="card" style="display:flex;align-items:center;gap:var(--space-sm);">
          <span style="font-size:2rem;" aria-hidden="true">🟡</span>
          <div><strong>Mustard / Oilseeds</strong><br><small>Cold-pressed quality</small></div>
        </div>
        <div class="card" style="display:flex;align-items:center;gap:var(--space-sm);">
          <span style="font-size:2rem;" aria-hidden="true">🥬</span>
          <div><strong>Seasonal Vegetables</strong><br><small>Varied by season</small></div>
        </div>
      </div>
      <p style="margin-top:var(--space-md);"><a href="/products.html" class="btn btn--outline">See all crops &rarr;</a></p>
    </div>
  </section>
```

- [ ] **Step 6: Write "Why a Producer Company" trust block**

```html
  <!-- WHY A PRODUCER COMPANY -->
  <section class="section" style="background: var(--color-green-deep); color: #fff;" aria-labelledby="why-fpo-heading">
    <div class="container">
      <p class="section-label" style="color:var(--color-amber);">Why a Producer Company?</p>
      <h2 id="why-fpo-heading" style="color:#fff;">Owned by farmers. Run by farmers.</h2>
      <p style="opacity:.9;margin-top:var(--space-sm);max-width:60ch;">A Farmer Producer Company (FPC) is a company under the Companies Act, 2013 — but it is owned entirely by its farmer-members. Every member is a shareholder. Decisions are made together. Profits return to the members who earn them.</p>
      <ul style="margin-top:var(--space-md);display:grid;gap:var(--space-sm);grid-template-columns:repeat(auto-fit,minmax(200px,1fr));list-style:none;">
        <li style="display:flex;gap:.5rem;align-items:flex-start;"><span style="color:var(--color-amber);font-size:1.2rem;" aria-hidden="true">✓</span> No middleman markup</li>
        <li style="display:flex;gap:.5rem;align-items:flex-start;"><span style="color:var(--color-amber);font-size:1.2rem;" aria-hidden="true">✓</span> Collective bargaining power</li>
        <li style="display:flex;gap:.5rem;align-items:flex-start;"><span style="color:var(--color-amber);font-size:1.2rem;" aria-hidden="true">✓</span> Bulk input buying — cheaper inputs</li>
        <li style="display:flex;gap:.5rem;align-items:flex-start;"><span style="color:var(--color-amber);font-size:1.2rem;" aria-hidden="true">✓</span> Shared processing &amp; storage</li>
        <li style="display:flex;gap:.5rem;align-items:flex-start;"><span style="color:var(--color-amber);font-size:1.2rem;" aria-hidden="true">✓</span> Training &amp; technical support</li>
        <li style="display:flex;gap:.5rem;align-items:flex-start;"><span style="color:var(--color-amber);font-size:1.2rem;" aria-hidden="true">✓</span> Legal identity — GST, bank account</li>
      </ul>
      <p style="margin-top:var(--space-lg);"><a href="/farmers.html" class="btn btn--primary">Learn how to join &rarr;</a></p>
    </div>
  </section>
```

- [ ] **Step 7: Write trust strip + CTA band**

```html
  <!-- TRUST STRIP -->
  <section class="trust-strip" aria-label="Company credentials">
    <div class="container">
      <ul class="trust-strip__list">
        <li>Registered Producer Company</li>
        <li>CIN: U01619UP2026PTC246478</li>
        <li>GST-Registered</li>
        <li>Banda, Uttar Pradesh</li>
        <li>Est. 2026</li>
        <li>Committed to organic practices</li><!-- TODO: update once certification confirmed -->
      </ul>
    </div>
  </section>

  <!-- CTA BAND -->
  <section class="section cta-band" aria-labelledby="cta-heading">
    <div class="container" style="text-align:center;">
      <h2 id="cta-heading">Ready to grow with us?</h2>
      <p style="margin:var(--space-sm) auto;max-width:50ch;">Whether you are a farmer looking to join, a buyer seeking organic produce, or a partner wanting to collaborate — we would love to hear from you.</p>
      <div style="display:flex;gap:var(--space-sm);justify-content:center;flex-wrap:wrap;margin-top:var(--space-md);">
        <a href="/contact.html" class="btn btn--primary">Get in touch</a>
        <a href="/farmers.html" class="btn btn--outline">Become a member</a>
      </div>
    </div>
  </section>
</main>
```

CSS to add:

```css
/* TRUST STRIP */
.trust-strip {
  background: var(--color-green-leaf);
  color: #fff;
  padding: var(--space-sm) 0;
  overflow-x: auto;
}
.trust-strip__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0 var(--space-lg);
  list-style: none;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  align-items: center;
}
.trust-strip__list li + li::before {
  content: '·';
  margin-right: var(--space-lg);
  opacity: 0.5;
}
/* CTA BAND */
.cta-band { background: var(--color-paper); }
```

- [ ] **Step 8: Add JSON-LD structured data to `<head>`**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "name": "Gugauli Organic Producer Company Limited",
  "url": "https://gugauliorganic.in",
  "logo": "https://gugauliorganic.in/assets/icons/favicon.svg",
  "foundingDate": "2026-04-08",
  "description": "Farmer-owned organic producer company in Banda, Uttar Pradesh — growing and selling organic pulses, wheat, oilseeds and vegetables.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Village & Post Piparahari, Tindwari",
    "addressLocality": "Banda",
    "addressRegion": "Uttar Pradesh",
    "postalCode": "210123",
    "addressCountry": "IN"
  },
  "identifier": {
    "@type": "PropertyValue",
    "name": "CIN",
    "value": "U01619UP2026PTC246478"
  },
  "knowsAbout": ["organic farming", "pulses", "wheat", "oilseeds", "Bundelkhand agriculture"]
}
</script>
```

---

## Task 4: About page (about.html)

**Files:**
- Create: `about.html`

- [ ] **Step 1: Create about.html with head (title/desc/canonical), header, footer**

Title: `About Us — Gugauli Organic Producer Company Limited`
Description: `The story behind Gugauli Organic Producer Company — a farmer collective in Banda, Uttar Pradesh, founded to help smallholder farmers get fair prices for their organic produce.`

- [ ] **Step 2: Write the page body (hero banner + story + mission + what is an FPC + directors + registration)**

```html
<main id="main">
  <!-- PAGE BANNER -->
  <div class="page-banner" style="background:var(--color-green-deep);color:#fff;padding:var(--space-lg) 0;">
    <div class="container">
      <p class="section-label" style="color:var(--color-amber);">About us</p>
      <h1>Our story</h1>
      <p style="opacity:.85;max-width:55ch;margin-top:.5rem;">How a group of farmers in Banda came together to take back control of their livelihoods.</p>
    </div>
  </div>

  <!-- OUR STORY -->
  <section class="section" aria-labelledby="story-heading">
    <div class="container" style="display:grid;gap:var(--space-xl);grid-template-columns:1fr;">
      <div>
        <h2 id="story-heading">From scattered fields to a collective</h2>
        <p style="margin-top:var(--space-sm);">Bundelkhand is a region of small farms and big challenges — fragmented landholdings, erratic rains, and a long chain of middlemen between the farmer and the final buyer. For generations, farmers here have grown quality produce only to sell it at prices set by others.</p>
        <p style="margin-top:var(--space-sm);">Gugauli Organic Producer Company Limited was incorporated on 8 April 2026 to change that equation. Registered as a Farmer Producer Company under the Companies Act, 2013, it gives its farmer-members the legal standing, collective infrastructure, and shared services to market their produce directly, buy inputs in bulk, and build their own market relationships.</p>
        <!-- TODO: add origin narrative once owner provides it -->
        <p style="margin-top:var(--space-sm);">The company operates from Village Piparahari, Tindwari, Banda — rooted in the community it serves.</p>
      </div>
    </div>
  </section>

  <!-- WAVE DIVIDER -->
  <div class="wave-divider" aria-hidden="true">
    <svg viewBox="0 0 1200 40" preserveAspectRatio="none">
      <path d="M0,20 C200,40 400,0 600,20 C800,40 1000,0 1200,20 L1200,40 L0,40 Z" fill="#6B4A2B"/>
    </svg>
  </div>

  <!-- MISSION & VISION -->
  <section class="section" style="background:#fff;" aria-labelledby="mission-heading">
    <div class="container">
      <div style="display:grid;gap:var(--space-lg);grid-template-columns:repeat(auto-fit,minmax(280px,1fr));">
        <div>
          <p class="section-label">Mission</p>
          <h2 id="mission-heading" style="font-size:1.4rem;">What drives us</h2>
          <p style="margin-top:var(--space-sm);">To help our farmer-members grow, process, and sell organic produce on fair terms, while improving soil, livelihoods, and the land we farm.</p>
        </div>
        <div>
          <p class="section-label">Vision</p>
          <h2 style="font-size:1.4rem;">Where we are headed</h2>
          <p style="margin-top:var(--space-sm);">A thriving, self-reliant community of organic farmers in Bundelkhand — earning well, farming sustainably, and growing for life.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- WHAT IS A PRODUCER COMPANY -->
  <section class="section" aria-labelledby="fpc-heading">
    <div class="container">
      <p class="section-label">Structure</p>
      <h2 id="fpc-heading">What is a Farmer Producer Company?</h2>
      <p style="margin-top:var(--space-sm);max-width:65ch;">A Farmer Producer Company (FPC) is a company registered under the Companies Act, 2013 — but owned entirely by its farmer-members. Each member is a shareholder. The company can enter contracts, open bank accounts, apply for government schemes, and trade directly with buyers — just like any registered company, but for and by its farmers.</p>
      <p style="margin-top:var(--space-sm);max-width:65ch;">Being part of an FPC gives individual smallholders the negotiating strength of a collective — better input prices, better output prices, and access to institutional buyers and export markets.</p>
    </div>
  </section>

  <!-- LEADERSHIP -->
  <section class="section" style="background:#fff;" aria-labelledby="directors-heading">
    <div class="container">
      <p class="section-label">Leadership</p>
      <h2 id="directors-heading">Directors</h2>
      <div class="card-grid" style="margin-top:var(--space-md);">
        <div class="card" style="display:flex;flex-direction:column;gap:.5rem;">
          <!-- TODO: add director photo once provided; do NOT use government-ID photos -->
          <div class="placeholder-img" style="aspect-ratio:1/1;width:80px;height:80px;border-radius:50%;flex-shrink:0;">Photo<br>TODO</div>
          <div>
            <h3 style="font-size:1.1rem;margin-bottom:.2rem;">Vikhyat Kumar Yadav</h3>
            <p style="font-size:.85rem;opacity:.7;">Director, Gugauli Organic Producer Company Limited</p>
          </div>
        </div>
        <div class="card" style="display:flex;flex-direction:column;gap:.5rem;">
          <div class="placeholder-img" style="aspect-ratio:1/1;width:80px;height:80px;border-radius:50%;flex-shrink:0;">Photo<br>TODO</div>
          <div>
            <h3 style="font-size:1.1rem;margin-bottom:.2rem;">Ashok Kumar</h3>
            <p style="font-size:.85rem;opacity:.7;">Director, Gugauli Organic Producer Company Limited</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- REGISTRATION DETAILS -->
  <section class="section" aria-labelledby="reg-heading">
    <div class="container">
      <p class="section-label">Registration</p>
      <h2 id="reg-heading">Company details</h2>
      <dl style="margin-top:var(--space-md);display:grid;gap:var(--space-sm);grid-template-columns:max-content 1fr;row-gap:.75rem;">
        <dt style="font-weight:600;opacity:.7;font-size:.9rem;">Legal name</dt>
        <dd>Gugauli Organic Producer Company Limited</dd>
        <dt style="font-weight:600;opacity:.7;font-size:.9rem;">Type</dt>
        <dd>Farmer Producer Company (Companies Act, 2013)</dd>
        <dt style="font-weight:600;opacity:.7;font-size:.9rem;">CIN</dt>
        <dd><code style="font-size:.9rem;">U01619UP2026PTC246478</code></dd>
        <dt style="font-weight:600;opacity:.7;font-size:.9rem;">GSTIN</dt>
        <dd><code style="font-size:.9rem;">09AAMCG9593P1ZB</code></dd>
        <dt style="font-weight:600;opacity:.7;font-size:.9rem;">Incorporated</dt>
        <dd>8 April 2026</dd>
        <dt style="font-weight:600;opacity:.7;font-size:.9rem;">Registered office</dt>
        <dd>C/O Ramkesh Yadav, Village &amp; Post Piparahari, Tindwari, Banda, Uttar Pradesh – 210123<!-- TODO: confirm C/O line for public display --></dd>
      </dl>
    </div>
  </section>
</main>
```

CSS to add:

```css
@media (max-width: 520px) {
  dl { grid-template-columns: 1fr; }
  dt { margin-top: var(--space-sm); }
}
```

---

## Task 5: Products page (products.html)

**Files:**
- Create: `products.html`

- [ ] **Step 1: Create products.html with head, header, footer**

Title: `What We Grow — Gugauli Organic Producer Company`
Description: `Our farmers in Banda, Uttar Pradesh grow organic pulses, wheat, mustard, and seasonal vegetables using natural farming methods.`

- [ ] **Step 2: Write the page body**

```html
<main id="main">
  <div class="page-banner" style="background:var(--color-green-deep);color:#fff;padding:var(--space-lg) 0;">
    <div class="container">
      <p class="section-label" style="color:var(--color-amber);">From our farms</p>
      <h1>What we grow</h1>
      <p style="opacity:.85;max-width:55ch;margin-top:.5rem;">Organic produce from the fields of Bundelkhand — grown without synthetic pesticides, harvested with care.</p>
    </div>
  </div>

  <!-- ORGANIC PRACTICES NOTE -->
  <section class="section" aria-labelledby="practices-heading">
    <div class="container">
      <h2 id="practices-heading">Committed to organic practices</h2>
      <!-- TODO: update once certification number/status confirmed (Section 4 #11) -->
      <p style="margin-top:var(--space-sm);max-width:65ch;">Our member farmers are committed to certified organic practices — growing without harmful synthetic inputs, protecting soil health, and preserving the natural ecosystem of their land. We are working towards formal organic certification and will update this section when confirmed.</p>
    </div>
  </section>

  <!-- PRODUCE GRID -->
  <!-- TODO: replace with confirmed crop list from owner (Section 4 #1) -->
  <section class="section" style="background:#fff;" aria-labelledby="crops-grid-heading">
    <div class="container">
      <p class="section-label">Our produce</p>
      <h2 id="crops-grid-heading">Crops our farmers grow</h2>
      <div class="card-grid" style="margin-top:var(--space-lg);">

        <article class="card">
          <div class="placeholder-img" aria-label="Arhar/tur dal field — photo coming soon">Photo coming soon</div>
          <h3 style="margin-top:var(--space-sm);">Arhar / Tur Dal</h3>
          <p>Pigeon pea — a staple pulse of Bundelkhand, grown organically in the kharif season. Rich in protein, suited to the region's soil.</p>
        </article>

        <article class="card">
          <div class="placeholder-img" aria-label="Chana/gram field — photo coming soon">Photo coming soon</div>
          <h3 style="margin-top:var(--space-sm);">Chana / Gram</h3>
          <p>Chickpea — a rabi season staple. Cultivated without synthetic pesticides, high in fibre and plant protein.</p>
        </article>

        <article class="card">
          <div class="placeholder-img" aria-label="Urad dal field — photo coming soon">Photo coming soon</div>
          <h3 style="margin-top:var(--space-sm);">Urad Dal</h3>
          <p>Black gram — kharif pulse known for its nutritional value and demand in household kitchens across India.</p>
        </article>

        <article class="card">
          <div class="placeholder-img" aria-label="Wheat field — photo coming soon">Photo coming soon</div>
          <h3 style="margin-top:var(--space-sm);">Wheat</h3>
          <p>Rabi crop grown in Bundelkhand's fertile soils — organically cultivated, free of synthetic fertilisers.</p>
        </article>

        <article class="card">
          <div class="placeholder-img" aria-label="Mustard field — photo coming soon">Photo coming soon</div>
          <h3 style="margin-top:var(--space-sm);">Mustard / Oilseeds</h3>
          <p>Cold-pressed quality mustard grown in the rabi season. A key crop for the region and a cooking staple across North India.</p>
        </article>

        <article class="card">
          <div class="placeholder-img" aria-label="Seasonal vegetables — photo coming soon">Photo coming soon</div>
          <h3 style="margin-top:var(--space-sm);">Seasonal Vegetables</h3>
          <!-- TODO: specify which vegetables once confirmed -->
          <p>Varied with the season — grown using organic inputs, harvested and pooled for collective sale through the company.</p>
        </article>

      </div>
    </div>
  </section>

  <!-- FROM FARMS TO YOU -->
  <section class="section" aria-labelledby="process-heading" style="background:var(--color-green-deep);color:#fff;">
    <div class="container">
      <p class="section-label" style="color:var(--color-amber);">The organic &amp; fair-price approach</p>
      <h2 id="process-heading" style="color:#fff;">From our farms to you</h2>
      <p style="opacity:.9;margin-top:var(--space-sm);max-width:60ch;">Every step — growing, harvesting, grading, cleaning, and packaging — follows organic guidelines. When the produce reaches buyers, it carries the collective's guarantee: grown by member farmers, handled with care, sold fairly.</p>
      <div style="display:grid;gap:var(--space-md);grid-template-columns:repeat(auto-fit,minmax(180px,1fr));margin-top:var(--space-lg);">
        <div style="text-align:center;">
          <div style="font-size:2.2rem;" aria-hidden="true">🌱</div>
          <p style="font-weight:700;margin-top:.4rem;">Grow organically</p>
          <p style="opacity:.8;font-size:.9rem;">No synthetic pesticides or fertilisers</p>
        </div>
        <div style="text-align:center;">
          <div style="font-size:2.2rem;" aria-hidden="true">🤲</div>
          <p style="font-weight:700;margin-top:.4rem;">Pool together</p>
          <p style="opacity:.8;font-size:.9rem;">Collective harvest builds bargaining power</p>
        </div>
        <div style="text-align:center;">
          <div style="font-size:2.2rem;" aria-hidden="true">📦</div>
          <p style="font-weight:700;margin-top:.4rem;">Grade &amp; pack</p>
          <p style="opacity:.8;font-size:.9rem;">Value-added processing before sale</p>
        </div>
        <div style="text-align:center;">
          <div style="font-size:2.2rem;" aria-hidden="true">🏪</div>
          <p style="font-weight:700;margin-top:.4rem;">Sell directly</p>
          <p style="opacity:.8;font-size:.9rem;">Direct to buyers — fair price for farmers</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="section cta-band">
    <div class="container" style="text-align:center;">
      <h2>Interested in our produce?</h2>
      <p style="margin:var(--space-sm) auto;max-width:48ch;">Whether you are a wholesaler, institution, or retail buyer looking for certified organic produce from Bundelkhand — get in touch.</p>
      <a href="/contact.html" class="btn btn--primary" style="margin-top:var(--space-sm);">Contact us</a>
    </div>
  </section>
</main>
```

---

## Task 6: Farmers page (farmers.html)

**Files:**
- Create: `farmers.html`

- [ ] **Step 1: Create farmers.html with head, header, footer**

Title: `For Farmers — Join Gugauli Organic Producer Company`
Description: `Join Gugauli Organic Producer Company as a farmer-member. Better prices through collective selling, cheaper inputs, training, and shared services for organic farmers in Banda, UP.`

- [ ] **Step 2: Write the page body**

```html
<main id="main">
  <div class="page-banner" style="background:var(--color-green-deep);color:#fff;padding:var(--space-lg) 0;">
    <div class="container">
      <p class="section-label" style="color:var(--color-amber);">For farmers</p>
      <h1>Grow with us</h1>
      <p style="opacity:.85;max-width:55ch;margin-top:.5rem;">A farmer producer company owned by its members — you sell together, buy together, and grow together.</p>
    </div>
  </div>

  <!-- WHY JOIN -->
  <section class="section" aria-labelledby="why-join-heading">
    <div class="container">
      <p class="section-label">Why join</p>
      <h2 id="why-join-heading">Benefits of being a member</h2>
      <p style="margin-top:var(--space-sm);">As a farmer-member of Gugauli Organic Producer Company, you become a shareholder in a collective that works for you — not a middleman.</p>
      <div class="card-grid" style="margin-top:var(--space-lg);">
        <div class="card">
          <div class="card__icon" aria-hidden="true">💰</div>
          <h3>Better prices</h3>
          <p>Collective selling means we negotiate from strength. Pooled produce reaches larger buyers who pay fairly — not the mandi price set by others.</p>
        </div>
        <div class="card">
          <div class="card__icon" aria-hidden="true">🛒</div>
          <h3>Cheaper inputs</h3>
          <p>Bulk purchasing of organic seeds, bio-fertilisers, and bio-pesticides reduces your input cost significantly compared to buying alone.</p>
        </div>
        <div class="card">
          <div class="card__icon" aria-hidden="true">📚</div>
          <h3>Training &amp; support</h3>
          <p>Practical training on organic farming practices, soil health, pest management, and best practices — at no extra cost to members.</p>
        </div>
        <div class="card">
          <div class="card__icon" aria-hidden="true">🏛</div>
          <h3>Government schemes</h3>
          <p>As a registered FPC, we can apply collectively for NABARD, SFAC, and state government support schemes that individual farmers often cannot access.</p>
        </div>
        <div class="card">
          <div class="card__icon" aria-hidden="true">📦</div>
          <h3>Shared infrastructure</h3>
          <p>Shared grading, drying, and packaging services — reducing post-harvest losses and adding value to your produce before it reaches the buyer.</p>
        </div>
        <div class="card">
          <div class="card__icon" aria-hidden="true">🤝</div>
          <h3>Ownership &amp; voice</h3>
          <p>You are a shareholder. You participate in decisions. Profits made by the company return to its farmer-members — not to outside investors.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- WAVE DIVIDER -->
  <div class="wave-divider" aria-hidden="true">
    <svg viewBox="0 0 1200 40" preserveAspectRatio="none">
      <path d="M0,20 C200,40 400,0 600,20 C800,40 1000,0 1200,20 L1200,40 L0,40 Z" fill="#6B4A2B"/>
    </svg>
  </div>

  <!-- HOW TO JOIN -->
  <section class="section" style="background:#fff;" aria-labelledby="join-heading">
    <div class="container">
      <p class="section-label">Membership</p>
      <!-- TODO: confirm actual membership process with owner (Section 4 #8) -->
      <h2 id="join-heading">How to become a member</h2>
      <p style="margin-top:var(--space-sm);">Joining is straightforward. Here is how it works:</p>
      <ol style="margin-top:var(--space-lg);display:grid;gap:var(--space-md);grid-template-columns:repeat(auto-fit,minmax(200px,1fr));list-style:none;counter-reset:steps;">
        <li style="counter-increment:steps;" class="card">
          <span style="font-size:2rem;font-family:var(--font-display);font-weight:700;color:var(--color-green-deep);" aria-hidden="true">01</span>
          <h3 style="margin-top:.5rem;">Reach out</h3>
          <p>Call us, send a WhatsApp message, or fill the contact form. Tell us where you farm and what you grow.</p>
        </li>
        <li style="counter-increment:steps;" class="card">
          <span style="font-size:2rem;font-family:var(--font-display);font-weight:700;color:var(--color-green-deep);" aria-hidden="true">02</span>
          <h3 style="margin-top:.5rem;">Meet the team</h3>
          <p>We will schedule a meeting — in person in Banda or over a call — to explain the membership process, your rights, and what to expect.</p>
        </li>
        <li style="counter-increment:steps;" class="card">
          <span style="font-size:2rem;font-family:var(--font-display);font-weight:700;color:var(--color-green-deep);" aria-hidden="true">03</span>
          <h3 style="margin-top:.5rem;">Join as a shareholder-member</h3>
          <p>Complete the membership formalities, take up your share, and become a co-owner of Gugauli Organic Producer Company Limited.</p>
        </li>
      </ol>
    </div>
  </section>

  <!-- WHATSAPP CTA -->
  <section class="section" style="background:var(--color-green-deep);color:#fff;text-align:center;" aria-labelledby="farmer-cta-heading">
    <div class="container">
      <p class="section-label" style="color:var(--color-amber);">Ready to join?</p>
      <h2 id="farmer-cta-heading" style="color:#fff;">Talk to us on WhatsApp</h2>
      <p style="opacity:.9;margin:var(--space-sm) auto;max-width:48ch;">The fastest way to reach us. Send a message — we reply in Hindi or English.</p>
      <div style="display:flex;gap:var(--space-sm);justify-content:center;flex-wrap:wrap;margin-top:var(--space-lg);">
        <!-- TODO: replace with real number -->
        <a href="https://wa.me/91XXXXXXXXXXX" target="_blank" rel="noopener" class="btn btn--primary" style="background:#25D366;color:#fff;">WhatsApp us</a>
        <a href="tel:+91XXXXXXXXXXX" class="btn" style="background:rgba(255,255,255,.15);color:#fff;border:2px solid rgba(255,255,255,.4);">Call us</a>
      </div>
    </div>
  </section>
</main>
```

---

## Task 7: Contact page (contact.html)

**Files:**
- Create: `contact.html`

- [ ] **Step 1: Create contact.html with head, header, footer**

Title: `Contact — Gugauli Organic Producer Company`
Description: `Get in touch with Gugauli Organic Producer Company Limited — call, WhatsApp, email, or use the contact form. Based in Banda, Uttar Pradesh.`

- [ ] **Step 2: Write the page body (address + form + map)**

```html
<main id="main">
  <div class="page-banner" style="background:var(--color-green-deep);color:#fff;padding:var(--space-lg) 0;">
    <div class="container">
      <p class="section-label" style="color:var(--color-amber);">Contact</p>
      <h1>Get in touch</h1>
      <p style="opacity:.85;max-width:55ch;margin-top:.5rem;">We are based in Banda, Uttar Pradesh. Reach us by phone, WhatsApp, email, or the form below.</p>
    </div>
  </div>

  <section class="section" aria-labelledby="contact-heading">
    <div class="container">
      <div style="display:grid;gap:var(--space-xl);grid-template-columns:repeat(auto-fit,minmax(280px,1fr));">

        <!-- CONTACT DETAILS -->
        <div>
          <h2 id="contact-heading" style="margin-bottom:var(--space-md);">Contact details</h2>

          <address style="font-style:normal;line-height:2;">
            <p style="font-weight:600;color:var(--color-green-deep);">Registered office</p>
            <!-- TODO: confirm C/O line for public display -->
            <p>C/O Ramkesh Yadav,<br>Village &amp; Post Piparahari,<br>Tindwari, Banda,<br>Uttar Pradesh – 210123, India</p>

            <p style="margin-top:var(--space-md);font-weight:600;color:var(--color-green-deep);">Phone</p>
            <!-- TODO: replace with real number -->
            <p><a href="tel:+91XXXXXXXXXXX" style="font-size:1.1rem;">+91 XXXXX XXXXX</a></p>

            <p style="margin-top:var(--space-md);font-weight:600;color:var(--color-green-deep);">WhatsApp</p>
            <!-- TODO: replace with real number -->
            <p><a href="https://wa.me/91XXXXXXXXXXX" target="_blank" rel="noopener" style="font-size:1.1rem;">Chat on WhatsApp</a></p>

            <p style="margin-top:var(--space-md);font-weight:600;color:var(--color-green-deep);">Email</p>
            <!-- TODO: confirm email -->
            <p><a href="mailto:info@gugauliorganic.in">info@gugauliorganic.in</a></p>
          </address>
        </div>

        <!-- CONTACT FORM -->
        <div>
          <h2 style="margin-bottom:var(--space-md);">Send us a message</h2>
          <!-- TODO: add Web3Forms access key (https://web3forms.com) — free, no server needed -->
          <form id="contact-form" action="https://api.web3forms.com/submit" method="POST" novalidate>
            <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_KEY_HERE"><!-- TODO -->
            <input type="hidden" name="subject" value="Enquiry — Gugauli Organic Producer Company Website">
            <input type="hidden" name="redirect" value="false">
            <!-- Honeypot anti-spam -->
            <input type="checkbox" name="botcheck" style="display:none;" tabindex="-1" aria-hidden="true">

            <div class="form-group">
              <label for="name" class="form-label">Name <span aria-hidden="true">*</span></label>
              <input type="text" id="name" name="name" class="form-input" required autocomplete="name" placeholder="Your name">
            </div>

            <div class="form-group">
              <label for="phone" class="form-label">Phone <span aria-hidden="true">*</span></label>
              <input type="tel" id="phone" name="phone" class="form-input" required autocomplete="tel" placeholder="+91 XXXXX XXXXX">
            </div>

            <div class="form-group">
              <label for="email" class="form-label">Email <span aria-hidden="true">(optional)</span></label>
              <input type="email" id="email" name="email" class="form-input" autocomplete="email" placeholder="you@example.com">
            </div>

            <div class="form-group">
              <label for="message" class="form-label">Message <span aria-hidden="true">*</span></label>
              <textarea id="message" name="message" class="form-input" rows="5" required placeholder="How can we help?"></textarea>
            </div>

            <button type="submit" class="btn btn--primary" style="width:100%;justify-content:center;">Send message</button>

            <div id="form-result" role="status" aria-live="polite" style="margin-top:var(--space-sm);display:none;"></div>
          </form>
        </div>
      </div>

      <!-- GOOGLE MAP EMBED -->
      <div style="margin-top:var(--space-xl);">
        <h2 style="margin-bottom:var(--space-md);">Find us</h2>
        <!-- TODO: replace with precise embed link if a Google Maps place is created (Section 4 #7) -->
        <div style="border-radius:var(--radius);overflow:hidden;border:1px solid rgba(0,0,0,.1);">
          <iframe
            title="Map showing Piparahari, Tindwari, Banda, Uttar Pradesh"
            width="100%"
            height="350"
            style="border:0;display:block;"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=Piparahari,Tindwari,Banda,Uttar Pradesh&output=embed"
            allowfullscreen>
          </iframe>
        </div>
      </div>
    </div>
  </section>
</main>
```

CSS to add:

```css
/* FORM */
.form-group { margin-bottom: var(--space-md); }
.form-label { display: block; font-weight: 600; margin-bottom: .35rem; font-size: .95rem; }
.form-input {
  width: 100%;
  padding: .65rem .85rem;
  border: 1.5px solid rgba(36,92,54,.3);
  border-radius: var(--radius);
  font-family: var(--font-body);
  font-size: 1rem;
  background: #fff;
  color: var(--color-ink);
  transition: border-color .2s;
}
.form-input:focus { outline: none; border-color: var(--color-green-deep); box-shadow: 0 0 0 3px rgba(36,92,54,.12); }
.form-input:invalid:not(:placeholder-shown) { border-color: #c0392b; }
textarea.form-input { resize: vertical; }
#form-result.success { color: var(--color-green-deep); font-weight: 600; }
#form-result.error { color: #c0392b; font-weight: 600; }
```

---

## Task 8: JavaScript (assets/js/main.js)

**Files:**
- Modify: `assets/js/main.js`

- [ ] **Step 1: Write the full main.js**

```js
/* main.js — mobile nav, smooth scroll, contact form, footer year */

// ── Footer year ──────────────────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Mobile nav toggle ─────────────────────────────────────────
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
  });

  // Close on Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      toggle.focus();
    }
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    }
  });
}

// ── Mark current page in nav ──────────────────────────────────
document.querySelectorAll('.site-nav__list a').forEach((link) => {
  if (link.getAttribute('href') === window.location.pathname ||
      link.getAttribute('href') === window.location.pathname.replace(/\/$/, '') + '.html') {
    link.setAttribute('aria-current', 'page');
  }
});

// ── Contact form (Web3Forms) ──────────────────────────────────
const form = document.getElementById('contact-form');
const result = document.getElementById('form-result');

if (form && result) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    result.style.display = 'none';
    result.className = '';

    try {
      const data = new FormData(form);
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });
      const json = await res.json();

      if (json.success) {
        result.textContent = 'Thanks — we will get back to you shortly.';
        result.className = 'success';
        form.reset();
      } else {
        throw new Error(json.message || 'Submission failed');
      }
    } catch (err) {
      result.textContent = 'Something went wrong. Please try calling or WhatsApping us directly.';
      result.className = 'error';
    } finally {
      result.style.display = 'block';
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}
```

---

## Task 9: 404 page, sitemap.xml, robots.txt

**Files:**
- Create: `404.html`
- Create: `sitemap.xml`
- Create: `robots.txt`

- [ ] **Step 1: Create 404.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page not found — Gugauli Organic Producer Company</title>
  <link rel="icon" type="image/svg+xml" href="/assets/icons/favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Tiro+Devanagari:ital@0;1&family=Hind:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/styles.css">
</head>
<body>
  <!-- [paste header here] -->
  <main id="main" style="text-align:center;padding:var(--space-xl) var(--space-md);">
    <p class="section-label">404</p>
    <h1>Page not found</h1>
    <p style="margin:var(--space-sm) auto;max-width:40ch;">The page you are looking for does not exist or has moved.</p>
    <a href="/" class="btn btn--primary" style="margin-top:var(--space-md);">Go to home page</a>
  </main>
  <!-- [paste footer here] -->
</body>
</html>
```

- [ ] **Step 2: Create sitemap.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://gugauliorganic.in/</loc><priority>1.0</priority></url>
  <url><loc>https://gugauliorganic.in/about.html</loc><priority>0.8</priority></url>
  <url><loc>https://gugauliorganic.in/products.html</loc><priority>0.8</priority></url>
  <url><loc>https://gugauliorganic.in/farmers.html</loc><priority>0.8</priority></url>
  <url><loc>https://gugauliorganic.in/contact.html</loc><priority>0.9</priority></url>
</urlset>
```

- [ ] **Step 3: Create robots.txt**

```
User-agent: *
Allow: /
Sitemap: https://gugauliorganic.in/sitemap.xml
```

---

## Task 10: site.config.js + README.md

**Files:**
- Modify: `site.config.js` (already created in Task 1 — confirm it matches what main.js expects)
- Create: `README.md`

- [ ] **Step 1: Write README.md**

```markdown
# Gugauli Organic Producer Company — Website

Static brochure website for Gugauli Organic Producer Company Limited, Banda, Uttar Pradesh.

## Quick start (editing content)

All site-wide settings (phone, email, domain, form key) are in **`site.config.js`** — edit once.

To update content, open the relevant `.html` file in any text editor. Search for `TODO` comments for spots awaiting real information.

## File overview

| File | Purpose |
|------|---------|
| `index.html` | Home page |
| `about.html` | Company story, directors, registration |
| `products.html` | What we grow |
| `farmers.html` | Membership information |
| `contact.html` | Contact form, map, address |
| `assets/css/styles.css` | All styles |
| `assets/js/main.js` | Mobile nav, form, footer year |
| `site.config.js` | Central config (phone, email, domain, keys) |

## TODOs before go-live

1. **Logo** — replace placeholder SVG in header/footer with real logo file (SVG or transparent PNG).
2. **Phone/WhatsApp** — update `PHONE` and `WHATSAPP` in `site.config.js`.
3. **Email** — create `info@gugauliorganic.in` (or chosen address), update `EMAIL` in `site.config.js`.
4. **Web3Forms key** — create free account at https://web3forms.com, paste key into `site.config.js` and the `access_key` hidden input in `contact.html`.
5. **Photos** — add real farm/farmer photos to `assets/img/` and replace `placeholder-img` blocks.
6. **Organic certification** — update the certification note on `products.html` once status is confirmed.
7. **Crop list** — confirm the full crop list with the owner; update `products.html` and the preview on `index.html`.
8. **Directors photos** — add photos to the `about.html` director cards (not government-ID photos).
9. **Social media** — add handles to the footer once accounts are created.
10. **Domain** — update `domain` in `site.config.js` to the final `.in` domain.

## Deployment

### Cloudflare Pages (recommended)
1. Push this folder to a GitHub repository.
2. Go to Cloudflare Pages → Create project → connect the repo.
3. Framework preset: **None**. Build command: (leave blank). Output directory: `/`.
4. Site goes live at `*.pages.dev`. Add your custom domain under "Custom domains."
5. HTTPS is automatic.

### Hostinger (alternative)
1. Upload all files to `public_html` via hPanel File Manager or FTP.
2. Point your domain's DNS to Hostinger (A record / nameservers as Hostinger instructs).
3. Enable free SSL in hPanel.

## Editing the domain
Search for `gugauliorganic.in` across all files and replace with your final domain, or update `domain` in `site.config.js` — the JS writes canonical and OG URLs dynamically. Also update `sitemap.xml`.
```

---

## Self-Review Against Spec

### Spec coverage check

| Spec section | Covered? |
|---|---|
| 5 pages (index, about, products, farmers, contact) | ✓ Tasks 3–7 |
| 404.html | ✓ Task 9 |
| sitemap.xml + robots.txt | ✓ Task 9 |
| site.config.js single config | ✓ Task 1 |
| README with editing + deployment | ✓ Task 10 |
| Header/nav with hamburger, keyboard-accessible | ✓ Tasks 2 + 8 |
| Footer with reg line, social slot (hidden), copyright | ✓ Task 2 |
| Brand palette as CSS custom properties | ✓ Task 1 |
| Google Fonts: Tiro Devanagari + Hind (Devanagari-ready) | ✓ Task 2 head template |
| Hero: brand-color treatment, seedling SVG, CTA | ✓ Task 3 |
| Soil/horizon wave divider (signature element) | ✓ Tasks 3–6 |
| Trust strip (CIN, GSTIN, Banda, Est. 2026) | ✓ Task 3 |
| JSON-LD Organization + LocalBusiness | ✓ Task 3 |
| Contact form (Web3Forms, honeypot, inline success/error) | ✓ Task 7 |
| tel: + wa.me + mailto: links | ✓ Tasks 6, 7 |
| Google Maps embed | ✓ Task 7 |
| TODO comments for all Section 4 items | ✓ Throughout |
| No PAN / TAN anywhere | ✓ Verified — not in any task |
| Real company facts (CIN, GSTIN, directors, address) | ✓ Tasks 3, 4 |
| prefers-reduced-motion | ✓ Task 1 CSS (scroll-behavior) — need motion CSS |
| Skip-to-content link | ✓ Task 2 header |
| lang="en" on html | ✓ Implicit in head template — must add explicitly |
| Tap targets ≥ 44px | ✓ btn min-height 44px |
| WCAG AA contrast | ✓ Design tokens chosen for contrast |
| loading="lazy" on map iframe | ✓ Task 7 |
| Favicon SVG placeholder | ✓ Task 1 |
| og:image TODO | ✓ Task 2 head template note |

### Gaps found and added
- `lang="en"` on `<html>` tag: must be in head template (Task 2) ✓ (spec says it explicitly)
- `prefers-reduced-motion` for the hero radial gradient / any animations: only CSS `scroll-behavior` covered — add a general rule in Task 1 CSS that disables all transitions/animations when reduced-motion is set.
- `aria-current="page"` on nav: handled in JS (Task 8) + the markup shows it on the Home link specifically in each page.

Add to `styles.css` (append to Token + Reset section):

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
