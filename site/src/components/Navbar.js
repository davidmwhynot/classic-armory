import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

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
							WoW Classic Armory
						</NavbarBrand>
					</div>
				</Navbar>
			</div>
		);
	}
}
