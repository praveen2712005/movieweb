import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/", 
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTM5ZDAxZjZhMGNiNDAwNTUxZWQwNmE0NjlhNmNlZCIsIm5iZiI6MTc1NzMyNzIwMS4xMDQsInN1YiI6IjY4YmVhZjYxMjlmNGNlNTAzNDRlNjRiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2JBxUHRr3UAxfMER7LMODf0R8TAoqi8_vwQRh81oJVE",
    Accept: "application/json",
}
});

export default axiosInstance;