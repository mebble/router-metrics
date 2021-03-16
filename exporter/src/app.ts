import express from 'express';
import { Gauge, Registry } from 'prom-client';
import fetch from 'node-fetch';

import { DownloadMetric } from './constants';
import { DeviceMetricLabels } from './types';
import { router } from './router';
import { downSpeedMetric } from './mapper';
import { speed } from './speed';

export const createApp = () => {
    const getDevices = router(fetch);
    const downloadSpeedGauge = new Gauge<keyof DeviceMetricLabels>({
        name: DownloadMetric.name,
        help: DownloadMetric.help,
        labelNames: ['device_name', 'device_mac', 'connection_type'],
    });
    const setDownloadSpeeds = speed(downloadSpeedGauge);
    const registry = new Registry();
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
        const devices = await getDevices();
        const downloadSpeeds = devices.map(downSpeedMetric);
        setDownloadSpeeds(downloadSpeeds);

        const exporterResponse = await registry.metrics();

        res.send(exporterResponse);
    });

    return app;
};
