import { NextResponse } from "next/server";
import { fetchTopAINews } from "@/lib/news";
import { rewriteAsLinkedInPost } from "@/lib/llm";
import type { LinkedInDraft } from "@/lib/llm";

export async function POST() {
  try {
    // 1. Fetch the top 3 AI news stories from the last 24 hours
    const articles = await fetchTopAINews();

    // 2. Use LLM to rewrite each story as a viral LinkedIn post
    const drafts: LinkedInDraft[] = await Promise.all(
      articles.map(async (article, index) => {
        const { postContent, hashtags } = await rewriteAsLinkedInPost(article);

        return {
          id: `draft-${Date.now()}-${index}`,
          originalArticle: article,
          postContent,
          hashtags,
          createdAt: new Date().toISOString(),
        };
      })
    );

    return NextResponse.json({ drafts });
  } catch (error) {
    console.error("Error generating posts:", error);
    return NextResponse.json(
      { error: "Failed to generate posts. Please try again." },
      { status: 500 }
    );
  }
}
