/* eslint react/jsx-pascal-case: "off", no-unreachable: "off" */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Sentry from '@sentry/browser';

import { loadCharacter } from '../../actions/characterActions';

import Error from '../../components/Error';
import Loading from '../../components/Loading';

import V0_1_0 from './v0.1.0';
import V1_0_2 from './v1.0.2';

class CharacterSheet extends Component {
	state = {
		error: null
	};

	componentDidMount = () => {
		this.props.loadCharacter(this.props.router.location.pathname.slice(1));
	};

	componentDidUpdate = async prevProps => {
		if (prevProps.router.location.pathname) {
			if (
				!this.props.router.location.pathname
					.slice(1)
					.match(prevProps.router.location.pathname.slice(1))
			) {
				prevProps.loadCharacter(
					this.props.router.location.pathname.slice(1)
				);
			} else if (!prevProps.loaded) {
				prevProps.loadCharacter(
					this.props.router.location.pathname.slice(1)
				);
			}
		} else {
			prevProps.loadCharacter(
				this.props.router.location.pathname.slice(1)
			);
		}
	};

	render() {
		if (this.props.loaded) {
			const { version } = this.props.data;

			switch (version) {
				case undefined:
				case 'v0.0.1':
				case 'v0.1.0':
					return <V0_1_0 />;
					break;
				case 'v1.0.2':
					return <V1_0_2 />;
					break;
				default:
					Sentry.captureMessage(
						'Invalid character sheet version. ' + version
					);
					return (
						<div className="container">
							<Error
								error={
									'Invalid character sheet version. ' +
									version
								}
							/>
						</div>
					);
			}
		} else if (this.state.error !== null) {
			return (
				<div className="container">
					<Error error={this.state.error} />
				</div>
			);
		} else {
			return (
				<div className="character">
					<div className="character-loading">
						<Loading />
					</div>
				</div>
			);
		}
	}
}

const mapStateToProps = (state, ownProps) => ({
	...ownProps,
	loaded: state.character.loaded,
	data: state.character.data,
	router: state.router
});

const mapDispatchToProps = { loadCharacter };

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSheet);
