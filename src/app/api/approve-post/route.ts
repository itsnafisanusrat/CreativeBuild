import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/approve-post
 *
 * Placeholder endpoint for approving & posting a draft to LinkedIn.
 *
 * In production, you would:
 * 1. Verify the user is authenticated and subscribed.
 * 2. Use the LinkedIn API (with OAuth 2.0) to publish the post.
 * 3. Store the approval status in a database.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, postContent, hashtags } = body;

    if (!id || !postContent) {
      return NextResponse.json(
        { error: "Missing required fields: id and postContent" },
        { status: 400 }
      );
    }

    // ── TODO: Integrate LinkedIn API ──────────────────────────────
    // 1. Get user's LinkedIn access token from your database
    // 2. POST to https://api.linkedin.com/v2/ugcPosts
    // 3. Store the post ID and status in your database
    // ──────────────────────────────────────────────────────────────

    console.log(`[Approve] Post ${id} approved.`);
    console.log(`[Approve] Content preview: ${postContent.slice(0, 80)}…`);
    console.log(`[Approve] Hashtags: ${(hashtags as string[]).join(", ")}`);

    return NextResponse.json({
      success: true,
      message: "Post approved successfully! (LinkedIn integration coming soon)",
      id,
    });
  } catch (error) {
    console.error("Error approving post:", error);
    return NextResponse.json(
      { error: "Failed to approve post" },
      { status: 500 }
    );
  }
}
