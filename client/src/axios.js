import axios from "axios";

const instance = axios.create({
  baseURL: "https://comgrads.herokuapp.com/",
});

export default instance;
