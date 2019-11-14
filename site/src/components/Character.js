import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as Sentry from '@sentry/browser';
import { loadCharacter } from '../actions/characterActions';

import Item from './Item';
import Error from './Error';
import CopyURL from './CopyURL';
import Loading from './Loading';

import '../sass/Character.scss';
import RecentUploads from './RecentUploads';

class Character extends Component {
	state = {
		loading: true,
		error: null
	};

	componentWillMount = async => {
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
			const {
				name,
				realm,
				guild,
				race,
				class: characterClass,
				level,
				items
			} = this.props.data;

			return (
				<div>
					{this.state.error !== null ? (
						<Error error={this.state.error} />
					) : (
						''
					)}
					<div className="container-fluid">
						<div className="character-container">
							<div className="character-copy-url">
								<CopyURL url={window.location.href} />
							</div>
							<div className="character-uploads">
								<RecentUploads
									uploads={this.props.uploads}
									border="light"
								/>
							</div>
							<div className="character">
								<div className="character-header mb-2">
									<div className="character-names">
										<h2 className="character-name">
											{name} - {realm}
										</h2>

										<h3 className="character-guild">
											Level {level} {race}{' '}
											<span
												className={
													'character-class class-color-' +
													characterClass.toLowerCase()
												}
											>
												{characterClass}
											</span>{' '}
											- &lt;{guild}&gt;
										</h3>
									</div>
								</div>

								<div className="character-doll">
									{Object.keys(items).map(key => {
										if (items[key] === null) {
											return (
												<Item
													slot={key}
													empty={true}
													key={key}
												/>
											);
										} else {
											const {
												id,
												icon,
												name: itemName,
												tooltip,
												quality
											} = items[key];

											const iconUrl =
												process.env.PUBLIC_URL +
												'/icons/' +
												icon +
												'.png';

											return (
												<Item
													slot={key}
													empty={false}
													iconUrl={iconUrl}
													itemName={itemName}
													quality={quality}
													stats={tooltip}
													link={
														'https://classic.wowhead.com/?item=' +
														id
													}
													key={key}
												/>
											);
										}
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			);
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

export default connect(mapStateToProps, mapDispatchToProps)(Character);
