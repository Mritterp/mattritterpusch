# Order confirmation worker

A small Cloudflare Worker that listens for Stripe's `checkout.session.completed`
webhook and emails the buyer their download link. This is a backup to the
static `/thank-you` pages each Payment Link already redirects to -- it exists
so a customer who closes the tab too fast (or never sees the redirect) still
gets the link.

No third-party automation tool (Zapier/Make) is used -- this replaces that
role entirely, running on Cloudflare's free tier (100k requests/day).

## How it works

1. Stripe sends a signed webhook POST to this Worker on every completed checkout.
2. The Worker verifies the signature itself (Web Crypto API, no `stripe` package needed).
3. It looks up which Price ID was purchased via Stripe's REST API (a single
   read-only call, using a *restricted* key -- not your full secret key).
4. It matches that Price ID against `src/products.js` and emails the
   corresponding R2 download link via Resend.

## One-time setup

### 1. Fill in the 6 Price IDs

Edit `src/products.js` -- replace each `price_REPLACE_...` placeholder with
the real Price ID from Stripe Dashboard -> Product catalog -> click a
product -> the price row shows an ID like `price_1AbCdEfGhIjKlMnO`.

### 2. Create a Stripe *restricted* key (not your full secret key)

Dashboard -> Developers -> API keys -> Create restricted key.
Grant it **read-only** access to "Checkout Sessions" only -- nothing else.
This limits the blast radius if the key were ever compromised, since it
can't do anything except read session details.

### 3. Create a Resend account and API key

resend.com -> sign up (free tier is plenty for this volume) -> API Keys -> Create.
You'll also need to verify your sending domain (mattritterpusch.com) in Resend
so the `from` address in `src/index.js` works.

### 4. Deploy the Worker

```
cd worker
npm install
npx wrangler login      # one-time browser login to your Cloudflare account
npm run deploy
```

This prints the Worker's URL (something like
`https://mattritterpusch-order-confirmation.<your-subdomain>.workers.dev`).

### 5. Set the three secrets

```
npm run secret:stripe-key      # paste the restricted key from step 2
npm run secret:resend-key      # paste the Resend API key from step 3
npm run secret:stripe-webhook  # paste the webhook signing secret -- see step 6
```

### 6. Register the webhook in Stripe

Dashboard -> Developers -> Webhooks -> Add endpoint.
- Endpoint URL: the Worker URL from step 4.
- Event: `checkout.session.completed`.

After creating it, Stripe reveals a signing secret (`whsec_...`) -- that's
what goes into `secret:stripe-webhook` above.

### 7. Test before trusting it

Use Stripe's "Send test webhook" button on the endpoint's page (or a real
test-mode purchase) and confirm the email arrives with the right link.
Check `npx wrangler tail` while testing to see the Worker's live logs.

## Redeploying after code changes

```
npm run deploy
```

Secrets persist across deploys -- you only need to set them once unless you
rotate a key.
