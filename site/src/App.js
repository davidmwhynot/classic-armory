import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom';

import { connect } from 'react-redux';

import $ from 'jquery';

import { pageLoaded } from './actions/pageActions';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Character from './components/Character';
import Error from './components/Error';
import Admin from './components/Admin';
import BugLink from './components/BugLink';

class App extends Component {
	state = {
		loading: false,
		error: null
	};

	componentWillMount = () => {
		this.props.pageLoaded(this.props.location.pathname);
	};

	componentDidMount = async () => {
		const ctrlKey = 17;
		const vKey = 86;

		let ctrlDown = false;

		$(document)
			.keydown(e => {
				if (e.keyCode === ctrlKey) ctrlDown = true;
			})
			.keyup(e => {
				if (e.keyCode === ctrlKey) ctrlDown = false;
			});

		$('.capture-paste').keydown(e => {
			if (ctrlDown && e.keyCode === vKey) {
				$('#area').css('display', 'block');
				$('#area').val('');
				$('#area').focus();
			}
		});

		$('.capture-paste').keyup(async e => {
			if (ctrlDown && e.keyCode === vKey) {
				this.setState({ loading: true, error: null });
				const res = await (await fetch('/.netlify/functions/new', {
					method: 'POST',
					body: $('#area').val(),
					headers: { 'Content-Type': 'application/json' }
				})).json();

				console.log('res', res);

				if (!res.error) {
					// console.log(res.items.Feet);
					// console.log(JSON.parse('{' + res.items.Feet.json + '}'));
					// console.log(JSON.parse('{' + res.items.Feet.jsonEquip + '}'));

					this.setState({ loading: false });
					this.props.history.push('/' + res.url);
				} else {
					this.setState({
						loading: false,
						error: 'Something went wrong. Please try again.'
					});
				}

				// if (res.error) {
				// 	this.setState({ error: res.error, loading: false });
				// } else {
				// 	this.setState({
				// 		success: 'Your submission has been recorded. Thanks for voting!',
				// 		loading: false
				// 	});
				// }

				$('#area').val('');
				$('#area').css('display', 'none');
			}
		});
	};

	render() {
		let appBody = null;

		if (this.state.loading) {
			appBody = (
				<div className="container">
					<h1>Loading</h1>
				</div>
			);
		} else {
			appBody = (
				<div className="container-fluid mt-3">
					<Route exact path="/" component={Home} />
					<Route exact path="/admin/get" component={Admin} />
					{/* <Route path="/:id" component={Character} /> */}
					<Route
						exact
						path="/:id"
						render={props => (
							<Character
								{...props}
								data={
									this.state === null
										? null
										: this.state.data
										? this.state.data
										: null
								}
							/>
						)}
					/>
					<BugLink />
				</div>
			);
		}

		return (
			<div className="App">
				<Navbar />
				{this.state.error !== null ? (
					<Error error={this.state.error} />
				) : (
					''
				)}
				{appBody}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		...state
	};
};

export default connect(
	mapStateToProps,
	{ pageLoaded }
)(withRouter(App));
