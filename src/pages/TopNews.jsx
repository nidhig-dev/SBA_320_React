import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from "react-router-dom"

export default function TopNews({ getNews }) {
    const title = useParams().title;
    const news = getNews.find((news) => news.title == title);
    console.log(news);


    return (
        <div>
            {
                (news) ?
                    <>
                    <h2>{news.title.toUpperCase()}</h2>
                    <p>By: {news.author}| Published at: {news.publishedAt}</p>
                        <img className="imgTopNews"
                            src={news.urlToImage}
                            alt={news.title} />
                        <p className='descNews'>{news.description}
                            <Link className="linkURL"
                                target="_blank"
                                to={news.url}> Read More
                            </Link>
                        </p>
                        
                    </>
                    : <p>No news found</p>
            }

        </div>

    )
}
