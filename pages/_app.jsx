import '../style/index.css';
import '../style/index.scss';
import { config } from '@fortawesome/fontawesome-svg-core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import bgImage from '../public/images/pngwing-com.png';
import { wrapper } from '../src/store';
import ReactGA from 'react-ga';
// import { hotjar } from 'react-hotjar';

config.autoAddCss = false;

import Mixpanel from 'mixpanel-browser';

const MIXPANEL_ID = process.env.TREACT_APP_TRACKING_ENV === 'production' ? '6dd7ee06cf30e0bd746184fcbc4c6337' : '021202afd67fb4792b7e8ad586898cea';

Mixpanel.init(MIXPANEL_ID, { debug: process.env.TREACT_APP_TRACKING_ENV !== 'production', });

ReactGA.initialize('UA-31833111-7', {
	debug: process.env.TREACT_APP_TRACKING_ENV !== 'production',
	gaOptions: {
		cookieDomain: 'auto',
		allowLinker: true,
	},
});

// hotjar.initialize(626795, 6);

const WrappedApp = ({ Component, pageProps }) => {
	return <>
		<style JSX global="true">
			{`
				.pngwing-line {
					background-image: url('` + bgImage + `')
				}
      		`}
		</style>
		<>
			<Component {...pageProps} />
			<ToastContainer toastClassName="toast-container" enableMultiContainer containerId={'Toast'} position={toast.POSITION.TOP_RIGHT} />
		</>
	</>
};

export default wrapper.withRedux(WrappedApp);