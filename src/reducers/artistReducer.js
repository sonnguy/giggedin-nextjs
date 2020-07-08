import {
    SELECT_ARTIST,
} from "../actions/artistAction";

const initialState = {
    artistData: null,
}

const artistReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_ARTIST: {
            return {
                ...state,
                artistData: action.payload.artist
            }
        }
        default:
            return state
    }
}




export default artistReducer;