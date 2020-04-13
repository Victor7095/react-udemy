import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burguer-builder-13189.firebaseio.com/"
});

export default instance;
