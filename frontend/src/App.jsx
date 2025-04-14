import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import YouTubeCommentAnalyzer from "./YouTubeCommentAnalyzer";
import Chart from "./Chart";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Results from "./pages/Results";
import Feature from "./pages/Feature";
import AboutUs from "./components/AboutUs";
import Contact from "./pages/Contact";
import Protected from "./utils/Protected";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/Profile";
import SmoothScroll from "./components/SmoothScroll";

function App() {
  return (
    <div
      className="App min-h-screen inter-karla"
      style={{
        backgroundImage:
          "radial-gradient( #091D0E 0%,#0c0c0b 40%,  #0f0f0f 100%)",
      }}
    >
      <BrowserRouter>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyse" element={<YouTubeCommentAnalyzer />} />
          <Route path="/results" element={<Results />} />
          <Route path="/features" element={<Feature />} />
          <Route path="/about" element={<AboutUs />} />

          <Route path="/contact" element={<Contact></Contact>}></Route>
          <Route
            path="/profile"
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
