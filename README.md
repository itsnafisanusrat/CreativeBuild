# SocialPulse AI

> Turn today's top AI news into viral LinkedIn posts — in seconds.

SocialPulse AI is a SaaS application that automatically finds the hottest AI stories, rewrites them as scroll-stopping LinkedIn content using GPT-4o, and lets you approve & post with one click.

---

## Features

- **AI News Curation** — Fetches the top 3 AI news stories from the last 24 hours using [NewsAPI](https://newsapi.org).
- **LLM-Powered Rewriting** — Uses OpenAI's GPT-4o-mini to transform news into engaging, viral LinkedIn posts with optimized hashtags.
- **One-Click Approval** — Review the AI-generated drafts and approve them for posting directly from the dashboard.
- **LinkedIn Post Preview** — See exactly how your post will look before publishing.
- **Stripe Billing** — $19/month subscription with Stripe Checkout integration.
- **Dark Mode Dashboard** — Professional, modern UI built with Tailwind CSS.

---

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React 18, Tailwind CSS
- **Backend:** Next.js API Routes (serverless)
- **AI:** OpenAI GPT-4o-mini
- **News:** NewsAPI
- **Payments:** Stripe (Checkout + Webhooks)
- **Deployment:** Vercel

---

## Prerequisites

Before you start, make sure you have:

1. **Node.js 18+** installed — [Download here](https://nodejs.org)
2. **npm** (comes with Node.js)
3. **Git** installed — [Download here](https://git-scm.com)

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd social-pulse-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example file and fill in your keys:

```bash
cp .env.example .env
```

Open `.env` in your editor and add your API keys:

```env
# Get your key at https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your-openai-api-key

# Get your key at https://newsapi.org/register
NEWS_API_KEY=your-newsapi-key

# Get your keys at https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Note:** The app works without API keys! It will use realistic mock data so you can explore the UI immediately.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Try it out

1. Go to the **Dashboard** page
2. Click **"Generate Posts"**
3. Review the AI-generated LinkedIn posts
4. Click **"Approve & Post"** on any draft

---

## Setting Up Stripe (Optional)

To enable the $19/month subscription:

### 1. Create a Stripe account

Go to [stripe.com](https://stripe.com) and sign up for free.

### 2. Create a product and price

1. Go to **Products** in your Stripe Dashboard
2. Click **"Add product"**
3. Name it "SocialPulse AI Pro" and set the price to **$19/month** (recurring)
4. Copy the **Price ID** (starts with `price_`)

### 3. Get your API keys

1. Go to **Developers → API keys**
2. Copy your **Publishable key** and **Secret key**

### 4. Set up webhooks (for production)

1. Go to **Developers → Webhooks**
2. Add an endpoint: `https://your-domain.com/api/stripe/webhook`
3. Select events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
4. Copy the **Webhook signing secret**

### 5. Update your `.env`

Add all the Stripe values to your `.env` file.

---

## Project Structure

```
social-pulse-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (dark mode, header)
│   │   ├── page.tsx            # Landing page
│   │   ├── globals.css         # Tailwind + custom styles
│   │   ├── dashboard/
│   │   │   └── page.tsx        # Main dashboard with post generation
│   │   ├── pricing/
│   │   │   └── page.tsx        # Pricing page ($19/mo plan)
│   │   └── api/
│   │       ├── generate-posts/ # Fetches news + rewrites with LLM
│   │       ├── approve-post/   # Approves & queues post for LinkedIn
│   │       └── stripe/
│   │           ├── checkout/   # Creates Stripe Checkout session
│   │           └── webhook/    # Handles Stripe webhook events
│   ├── components/
│   │   ├── Header.tsx          # Navigation header
│   │   ├── PostCard.tsx        # LinkedIn post preview card
│   │   └── PricingCard.tsx     # Pricing card with Stripe CTA
│   └── lib/
│       ├── news.ts             # NewsAPI client (with mock fallback)
│       ├── llm.ts              # OpenAI integration (with mock fallback)
│       └── stripe.ts           # Stripe helpers
├── .env.example                # Environment variable template
├── tailwind.config.ts          # Tailwind configuration
├── next.config.mjs             # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── package.json
```

---

## Deploy to Vercel

### Option A: One-click deploy

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **"New Project"** and import your repository
4. Vercel will auto-detect Next.js — just click **"Deploy"**
5. After deployment, go to **Settings → Environment Variables** and add all your `.env` values

### Option B: Deploy via CLI

```bash
# Install the Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow the prompts, then add your environment variables:
vercel env add OPENAI_API_KEY
vercel env add NEWS_API_KEY
vercel env add STRIPE_SECRET_KEY
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
vercel env add STRIPE_WEBHOOK_SECRET
vercel env add STRIPE_PRICE_ID
vercel env add NEXT_PUBLIC_APP_URL

# Redeploy with env vars
vercel --prod
```

> **Important:** After deploying, update `NEXT_PUBLIC_APP_URL` to your Vercel domain (e.g., `https://social-pulse-app.vercel.app`) and update your Stripe webhook endpoint URL.

---

## Next Steps

Once you have the basics running, here are some ideas to extend the app:

- [ ] **LinkedIn OAuth** — Connect your LinkedIn account for direct posting
- [ ] **User Authentication** — Add NextAuth.js for login/signup
- [ ] **Database** — Store posts and user data with Prisma + PostgreSQL
- [ ] **Scheduling** — Let users schedule posts for optimal posting times
- [ ] **Analytics** — Track post performance and engagement metrics
- [ ] **Multiple Platforms** — Expand to Twitter/X, Bluesky, Threads

---

## License

MIT
