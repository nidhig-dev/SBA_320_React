import { useState } from "react";
import axios from "axios";

export default function Search() {
    //State for input search key word
    const [searchNews, setSearchNews] = useState("");
    //state for setting search index
    const [searchIndex, setSearchIndex] = useState(0);
    //state for displaying search results
    const [searchResult, setSearchResult] = useState([]);
    //state to check if search are to be displayed or not
    //if submit button is not cklicked, do not show any result 
    const [display, setDisplay] = useState(false);
    //Boolean to disable the Prev and next button
    let isFirst, isLast;
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
    console.log(news);
    if (searchIndex == 0) {
        isFirst = true;

    }
    if (searchIndex == searchResult.length - 1) {
        isLast = true;

    }
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
                    </> : (display && searchResult.length == 0) &&
                    <p>No news found</p>
            }
        </div>

    )
}
