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
