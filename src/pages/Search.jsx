import { useState } from "react"

export default function Search() {
    const [searchNews,setSearchNews]=useState("");
    function handleChange(e){
        setSearchNews(e.target.value);
    }
    function handleSearchNews(e){
        e.PreventDefault();
        
    }
  return (
    <div>
        <h2>Search for a Article</h2>
        <form onSubmit={handleSearchNews}>
            <label>Title: </label>
        <input className="inputBox"
               type="text" 
               value={searchNews}
               placeholder="Enter title.."
               autoFocus
               onChange={handleChange} />
               <input className="btn" 
                      type="submit" 
                      value="submit"/>

        </form>
    </div>
  )
}
