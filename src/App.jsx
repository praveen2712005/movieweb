import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Banner from "./components/Banner/Banner";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";
import Movies from "./components/Movie/Movies";  

function App() {
  return (
    <div>
      <Navbar />
      <Banner />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
