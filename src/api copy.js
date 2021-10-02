import axios from "axios";

const api = axios.create({
  baseURL: "https://api.football-data.org/v2",
});

const payload = {
  headers: {
    "X-Auth-Token": process.env.REACT_APP_API_KEY,
    "content-type": "application/json",
  },
};

export const getTeams = () => {
  return api.get(`/teams`, payload);
};
export const getTeamById = (id) => {
  return api.get(`/teams/${id}`, payload);
};

const apis = {
  getTeams,
  getTeamById,
};

export default apis;
