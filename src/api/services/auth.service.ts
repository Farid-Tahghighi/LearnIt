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
  console.log("SMTH");
  return axios
    .post(AUTH_API_URL + "signup", {
      name,
      age,
      gender,
      type,
      email,
      password,
    })
    .catch((e) => console.log(e.response.data));
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
    })
    .catch((e) => console.log(e.response.data));
};

export const logout = () => {
  localStorage.removeItem("user");
};
