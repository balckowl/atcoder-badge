import express from "express";
import cors from "cors";
import fetch from 'node-fetch';

const app = express();

app.use(cors());
app.use(express.static("./public"));

app.get('/atcoder-data', async (req, res) => {
    try {
        const name = req.query.name;

        if (!name) {
            throw new Error('Name is missing in the query');
        }

        const response = await fetch(`http://kyopro-ratings.jp1.su8.run/json?atcoder=${name}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
