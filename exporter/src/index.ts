import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const port = parseInt(process.env.NODE_SERVER_PORT, 10);

app.get('/ping', (req, res) => {
    res.send('pong!');
});

app.listen(port, () => console.log(`Server running on port ${port}`));
