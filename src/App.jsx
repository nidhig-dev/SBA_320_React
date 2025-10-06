import './App.css'
import { useState } from 'react';

//import routes,route
import {Routes,Route} from "react-router-dom";
//import pages
import Home from "./pages/Home"
//import component
import NavBar from './components/NavBar';
import TopNews from './pages/TopNews';
import Search from './pages/Search';

function App() {
  

  return (
    <>
    <NavBar/>  
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/Search" element={<Search/>}/>   
    </Routes>
    </>
  )
}

export default App
