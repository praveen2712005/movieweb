import Axios from "../Api/Axios"

export const getseries = async () => {
   try {
    let response =await Axios.get("/discover/tv")
    console.log("Response series:",response.data);
    return response;
   } catch (error) {
     console.error("Error fetching Movies:",error);
   }
}