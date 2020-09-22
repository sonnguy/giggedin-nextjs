import api from "./index";
import { authHeader } from "../services/apiService";

const getCampaignCheckout = (id) => {
  return api.get(`/campaign/${id}`);
};
const clapUser = (id, params) => {
  const requestOptions = {
    headers: authHeader(),
  };
  return api.post(`/campaign/${id}/clap`, params, requestOptions);
};
const claimEvent = (id, source) => {
  const requestOptions = {
    headers: authHeader(),
  };
  return api.post(`/campaign/${id}/claim`, { source }, requestOptions);
};
const checkSharedApi = (id) => {
  const requestOptions = {
    headers: authHeader(),
  };
  return api.get(`/campaign/${id}/shared`, requestOptions);
};
const trackShare = (id) => {
  const requestOptions = {
    headers: authHeader(),
  };
  return api.post(`campaign/${id}/track`, {}, requestOptions);
};
const clapGuest = (id, params) => {
  return api.post(`/campaign/${id}/guestClap`, params);
};

export {
  getCampaignCheckout,
  clapGuest,
  clapUser,
  claimEvent,
  checkSharedApi,
  trackShare,
};
