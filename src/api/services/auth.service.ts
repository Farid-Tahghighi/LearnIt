import axios from "axios";

const AUTH_API_URL = "http://localhost:3000/api/auth/";

export const signup = (
  name: string,
  email: string,
  password: string,
  age: number,
  gender: string,
  type: string
) => {
  return axios
    .post(AUTH_API_URL + "signup", {
      name,
      age,
      gender,
      type,
      email,
      password,
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      if (e.response.status == 400) {
        return e.response;
      }
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
