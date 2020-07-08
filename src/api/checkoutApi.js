import api from './index';

const getCampainCheckout = (id) => {
  return api.get(`/campaign/${id}`);
};
const clapUser = (id, params) => {
  return api.post(`/campaign/${id}/clap`, params);
};
const clapGuest = (id, params) => {
  return api.post(`/campaign/${id}/guestClap`, params);
};

export { getCampainCheckout, clapGuest, clapUser };
