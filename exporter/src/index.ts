import express from 'express';

const app = express();
const port = 5000;

app.get('/ping', (req, res) => {
    res.send('ponge!');
});

app.listen(port, () => console.log(`Server running on port ${port}`));
