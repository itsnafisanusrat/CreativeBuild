import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {/* Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-600/10 px-4 py-1.5 text-sm font-medium text-brand-400">
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        Powered by GPT-4o
      </div>

      {/* Headline */}
      <h1 className="max-w-3xl text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl">
        Turn AI News Into{" "}
        <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
          Viral LinkedIn Posts
        </span>{" "}
        in Seconds
      </h1>

      {/* Subheadline */}
      <p className="mt-6 max-w-xl text-lg text-[var(--muted)]">
        SocialPulse AI finds today&apos;s hottest AI stories, rewrites them as
        scroll-stopping LinkedIn content, and lets you post with one click.
      </p>

      {/* CTAs */}
      <div className="mt-10 flex items-center gap-4">
        <Link href="/dashboard" className="btn-primary text-base">
          Open Dashboard
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
        <Link href="/pricing" className="btn-secondary text-base">
          View Pricing
        </Link>
      </div>

      {/* Stats */}
      <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {[
          { value: "10K+", label: "Posts Generated" },
          { value: "3.2x", label: "Avg. Engagement Boost" },
          { value: "< 30s", label: "Time to Create" },
        ].map((stat) => (
          <div key={stat.label} className="glass-card text-center">
            <p className="text-3xl font-extrabold text-brand-400">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
