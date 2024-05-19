import axios, { AxiosResponse } from "axios";
import authHeader from "../auth-header";
import { logError } from "../../utils/ErrorHandler";

const SESSION_API_URL = "http://localhost:3000/api/sessions/";

export const getSessions = (id: string) => {
  return axios
    .get(SESSION_API_URL + id)
    .then((res: AxiosResponse) => {
      if (res.data) return res.data;
    })
    .catch((e) => logError(e));
};

export const createSession = (data: any) => {
  return axios
    .post(SESSION_API_URL, { ...data }, { headers: authHeader() })
    .catch((e) => logError(e));
};

export const editPresent = (
  classId: string,
  present: string[],
  sessionId: string
) => {
  return axios
    .post(
      SESSION_API_URL + classId,
      { present, sessionId },
      { headers: authHeader() }
    )
    .catch((e) => logError(e));
};
