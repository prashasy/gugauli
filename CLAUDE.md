# Gugauli Organic Producer Company — Project Context for Claude Code

This file is automatically read by Claude Code at session start. It contains everything needed to understand the project, make changes correctly, and avoid critical mistakes.

---

## ⚠️ Critical rules (read first)

- **NEVER add PAN or TAN to any file** — these are present in the incorporation documents but must not appear on the public website. CIN and GSTIN are OK to show publicly.
- **No framework, no build step** — this is plain HTML/CSS/JS. Do not introduce React, Vue, Tailwind, npm, or any build tooling.
- **Edit `site.config.js` for site-wide values** (phone, email, domain, Web3Forms key) — do not hardcode them in HTML files.
- **All HTML files must have the same header/footer** — they are duplicated across pages by design (no template engine in v1).
- **Search for `<!-- TODO` across files** before claiming anything is complete — there are deliberate placeholders throughout.

---

## 1. Company facts (use these verbatim)

### Identity
- **Legal name:** Gugauli Organic Producer Company Limited
- **Type:** Farmer Producer Company (Companies Act, 2013) — owned by its farmer-members
- **Tagline:** "Growing for Life"
- **Descriptor:** "Certified Organic Farmers"
- **Incorporated:** 8 April 2026
- **Directors (all 5 are promoters, appointed 8 April 2026):** Dharampal · Makarandh · Santosh · Vikhyat Kumar Yadav · Ashok Kumar
- **Member-shareholders (10 founding MOA subscribers, 1,000 shares each = 10,000 shares):** Reshu Singh, Santosh, Dharampal, Guddi Singh, Makarandh, Ashok Kumar, Bansh Raj Singh, Raj Kamal Singh Patel, Ram Karan, Vikhyat Kumar Yadav
- **Member register (46 members; Gugauli, Palra & Ujrehta villages; Tindwari & Badokhar Khurd blocks):** 410 shares between them, ₹4,100 contributed. Transcribed from the handwritten register sheets; #18 Bal Kishun and #21 Dridhpal are still unconfirmed spellings (TODO comment in about.html).
- **NEVER publish Aadhaar numbers, caste or gender** — the member register sheets carry a 12-digit Aadhaar, and the later sheets also carry caste (`जाति`) and gender (`लिंग`) columns. Aadhaar must never appear on the site, and the register scans must not be uploaded unless the Aadhaar column and father's/husband's-name column are redacted.
- **Never publish from the MOA or the register:** members' father's/husband's names, C/O names, or residential addresses — names, village and shareholding only. DINs are also omitted from the site.

### Registration identifiers
| Identifier | Value | Public? |
|---|---|---|
| CIN | `U01619UP2026PTC246478` | ✅ Yes — show in footer and about page |
| GSTIN | `09AAMCG9593P1ZB` | ✅ Yes — show in footer and about page |
| PAN | *(present in documents)* | ❌ **Never publish** |
| TAN | *(present in documents)* | ❌ **Never publish** |

### Registered office
```
C/O Ramkesh Yadav,
Village & Post Piparahari,
Tindwari, Banda,
Uttar Pradesh – 210123, India
```
*(Note: The "C/O Ramkesh Yadav" line is flagged as TODO — owner must confirm whether to display it publicly.)*

### Authorized share capital
₹1,00,000 (10,000 equity shares of ₹10 each) — can be mentioned in About page if relevant.

---

## 2. Tech stack

| Layer | Choice | Reason |
|---|---|---|
| HTML | Plain HTML5, semantic | No framework — must be editable without a dev environment |
| CSS | Hand-written, single `styles.css` | No Tailwind/Bootstrap CDN — all styles are in one file |
| JS | Vanilla ES6, single `main.js` | Mobile nav, form handler, footer year — no dependencies |
| Fonts | Google Fonts (Tiro Devanagari + Hind) | Both include Devanagari — Hindi version can be added later |
| Form backend | Web3Forms (free tier) | Static-friendly, no server needed |
| Hosting | Cloudflare Pages (GitHub-connected) | Auto-deploys on push to `main` |
| Build step | **None** | Files are deployed as-is from the repo root |

---

## 3. File structure

```
gugauli/
├── CLAUDE.md              ← this file
├── README.md              ← editing guide + deployment instructions (for humans)
├── index.html             ← Home page
├── about.html             ← About / Our Story
├── products.html          ← What We Grow
├── farmers.html           ← For Farmers / Membership
├── contact.html           ← Contact form + map
├── 404.html               ← Not-found page
├── robots.txt             ← Allow all, references sitemap
├── sitemap.xml            ← 5 pages listed
├── site.config.js         ← Central config: domain, phone, email, keys
├── .gitignore
├── assets/
│   ├── css/
│   │   └── styles.css     ← ALL styles (single file, ~350 lines)
│   ├── js/
│   │   └── main.js        ← Mobile nav + form handler + footer year
│   ├── img/
│   │   └── .gitkeep       ← Photos go here when provided
│   └── icons/
│       └── favicon.svg    ← Placeholder seedling SVG (TODO: replace with real logo)
└── docs/
    └── superpowers/
        └── plans/
            └── 2026-06-19-gugauli-website.md   ← Original implementation plan
```

---

## 4. Design system

### Colour palette (CSS custom properties)
```css
--color-green-deep: #245C36;   /* primary — sticky header, hero, trust sections */
--color-green-leaf: #5C9A4F;   /* secondary — section labels, trust strip background */
--color-earth:      #6B4A2B;   /* footer background, wave dividers */
--color-amber:      #E0A12E;   /* CTAs only — use sparingly */
--color-paper:      #F7F4EC;   /* warm off-white — page background */
--color-ink:        #211C16;   /* body text */
```

**Usage rules:**
- `--color-green-deep` carries the page — header, hero, dark sections
- `--color-amber` is reserved for primary CTAs and section-label text on dark backgrounds; overuse dilutes it
- `--color-paper` is the default page background, not pure white
- Cards use `#fff` (slightly cooler than paper) to create subtle lift

### Typography
```css
--font-display: 'Tiro Devanagari', Georgia, serif;  /* h1–h4 */
--font-body:    'Hind', system-ui, sans-serif;       /* body, nav, UI */
```
Both fonts include Devanagari — a Hindi (`/hi/`) version can be added without a font change.

Fluid type scale (uses `clamp()`):
- `h1`: `clamp(2rem, 5vw, 3.25rem)`
- `h2`: `clamp(1.5rem, 3.5vw, 2.25rem)`
- `h3`: `clamp(1.1rem, 2.5vw, 1.45rem)`

### Spacing tokens
```css
--space-xs: 0.5rem;
--space-sm: 1rem;
--space-md: 1.5rem;
--space-lg: 2.5rem;
--space-xl: 4rem;
```

### Key CSS classes
| Class | Purpose |
|---|---|
| `.container` | Max-width 1100px, centered, horizontal padding |
| `.section` | Top/bottom padding `var(--space-xl)` |
| `.section-label` | Small all-caps amber label above headings |
| `.card` | White card with border-radius, subtle shadow |
| `.card-grid` | `auto-fit` responsive grid, min 220px columns |
| `.btn` | Base button — min-height 44px (tap target) |
| `.btn--primary` | Amber fill, dark text |
| `.btn--outline` | Transparent, green border |
| `.btn--ghost` | Semi-transparent white — used on dark sections |
| `.btn--wa` | WhatsApp green `#25D366` |
| `.wave-divider` | Full-width SVG soil-horizon motif between sections |
| `.page-banner` | Dark green top banner for inner pages (h1 inside is white) |
| `.trust-strip` | Green-leaf strip with registration credentials |
| `.placeholder-img` | Green gradient block with 4:3 aspect ratio — replace with real photos |
| `.form-group`, `.form-label`, `.form-input` | Contact form elements |
| `.reg-table` | Two-column `dl` for the About page registration details |
| `.table-wrap`, `.data-table` | Horizontally scrollable wrapper + striped table (directors, member-shareholders); `td.num` right-aligns numbers |
| `.site-header`, `.site-nav`, `.nav-toggle` | Header + nav + hamburger |
| `.site-footer`, `.site-footer__inner` | Footer layout |
| `.sr-only` | Screen-reader only (visually hidden) |

### Signature design element
**Soil/horizon wave divider** — a subtle SVG path used 2–3 times per page to separate sections, echoing "Growing for Life." SVG path:
```html
<div class="wave-divider" aria-hidden="true">
  <svg viewBox="0 0 1200 48" preserveAspectRatio="none">
    <path d="M0,24 C150,48 350,0 600,24 C850,48 1050,0 1200,24 L1200,48 L0,48 Z" fill="#6B4A2B"/>
  </svg>
</div>
```

---

## 5. Page-by-page content guide

### index.html — Home
Sections in order:
1. **Hero** — dark green bg, seedling SVG mark, "Growing for Life" h1, subline, "Talk to us" (amber) + "Become a member" (ghost) CTAs
2. **Wave divider**
3. **Who we are** — 2-sentence intro about the collective
4. **What we do** — 4 cards: Organic Produce, Fair Market Access, Inputs & Training, Processing & Packaging
5. **Wave divider (inverted)**
6. **What we grow** — 4 crop cards (TODO: confirm with owner), link to products.html
7. **Why a Producer Company** — dark green section, 6 checkmark bullets, link to farmers.html
8. **Trust strip** — green-leaf, inline registration credentials
9. **CTA band** — "Ready to grow with us?", two buttons
10. JSON-LD structured data in `<head>` (Organization + LocalBusiness)

### about.html — About
Sections in order:
1. Page banner (dark green) — "Our story" h1
2. **Our story** — 3 paragraphs about Bundelkhand context, founding, location (TODO: owner to add narrative)
3. Wave divider
4. **Mission & Vision** — two-column grid, white bg
5. **What is a Farmer Producer Company?** — plain-language explainer
6. **Executive Directors** — "Who to contact" cards (Vikhyat Kumar Yadav + Ashok Kumar, with phone/email), then an **Active Directors** `.data-table`: name, designation, category, appointed (all 5 promoter-directors)
7. **Member-shareholders** — two `.data-table`s: *Founding Shareholders* (10 MOA subscribers, 1,000 shares each) and *Member Shareholders* (46 members: Sr. No., member, village, shares allocated), preceded by a four-card stat row (46 members / 410 shares / ₹4,100 / 3 villages)
8. **Registration details** — `<dl>` table: legal name, type, CIN, GSTIN, incorporated date, address

### products.html — What We Grow
Sections in order:
1. Page banner — "What we grow" h1
2. **Committed to organic practices** — TODO: update once certification confirmed
3. **Crops grid** (TODO: confirm full list) — 6 article cards:
   - Arhar / Tur Dal, Chana / Gram, Urad Dal, Wheat, Mustard / Oilseeds, Seasonal Vegetables
4. **From our farms to you** — dark green section, 4-step visual: Grow → Pool → Grade → Sell
5. **CTA band** — "Interested in our produce?"

### farmers.html — For Farmers
Sections in order:
1. Page banner — "Grow with us" h1
2. **Benefits** — 6 cards: Better prices, Cheaper inputs, Training & support, Government schemes, Shared infrastructure, Ownership & voice
3. Wave divider
4. **How to become a member** — 3 numbered steps (TODO: confirm actual process with owner):
   - 01 Reach out → 02 Meet the team → 03 Join as a shareholder-member
5. **WhatsApp CTA** — dark green, WhatsApp green button + ghost Call button

### contact.html — Contact
Sections in order:
1. Page banner — "Get in touch" h1
2. **Two-column grid:**
   - Left: Address (with TODO on C/O line), phone (`tel:`), WhatsApp (`wa.me`), email (`mailto:`), two buttons
   - Right: Web3Forms contact form (name, phone, email optional, message) with honeypot field
3. **Google Maps embed** — currently using generic query URL, TODO: replace with precise place embed

### 404.html — Not Found
Minimal: branded header/footer, centered "404 / Page not found" message, two buttons (Home, Contact).

---

## 6. Shared header/footer — exact markup

Every page has the same header and footer. If you change one, change all five pages.

### Header
```html
<a class="skip-link" href="#main">Skip to main content</a>
<header class="site-header" role="banner">
  <a class="site-header__brand" href="/" aria-label="Gugauli Organic Producer Company — Home">
    <!-- TODO: replace SVG with real logo file once provided -->
    <svg class="site-header__logo" viewBox="0 0 40 40" ...>...</svg>
    <span class="site-header__name">Gugauli Organic<br>
      <small style="font-size:.72em;font-weight:400;opacity:.8;">Producer Company</small>
    </span>
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
`aria-current="page"` is set on the active link — set it per-page in the HTML, and `main.js` also syncs it on load.

### Footer
Columns: company name/tagline/address | phone/WhatsApp/email | quick links nav.

Below the columns:
```
Registered Producer Company · CIN: U01619UP2026PTC246478 · GSTIN: 09AAMCG9593P1ZB · Incorporated 8 April 2026 · Banda, Uttar Pradesh
```
Copyright line uses `<span id="year"></span>` — filled by `main.js`.

---

## 7. JavaScript (main.js)

Four responsibilities:

1. **Footer year** — `document.getElementById('year').textContent = new Date().getFullYear()`
2. **Mobile nav toggle** — sets `aria-expanded`, toggles `.is-open` on `#site-nav`, closes on Esc keydown and outside click
3. **Current-page marker** — syncs `aria-current="page"` on the correct nav link based on `window.location.pathname`
4. **Contact form handler** — async `fetch` to Web3Forms API, disables button while pending, shows inline success/error message in `#form-result`, resets form on success. No `alert()`.

No external JS dependencies. No bundler. The script is loaded at the bottom of every page's `<body>`.

---

## 8. Contact form (Web3Forms)

```html
<form id="contact-form" action="https://api.web3forms.com/submit" method="POST" novalidate>
  <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_KEY_HERE"><!-- TODO -->
  <input type="hidden" name="subject" value="Enquiry — Gugauli Organic Producer Company Website">
  <input type="hidden" name="redirect" value="false">
  <input type="checkbox" name="botcheck" style="display:none;" tabindex="-1" aria-hidden="true">
  <!-- fields: name (required), phone (required), email (optional), message (required) -->
</form>
<div id="form-result" role="status" aria-live="polite"></div>
```

To activate: owner creates a free account at https://web3forms.com, gets an access key, pastes it into:
- `site.config.js` → `web3formsKey`
- `contact.html` → the `<input name="access_key">` value

---

## 9. site.config.js

Single source of truth for all site-wide config values. Currently a plain JS object (not used dynamically to patch HTML — it's documentation for the owner and a reference for `main.js` future use).

```js
const SITE = {
  domain:        'https://gugauliorganic.in',  // TODO: confirm
  phone:         '+91XXXXXXXXXXX',              // TODO: real number
  whatsapp:      '91XXXXXXXXXXX',               // TODO: no + or spaces
  email:         'info@gugauliorganic.in',      // TODO: confirm
  web3formsKey:  'YOUR_KEY_HERE',               // TODO: from web3forms.com
  mapsQuery:     'Piparahari,Tindwari,Banda,Uttar Pradesh',
};
```

When updating phone/email/domain: update `site.config.js` AND do a find-and-replace across all HTML files (they currently have the placeholder values hardcoded in `href` attributes).

---

## 10. SEO and structured data

Every page has:
- Unique `<title>` and `<meta name="description">`
- `<link rel="canonical">` with full URL
- Open Graph tags (`og:type`, `og:title`, `og:description`, `og:url`, `og:image`)
- `<meta name="twitter:card" content="summary_large_image">`
- `lang="en"` on `<html>`

Home page only: JSON-LD structured data (inline `<script type="application/ld+json">`) with `@type: ["Organization", "LocalBusiness"]`, address, foundingDate, CIN identifier.

`sitemap.xml` — 5 URLs with priorities (home: 1.0, contact: 0.9, others: 0.8).

TODO: create `assets/img/og-image.jpg` (1200×630) and update the `og:image` meta tag on all pages.

---

## 11. Accessibility

- Skip-to-content link (`.skip-link`) on every page — visible on focus, amber background
- All interactive elements have visible focus rings (3px amber outline)
- Hamburger button: `aria-controls`, `aria-expanded`, `aria-label`; closes on Esc; focus returns to toggle on close
- All images: `alt` text or `aria-label` on placeholder divs; decorative SVGs have `aria-hidden="true"`
- `prefers-reduced-motion`: scroll-behavior disabled; all transitions/animations collapsed to 0.01ms
- Tap targets: minimum 44px height on all buttons and `.btn` elements
- Form: `<label>` linked to each input via `for`/`id`; required fields marked; `aria-live="polite"` on `#form-result`
- `<main id="main">` on every page (skip-link target)
- `role="banner"` on header, `role="contentinfo"` on footer
- `.sr-only` utility class available for visually-hidden text

---

## 12. TODOs before go-live

Search `<!-- TODO` across all HTML files to find every placeholder. Summary:

| # | Item | Where |
|---|---|---|
| 1 | Real phone/WhatsApp number | All HTML files + `site.config.js` |
| 2 | Real email address | All HTML files + `site.config.js` |
| 3 | Web3Forms access key | `contact.html` + `site.config.js` |
| 4 | Real logo (SVG/PNG transparent) | Replace `<svg class="site-header__logo">` in all headers |
| 5 | Farm/farmer photos | `assets/img/` — replace `placeholder-img` divs in `products.html` + `about.html` |
| 6 | Organic certification status | `products.html` — "committed to organic practices" paragraph |
| 7 | Confirmed crop list | `products.html` grid + `index.html` preview section |
| 8 | Director photos | `about.html` — two director cards (NOT government-ID photos) |
| 9 | Origin narrative | `about.html` — "Our story" section (one TODO comment) |
| 10 | Confirm C/O line public display | All address blocks — "C/O Ramkesh Yadav" line |
| 11 | Social media handles | Footer of all pages — social slot is commented out |
| 12 | Final domain | `site.config.js` + `sitemap.xml` + all canonical/OG meta tags |
| 13 | OG share image | `assets/img/og-image.jpg` (1200×630), update `og:image` on all pages |
| 14 | Google Maps precise embed | `contact.html` — replace generic query URL with Place embed |
| 15 | Confirm membership process | `farmers.html` — 3-step How to Join section |

---

## 13. Deployment pipeline

**Hosting:** Cloudflare Pages  
**Repo:** GitHub (main branch = production)  
**Pipeline:** Every push to `main` auto-triggers a Cloudflare build + deploy (no build command, output dir `/`)  
**Preview deployments:** Every other branch / PR gets its own preview URL automatically

To deploy: `git push origin main` — that's it.

**Adding a new page:**
1. Create `newpage.html` — copy head + header + footer from any existing page
2. Update `<title>`, `<meta name="description">`, `<link rel="canonical">`
3. Set `aria-current="page"` on the correct nav link
4. Add the URL to `sitemap.xml`
5. Commit and push to `main`

---

## 14. What is out of scope (v1)

Do not add these without a separate plan:
- Hindi / bilingual version (architecture allows it — `lang="hi"` on `<html>`, fonts already support Devanagari)
- Online store / produce ordering
- Blog, news, or farmer stories
- Member login or portal
- Analytics (Cloudflare Web Analytics can be added trivially later — one script tag)
- npm, Node.js, any build step

---

## 15. How to make common edits

**Update phone number everywhere:**
```bash
grep -r "XXXXXXXXXXX" .   # find all occurrences first
# then find-and-replace in each file and site.config.js
```

**Add a real photo to the products grid:**
1. Optimise image (WebP preferred, AVIF with fallback if possible; max ~200KB)
2. Save to `assets/img/arhar-dal.webp` (or similar)
3. In `products.html`, replace:
   ```html
   <div class="placeholder-img" ...>Photo coming soon</div>
   ```
   with:
   ```html
   <img src="/assets/img/arhar-dal.webp" alt="Arhar/tur dal harvested by Gugauli farmers" width="400" height="300" loading="lazy">
   ```
4. Add `style="border-radius: var(--radius);"` to match card styling

**Update the logo:**
1. Save SVG/PNG to `assets/icons/logo.svg` (or `logo.png`)
2. In every page's header, replace the `<svg class="site-header__logo">` block with:
   ```html
   <img class="site-header__logo" src="/assets/icons/logo.svg" alt="" aria-hidden="true">
   ```
3. Update favicon: save a 32×32 version to `assets/icons/favicon.svg`

**Add a new section to an existing page:**
Use the existing section structure:
```html
<section class="section" aria-labelledby="your-heading-id">
  <div class="container">
    <span class="section-label">Label text</span>
    <h2 id="your-heading-id">Section heading</h2>
    <p>Content...</p>
  </div>
</section>
```
For dark sections, add `style="background:var(--color-green-deep);color:#fff;"` and set `color:#fff` on the h2 inline.
