import Mixpanel from 'mixpanel-browser';

const track = (name, data) => Mixpanel.track(name, data);

const pageView = (page) => track(page, { url: window.location.pathname + window.location.search });

export default { pageView, track };

