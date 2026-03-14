import PricingCard from "@/components/PricingCard";

export default function PricingPage() {
  return (
    <div className="py-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Simple, Transparent Pricing
        </h1>
        <p className="mt-3 text-lg text-[var(--muted)]">
          One plan. Everything included. Cancel anytime.
        </p>
      </div>

      <PricingCard />
    </div>
  );
}
