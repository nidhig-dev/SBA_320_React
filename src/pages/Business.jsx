import { useState, useEffect } from 'react';
import axios from "axios";

export default function Business() {
    //state to manage biz news data
    const [businessNews, setBusinessNews] = useState([]);
    //state to manage index of carousal
    const [businessIndex, setBusinessIndex] = useState(0);
    const apiKey = import.meta.env.VITE_API_KEY;
    //Assuming country to be United states
    const country ="us";
    //booleans to disable prev and next buttons
    let isFirst;
    let isLast;
    async function getData() {
        try {
            let res = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=business&apiKey=${apiKey}`)
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
        //if reached first of array,keep first index
        if (businessIndex == 0) {
            setBusinessIndex(0);           
        }
        //else decrement the index to fetch next news
        else {
            setBusinessIndex(businessIndex => (businessIndex - 1));           
        }
    }
    //Get one news article
    let news = businessNews[businessIndex];
    //if its the first article set prev disable boolean true
    if (businessIndex == 0) {
        isFirst = true;
    }
    //if its the last article set next disable boolean true
    if (businessIndex == businessNews.length - 1) {
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













