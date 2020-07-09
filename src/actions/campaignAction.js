import { getCampaignsApi, getCampaignApi, getCampaignSpotPaymentedApi } from "../api/campaignApi";

export const GET_CAMPAIGNS_BEGIN = 'GET_CAMPAIGNS_BEGIN';
export const GET_CAMPAIGNS_SUCCESS = 'GET_CAMPAIGNS_SUCCESS';
export const GET_CAMPAIGNS_FAIL = 'GET_CAMPAIGNS_FAIL';
export const GET_CAMPAIGN_BEGIN = 'GET_CAMPAIGN_BEGIN';
export const GET_CAMPAIGN_SUCCESS = 'GET_CAMPAIGN_SUCCESS';
export const GET_CAMPAIGN_FAIL = 'GET_CAMPAIGN_FAIL';
export const GET_CAMPAIGN_SPOT_PAYMENTED_BEGIN = 'GET_CAMPAIGN_SPOT_PAYMENTED_BEGIN';
export const GET_CAMPAIGN_SPOT_PAYMENTED_SUCCESS = 'GET_CAMPAIGN_SPOT_PAYMENTED_SUCCESS';
export const GET_CAMPAIGN_SPOT_PAYMENTED_FAIL = 'GET_CAMPAIGN_SPOT_PAYMENTED_FAIL';

export const getCampaignsBegin = () => {
    return {
        type: GET_CAMPAIGNS_BEGIN,
    }
}

export const getCampaignsSuccess = (campaigns) => {
    return {
        type: GET_CAMPAIGNS_SUCCESS,
        payload: { campaigns }
    }
}

export const getCampaignsFail = (error) => {
    return {
        type: GET_CAMPAIGNS_FAIL,
        payload: { error }
    }
}

export const getCampaignBegin = () => {
    return {
        type: GET_CAMPAIGN_BEGIN,
    }
}

export const getCampaignSuccess = (campaign) => {
    return {
        type: GET_CAMPAIGN_SUCCESS,
        payload: { campaign }
    }
}

export const getCampaignFail = (error) => {
    return {
        type: GET_CAMPAIGN_FAIL,
        payload: { error }
    }
}

export const getCampaignSpotPaymentedBegin = () => {
    return {
        type: GET_CAMPAIGN_SPOT_PAYMENTED_BEGIN,
    }
}

export const getCampaignSpotPaymentedSuccess = (spot) => {
    return {
        type: GET_CAMPAIGN_SPOT_PAYMENTED_SUCCESS,
        payload: { spot }
    }
}

export const getCampaignSpotPaymentedFail = (error) => {
    return {
        type: GET_CAMPAIGN_SPOT_PAYMENTED_FAIL,
        payload: { error }
    }
}

export const getCampaigns = () => {
    return (dispatch) => {
        dispatch(getCampaignsBegin());
        return getCampaignsApi()
            .then((res) => {
                const { data = {} } = res;
                if (data && data.success) {
                    const { campaigns } = data;
                    dispatch(getCampaignsSuccess(campaigns));
                } else {
                    dispatch(getCampaignsFail(null));
                }
                return res;
            })
            .catch((error) => {
                console.log('Error', error.message);
                dispatch(getCampaignsFail(error));
            });
    };
}

export const getCampaign = (id) => {
    return (dispatch) => {
        dispatch(getCampaignBegin());
        return getCampaignApi(id)
            .then((res) => {
                const { data = {} } = res;
                if (data && data.success) {
                    const { campaign } = data;
                    dispatch(getCampaignSuccess(campaign));
                } else {
                    dispatch(getCampaignFail(null));
                }
                return res;
            })
            .catch((error) => {
                console.log('Error', error.message);
                dispatch(getCampaignFail(error));
            });
    };
}

export const getCampaignSpotPaymented = (campaignId) => {
    return (dispatch) => {
        dispatch(getCampaignSpotPaymentedBegin());
        return getCampaignSpotPaymentedApi(campaignId)
            .then((res) => {
                const { data = {} } = res;
                if (data && data.success) {
                    const { spot } = data;
                    dispatch(getCampaignSpotPaymentedSuccess(spot));
                } else {
                    dispatch(getCampaignSpotPaymentedFail(null));
                }
                return res;
            })
            .catch((error) => {
                console.log('Error', error.message);
                dispatch(getCampaignSpotPaymentedFail(error));
            });
    };
}
