import axios from "axios";
const baseUrl = "/api/persons";

const upload = (newImage) => {
  const request = axios.post(baseUrl, newImage);
  return request.then((response) => response.data.link);
};

export default {upload}