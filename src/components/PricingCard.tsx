"use client";

import { useState } from "react";

const FEATURES = [
  "3 AI-generated LinkedIn posts daily",
  "Trending AI news curation",
  "One-click post approval",
  "Hashtag optimization",
  "LinkedIn post preview",
  "Priority support",
];

export default function PricingCard() {
  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error ?? "Failed to create checkout session");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass-card relative mx-auto max-w-md overflow-hidden">
      {/* Popular badge */}
      <div className="absolute right-0 top-0 rounded-bl-lg bg-brand-600 px-3 py-1 text-xs font-bold text-white">
        MOST POPULAR
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold">Pro Plan</h3>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Everything you need to dominate LinkedIn with AI-powered content.
        </p>
      </div>

      {/* Price */}
      <div className="mb-6 flex items-baseline gap-1">
        <span className="text-5xl font-extrabold tracking-tight">$19</span>
        <span className="text-[var(--muted)]">/month</span>
      </div>

      {/* Features */}
      <ul className="mb-8 space-y-3">
        {FEATURES.map((feature) => (
          <li key={feature} className="flex items-center gap-2.5 text-sm">
            <svg
              className="h-4 w-4 shrink-0 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={handleSubscribe}
        disabled={loading}
        className="btn-primary w-full"
      >
        {loading ? "Redirecting to Stripe…" : "Get Started — $19/mo"}
      </button>

      <p className="mt-3 text-center text-xs text-[var(--muted)]">
        Cancel anytime. No questions asked.
      </p>
    </div>
  );
}
