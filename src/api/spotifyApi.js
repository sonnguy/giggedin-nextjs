import api from "./index";
import { authHeader } from "../services/apiService";

const authEndpoint = "https://accounts.spotify.com/api/token";

const auth = (code) => {
  return api.post("/spotify/login", { code, redirect_url: process.env.REACT_APP_SPOTIFY_CALLBACK_URL });
};

const connectSpotify = (code) => {
  const requestOptions = {
    headers: authHeader(),
  };

  return api.post("/spotify/connect", { code }, requestOptions);
};

const getSpotifyToken = (data) => {
  return api.post(authEndpoint, data);
};

export { auth, connectSpotify, getSpotifyToken };
