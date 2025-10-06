import { useState, useEffect } from 'react';
import axios from "axios";

export default function Sports() {
    const [sportsNews, setSportsNews] = useState([]);

    const [sportsIndex, setSportsIndex] = useState(0);
    const apiKey = import.meta.env.VITE_API_KEY;
    async function getData() {
        try {
            let res = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=${apiKey}`)
            console.log(res.data.articles);
            if (res.data.articles.length > 0) {
                setSportsNews(res.data.articles);
            }
            else {
                console.error("No data found")
            }

        }
        catch (err) {
            console.error(err.message)
        }
    }
    useEffect(() => {
        getData();

    }, [])
    function handleNext() {
        //if reached end of array,keep last index
        if (sportsIndex == sportsNews.length - 1) {
            setSportsIndex(sportsNews.length - 1);
        }
        //else increment the index to fetch next news
        else {
            setSportsIndex(sportsIndex => (sportsIndex + 1));
        }
    }
    function handlePrev() {
        //if reached end of array,keep last index
        if (sportsIndex == 0) {
            setSportsIndex(0);
        }
        //else increment the index to fetch next news
        else {
            setSportsIndex(sportsIndex => (sportsIndex - 1));
        }
    }
    console.log(sportsIndex);
    let news = sportsNews[sportsIndex];
    console.log(news);
    return (
        <div>
            {
                (news) ?
                    <>
                        <h2>{news.title.toUpperCase()}</h2>
                        <p>By: {news.author} | Published at: {news.publishedAt}</p>
                        <div className='imgContainer'>
                            <button className='navBtn'
                                onClick={handlePrev}
                            >Prev⏪</button>
                            <img className="imgTopNews"
                                src={news.urlToImage}
                                alt={news.title} />
                            <button className='navBtn'
                                onClick={handleNext}
                            >Next⏩</button>
                        </div>
                        <p className='descNews'>{news.description}
                            <a href={news.url} className="readMoreURL"
                                target="_blank"
                            > Read More..
                            </a>

                        </p>
                    </>
                    : <p>Loading news...</p>
            }
        </div>
    )
}













