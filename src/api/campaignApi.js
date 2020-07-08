import api from './index';

const getCampaignSpotPaymentedApi = (campaignId) => {
    return api.get(`/campaign/getspotpaymented?campaignId=${campaignId}`);
};

const getCampaignsApi = () => {
    return api.get('/campaign/list');
};

const getCampaignApi = (id) => {
    return api.get(`/campaign/${id}`);
};

export {
    getCampaignSpotPaymentedApi,
    getCampaignsApi,
    getCampaignApi,
}