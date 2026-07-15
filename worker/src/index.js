import { verifyStripeSignature } from "./stripe-signature.js";
import { PRODUCTS } from "./products.js";

export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    const rawBody = await request.text();
    let event;
    try {
      event = await verifyStripeSignature(
        rawBody,
        request.headers.get("stripe-signature"),
        env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      // Signature failures are logged but return 400 -- never leak details to the caller.
      console.error("Webhook verification failed:", err.message);
      return new Response("Invalid signature", { status: 400 });
    }

    // Only act on completed one-time checkouts; ignore everything else Stripe might send.
    if (event.type !== "checkout.session.completed") {
      return new Response("ignored", { status: 200 });
    }

    const session = event.data.object;
    const email = session.customer_details?.email;
    if (!email) {
      console.error("No customer email on session", session.id);
      return new Response("no email", { status: 200 });
    }

    const priceId = await getPurchasedPriceId(session.id, env.STRIPE_RESTRICTED_KEY);
    const product = priceId ? PRODUCTS[priceId] : null;
    if (!product) {
      console.error("Unrecognized price ID for session", session.id, priceId);
      return new Response("unknown product", { status: 200 });
    }

    await sendConfirmationEmail(env.RESEND_API_KEY, email, product);
    return new Response("ok", { status: 200 });
  },
};

async function getPurchasedPriceId(sessionId, restrictedKey) {
  const res = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${sessionId}/line_items?limit=1`,
    { headers: { Authorization: `Bearer ${restrictedKey}` } }
  );
  if (!res.ok) {
    console.error("Stripe line_items lookup failed", res.status, await res.text());
    return null;
  }
  const data = await res.json();
  return data.data?.[0]?.price?.id ?? null;
}

async function sendConfirmationEmail(apiKey, to, product) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Matt Ritterpusch <orders@mattritterpusch.com>",
      to,
      subject: `Your ${product.name} download is ready`,
      html: `
        <p>Thanks for your purchase!</p>
        <p><strong>${product.name}</strong> is ready to download:</p>
        <p><a href="${product.url}">${product.url}</a></p>
        <p>Keep this email for your records -- the link won't expire.</p>
      `.trim(),
    }),
  });
  if (!res.ok) {
    console.error("Resend send failed", res.status, await res.text());
  }
}
