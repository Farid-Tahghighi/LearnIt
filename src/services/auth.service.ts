import axios from "axios";
import authHeader from "./auth-header";
import { Navigate } from "react-router-dom";

const AUTH_API_URL = "http://localhost:3000/api/auth/";
const USER_API_URL = "http://localhost:3000/api/users/";
const CLASS_API_URL = "http://localhost:3000/api/classes/";

export const signup = (
  name: string,
  email: string,
  password: string,
  age: number,
  gender: string,
  type: string
) => {
  return axios.post(AUTH_API_URL + "signup", {
    name,
    age,
    gender,
    type,
    email,
    password,
  });
};

export const login = (email: string, password: string) => {
  return axios
    .post(AUTH_API_URL + "login", {
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
  Navigate({ to: "/home" });
  window.location.reload();
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    return axios
      .get(`${USER_API_URL}me`, { headers: authHeader() })
      .then((res) => {
        return res.data;
      });
  } else {
    return null;
  }
};

export const editCurrentUser = (user: any, email: string) => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    return axios
      .put(USER_API_URL + email, { ...user }, { headers: authHeader() })
      .then((res) => {
        if (res.data) {
          // const token = res.headers.get("x-auth-token");
          // localStorage.setItem("user", token);
          return res.data;
        }
      });
  } else {
    return null;
  }
};

export const getClass = (_id: string) => {
  return axios
    .get(CLASS_API_URL + _id)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      return e;
    });
};

export const createClass = (clss: any) => {
  return axios.post(
    CLASS_API_URL,
    {
      ...clss,
    },
    { headers: authHeader() }
  );
};

export const getUserClasses = (id: string) => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    console.log(`${USER_API_URL}classes/` + id);
    return axios
      .get(`${USER_API_URL}classes/` + id, { headers: authHeader() })
      .then((res) => {
        if (res.data) return res.data;
        return null;
      })
      .catch((e) => console.log(e));
  } else return null;
};
