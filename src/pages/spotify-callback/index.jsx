import React from 'react';
import { withRouter } from 'next/router';

class SpotifyCallback extends React.Component {
  componentDidMount() {
    this.code = decodeURI(window.location.search)
      .replace('?', '')
      .split('&')[0]
      .split('=')[1];
    if (this.code) {
      localStorage.setItem('SPOTIFY_CODE',this.code);
    } else {
      localStorage.removeItem('SPOTIFY_CODE');
    }
    window.close();
  }
  render() {
    return <div></div>;
  }
}

export default withRouter(SpotifyCallback);
