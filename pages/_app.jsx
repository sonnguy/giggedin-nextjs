import "bootstrap/dist/css/bootstrap.min.css";
import '../style/index.scss';
import { config } from '@fortawesome/fontawesome-svg-core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { wrapper } from '../src/store';
import { getUserDateFromStrorage } from '../src/services/userService';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserData } from '../src/actions/userAction';

config.autoAddCss = false;

const WrappedApp = ({ Component, pageProps }) => {
	const dispatch = useDispatch();

	useEffect(() => {
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
