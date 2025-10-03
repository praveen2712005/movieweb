import React, { useEffect, useState } from "react"; 
import Movies from "../Movie/Movies"; 
import Navbar from "../Navbar/Navbar";
 import Banner from "../Banner/Banner"; 
 import Footer from "../Footer/Footer"; 
 import "./body.css"; 
 import { getmovies } from "../../Services/Movies";
 import {getseries} from "../../Services/tv";
 function Body() 
    {
      const [movies,setMovies]=useState([])
      const [series, setSeries] = useState([]); 
      useEffect(()=>{
        try {
          console.log("useEffect called");
         const fetchdata = async ()=>{
            let response = await getmovies();
            console.log(response)
            setMovies(response.results)
         }
         fetchdata();
        } 
        catch (error) {
         console.log(error)
        }
        
      },[])
        useEffect(()=>{
          try {
          const fetchdata = async () => {
            let response = await getseries()
            console.log(response,"------------------series in body")
            setSeries(response.data.results);
          } ;
          fetchdata(); 
          } catch (error) {
            
          }
        },[])
      
  return (
  <div className="body">
    <Movies movies={movies} title="Trending Now" />
    <Movies series={series} title="Top Rated tv series" />
    <Movies series={series} title="Top Rated tv series" />
    <Movies movies={movies} title="Trending Now" />
  </div>
);
    
    } export default Body;
