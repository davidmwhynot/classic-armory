import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom';
import * as Sentry from '@sentry/browser';
import { connect } from 'react-redux';
import $ from 'jquery';

import { loadPage } from './actions/pageActions';
import { createCharacter } from './actions/characterActions';

import Navbar from './components/Navbar';
import Home from './components/Home';
import CharacterSheet from './views/CharacterSheet';
import Error from './components/Error';
// import Admin from './components/Admin';
import BugLink from './components/BugLink';
import Loading from './components/Loading';

import './sass/index.scss';

class App extends Component {
	state = {
		loading: false,
		error: null
	};

	componentWillMount = () => {
		this.props.loadPage(this.props.location.pathname);
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
				this.setState({ loading: false, error: null });
				console.log('here');

				try {
					const pastedData = JSON.parse($('#area').val());

					this.props.createCharacter(pastedData);
				} catch (err) {
					Sentry.captureException(err);

					this.setState({
						loading: false,
						error: 'Something went wrong. Please try again.'
					});
				}

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
					<Loading />
				</div>
			);
		} else {
			appBody = (
				<div className="container-fluid mt-3">
					<Route exact path="/" component={Home} />
					{/* <Route exact path="/admin/get" component={Admin} /> */}
					<Route exact path="/:id" component={CharacterSheet} />
					{/* <Route
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
                    /> */}
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

export default connect(mapStateToProps, { loadPage, createCharacter })(
	withRouter(App)
);
