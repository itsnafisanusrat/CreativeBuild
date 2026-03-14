"use client";

import { useState } from "react";

interface PostCardProps {
  id: string;
  postContent: string;
  hashtags: string[];
  sourceTitle: string;
  sourceUrl: string;
  sourceName: string;
}

export default function PostCard({
  id,
  postContent,
  hashtags,
  sourceTitle,
  sourceUrl,
  sourceName,
}: PostCardProps) {
  const [status, setStatus] = useState<"draft" | "approving" | "approved">(
    "draft"
  );

  async function handleApprove() {
    setStatus("approving");
    try {
      const res = await fetch("/api/approve-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, postContent, hashtags }),
      });

      if (!res.ok) throw new Error("Failed to approve");
      setStatus("approved");
    } catch (err) {
      console.error(err);
      setStatus("draft");
      alert("Failed to approve post. Please try again.");
    }
  }

  return (
    <div className="glass-card flex flex-col gap-4">
      {/* Source badge */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600/10 px-3 py-1 text-xs font-medium text-brand-400">
          <svg
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
          {sourceName}
        </span>
        {status === "approved" && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600/10 px-3 py-1 text-xs font-medium text-emerald-400">
            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Approved
          </span>
        )}
      </div>

      {/* Original article title */}
      <a
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-[var(--muted)] underline decoration-[var(--border)] underline-offset-2 transition-colors hover:text-[var(--foreground)]"
      >
        Based on: {sourceTitle}
      </a>

      {/* LinkedIn post preview */}
      <div className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4">
        <div className="mb-3 flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600" />
          <div>
            <p className="text-sm font-semibold">Your Name</p>
            <p className="text-xs text-[var(--muted)]">
              Your headline · Just now
            </p>
          </div>
        </div>
        <p className="whitespace-pre-line text-sm leading-relaxed">
          {postContent}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {hashtags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium text-brand-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleApprove}
          disabled={status !== "draft"}
          className="btn-success"
        >
          {status === "approving" ? (
            <>
              <svg
                className="h-4 w-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Approving…
            </>
          ) : status === "approved" ? (
            "✓ Approved"
          ) : (
            <>
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Approve &amp; Post
            </>
          )}
        </button>

        <button
          onClick={() => navigator.clipboard.writeText(`${postContent}\n\n${hashtags.join(" ")}`)}
          className="btn-secondary"
        >
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
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Copy
        </button>
      </div>
    </div>
  );
}
