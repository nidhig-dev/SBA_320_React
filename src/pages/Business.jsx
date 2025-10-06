import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

export default function Business() {
    const [businessNews, setBusinessNews] = useState([]);

    const [businessIndex, setBusinessIndex] = useState(0);
    const apiKey = import.meta.env.VITE_API_KEY;
    async function getData() {
        try {
            let res = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`)
            console.log(res.data.articles);
            if (res.data.articles.length > 0) {
                setBusinessNews(res.data.articles);
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
        if (businessIndex == businessNews.length - 1) {
            setBusinessIndex(businessNews.length - 1);
        }
        //else increment the index to fetch next news
        else {
            setBusinessIndex(businessIndex => (businessIndex + 1));
        }
    }
    function handlePrev() {
        //if reached end of array,keep last index
        if (businessIndex == 0) {
            setBusinessIndex(0);
        }
        //else increment the index to fetch next news
        else {
            setBusinessIndex(businessIndex => (businessIndex - 1));
        }
    }
    console.log(businessIndex);
    let news = businessNews[businessIndex];
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
                            <Link className="readMoreURL"
                                target="_blank"
                                to={news.url}> Read More..
                            </Link>
                        </p>
                    </>
                    : <p>Loading news...</p>
            }
        </div>
    )
}













