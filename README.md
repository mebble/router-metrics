# router-metrics

Internet usage metrics.

Following the Prometheus guide on [writing exporters](https://prometheus.io/docs/instrumenting/writing_exporters/).

## Dashboard

I've set up a Grafana dashboard, which has been exported to a JSON model at [/dashboard/grafana-model.json](/dashboard/grafana-model.json).

Screenshots of the current dashboards:

![Download speed metrics panel](/docs/panel-download-speed.png)
*Download speed metrics*

![Upload speed metrics panel](/docs/panel-upload-speed.png)
*Upload speed metrics*

The JSON model will be updated regularly, so these screenshots are likely to be outdated soon. But they likely won't change much.

## Todos:

- The `prometheus.yml` configuration to find the router exporter is static. Some dynamic configuration might be needed.
- The exporter exposes internet speed per second metrics. We need to derive a metric that accumulates this speed to amount of data consumed.
