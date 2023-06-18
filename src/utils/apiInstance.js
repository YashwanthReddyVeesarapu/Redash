import axios from "axios";

let dev = false;
if (window.location.hostname === "localhost") {
  dev = true;
}
export const serverURI = dev
  ? "http://localhost:4000/"
  : "https://runnmate.herokuapp.com/";

export const url = serverURI;
export const apiInstance = axios.create({
  baseURL: url,
});
