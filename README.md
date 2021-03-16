# router-metrics

Internet usage metrics.

Following the Prometheus guide on [writing exporters](https://prometheus.io/docs/instrumenting/writing_exporters/).

## Requirements

- A Tenda router
- [Node.js](https://nodejs.org/en/download/)
- [Prometheus](https://prometheus.io/download/)
- [Grafana](https://grafana.com/oss/grafana/)

## Dashboard

I've set up a Grafana dashboard, which has been exported to a JSON model at [/dashboard/grafana-model.json](/dashboard/grafana-model.json).

Screenshots of the current dashboards:

![Download speed metrics panel](/docs/panel-download-speed.png)
*Download speed metrics*

![Upload speed metrics panel](/docs/panel-upload-speed.png)
*Upload speed metrics*

The JSON model will be updated regularly, so these screenshots are likely to be outdated soon. But they likely won't change much.

## Run

- Set up and run the exporter. Instructions are found in the [/exporter/README.md](/exporter/README.md)
    - Set the IP address of your Tenda router, the exporter app name, etc
    - Build and run the exporter
- Run the Prometheus server with the `prometheus.yml` configuration file
    ```bash
    ./prometheus --config.file=./prometheus.yml
    ```
    Make sure that the exporter's host and port are used as the target in `prometheus.yml`
- You'll now see Prometheus talking to your exporter. The exporter would regularly log `/metrics` requests coming from Prometheus.
- You can also make your own requests to the exporter to see what the metrics collected by Prometheus look like. Example:
    ```bash
    curl localhost:5000/metrics
    ```
    Output:
    ```bash
    # TYPE router_up gauge
    router_up 1

    # HELP router_device_upload_speed_bytes_per_second The current upload speed of a device connected to the router in bytes per second
    # TYPE router_device_upload_speed_bytes_per_second gauge
    router_device_upload_speed_bytes_per_second{device_name="Device1",device_mac="<mac>",connection_type="wifi"} 0
    router_device_upload_speed_bytes_per_second{device_name="Device2",device_mac="<mac>",connection_type="wifi"} 1000
    ```

## Todos:

- The `prometheus.yml` configuration to find the router exporter is static. Some dynamic configuration might be needed.
- The exporter exposes internet speed per second metrics. We need to derive a metric that accumulates this speed to amount of data consumed.
