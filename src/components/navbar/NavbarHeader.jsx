import React from 'react';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import logo from '../../../public/images/logo.png';
import Link from 'next/link';
import './style.scss';
import FaIcon from '../fontAwesomeIcon';
import { useSelector, useDispatch } from 'react-redux';
import { removeUserData } from '../../actions/userAction';

const NavbarHeader = () => {
	const user = useSelector((state) => state.user.user);
	const dispatch = useDispatch();
	const signOut = () => dispatch(removeUserData());

	return (
		<Navbar className="header-navbar py-4" expand="lg" variant="dark">
			<Container>
				<Link href="/">
					<a className="navbar-brand">
						<img src={logo} alt="" />
					</a>
				</Link>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<div className="d-flex justify-content-between w-100">
						<div className="d-flex flex-row">
							{/* <Nav className="mr-3">
                                <Link className="nav-link" to="/">
                                    <span className="mr-2">Explore</span>
                                    <FaIcon name="faChevronDown" size={'sm'} color={'#fff'} />
                                </Link>
                            </Nav>
                            <Nav className="mr-3">
                                <Link className="nav-link" to="/experiences">
                                    <span className="mr-2">Experiences</span>
                                    <FaIcon name="faSearch" size={'sm'} color={'#fff'} />
                                </Link>
                            </Nav> */}
						</div>
						<div className="d-flex flex-row">
							<Nav className="">
								{!user && (
									<Link href="/login">
										<a className="nav-link" >
											<span className="mr-2">Sign In</span>
											<FaIcon name="faUser" size={'1x'} color={'#fff'} />
										</a>
									</Link>
								)}
								{user && (
									<div className="user-profile">
										<NavDropdown
											title={
												<div className="d-inline">
													{user.first_name} {user.last_name}
												</div>
											}
										>
											<NavDropdown.Item onClick={signOut} className="user-profile-item">
												{'Sign out'}
											</NavDropdown.Item>
										</NavDropdown>
									</div>
								)}
							</Nav>
						</div>
					</div>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavbarHeader;
