import {
    GET_CAMPAIGNS_BEGIN,
    GET_CAMPAIGNS_SUCCESS,
    GET_CAMPAIGNS_FAIL,
    GET_CAMPAIGN_BEGIN,
    GET_CAMPAIGN_SUCCESS,
    GET_CAMPAIGN_FAIL,
    GET_CAMPAIGN_SPOT_PAYMENTED_BEGIN,
    GET_CAMPAIGN_SPOT_PAYMENTED_SUCCESS,
    GET_CAMPAIGN_SPOT_PAYMENTED_FAIL
} from "../actions/campaignAction";

const initialState = {
    campaigns: [],
    campaign: {},
    loading: false,
    error: null,
    spot_paymented: 0
}

const campaignReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CAMPAIGNS_BEGIN: {
            return {
                ...state,
                loading: true
            }
        }
        case GET_CAMPAIGNS_SUCCESS: {
            return {
                ...state,
                campaigns: action.payload.campaigns,
                loading: false
            }
        }
        case GET_CAMPAIGNS_FAIL: {
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
        }
        case GET_CAMPAIGN_BEGIN: {
            return {
                ...state,
                loading: true
            }
        }
        case GET_CAMPAIGN_SUCCESS: {
            return {
                ...state,
                campaign: action.payload.campaign,
                loading: false
            }
        }
        case GET_CAMPAIGN_FAIL: {
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
        }
        case GET_CAMPAIGN_SPOT_PAYMENTED_BEGIN: {
            return {
                ...state,
            }
        }
        case GET_CAMPAIGN_SPOT_PAYMENTED_SUCCESS: {
            return {
                ...state,
                spot_paymented: action.payload.spot,
            }
        }
        case GET_CAMPAIGN_SPOT_PAYMENTED_FAIL: {
            return {
                ...state,
                error: action.payload.error,
            }
        }
        default:
            return state
    }
}

export default campaignReducer;