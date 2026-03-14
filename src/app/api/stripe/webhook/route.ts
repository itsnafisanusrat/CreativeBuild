import { NextRequest, NextResponse } from "next/server";
import { constructWebhookEvent } from "@/lib/stripe";

/**
 * POST /api/stripe/webhook
 *
 * Handles Stripe webhook events (subscription created, updated, cancelled, etc.).
 * In production, update your database to reflect subscription status changes.
 */
export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  try {
    const event = constructWebhookEvent(body, signature);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        console.log(
          `[Stripe] Checkout completed for session: ${session.id}`
        );
        // TODO: Activate the user's subscription in your database
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object;
        console.log(
          `[Stripe] Subscription updated: ${subscription.id}`
        );
        // TODO: Update subscription status in your database
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        console.log(
          `[Stripe] Subscription cancelled: ${subscription.id}`
        );
        // TODO: Deactivate the user's subscription in your database
        break;
      }

      default:
        console.log(`[Stripe] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook verification failed" },
      { status: 400 }
    );
  }
}
