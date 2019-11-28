import React from 'react';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import Logo from './Logo';

import '../sass/Navbar.scss';

export default class Example extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
		};
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		return (
			<div>
				<Navbar color="dark" dark expand={true} style={{ padding: 8 }}>
					<div className="container">
						<div className="logo">
							<Logo />
						</div>
						<Link className="navbar-brand" to="/">
							WoW Classic Armory{' '}
							<span className="badge badge-warning">BETA</span>
						</Link>
						<Nav className="mr-auto" navbar>
							<NavItem>
								<NavLink
									className="nav-link"
									href="https://github.com/davidmwhynot/classic-armory/issues/new?assignees=davidmwhynot&labels=feedback&template=feedback.md&title=Feedback+-+"
									target="_blank"
									rel="noopener noreferrer"
								>
									Feedback
								</NavLink>
							</NavItem>
						</Nav>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink
									href="https://www.curseforge.com/wow/addons/classic-armory"
									target="_blank"
									rel="noopener noreferrer"
								>
									Download the Addon
								</NavLink>
							</NavItem>
						</Nav>
					</div>
				</Navbar>
			</div>
		);
	}
}
