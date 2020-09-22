import api from './index';
import { authHeader } from '../services/apiService';

const getArtistApi = (id) => {
  return api.get(`/artist/${id}`);
};

const getFollowArtistApi = (id) => {
  const requestOptions = {
    headers: authHeader(),
  };
  return api.get(`spotify/following/${id}`, requestOptions);
};

const spotifyFollowingApi = (id) => {
  const requestOptions = {
    headers: authHeader(),
  };
  return api.post(`/spotify/doFollow/${id}`, {}, requestOptions);
};

export { getArtistApi, getFollowArtistApi, spotifyFollowingApi };
