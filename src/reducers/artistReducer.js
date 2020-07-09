import {
    SELECT_ARTIST,
    GET_ARTIST_BEGIN,
    GET_ARTIST_FAIL,
    GET_ARTIST_SUCCESS
} from "../actions/artistAction";

const initialState = {
    artistData: null,
    loading: false,
    error: null,
}

const artistReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_ARTIST: {
            return {
                ...state,
                artistData: action.payload.artist
            }
        }
        case GET_ARTIST_BEGIN: {
            return {
                ...state,
                loading: true
            }
        }
        case GET_ARTIST_SUCCESS: {
            return {
                ...state,
                artistData: action.payload.artist,
                loading: false
            }
        }
        case GET_ARTIST_FAIL: {
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
        }
        default:
            return state
    }
}




export default artistReducer;