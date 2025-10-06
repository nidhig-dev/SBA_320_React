import { useState } from "react";
import axios from "axios";

export default function Search() {
    const [searchNews, setSearchNews] = useState("");
    const [searchIndex, setSearchIndex] = useState(0);
    const [searchResult, setSearchResult] = useState([]);
    const [display, setDisplay] = useState(false);
    const apiKey = import.meta.env.VITE_API_KEY;
    function handleChange(e) {

        setSearchNews(e.target.value);
        console.log(searchNews);
    }
    async function handleSearchNews(e) {
        e.preventDefault();
        try {
            console.log(searchNews);
            if (searchNews == "") {
                console.log("i am here");
                setDisplay(true);
                setSearchResult([]);
                console.error("Enter Search Title!")
            }
            else {
                let res = await axios.get(`https://newsapi.org/v2/everything?q=${searchNews}&language=en&sortBy=relevancy&apiKey=${apiKey}`)
                console.log(res.data.articles);
                if (res.data.articles.length > 0) {
                    setSearchResult(res.data.articles);
                    setDisplay(true);
                    setSearchNews("");
                }
                else {
                    console.error("No data found")
                }
            }

        }
        catch (err) {
            console.error(err.message)
        }

    }
    function handleNext() {
        //if reached end of array,keep last index
        if (searchIndex == searchResult.length - 1) {
            setSearchIndex(searchResult.length - 1);
        }
        //else increment the index to fetch next news
        else {
            setSearchIndex(searchIndex => (searchIndex + 1));
        }
    }
    function handlePrev() {
        //if reached end of array,keep last index
        if (searchIndex == 0) {
            setSearchIndex(0);
        }
        //else increment the index to fetch next news
        else {
            setSearchIndex(searchIndex => (searchIndex - 1));
        }
    }
    let news = searchResult[searchIndex];
    console.log(news)
    return (
        <div>
            <form onSubmit={(e) => handleSearchNews(e)}>
                <label>Search Keyword: </label>
                <input className="inputBox"
                    type="text"
                    value={searchNews}
                    placeholder="Enter title.."
                    autoFocus
                    onChange={handleChange} />
                <input className="btn"
                    type="submit"
                    value="submit" />

            </form>
            {
                (display && searchResult.length > 0) ?
                    <>
                        <p>{searchResult.length} results found.</p>
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
                    </> : (display && searchResult.length == 0) &&
                    <p>No news found</p>
            }
        </div>

    )
}
