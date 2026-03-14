import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";

/**
 * POST /api/stripe/checkout
 *
 * Creates a Stripe Checkout Session for the $19/month Pro plan.
 */
export async function POST() {
  try {
    const url = await createCheckoutSession();

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Stripe checkout error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to create checkout";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
