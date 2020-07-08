import Mixpanel from 'mixpanel-browser';

const track = (name, data) => Mixpanel.track(name, data);

const pageView = () => track('PageView', { url: window.location.pathname + window.location.search });


export default { pageView, track };
