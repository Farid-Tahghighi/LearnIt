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
