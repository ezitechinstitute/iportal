import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Review_intern from './pages/Review_intern';
import NonReview_intern from './pages/NonReview_intern';
import Login from './pages/Login';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route index path="/" element={<Login/>} />
          <Route path="/review-dashboard" element={<Home/>} />
          <Route path='/review-interns' element={<Review_intern/>}/>
          <Route path='/non-review-interns' element={<NonReview_intern/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
