# Gugauli Organic Producer Company — Website

Static brochure website for **Gugauli Organic Producer Company Limited**, Banda, Uttar Pradesh.

Plain HTML5 + CSS + vanilla JS. No build step. Deployable directly to Cloudflare Pages or Hostinger.

---

## Quick start (editing content)

All site-wide settings (phone, email, domain, Web3Forms key) live in **`site.config.js`** — edit once, rebuild nothing.

To update content, open the relevant `.html` file in any text editor and search for `<!-- TODO` to find spots awaiting real information.

## File overview

| File | Purpose |
|------|---------|
| `index.html` | Home page |
| `about.html` | Company story, directors, registration details |
| `products.html` | What we grow |
| `farmers.html` | Membership information for farmers |
| `contact.html` | Contact form, map, address |
| `404.html` | Not-found page |
| `assets/css/styles.css` | All styles (tokens → reset → components → utilities) |
| `assets/js/main.js` | Mobile nav, current-page marker, form handler, footer year |
| `site.config.js` | Central config — domain, phone, email, keys |
| `sitemap.xml` | XML sitemap for search engines |
| `robots.txt` | Search engine instructions |

## TODOs before go-live

1. **Logo** — replace the placeholder SVG in each page's header `<svg class="site-header__logo">` with a real logo file (SVG or transparent PNG). Also update footer.
2. **Phone / WhatsApp** — update `phone` and `whatsapp` in `site.config.js`, then find-and-replace `+91XXXXXXXXXXX` / `91XXXXXXXXXXX` across all HTML files.
3. **Email** — create `info@gugauliorganic.in` (or your chosen address), update `email` in `site.config.js` and in the HTML `mailto:` / footer links.
4. **Web3Forms key** — create a free account at https://web3forms.com, paste the access key into `site.config.js` (`web3formsKey`) **and** into the `<input name="access_key">` in `contact.html`.
5. **Photos** — add farm/farmer photos to `assets/img/` and replace the `<div class="placeholder-img">` blocks in `products.html` and `about.html` with real `<img>` tags.
6. **Organic certification** — update the certification note on `products.html` once status is confirmed (search for `TODO: update once certification`).
7. **Crop list** — confirm the full crop list; update `products.html` and the preview on `index.html` (search `TODO: replace with confirmed crop list`).
8. **Director photos** — add headshots to the director cards in `about.html` (search `TODO: add director photo`). Do not use government-ID photos.
9. **Social media** — add handles to the footer's social slot once accounts are created (search `TODO: add social links`).
10. **Domain** — update `domain` in `site.config.js` to the final `.in` domain, and update `sitemap.xml` accordingly.
11. **OG image** — create a 1200×630 social share image, save as `assets/img/og-image.jpg`, update all `og:image` meta tags.
12. **Google Maps** — create a Google Maps place for the office and replace the `maps.google.com/maps?q=` embed URL in `contact.html`.

## Deployment

### Cloudflare Pages (recommended)

1. Push this folder to a GitHub repository.
2. Go to **Cloudflare Pages → Create project → connect repo** (or use "Direct Upload").
3. Framework preset: **None**. Build command: *(leave blank)*. Output directory: `/`.
4. Site goes live at `*.pages.dev`. Add your custom domain under **Custom domains**.
5. HTTPS is automatic.

### Hostinger (alternative)

1. Upload all files to `public_html` via hPanel File Manager or FTP.
2. Point your domain DNS to Hostinger (A record / nameservers as Hostinger instructs).
3. Enable the free SSL certificate in hPanel.

### Domain mapping note

Buy the `.in` domain at any registrar. Mapping it means either moving nameservers to the host or adding the host's A/CNAME records at your registrar. Once the domain is set, update `domain` in `site.config.js` and `sitemap.xml` and you are done.

## Language / bilingual note

The site is English-only for v1. The HTML uses `lang="en"` and both fonts (Tiro Devanagari + Hind) include Devanagari support, so a Hindi `/hi/` version can be added later without redesign.
