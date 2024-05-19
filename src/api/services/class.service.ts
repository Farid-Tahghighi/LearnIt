import axios, { AxiosResponse } from "axios";
import authHeader from "../auth-header";
import { logError } from "../../utils/ErrorHandler";

const CLASS_API_URL = "http://localhost:3000/api/classes/";

export const createClass = (data: any) => {
  const userJson = localStorage.getItem("user");
  if (userJson) {
    return axios
      .post(CLASS_API_URL, { ...data }, { headers: authHeader() })
      .catch((e) => logError(e));
  }
};

export const getClasses = () => {
  return axios
    .get(CLASS_API_URL)
    .then((res: AxiosResponse) => {
      return res.data;
    })
    .catch((e) => logError(e));
};

export const getClass = (_id: string) => {
  return axios
    .get(CLASS_API_URL + _id)
    .then((res: AxiosResponse) => {
      return res.data;
    })
    .catch((e) => logError(e));
};

export const getClassesByCat = (category: string) => {
  if (category) {
    return axios
      .get(`${CLASS_API_URL}categories/${category}`)
      .then((res: AxiosResponse) => {
        return res.data;
      })
      .catch((e) => logError(e));
  } else return null;
};

export const getCategories = () => {
  return axios
    .get("http://localhost:3000/statics/categories")
    .then((res: AxiosResponse) => {
      return res.data;
    })
    .catch((e) => logError(e));
};

export const enroll = (classId: string, userId: string) => {
  const userJson = localStorage.getItem("user");
  if (classId && userId && userJson) {
    return axios
      .post(
        `${CLASS_API_URL}participate`,
        {
          classId: classId,
          userId: userId,
        },
        { headers: authHeader() }
      )
      .catch((e) => logError(e));
  }
};

export const editClass = (classId: string, data: object) => {
  const userJson = localStorage.getItem("user");
  if (userJson) {
    return axios
      .put(CLASS_API_URL + classId, { ...data }, { headers: authHeader() })
      .catch((e) => logError(e));
  }
};

export const deleteClass = (classId: string) => {
  const userJson = localStorage.getItem("user");
  if (userJson) {
    return axios
      .delete(CLASS_API_URL + classId, { headers: authHeader() })
      .catch((e) => logError(e));
  }
};
