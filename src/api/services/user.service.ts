import axios, { AxiosHeaders } from "axios";
import authHeader from "../auth-header";

const USER_API_URL = "http://localhost:3000/api/users/";

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    return axios
      .get(`${USER_API_URL}me`, { headers: authHeader() })
      .then((res) => {
        return res.data;
      })
      .catch((e) => console.log(e.response.data));
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
        const headers = res.headers;
        if (headers instanceof AxiosHeaders) {
          const token = headers.get("x-auth-token");
          localStorage.setItem("user", JSON.stringify(token));
        }
        window.location.reload();
      })
      .catch((e) => console.log(e.response.data));
  } else {
    return null;
  }
};

export const editUser = (user: any, email: string) => {
  return axios
    .put(USER_API_URL + email, { ...user }, { headers: authHeader() })
    .catch((e) => console.log(e.response.data + e.response.status));
};

export const getUserClasses = (id: string) => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    return axios
      .get(`${USER_API_URL}classes/` + id, { headers: authHeader() })
      .then((res) => {
        if (res.data) return res.data;
        return null;
      })
      .catch((e) => console.log(e.response.data));
  } else return null;
};

export const getUser = (id: string) => {
  if (id) {
    return axios
      .get(USER_API_URL + id)
      .then((res) => {
        return res.data;
      })
      .catch((e) => console.log(e.response.data));
  } else return null;
};

export const getUsers = () => {
  return axios
    .get(USER_API_URL, { headers: authHeader() })
    .then((res) => {
      if (res) {
        return res.data;
      }
    })
    .catch((e) => {
      return e;
    });
};

export const getPresenters = () => {
  return axios
    .get(USER_API_URL + "presenters", { headers: authHeader() })
    .then((res) => {
      if (res.data) {
        return res.data;
      }
    })
    .catch((e) => console.log(e.response.data + " Code: " + e.response.status));
};

export const deleteUser = (email: string) => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    return axios
      .delete(USER_API_URL + email, { headers: authHeader() })
      .catch((e) => console.log(e));
  }
};

export const getStudents = () => {
  return axios
    .get(USER_API_URL + "students", { headers: authHeader() })
    .then((res) => {
      if (res.data) {
        return res.data;
      }
    })
    .catch((e) => console.log(e.response.data + " Code: " + e.response.status));
};
