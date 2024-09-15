import { api, getQueryClient, type RouterInputs } from "$/trpc/react";
import { createMutationFn } from "$/utils/run-query-fn";
import { useMutation as _useMutation } from "@tanstack/react-query";

export namespace CreatePostMutation {
  type Opts = {
    onSuccess?: () => void;
  };

  export const useMutation = (opts?: Opts) =>
    _useMutation({
      mutationFn: (input: RouterInputs["post"]["create"]) =>
        createMutationFn(() => api.post.create.mutate(input)),

      onMutate: async (input) => {
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
