import { api, getQueryClient, type RouterInputs } from "$/trpc/react";
import { createMutationFn } from "$/utils/run-query-fn";
import { useMutation as _useMutation } from "@tanstack/react-query";
import { Effect } from "effect";
import { LatestPostQuery } from "$/lib/data-access/latest-post-query";

export namespace CreatePostMutation {
  type Opts = {
    onSuccess?: () => void;
  };

  export const useMutation = (opts?: Opts) =>
    _useMutation({
      mutationFn: (input: RouterInputs["post"]["create"]) =>
        createMutationFn(() => api.post.create.mutate(input)),

      onMutate: async (input) => {
        getQueryClient().setQueryData<LatestPostQuery.Result>(
          [LatestPostQuery.BASE_QUERY_KEY],
          null,
        );

        await getQueryClient().cancelQueries({
          queryKey: ["latestPost"],
        });
        return input;
      },

      onSuccess: async () => {
        await getQueryClient().invalidateQueries({ queryKey: ["latestPost"] });
        opts?.onSuccess?.();
      },
    });
}
