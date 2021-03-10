import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './app';

const port = parseInt(process.env.NODE_SERVER_PORT, 10);
const app = createApp()

app.listen(port, () => console.log(`Server running on port ${port}`));
