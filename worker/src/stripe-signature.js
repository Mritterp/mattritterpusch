// Verifies a Stripe webhook signature using the Web Crypto API directly,
// rather than the `stripe` npm package -- keeps the Worker dependency-free
// and avoids Node-API compatibility concerns on the Workers runtime.
// Mirrors Stripe's own documented verification algorithm:
// https://docs.stripe.com/webhooks#verify-manually

const TOLERANCE_SECONDS = 300; // reject events older than 5 minutes (replay protection)

export async function verifyStripeSignature(payload, sigHeader, secret) {
  if (!sigHeader) throw new Error("missing Stripe-Signature header");

  const parts = Object.fromEntries(
    sigHeader.split(",").map((pair) => {
      const [key, value] = pair.split("=");
      return [key, value];
    })
  );
  const timestamp = parts.t;
  const expectedSig = parts.v1;
  if (!timestamp || !expectedSig) throw new Error("malformed Stripe-Signature header");

  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (age > TOLERANCE_SECONDS) throw new Error("webhook timestamp outside tolerance");

  const signedPayload = `${timestamp}.${payload}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sigBuffer = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signedPayload));
  const computedSig = [...new Uint8Array(sigBuffer)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  if (computedSig !== expectedSig) throw new Error("signature mismatch");

  return JSON.parse(payload);
}
