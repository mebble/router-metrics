import { Gauge } from 'prom-client';
import { DeviceMetric, DeviceMetricLabels } from './types';

export const speed = (gauge: Gauge<keyof DeviceMetricLabels>) => (devices: DeviceMetric[]) => {
    for (const _device of devices) {
        gauge.labels({}).set(0);
    }
};
