import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

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
				<Navbar
					color="dark"
					dark
					expand={true}
					style={{ maxHeight: 50, padding: 16 }}
				>
					<div className="container">
						<NavbarBrand href="/" style={{}}>
							WoW Classic Armory{' '}
							<span className="badge badge-warning">BETA</span>
						</NavbarBrand>
						<Nav className="mr-auto" navbar>
							<NavItem>
								<NavLink
									href="https://github.com/davidmwhynot/classic-armory/issues/new?assignees=davidmwhynot&labels=feedback&template=feedback.md&title=Feedback+-+"
									target="_blank"
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
