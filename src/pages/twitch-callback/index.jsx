import React from 'react';
import { withRouter } from 'next/router';

class TwitchCallback extends React.Component {
  componentDidMount() {
    this.code = decodeURI(window.location.search)
      .replace('?', '')
      .split('&')[0]
      .split('=')[1];
    if (this.code) {
      localStorage.setItem('TWITCH_CODE', this.code);
    } else {
      localStorage.removeItem('TWITCH_CODE');
    }
    // window.close();
  }
  render() {
    return <div></div>;
  }
}

export default withRouter(TwitchCallback);
