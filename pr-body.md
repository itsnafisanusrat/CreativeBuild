## SocialPulse AI — Full SaaS Application

A complete Next.js SaaS that turns today's top AI news into viral LinkedIn posts using GPT-4o.

### What's included

- **Next.js 14 (App Router)** with Tailwind CSS professional dark-mode dashboard
- **AI News Curation** — Fetches top 3 AI stories from the last 24h via NewsAPI
- **LLM-Powered Rewriting** — OpenAI GPT-4o-mini transforms news into viral LinkedIn posts with hashtags
- **Dashboard** — Generate, preview, and approve posts with one click
- **Stripe Integration** — $19/month subscription with Checkout + Webhooks
- **Pricing Page** — Clean pricing card with feature list and CTA
- **Mock Data Fallbacks** — Works without API keys for local development
- **Comprehensive README** — Beginner-friendly setup guide + Vercel deployment instructions

### Project Structure

```
src/
├── app/
│   ├── layout.tsx, page.tsx, globals.css
│   ├── dashboard/page.tsx
│   ├── pricing/page.tsx
│   └── api/ (generate-posts, approve-post, stripe/checkout, stripe/webhook)
├── components/ (Header, PostCard, PricingCard)
└── lib/ (news.ts, llm.ts, stripe.ts)
```

### How to run

```bash
npm install
cp .env.example .env  # add your API keys (optional — mock data works out of the box)
npm run dev
```

_This PR was generated with [Oz](https://www.warp.dev/oz)._
