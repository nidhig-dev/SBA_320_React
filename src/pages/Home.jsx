import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import dotenv from "dotenv";
//import pages
import TopNews from "./TopNews";

export default function Home({getNews,setGetNews}) {
    
    const apiKey = import.meta.env.VITE_API_KEY;
    async function getData() {
        try{
            let res = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`)
            console.log(res.data.articles);
            if(res.data.articles.length>0)
            {
                setGetNews(res.data.articles);
            }
            else{
                console.error("No data found")
            }
           
        }
        catch(err){
            console.error(err.message)
        }
    }
    useEffect(() => {
        getData();

    }, [])
    return (
        <div>
            <ul style={{margin:"0",
                        paddingLeft:0
            }}>
                {
                    getNews.map((news) => (
                        <li className="listNews" key={news.title}>
                            <h2>{news.title}</h2>
                            {(news.author)?
                            
                            <p> By: {news.author}</p>
                            :<p></p>
                            }
                            <Link to={`/TopNews/${news.title}`}>
                                <img className="imgNews"
                                 src={news.urlToImage}
                                 alt={news.title}/>
                            </Link>
                            
                            
                        </li>
                    ))
                }

            </ul>
        </div>
    )
}
