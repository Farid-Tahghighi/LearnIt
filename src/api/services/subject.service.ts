import axios from "axios";
import authHeader from "../auth-header";

const SUBJECT_API_URL = "http://localhost:3000/api/subjects/";

export const getSubjects = () => {
  return axios
    .get(SUBJECT_API_URL)
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e.response.data));
};

export const createSubject = (data: any) => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    return axios
      .post(SUBJECT_API_URL, { ...data }, { headers: authHeader() })
      .catch((e) => console.log(e.response.data));
  } else return null;
};

export const editSubject = (data: any, title: string) => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    return axios
      .put(SUBJECT_API_URL + title, { ...data }, { headers: authHeader() })
      .catch((e) => console.log(e));
  }
};

export const deleteSubject = (title: string) => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    return axios
      .delete(SUBJECT_API_URL + title, { headers: authHeader() })
      .catch((e) => console.log(e));
  }
};
