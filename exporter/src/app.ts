import express from 'express';
import dedent from 'dedent';
import { DownloadMetric } from './constants';

export const createApp = () => {
    const app = express();

    app.get('/ping', (req, res) => {
        res.send('pong!');
    });
    app.get('/metrics', (req, res) => {
        res.send(dedent`
            # HELP ${DownloadMetric.name} ${DownloadMetric.help}
            # TYPE ${DownloadMetric.name} gauge
        `);
    });

    return app;
};
