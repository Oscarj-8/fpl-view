import axios from "axios";
import { Team, Player, Pick, LivePlayerData } from "./types";

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const baseUrl = "https://fantasy.premierleague.com/api";

const axiosInstance = axios.create({
  baseURL: proxyUrl + baseUrl,
  headers: {
    Origin: "https://fantasy.premierleague.com",
  },
});

export const fetchTeamData = async (teamId: string): Promise<Team> => {
  const response = await axiosInstance.get(`/entry/${teamId}/`);
  return response.data;
};

export const fetchPlayers = async (): Promise<Player[]> => {
  const response = await axiosInstance.get("/bootstrap-static/");
  return response.data.elements;
};

export const fetchPicks = async (
  teamId: string,
  eventId: number
): Promise<Pick[]> => {
  const response = await axiosInstance.get(
    `/entry/${teamId}/event/${eventId}/picks/`
  );
  return response.data.picks;
};

export const fetchLiveData = async (
  eventId: number
): Promise<LivePlayerData[]> => {
  const response = await axiosInstance.get(`/event/${eventId}/live/`);
  return response.data.elements;
};
