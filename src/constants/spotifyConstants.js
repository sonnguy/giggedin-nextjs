const clientId = 'e199b8e4b7364644b5bd0f33fafd1cdb';
const redirectUri = process.env.REACT_APP_SPOTIFY_CALLBACK_URL;
const scopes = [
    'user-read-currently-playing',
    'user-read-playback-state',
    'user-read-email',
    'user-follow-modify',
    'user-follow-read',
];
const authEndpoint = 'https://accounts.spotify.com/authorize';

export {
    clientId,
    redirectUri,
    scopes,
    authEndpoint
}