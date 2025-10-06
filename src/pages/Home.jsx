import { useState, useEffect } from 'react';
import axios from "axios";

export default function Home() {
    //state to manage top tranding news
    const [getNews, setGetNews] = useState([]);
    //state to manage index of carousal
    const [index, setIndex] = useState(0);
    //Boolean to disable the Prev and next button
    let isFirst, isLast;
    const apiKey = import.meta.env.VITE_API_KEY;
    async function getData() {
        try {
            let res = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`)
            if (res.data.articles.length > 0) {
                setGetNews(res.data.articles);
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
        if (index == getNews.length - 1) {
            setIndex(getNews.length - 1);
        }
        //else increment the index to fetch next news
        else {
            setIndex(index => (index + 1));
        }
    }
    function handlePrev() {
        //if reached first of array,keep first index
        if (index == 0) {
            setIndex(0);
        }
        //else deccrement the index to fetch prev news
        else {
            setIndex(index => (index - 1));
        }
    }
    //Get one news article
    let news = getNews[index];
    //if its the first article set prev disable boolean true
    if (index == 0) {
        isFirst = true;
    }
    //if its the last article set next disable boolean true
    if (index == getNews.length - 1) {
        isLast = true;
    }
    return (
        <div>
            {
                (news) ?
                    <>
                        <h2>{news.title.toUpperCase()}</h2>
                        <p>By: {news.author} | Published at: {news.publishedAt}</p>
                        <div className='imgContainer'>
                            <button className='navBtn'
                                disabled={isFirst}
                                onClick={handlePrev}
                            >Prev⏪</button>
                            <img className="imgTopNews"
                                src={news.urlToImage}
                                alt={news.title} />
                            <button className='navBtn'
                                disabled={isLast}
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
