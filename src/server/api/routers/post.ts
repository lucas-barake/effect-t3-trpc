import {
  createTRPCRouter,
  publicProcedure,
  TRPCContext,
} from "$/server/api/trpc";
import { posts } from "$/server/db/schema";
import { Data, Effect, Random } from "effect";
import { Schema } from "@effect/schema";
import { ClientErrors } from "$/utils/client-errors";
import { Result } from "$/utils/result";
import { ServerRuntime } from "$/server/layers/server-runtime";

class SomeError extends Data.TaggedError("SomeError") {}

export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      Schema.decodeUnknownSync(
        Schema.Struct({ name: Schema.Trim.pipe(Schema.minLength(1)) }),
      ),
    )
    .mutation(({ ctx, input }) =>
      Effect.flatMap(TRPCContext, (ctx) =>
        Effect.promise(() => ctx.db.insert(posts).values(input)).pipe(
          Effect.withSpan("db.insert.posts.values"),
        ),
      ).pipe(
        Effect.map(Result.ok),
        Effect.withSpan("postRouter.create"),
        TRPCContext.provide(ctx),
        ServerRuntime.runPromise,
      ),
    ),

  getLatest: publicProcedure.query(({ ctx }) => {
    return Effect.gen(function* () {
      const context = yield* TRPCContext;

      const posts = yield* Effect.promise(() =>
        context.db.query.posts.findFirst(),
      ).pipe(Effect.withSpan("db.query.posts.findFirst"));

      const bool = yield* Random.nextBoolean;
      if (bool) {
        yield* Effect.logError("SomeError");
        return yield* new SomeError();
      }

      return Result.ok(posts ?? null);
    }).pipe(
      Effect.catchTag("SomeError", () =>
        Result.succeedError(new ClientErrors.BadRequestError()),
      ),
      Effect.withSpan("postRouter.getLatest"),
      TRPCContext.provide(ctx),
      ServerRuntime.runPromise,
    );
  }),
});
