import { getArtistApi } from "../api/artistApi";

export const SELECT_ARTIST = 'SELECT_ARTIST';
export const GET_ARTIST_BEGIN = 'GET_ARTIST_BEGIN';
export const GET_ARTIST_SUCCESS = 'GET_ARTIST_SUCCESS';
export const GET_ARTIST_FAIL = 'GET_ARTIST_FAIL';

export const selectArtist = (artist) => {
    return {
        type: SELECT_ARTIST,
        payload: artist
    }
}

export const getArtistBegin = () => {
    return {
        type: GET_ARTIST_BEGIN,
    }
}

export const getArtistSuccess = (artist) => {
    return {
        type: GET_ARTIST_SUCCESS,
        payload: { artist }
    }
}

export const getArtistFail = (error) => {
    return {
        type: GET_ARTIST_FAIL,
        payload: { error }
    }
}

export const getArtist = (id) => {
    return (dispatch) => {
        dispatch(getArtistBegin());
        return getArtistApi(id)
            .then((res) => {
                const { data = {} } = res;
                if (data) {
                    const { artist } = data;
                    dispatch(getArtistSuccess(artist));
                } else {
                    dispatch(getArtistFail(null));
                }
                return res;
            })
            .catch((error) => {
                console.log('Error', error.message);
                dispatch(getArtistFail(error));
            });
    };
}
