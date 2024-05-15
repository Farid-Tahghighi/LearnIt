import axios from "axios";
import authHeader from "../auth-header";

const CLASS_API_URL = "http://localhost:3000/api/classes/";

export const createClass = (data: any) => {
  return axios
    .post(CLASS_API_URL, { ...data }, { headers: authHeader() })
    .catch((e) => console.log(e.response.data));
};

export const getClasses = () => {
  return axios
    .get(CLASS_API_URL)
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e.response.data));
};

export const getClass = (_id: string) => {
  return axios
    .get(CLASS_API_URL + _id)
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e.response.data));
};

export const getClassesByCat = (category: string) => {
  if (category) {
    return axios
      .get(`${CLASS_API_URL}categories/${category}`)
      .then((res) => {
        return res.data;
      })
      .catch((e) => console.log(e.response.data));
  } else return null;
};

export const getCategories = () => {
  return axios
    .get("http://localhost:3000/statics/categories")
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e.response.data));
};

export const enroll = (classId: string, userId: string) => {
  if (classId && userId) {
    return axios
      .post(
        `${CLASS_API_URL}participate`,
        {
          classId: classId,
          userId: userId,
        },
        { headers: authHeader() }
      )
      .catch((e) => e.response.data);
  }
};

export const editClass = (classId: string, data: object) => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    return axios
      .put(CLASS_API_URL + classId, { ...data }, { headers: authHeader() })
      .catch((e) => console.log(e.response.data + e.response.status));
  }
};

export const deleteClass = (classId: string) => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    return axios
      .delete(CLASS_API_URL + classId, { headers: authHeader() })
      .catch((e) => console.log(e.response.data + e.response.status));
  }
};
