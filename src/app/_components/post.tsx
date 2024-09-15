"use client";

import { useState } from "react";
import { LatestPostQuery } from "$/lib/data-access/latest-post-query";
import { CreatePostMutation } from "$/lib/data-access/create-post-mutation";

type X = LatestPostQuery.Result;

export function LatestPost() {
  const latestPostQuery = LatestPostQuery.useQuery();

  const [name, setName] = useState("");
  const createPostMutation = CreatePostMutation.useMutation({
    onSuccess: () => {
      setName("");
    },
  });

  return (
    <div className="w-full max-w-xs">
      {latestPostQuery.data ? (
        <p className="truncate">
          Your most recent post: {latestPostQuery.data.name}
        </p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPostMutation.mutate({ name });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createPostMutation.isPending}
        >
          {createPostMutation.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
