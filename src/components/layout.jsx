import Head from 'next/head';
import NavbarHeader from '../components/navbar/NavbarHeader';
import Banner from '../components/banner/Banner';
import Footer from '../components/footer';
import bgImage from '../../public/images/home-page-bg.jpg';
import Icon from '../../public/favicon.ico';

const Layout = ({ header, children }) => {
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
		url: `https://giggedin-nextjs.herokuapp.com/`,
		image: 'https://giggedin-nextjs.herokuapp.com/static/media/home-page-bg.ced799a5.jpg',
	};

	return (
		<div>
			<style JSX>
				{`
					.main-header {
						background-image: url('` + bgImage + `')
					}
				`}
			</style>
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
				<meta property="og:image" content={image} />
				<meta name="twitter:title" content={title} />
				<meta name="twitter:description" content={description} />
				<meta name="twitter:url" content={url} />
				<meta name="twitter:image" content={image} />

				<link rel="canonical" href={url} />
			</Head>
			<header>
				<div className="main-header">
					<div className="main-header-overlay" />
					<NavbarHeader />
					<Banner />
				</div>
			</header>
			<div className="main-body">
				{children}
			</div>
			<Footer />
		</div>
	);
}


export default Layout;