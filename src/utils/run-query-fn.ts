import { type Cause, Effect, identity, Layer, ManagedRuntime } from "effect";
import { Result } from "$/utils/result";

export const ClientRuntime = ManagedRuntime.make(Layer.empty);

const createEffectFromResult = <Ok, Err>(
  resultPromise: () => Promise<Result<Ok, Err>>,
): Effect.Effect<Ok, Err | Cause.UnknownException, never> =>
  Effect.tryPromise(() => resultPromise()).pipe(
    Effect.flatMap(
      Result.match({
        onOk: (value) => Effect.succeed(value),
        onError: (error) => Effect.fail(error),
      }),
    ),
  );

export const createQueryFn =
  <Ok, Err>(
    queryFn: () => Promise<Result<Ok, Err>>,
    effectPipeline: (
      effect: Effect.Effect<Ok, Err | Cause.UnknownException, never>,
    ) => Effect.Effect<Ok, Err | Cause.UnknownException, never> = identity,
  ) =>
  () =>
    createEffectFromResult(queryFn).pipe(
      effectPipeline,
      ClientRuntime.runPromise,
    );

export const createMutationFn = <Ok, Err>(
  mutateFn: () => Promise<Result<Ok, Err>>,
  effectPipeline: (
    effect: Effect.Effect<Ok, Err | Cause.UnknownException, never>,
  ) => Effect.Effect<Ok, Err | Cause.UnknownException, never> = identity,
): Promise<Ok> =>
  createEffectFromResult(mutateFn).pipe(
    effectPipeline,
    ClientRuntime.runPromise,
  );
