import Axios from "../Api/Axios"

export const getmovies = async () => {
   try {
    console.log("getmovies called");
    let response =await Axios.get("/discover/movie")
    console.log("Response:",response.data);
    return response.data;
   } catch (error) {
     console.error("Error fetching Movies:",error);
   }
}
export const getMovieDetails = async(id)=>{
  try {
    //api.themoviedb.org/3/movie/{movie_id}/videos?4
    //https://api.themoviedb.org/3/movie/${id}
    let response = await Axios.get(`movie/${id}/videos`)
    return response
  } catch (error) {
    
  }
}