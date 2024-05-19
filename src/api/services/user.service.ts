import axios, { AxiosHeaders, AxiosResponse } from "axios";
import authHeader from "../auth-header";
import { logError } from "../../utils/ErrorHandler";

const USER_API_URL = "http://localhost:3000/api/users/";

export const getCurrentUser = () => {
  const userJson = localStorage.getItem("user");
  if (userJson) {
    return axios
      .get(`${USER_API_URL}me`, { headers: authHeader() })
      .then((res: AxiosResponse) => {
        return res.data;
      })
      .catch((e) => logError(e));
  }
  return null;
};

export const editCurrentUser = (user: any, email: string) => {
  const userJson = localStorage.getItem("user");
  if (userJson) {
    return axios
      .put(USER_API_URL + email, { ...user }, { headers: authHeader() })
      .then((res: AxiosResponse) => {
        const headers = res.headers;
        if (headers instanceof AxiosHeaders) {
          const token = headers.get("x-auth-token");
          localStorage.setItem("user", JSON.stringify(token));
        }
        window.location.reload();
      })
      .catch((e) => logError(e));
  }
  return null;
};

export const editUser = (user: any, email: string) => {
  return axios
    .put(USER_API_URL + email, { ...user }, { headers: authHeader() })
    .catch((e) => logError(e));
};

export const getUserClasses = (id: string) => {
  const userJson = localStorage.getItem("user");
  if (userJson) {
    return axios
      .get(`${USER_API_URL}classes/` + id, { headers: authHeader() })
      .then((res: AxiosResponse) => {
        return res.data;
      })
      .catch((e) => logError(e));
  }
  return null;
};

export const getUser = (id: string) => {
  if (id) {
    return axios
      .get(USER_API_URL + id)
      .then((res: AxiosResponse) => {
        return res.data;
      })
      .catch((e) => logError(e));
  }
  return null;
};

export const getUsers = () => {
  return axios
    .get(USER_API_URL, { headers: authHeader() })
    .then((res: AxiosResponse) => {
      return res.data;
    })
    .catch((e) => logError(e));
};

export const getPresenters = () => {
  return axios
    .get(USER_API_URL + "presenters", { headers: authHeader() })
    .then((res: AxiosResponse) => {
      return res.data;
    })
    .catch((e) => logError(e));
};

export const deleteUser = (email: string) => {
  const userJson = localStorage.getItem("user");
  if (userJson) {
    return axios
      .delete(USER_API_URL + email, { headers: authHeader() })
      .catch((e) => logError(e));
  }
};

export const getStudents = () => {
  return axios
    .get(USER_API_URL + "students", { headers: authHeader() })
    .then((res: AxiosResponse) => {
      return res.data;
    })
    .catch((e) => logError(e));
};
