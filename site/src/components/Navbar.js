import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

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
					color="primary"
					dark
					expand={true}
					style={{ maxHeight: 50, padding: 16 }}
				>
					<div className="container">
						<NavbarBrand href="/" style={{ fontSize: 20, marginRight: 16 }}>
							WoW Classic Armory{' '}
						</NavbarBrand>
						<span className="badge badge-warning mr-auto">BETA</span>
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
