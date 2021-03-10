# router-metrics

Internet usage metrics.

Following the Prometheus guide on [writing exporters](https://prometheus.io/docs/instrumenting/writing_exporters/).

## Todos:

- The `prometheus.yml` configuration to find the router exporter is static. Some dynamic configuration might be needed.
- The exporter exposes internet speed per second metrics. We need to derive a metric that accumulates this speed to amount of data consumed.
