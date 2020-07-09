import React, { useState, useEffect } from 'react';
import { Container, Button, Row, InputGroup, FormControl } from 'react-bootstrap';
import './style.scss';
import { getImageUrl } from '../../services/imageService';
import FaIcon from '../../components/fontAwesomeIcon';
import 'react-credit-cards/lib/styles.scss';
import { toast } from 'react-toastify';
import Mixpanel from '../../tracking/mixpanel';
import GA from '../../tracking/ga';
import { withRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getArtist } from '../../actions/artistAction';

const Confirmation = ({ router }) => {

	const artist = useSelector((state) => state.artist.artistData);
	const dispatch = useDispatch();
	const [hostName, setHotName] = useState('');

	const getArtistFn = (id) => dispatch(getArtist(id));

	useEffect(() => {
		Mixpanel.pageView('View_Exp_ConfirmationPage');
		GA.pageView();
		setHotName(window.location.origin);
		const { id } = router.query;
		getArtistFn(id);
	}, []);

	const getCampaigURL = () => {
		const url = `${hostName}/experience/${artist.handle}/${artist.id}`;
		return url;
	};

	const copyUrl = () => {
		const url = `${hostName}/experience/${artist.handle}/${artist.id}`;
		let dummy = document.createElement('input'),
			text = url;
		document.body.appendChild(dummy);
		dummy.value = text;
		dummy.select();
		document.execCommand('copy');
		document.body.removeChild(dummy);
		toast.success('URL Copied', {
			containerId: 'Toast'
		});
	};

	return (
		artist &&
		<Container>
			<div className="confirmation-page py-3">
				<div className="cconfirmation-page__artist-info d-flex flex-column align-items-center justify-content-center text-center">
					<div className="confirmation-page__artist-info__text px-3 mt-4">
						<h5 className="mb-1">Congrats on securing your spot for</h5>
						<h2 className="mb-2 text-uppercase">{artist.name}</h2>
					</div>
					<div
						style={{ backgroundImage: `url(${getImageUrl(artist.profile_pic)}` }}
						className="confirmation-page__artist-info__img mt-2 background-image-responsive"
					/>
					<h5 className="font-weight-bold mt-3">Share with your friend:</h5>
					<div className="py-3 confirmation-social">
						<Row>
							<InputGroup className="mb-3">
								<FormControl
									aria-describedby="basic-addon2 "
									disabled={true}
									value={getCampaigURL()}
								/>
								<InputGroup.Append>
									<Button className="bg-transparent border-transparent" onClick={() => { copyUrl() }}>
										<FaIcon name="faCopy" size={'1x'} color={'#F77737'} />
									</Button>
								</InputGroup.Append>
							</InputGroup>
						</Row>
					</div>
					<h5 className="font-weight-bold">
						Keep showing {artist.name} your support by following on:
						</h5>
					<div className="pt-3 confirmation-social">
						<a href={artist.facebook} target="_blank" className="social-item" rel="noopener noreferrer">
							<FaIcon name="faFacebook" size={'2x'} color={'#39579A'} />
						</a>
						<a href={artist.twitter} target="_blank" className="social-item" rel="noopener noreferrer">
							<FaIcon name="faTwitter" size={'2x'} color={'#00ABF0'} />
						</a>
						<a
							href={artist.instagram}
							target="_blank"
							className="social-item"
							rel="noopener noreferrer"
						>
							<FaIcon name="faInstagram" size={'2x'} color={'#F77737'} />
						</a>
					</div>
				</div>
			</div>
		</Container>
	);
}


export default withRouter(Confirmation);
