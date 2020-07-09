import api from './index';

const getArtistsApi = () => {
    return api.get('/artist/list');
};

const getArtistApi = (id) => {
    return api.get(`/artist/${id}`);
};

export {
    getArtistApi,
}