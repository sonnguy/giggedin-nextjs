
export const SELECT_ARTIST = 'SELECT_ARTIST';

export const selectArtist = (artist) => {
    return {
        type: SELECT_ARTIST,
        payload: artist
    }
}

