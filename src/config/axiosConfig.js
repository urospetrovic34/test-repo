import axios from "axios";

const instance = axios.create({
  baseURL: "https://internship-hr-app.herokuapp.com/api",
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
  }
);

instance.interceptors.response.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      if(error.response.status === 401){
        localStorage.removeItem("token")
        window.location.reload()
      }
      console.log(error);
    }
  );

export default instance;
