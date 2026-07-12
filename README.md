# mattritterpusch.com

Static rebuild of Matt Ritterpusch's site (Webflow → GitHub Pages). No backend, no build step — plain HTML/CSS/JS.

## Structure
```
/
├── index.html                          Home (hover-video panels)
├── mixing/index.html                   Mixing / live recording
├── store/index.html                    Sound library catalog
├── store/<slug>/index.html             One page per product (6)
├── assets/
│   ├── styles.css                      Full design system (tokens + components + pages)
│   ├── og-image.jpg
│   └── images/                         Logo, icons, home photo, product covers
├── scripts/
│   ├── nav.js                          Burger/drawer nav toggle
│   ├── panel-hover-video.js            Home page hover-video panels
│   ├── mixing-audio-player.js          Track list player + volume slider
│   ├── store-audio-player.js           Store card preview player
│   ├── product-player.js               Product page YouTube embed + audio player
│   └── store-filter.js                 Store category chip filter
└── data/
    ├── products.json                   Reference data for the 6 sound libraries
    └── mixing-tracks.json              Reference data for the mixing page tracklist
```

`data/*.json` are reference/source-of-truth copies — the actual pages are hand-authored static HTML (for SEO and zero-JS-dependency reasons), so if you edit a product's price/description/etc., update both the JSON and its corresponding `store/<slug>/index.html`.

## Before going live
- **Stripe**: every "Buy Now" button currently points to a **test-mode** Payment Link (`buy.stripe.com/test_...`), created via the Stripe API against a `sk_test_...` key — these work end-to-end but never move real money. Once your Stripe account is activated for live payments, recreate the same 6 Products/Prices/Payment Links using a `sk_live_...` key (Stripe Dashboard → Payment Links, or re-run the same API calls) and swap the URLs in `store/index.html`, each `store/<slug>/index.html`, and `data/products.json`.
- **Video/audio**: all hosted on the existing Cloudflare R2 bucket (`pub-77ddc065632d441db8d4e6cc7989e204.r2.dev`) — same URLs the Webflow site used, so no re-upload needed as long as that bucket stays live.
- **Domain**: point `mattritterpusch.com` at this repo's GitHub Pages deployment (Settings → Pages → Custom domain), and update the Cloudflare DNS CNAME to the new `*.github.io` target.

## Local preview
```
npx serve .
```
