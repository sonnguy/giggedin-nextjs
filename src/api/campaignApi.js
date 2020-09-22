import api from "./index";
import { authHeader } from "../services/apiService";

const getCampaignSpotPaymentedApi = (campaignId) => {
  return api.get(`/campaign/getspotpaymented?campaignId=${campaignId}`);
};

const getCampaignsApi = () => {
  return api.get("/campaign/list");
};

const getCampaignApi = (id) => {
  return api.get(`/campaign/${id}`);
};

const checkCampaignPaidApi = (id) => {
  const requestOptions = {
    headers: authHeader(),
  };
  return api.get(`/campaign/${id}/paid`, requestOptions);
};

const answerQuestionApi = (id, answer) => {
  const requestOptions = {
    headers: authHeader(),
  };
  return api.post(`/campaign/${id}/doQuiz`, { answer }, requestOptions);
};

const getAnswerQuestionApi = (id) => {
  const requestOptions = {
    headers: authHeader(),
  };
  return api.get(`/campaign/${id}/checkQuiz`, requestOptions);
};

export {
  getCampaignSpotPaymentedApi,
  getCampaignsApi,
  getCampaignApi,
  checkCampaignPaidApi,
  answerQuestionApi,
  getAnswerQuestionApi
};
