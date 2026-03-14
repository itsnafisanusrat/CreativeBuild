import OpenAI from "openai";
import type { NewsArticle } from "./news";

export interface LinkedInDraft {
  id: string;
  originalArticle: NewsArticle;
  postContent: string;
  hashtags: string[];
  createdAt: string;
}

const SYSTEM_PROMPT = `You are an expert LinkedIn content strategist. Your job is to transform AI news stories into engaging, viral LinkedIn posts.

Rules:
- Write in first person, conversational tone
- Start with a bold hook (question, hot take, or surprising stat)
- Use short paragraphs (1-2 sentences max)
- Include line breaks for readability
- Add a clear call-to-action at the end
- Generate 3-5 relevant hashtags
- Keep the post under 1300 characters (LinkedIn sweet spot)
- Do NOT use emojis excessively — max 2-3 per post
- Sound authentic, not like a bot

Respond in JSON format:
{
  "postContent": "The full LinkedIn post text",
  "hashtags": ["hashtag1", "hashtag2", "hashtag3"]
}`;

/**
 * Uses OpenAI to rewrite a news article into a viral LinkedIn post.
 */
export async function rewriteAsLinkedInPost(
  article: NewsArticle
): Promise<{ postContent: string; hashtags: string[] }> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.warn("OPENAI_API_KEY not set — returning mock LinkedIn post");
    return getMockPost(article);
  }

  const openai = new OpenAI({ apiKey });

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Rewrite this AI news story as a viral LinkedIn post:\n\nTitle: ${article.title}\nDescription: ${article.description}\nSource: ${article.source}`,
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.8,
    max_tokens: 600,
  });

  const raw = response.choices[0]?.message?.content ?? "{}";

  try {
    const parsed = JSON.parse(raw);
    return {
      postContent: parsed.postContent ?? "",
      hashtags: parsed.hashtags ?? [],
    };
  } catch {
    console.error("Failed to parse LLM response:", raw);
    return getMockPost(article);
  }
}

/** Fallback when no API key is configured. */
function getMockPost(article: NewsArticle) {
  return {
    postContent: `🚀 This just happened in AI and it's going to change everything.\n\n${article.title}\n\n${article.description}\n\nHere's why this matters for YOUR career:\n\nThe companies that adapt to these changes will thrive. The ones that don't? They'll be left behind.\n\nI've been watching this space for years, and I can tell you — this is a turning point.\n\nWhat's your take? Drop a comment below. 👇`,
    hashtags: ["#AI", "#ArtificialIntelligence", "#FutureOfWork", "#Innovation", "#LinkedIn"],
  };
}
