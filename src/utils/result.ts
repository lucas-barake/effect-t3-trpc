import { Effect } from "effect";

export type Result<T, E> = Result.Ok<T> | Result.Err<E>;

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Result {
  export type Ok<T> = { _tag: "ok"; value: T };
  export type Err<E> = { _tag: "error"; error: E };

  export function ok<T>(value: T): Ok<T> {
    return { _tag: "ok", value };
  }
  export function error<E>(error: E): Err<E> {
    return { _tag: "error", error };
  }

  export function succeedError<E>(e: E) {
    return Effect.succeed(error(e));
  }

  export function isOk<T>(result: Result<T, unknown>): result is Ok<T> {
    return result._tag === "ok";
  }
  export function isErr<E>(result: Result<unknown, E>): result is Err<E> {
    return result._tag === "error";
  }

  export function match<T, E, Ok, Err>({
    onOk,
    onError,
  }: {
    onOk: (value: T) => Ok;
    onError: (error: E) => Err;
  }) {
    return (result: Result<T, E>): Ok | Err => {
      if (isOk(result)) {
        return onOk(result.value);
      }

      return onError(result.error);
    };
  }
}
