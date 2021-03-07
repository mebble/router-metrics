import { Gauge } from 'prom-client';
import { DeviceMetric, DeviceMetricLabels } from './types';

export const speed = (_gauge: Gauge<keyof DeviceMetricLabels>) => (_devices: DeviceMetric[]) => {

};
