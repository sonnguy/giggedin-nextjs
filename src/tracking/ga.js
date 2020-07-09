import ReactGA from 'react-ga';

const set = id => ReactGA.set({ id });

const pageView = () => {
    // if (typeof window !== 'undefined') {
    //     ReactGA.set({ page: window.location.pathname });
    //     ReactGA.pageview(window.location.pathname + window.location.search);
    // }
};

export default { set, pageView };
