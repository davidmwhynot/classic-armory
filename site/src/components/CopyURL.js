import React, { Component } from 'react';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import '../sass/CopyURL.scss';

class CopyURL extends Component {
	state = {
		value: '',
		clicked: false
	};

	constructor({ url }) {
		super();
		this.state.value = url;
	}

	handleClick = e => {
		e.preventDefault();
		$('#urlInput').select();
		document.execCommand('copy');

		this.setState({ clicked: true });
		setTimeout(() => {
			this.setState({ clicked: false });
		}, 5000);
	};

	render() {
		return (
			<div>
				<div
					className="input-group input-group-md input-group-url-copy"
					onClick={this.handleClick}
				>
					<input
						type="text"
						className="form-control"
						value={this.state.value}
						id="urlInput"
						readOnly
					/>
					<div className="input-group-append">
						<ReactCSSTransitionGroup
							transitionEnterTimeout={0}
							transitionLeaveTimeout={0}
							transitionName="copied"
						>
							{this.state.clicked ? (
								<div className="alert alert-success alert-copied">
									Copied!
								</div>
							) : (
								''
							)}
						</ReactCSSTransitionGroup>
						<button className="btn btn-primary">Copy Link</button>
					</div>
				</div>
			</div>
		);
	}
}

export default CopyURL;
