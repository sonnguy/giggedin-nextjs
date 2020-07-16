import Head from 'next/head';
import NavbarHeader from './navbar/NavbarHeader';
import Banner from './banner/Banner';
import Footer from './footer';
import bgImage from '../../public/images/home-page-bg.jpg';
import Icon from '../../public/favicon.ico';

const LayoutError = ({ header, children }) => {
	const defaultImage = process.env.REACT_APP_HOST_URL + bgImage;
	const {
		title,
		description,
		keywords,
		siteName,
		url,
		image
	} = header || {
		title: "GiggedIn Experiences",
		description: "GiggedIn Experiences",
		keywords: "GiggedIn Experiences",
		siteName: 'GiggedIn',
		url: process.env.REACT_APP_HOST_URL,
		image: defaultImage,
	};

	return (
		<div>
			<Head>
				<title>{title || 'GiggedIn Experiences'}</title>
				<meta charSet="utf-8" />
				<meta httpEquiv="Content-type" content="text/html;charset=UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
				<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1" />
				<link rel="shortcut icon" href={Icon} />
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
				<meta name="HandheldFriendly" content="True" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="black" />
				<meta name="apple-mobile-web-app-title" content="giggedin.com" />
				<meta property="og:type" content="website" />
				<meta property="og:site_name" content={siteName} />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				<meta property="og:url" content={url} />
				<meta property="og:image" content={image || defaultImage} />
				<meta name="twitter:title" content={title} />
				<meta name="twitter:description" content={description} />
				<meta name="twitter:url" content={url} />
				<meta name="twitter:image" content={image || defaultImage} />

				<link rel="canonical" href={url} />
			</Head>
			<header>
				<div className="main-header background-image-responsive" style={{
					backgroundImage: `url('${bgImage}')`
				}}>
					<div className="main-header-overlay" />
					<NavbarHeader />
				</div>
			</header>
			<div className="main-body">
				{children}
			</div>
			<Footer />
		</div>
	);
}


export default LayoutError;