import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/auth/";

export const register = (name: string, email: string, password: string) => {
  return axios.post(API_URL + "signup", {
    name,
    email,
    password,
  });
};

export const login = (email: string, password: string) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((res) => {
      if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      return res.data;
    });
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    return axios
      .get("http://localhost:3000/api/users/me", { headers: authHeader() })
      .then((res) => {
        return res.data;
      });
  } else {
    return null;
  }
};
