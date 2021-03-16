import express from 'express';
import { Gauge, Registry } from 'prom-client';
import fetch from 'node-fetch';

import { DownloadMetric, RouterUpMetric, UploadMetric } from './constants';
import { DeviceMetricLabels, DeviceOnline } from './types';
import { router } from './router';
import { downSpeedMetric, upSpeedMetric } from './mapper';
import { speed } from './speed';

export const createApp = () => {
    const getDevices = router(fetch);
    const routerUpGauge = new Gauge({
        name: RouterUpMetric.name,
        help: RouterUpMetric.help,
    });
    const uploadSpeedGauge = new Gauge<keyof DeviceMetricLabels>({
        name: UploadMetric.name,
        help: UploadMetric.help,
        labelNames: ['device_name', 'device_mac', 'connection_type'],
    });
    const downloadSpeedGauge = new Gauge<keyof DeviceMetricLabels>({
        name: DownloadMetric.name,
        help: DownloadMetric.help,
        labelNames: ['device_name', 'device_mac', 'connection_type'],
    });
    const setUploadSpeeds = speed(uploadSpeedGauge);
    const setDownloadSpeeds = speed(downloadSpeedGauge);

    const registry = new Registry();
    registry.registerMetric(routerUpGauge);
    registry.registerMetric(uploadSpeedGauge);
    registry.registerMetric(downloadSpeedGauge);

    const app = express();

    app.use((req, res, next) => {
        console.log(new Date().toLocaleString(), req.originalUrl);
        next();
    });
    app.get('/ping', (req, res) => {
        res.send('pong!');
    });
    app.get('/metrics', async (req, res) => {
        let devices: DeviceOnline[] = [];
        try {
            devices = await getDevices();
            routerUpGauge.set(1);
        } catch (error) {
            routerUpGauge.set(0);
            console.error(error);
        }
        const downloadSpeeds = devices.map(downSpeedMetric);
        setDownloadSpeeds(downloadSpeeds);
        const uploadSpeeds = devices.map(upSpeedMetric);
        setUploadSpeeds(uploadSpeeds);

        const exporterResponse = await registry.metrics();

        res.send(exporterResponse);
    });

    return app;
};
