import axios, { AxiosResponse } from "axios";

const AUTH_API_URL = "http://localhost:3000/api/auth/";

export const signup = (data: any) => {
  return axios
    .post(AUTH_API_URL + "signup", { ...data })
    .then((res: AxiosResponse) => {
      return res;
    })
    .catch((e) => {
      if (e.response.status == 400) {
        return e.response;
      }
    });
};

export const login = (data: any) => {
  return axios
    .post(AUTH_API_URL + "login", { ...data })
    .then((res: AxiosResponse) => {
      if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      return res;
    })
    .catch((e) => {
      if (e.response.status == 400) {
        return e.response;
      }
    });
};

export const logout = () => {
  localStorage.removeItem("user");
};
