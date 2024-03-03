import axios from "axios";
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
    return (
      axios
        .putForm(USER_API_URL + email, { ...user }, { headers: authHeader() })
        // .then((res) => {
        // const headers = res.headers;
        // if (headers instanceof AxiosHeaders && headers.has("x-token-token")) {
        //   const token = res.headers.get("x-auth-token");
        //   localStorage.setItem("user", token);
        // }
        // })
        .catch((e) => console.log(e.response.data))
    );
  } else {
    return null;
  }
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
