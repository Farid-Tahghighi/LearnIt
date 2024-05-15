import axios from "axios";
import authHeader from "../auth-header";

const SESSION_API_URL = "http://localhost:3000/api/sessions/";

export const getSessions = (id: string) => {
  return axios
    .get(SESSION_API_URL + id)
    .then((res) => {
      if (res.data) return res.data;
    })
    .catch((error) => error.response.data);
};

export const createSession = (
  classId: string,
  duration: number,
  date: string
) => {
  return axios
    .post(
      SESSION_API_URL,
      { classId: classId, duration: duration, date: date, present: [] },
      { headers: authHeader() }
    )
    .catch((e) => e.response.data);
};

export const editPresent = (classId: string, present: string[], sessionId: string) => {
  return axios
    .post(
      SESSION_API_URL + classId,
      { present, sessionId },
      { headers: authHeader() }
    )
    .catch((e) => console.log(e.response.data + " Code: " + e.response.status));
};
