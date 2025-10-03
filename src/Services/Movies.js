import Axios from "../Api/Axios"

export const getmovies = async () => {
  try {
    console.log("getmovies called");
    let response = await Axios.get("/discover/movie")
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching Movies:", error);
    throw error; // Always throw error to handle it in component
  }
}

export const getMovieDetails = async (id) => {
  try {
    let response = await Axios.get(`/movie/${id}`) // Fixed endpoint
    console.log(response, "movie details by id")
    return response
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
}

export const getMovieById = async (id) => {
  try {
    let response = await Axios.get(`/movie/${id}`) // Fixed endpoint
    console.log(response, "movie by id")
    return response
  } catch (error) {
    console.error("Error fetching movie by ID:", error);
    throw error;
  }
}