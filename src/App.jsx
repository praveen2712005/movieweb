import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Banner from "./components/Banner/Banner";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";
import Movies from "./components/Movie/Movies";
import Mylist from "./components/Next/mylist";   
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home"; 

function App() {
  return (
  
     <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/Banner" element={<Banner/>} />
       <Route path="/mylist" element={<Mylist/>} />
    </Routes>
       
  );
}

export default App;
