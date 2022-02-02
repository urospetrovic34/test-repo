import axios from "axios";

const instance = axios.create({
  baseURL: "https://strapi-internship-hr-app.onrender.com/api",
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE',
  }
});

instance.defaults.headers.post['Content-Type'] = 'application/json'
instance.defaults.headers.post['Accept'] = 'application/json'

export default instance;