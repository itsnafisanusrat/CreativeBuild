export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
}

/**
 * Fetches the top 3 AI news stories from the last 24 hours using NewsAPI.
 * Sign up at https://newsapi.org for a free API key.
 */
export async function fetchTopAINews(): Promise<NewsArticle[]> {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    console.warn("NEWS_API_KEY not set — returning mock data");
    return getMockNews();
  }

  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const params = new URLSearchParams({
    q: "artificial intelligence OR AI",
    from: yesterday,
    sortBy: "popularity",
    language: "en",
    pageSize: "3",
    apiKey,
  });

  const res = await fetch(
    `https://newsapi.org/v2/everything?${params.toString()}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    console.error("NewsAPI error:", res.status, await res.text());
    return getMockNews();
  }

  const data = await res.json();

  return (data.articles ?? []).slice(0, 3).map(
    (a: {
      title: string;
      description: string;
      url: string;
      source: { name: string };
      publishedAt: string;
    }): NewsArticle => ({
      title: a.title,
      description: a.description ?? "",
      url: a.url,
      source: a.source?.name ?? "Unknown",
      publishedAt: a.publishedAt,
    })
  );
}

/** Fallback mock data so the app works without an API key. */
function getMockNews(): NewsArticle[] {
  return [
    {
      title: "OpenAI Unveils GPT-5 with Breakthrough Reasoning Capabilities",
      description:
        "OpenAI has released GPT-5, its most advanced model yet, featuring significantly improved reasoning, multimodal understanding, and real-time collaboration features.",
      url: "https://example.com/gpt5-launch",
      source: "TechCrunch",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Google DeepMind's New AI Agent Can Write and Debug Entire Codebases",
      description:
        "Google DeepMind has announced an AI agent that can autonomously write, test, and debug full software projects, raising questions about the future of software engineering.",
      url: "https://example.com/deepmind-agent",
      source: "The Verge",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "EU Passes Landmark AI Regulation Requiring Transparency in AI Systems",
      description:
        "The European Union has passed sweeping new legislation requiring all AI systems to disclose their training data sources and provide explanations for their outputs.",
      url: "https://example.com/eu-ai-regulation",
      source: "Reuters",
      publishedAt: new Date().toISOString(),
    },
  ];
}
