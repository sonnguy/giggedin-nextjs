import api from './index';

const getArtistApi = () => {
    return api.get('/artist/list');
};

export {
    getArtistApi,
}