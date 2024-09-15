// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ClientErrors {
  export class BadRequestError {
    public readonly _tag = "BadRequestError";
  }

  export class InternalServerError {
    public readonly _tag = "InternalServerError";
  }

  export class NotImplementedError {
    public readonly _tag = "NotImplementedError";
  }

  export class BadGatewayError {
    public readonly _tag = "BadGatewayError";
  }

  export class ServiceUnavailableError {
    public readonly _tag = "ServiceUnavailableError";
  }

  export class GatewayTimeoutError {
    public readonly _tag = "GatewayTimeoutError";
  }

  export class UnauthorizedError {
    public readonly _tag = "UnauthorizedError";
  }

  export class ForbiddenError {
    public readonly _tag = "ForbiddenError";
  }

  export class NotFoundError {
    public readonly _tag = "NotFoundError";
  }

  export class MethodNotSupportedError {
    public readonly _tag = "MethodNotSupportedError";
  }

  export class TimeoutError {
    public readonly _tag = "TimeoutError";
  }

  export class ConflictError {
    public readonly _tag = "ConflictError";
  }

  export class PreconditionFailedError {
    public readonly _tag = "PreconditionFailedError";
  }

  export class PayloadTooLargeError {
    public readonly _tag = "PayloadTooLargeError";
  }

  export class UnsupportedMediaTypeError {
    public readonly _tag = "UnsupportedMediaTypeError";
  }

  export class UnprocessableContentError {
    public readonly _tag = "UnprocessableContentError";
  }

  export class TooManyRequestsError {
    public readonly _tag = "TooManyRequestsError";
  }

  export class ClientClosedRequestError {
    public readonly _tag = "ClientClosedRequestError";
  }

  export class TRPCClientError {
    public readonly _tag = "TRPCClientError";
  }
}
