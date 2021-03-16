import express from 'express';
import { Gauge, Registry } from 'prom-client';
import fetch from 'node-fetch';

import { DownloadMetric, RouterUpMetric } from './constants';
import { DeviceMetricLabels, DeviceOnline } from './types';
import { router } from './router';
import { downSpeedMetric } from './mapper';
import { speed } from './speed';
import dedent from 'dedent';

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
        let devices: DeviceOnline[] = [];
        try {
            devices = await getDevices();
        } catch (error) {
            res.send(dedent`
                # HELP ${RouterUpMetric.name} ${RouterUpMetric.help}
                # TYPE ${RouterUpMetric.name} gauge
                ${RouterUpMetric.name} 0

                # HELP ${DownloadMetric.name} ${DownloadMetric.help}
                # TYPE ${DownloadMetric.name} gauge
            ` + '\n');
            return;
        }
        const downloadSpeeds = devices.map(downSpeedMetric);
        setDownloadSpeeds(downloadSpeeds);

        const exporterResponse = await registry.metrics();

        res.send(exporterResponse);
    });

    return app;
};
