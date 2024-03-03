import axios from "axios";
import authHeader from "../auth-header";

const CLASS_API_URL =
  "http://localhost:3000/api/classes/";

export const createClass = (
  subjectTitle: string,
  participantIds: string[],
  presenterId: string,
  startDate: Date,
  finishDate: Date,
  location: string,
  category: string,
  description: string
) => {
  return axios
    .post(
      CLASS_API_URL,
      {
        subjectTitle,
        participantIds,
        presenterId,
        startDate,
        finishDate,
        location,
        category,
        description,
      },
      { headers: authHeader() }
    )
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