import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";

const Home = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const search = useLocation().search;
    const query = new URLSearchParams(search);
    const name = query.get('name')

    useEffect(() => {
        // サーバーサイドのエンドポイントからデータを取得するコード
        fetch(`/atcoder-data?name=${name}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setError(error.message); // エラーメッセージを設定
            });
    }, []);

    return (
        <div>
            {error ? ( // エラーがある場合の表示
                <div>
                    <h1>Error</h1>
                    <p>{error}</p>
                </div>
            ) : data ? ( // データがある場合の表示
                <div className="badge">
                    <h1 className="atcoder">AtCoder</h1>
                    <div className="name">{name}</div>
                    <div className="rate" style={{ color: data['atcoder']['color'] }}>{data['atcoder']['rating']}</div>
                    <meter min="0" max="3000" value={data['atcoder']['rating']} color={data['atcoder']['color']}></meter>
                </div>
            ) : ( // データがロード中の表示
                <p>Loading data...</p>
            )}
        </div>
    )
}

export default Home