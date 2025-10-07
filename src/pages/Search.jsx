import { useState,useRef } from "react";
import axios from "axios";

export default function Search() {
    //State for input search key word
    const [searchNews, setSearchNews] = useState("");
    //state for setting index of carousal
    const [searchIndex, setSearchIndex] = useState(0);
    //state for displaying search results
    const [searchResult, setSearchResult] = useState([]);
    //state to check if search are to be displayed or not
    //if submit button is not clicked, do not show any result data
    const [display, setDisplay] = useState(false);
    const searchRef=useRef();
    //Boolean to disable the Prev and next button
    let isFirst, isLast;
    const apiKey = import.meta.env.VITE_API_KEY;
    function handleChange(e) {
        setSearchNews(e.target.value);
    }
    async function handleSearchNews(e) {
        e.preventDefault();
        try {
            if (searchNews == "") {
                
                setSearchResult([]);
            }
            else {
                let res = await axios.get(`https://newsapi.org/v2/everything?q=${searchNews}&language=en&sortBy=relevancy&apiKey=${apiKey}`)                
                if (res.data.articles.length > 0) {
                    setSearchResult(res.data.articles);                   
                    setSearchNews("");
                }
                else {
                    console.error("No data found")
                    setSearchResult("");
                    setSearchNews("");
                }
                setDisplay(true);
                searchRef.current.focus();
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
        //if reached first of array,keep first index
        if (searchIndex == 0) {
            setSearchIndex(0);
        }
        //else decrement the index to fetch next news
        else {
            setSearchIndex(searchIndex => (searchIndex - 1));
        }
    }
    //Get one news article
    let news = searchResult[searchIndex];
    //if its the first article set prev disable boolean true
    if (searchIndex == 0) {
        isFirst = true;
    }
    //if its the last article set next disable boolean true
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
                    ref={searchRef}
                    onChange={handleChange} />
                <input className="btn"
                    type="submit"
                    value="submit" />
            </form>
            {
                //if submit button is clicked and search query returned data, display data
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
                        {/* //if submit button is clicked and search query returned nothing,show a msg
                 */}
                    </> : (display && searchResult.length == 0) &&
                    <p>No news found! Try another keyword.</p>
            }
        </div>

    )
}
