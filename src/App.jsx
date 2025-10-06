import './App.css'
import { useState } from 'react';

//import routes,route
import {Routes,Route} from "react-router-dom";
//import pages
import Home from "./pages/Home"
//import component
import NavBar from './components/NavBar';
import TopNews from './pages/TopNews';

function App() {
  const [getNews, setGetNews] = useState([]);


  return (
    <>
    <NavBar/>   
    
    <Routes>
      <Route path="/" element={<Home getNews={getNews} setGetNews={setGetNews}/>}/>
      <Route path="/TopNews/:title" element={<TopNews getNews={getNews}/>}/>
    </Routes>
    </>
  )
}

export default App
