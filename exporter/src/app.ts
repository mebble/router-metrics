import express from 'express';

export const createApp = () => {
    const app = express();

    app.get('/ping', (req, res) => {
        res.send('pong!');
    });

    return app;
};
