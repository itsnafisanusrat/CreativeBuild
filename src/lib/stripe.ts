import Stripe from "stripe";

/**
 * Returns a configured Stripe client.
 * Will throw at runtime if STRIPE_SECRET_KEY is not set.
 */
export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to your .env file."
    );
  }
  return new Stripe(key, { apiVersion: "2024-06-20" });
}

/**
 * Creates a Stripe Checkout Session for the $19/month plan.
 */
export async function createCheckoutSession(
  customerEmail?: string
): Promise<string> {
  const stripe = getStripe();
  const priceId = process.env.STRIPE_PRICE_ID;

  if (!priceId) {
    throw new Error(
      "STRIPE_PRICE_ID is not set. Create a product + price in your Stripe Dashboard and add the ID to .env."
    );
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    ...(customerEmail ? { customer_email: customerEmail } : {}),
  });

  return session.url ?? "";
}

/**
 * Verifies and parses a Stripe webhook event.
 */
export function constructWebhookEvent(
  body: string,
  signature: string
): Stripe.Event {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secret) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not set.");
  }

  return stripe.webhooks.constructEvent(body, signature, secret);
}
