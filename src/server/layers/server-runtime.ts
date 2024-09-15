import { ManagedRuntime } from "effect";
import { NodeSdk } from "@effect/opentelemetry";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";

const NodeSdkLive = NodeSdk.layer(() => ({
  resource: {
    serviceName: "effect-t3",
  },
  spanProcessor: new BatchSpanProcessor(
    new OTLPTraceExporter({
      url: "http://localhost:4318/v1/traces",
    }),
  ),
}));

export const ServerRuntime = ManagedRuntime.make(NodeSdkLive);
