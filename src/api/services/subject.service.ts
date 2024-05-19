import axios, { AxiosResponse } from "axios";
import authHeader from "../auth-header";
import { logError } from "../../utils/ErrorHandler";

const SUBJECT_API_URL = "http://localhost:3000/api/subjects/";

export const getSubjects = () => {
  return axios
    .get(SUBJECT_API_URL)
    .then((res: AxiosResponse) => {
      return res.data;
    })
    .catch((e) => logError(e));
};

export const createSubject = (data: any) => {
  const userJson = localStorage.getItem("user");
  if (userJson) {
    return axios
      .post(SUBJECT_API_URL, { ...data }, { headers: authHeader() })
      .catch((e) => logError(e));
  } else return null;
};

export const editSubject = (data: any, title: string) => {
  const userJson = localStorage.getItem("user");
  if (userJson) {
    return axios
      .put(SUBJECT_API_URL + title, { ...data }, { headers: authHeader() })
      .catch((e) => logError(e));
  }
};

export const deleteSubject = (title: string) => {
  const userJson = localStorage.getItem("user");
  if (userJson) {
    return axios
      .delete(SUBJECT_API_URL + title, { headers: authHeader() })
      .catch((e) => logError(e));
  }
};
