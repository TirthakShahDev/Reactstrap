import axios from "axios";
import { store } from "../Store";
const service = axios.create({
  baseURL: process.env.REACT_BASE_API, // url = base url + request url
  timeout: 5000
});

// Request interceptors
service.interceptors.request.use(
  config => {
    // Add X-Access-Token header to every request, you can add other custom headers here
    const state = store.getState();

    if (state.authentication.token) {
      config.headers["X-Access-Token"] = state.authentication.token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// Response interceptors
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code !== 20000) {
      //TO DO
      // Message({
      //   message: res.message || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return response.data;
    }
  },
  error => {
    switch (error.response.status) {
      case 403: // Authorization Failed Response can add other status codes here to manage error Logging
      //TO DO  
      // MessageBox.confirm(
        //   "You have been logged out, you can cancel to stay on this page, or log in again",
        //   "OK sign out",
        //   {
        //     confirmButtonText: "Confirm",
        //     cancelButtonText: "Cancel",
        //     type: "warning"
        //   }
        // ).then(() => {
        //   UserModule.ResetToken();
        //   location.reload(); // To prevent bugs from vue-router
        // });
        break;

      default:
      //TO DO  
      // Message({
        //   message: error.message,
        //   type: "error",
        //   duration: 5 * 1000
        // });
        break;
    }
    return Promise.reject(error);
  }
);

export default service;
