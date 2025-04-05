import { store } from "@/app/store/store";
import axios from "axios";
import { RootState } from "@/app/store/store"; // or wherever RootState is defined

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  const state = store.getState() as RootState;
  const token = state.auth.token;

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

export default api;
