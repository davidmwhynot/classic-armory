import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadCharacter } from '../../actions/characterActions';

import Error from '../../components/Error';
import Loading from '../../components/Loading';

// import v0_1_0 from './v0.1.0';
// import v1_0_2 from './v1.0.2';

class CharacterSheet extends Component {
	state = {
		loading: true,
		error: null
	};

	componentWillMount = () => {
		this.props.loadCharacter(this.props.match.params.id);
	};

	componentWillReceiveProps = async newProps => {
		if (this.props.match.params.id) {
			if (!newProps.match.params.id.match(this.props.match.params.id)) {
				this.props.loadCharacter(newProps.match.params.id);
			} else if (!this.props.loaded) {
				this.props.loadCharacter(newProps.match.params.id);
			}
		} else {
			this.props.loadCharacter(newProps.match.params.id);
		}
	};

	render() {
		if (this.props.loaded) {
			console.log('props', this.props.data);
			const { version } = this.props.data;

			switch (version) {
				case undefined:
					// return <v0_1_0 />;
					return <h1>v0_1_0</h1>;
				case 'v0.1.0':
					// return <v0_1_0 />;
					return <h1>v0_1_0</h1>;
				case 'v1.0.2':
					// return <v1_0_2 />;
					return <h1>v1_0_2</h1>;
				default:
					return (
						<div className="container">
							<Error
								error={
									'Invalid character sheet version.' + version
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
	...state.character
});

const mapDispatchToProps = { loadCharacter };

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSheet);
