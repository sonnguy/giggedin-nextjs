import "bootstrap/dist/css/bootstrap.min.css";
import '../style/index.scss';
import { config } from '@fortawesome/fontawesome-svg-core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { wrapper } from '../src/store';
import { getUserDateFromStrorage } from '../src/services/userService';
import ReactGA from 'react-ga';
import Mixpanel from 'mixpanel-browser';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserData } from '../src/actions/userAction';
import { hotjar } from 'react-hotjar';

config.autoAddCss = false;

const MIXPANEL_ID = process.env.REACT_APP_TREACT_APP_TRACKING_ENV === 'production' ? '6dd7ee06cf30e0bd746184fcbc4c6337' : '021202afd67fb4792b7e8ad586898cea';

Mixpanel.init(MIXPANEL_ID, { debug: process.env.REACT_APP_TREACT_APP_TRACKING_ENV !== 'production', });

ReactGA.initialize('UA-31833111-7', {
	debug: process.env.REACT_APP_TREACT_APP_TRACKING_ENV !== 'production',
	gaOptions: {
		cookieDomain: 'auto',
		allowLinker: true,
	},
});


const WrappedApp = ({ Component, pageProps }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		const ReactPixel = require('react-facebook-pixel').default;
		ReactPixel.init('1698442107043541', {}, {
			autoConfig: true,
			debug: false,
		});
		hotjar.initialize(626795, 6);
		const user = getUserDateFromStrorage();
		if (user) {
			dispatch(setUserData(user));
		}
	}, [])

	return <>
		<>
			<Component {...pageProps} />
			<ToastContainer toastClassName="toast-container" enableMultiContainer containerId={'Toast'} position={toast.POSITION.TOP_CENTER} />
		</>
	</>
};

export default wrapper.withRedux(WrappedApp);
