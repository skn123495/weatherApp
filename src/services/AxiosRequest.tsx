import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";

const axiosRequest = axios.create({
  baseURL: "https://geocoding-api.open-meteo.com/v1/",
});

axiosRequest.interceptors.request.use(
  (request: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> => {
    console.log("axios Request", request.url);
    // Set the headers properly
    if (request.headers) {
      request.headers["content-type"] = "application/json";
    }
    return request;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

axiosRequest.interceptors.response.use(
  (response: AxiosResponse<any>): AxiosResponse<any> => {
    return response;
  },
  async (error: AxiosError): Promise<AxiosError> => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
    }
    return Promise.reject(error);
  }
);

export default axiosRequest;
