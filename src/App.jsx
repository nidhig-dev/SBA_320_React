import './App.css'
import { useState } from 'react';

//import routes,route
import { Routes, Route } from "react-router-dom";
//import pages
import Home from "./pages/Home"
//import component
import NavBar from './components/NavBar';
import Sports from './pages/Sports';
import Search from './pages/Search';
import Business from './pages/Business';
import Missing from './pages/Missing';
import { Navigate } from 'react-router-dom';

function App() {


  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/business" element={<Business />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/missing" element={<Missing />} />
        <Route path="*" element={<Navigate to="/missing" replace />} />
      </Routes>
    </>
  )
}

export default App
