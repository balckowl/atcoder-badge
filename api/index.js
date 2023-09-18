import express from "express";
import cors from "cors";
import fetch from 'node-fetch';

const app = express();

app.use(cors());
app.use(express.static("./public"));

app.get('/atcoder-data', async (req, res) => {
    try {
        // クライアントからのリクエストを待つために非同期処理を使用
        await new Promise((resolve) => setTimeout(resolve, 2000)); // 1秒待機 (必要に応じて調整)

        const name = req.query.name; // クエリパラメータ name を取得

        if (!name) {
            throw new Error('Name is missing in the query');
        }

        // クエリパラメータ name をURLに組み込んでfetchリクエストを送信
        const response = await fetch(`http://kyopro-ratings.jp1.su8.run/json?atcoder=${name}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        res.json(data); // クライアントにJSONデータを返す
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server is running on port 3000');
});

module.exports = app;
