
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import YouTubeCommentAnalyzer from './YouTubeCommentAnalyzer'
import Chart from './Chart'
import Header from './components/Header'
import {BrowserRouter, Routes, Route, RouterProvider} from 'react-router-dom' 
import Home from './pages/Home'
import Footer from './components/Footer'
import Results from './pages/Results'
import Feature from './pages/Feature'
import AboutUs from './components/AboutUs'
import Contact from "./pages/Contact";

function App() {
  const [count, setCount] = useState(0);

  const [sentiment, setSentiment] = useState(null);
  const [comments, setComments] = useState([]);

  return (
    <div className="App h-screen">
      <BrowserRouter>
      <Header/> 
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/analyse" element={<YouTubeCommentAnalyzer />}/>
        <Route path="/results" element={<Results />}/> 
        <Route path='/features' element={<Feature/>}/>
        <Route path='/about' element={<AboutUs/>}/> 
          <Route path="/contact" element={<Contact></Contact>}></Route>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
