"use client";

import { useState } from "react";
import PostCard from "@/components/PostCard";

interface Draft {
  id: string;
  postContent: string;
  hashtags: string[];
  originalArticle: {
    title: string;
    url: string;
    source: string;
  };
}

export default function DashboardPage() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate-posts", { method: "POST" });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? `Request failed (${res.status})`);
      }

      const data = await res.json();
      setDrafts(data.drafts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Dashboard
          </h1>
          <p className="mt-1 text-[var(--muted)]">
            Generate AI-powered LinkedIn posts from today&apos;s top AI news.
          </p>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="btn-primary shrink-0"
        >
          {loading ? (
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
              Generating…
            </>
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Generate Posts
            </>
          )}
        </button>
      </div>

      {/* Error state */}
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Empty state */}
      {!loading && drafts.length === 0 && !error && (
        <div className="glass-card flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600/10">
            <svg
              className="h-8 w-8 text-brand-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold">No posts yet</h2>
          <p className="mt-1 max-w-sm text-sm text-[var(--muted)]">
            Click &quot;Generate Posts&quot; to fetch the latest AI news and
            create viral LinkedIn content.
          </p>
        </div>
      )}

      {/* Post feed */}
      <div className="grid gap-6">
        {drafts.map((draft) => (
          <PostCard
            key={draft.id}
            id={draft.id}
            postContent={draft.postContent}
            hashtags={draft.hashtags}
            sourceTitle={draft.originalArticle.title}
            sourceUrl={draft.originalArticle.url}
            sourceName={draft.originalArticle.source}
          />
        ))}
      </div>
    </div>
  );
}
