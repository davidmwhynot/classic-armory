import React, { Component } from 'react';
import { connect } from 'react-redux';

import CharacterUpload from './CharacterUpload';

class RecentUploads extends Component {
	render() {
		if (this.props.session.loaded && this.props.global.loaded) {
			let sessionUploads, globalUploads;

			globalUploads = (
				<div className="global-uploads col-md-6 col-lg-5">
					<h4>Recent Uploads</h4>
					{this.props.global.uploads.map(
						({ _id, name, realm, time }) => (
							<CharacterUpload
								_id={_id}
								name={name}
								realm={realm}
								time={time}
								key={_id}
							/>
						)
					)}
				</div>
			);

			if (this.props.session.uploads) {
				if (this.props.session.uploads.length > 0) {
					sessionUploads = (
						<div className="my-uploads col-md-6 col-lg-5">
							<h4>My Uploads</h4>
							{this.props.session.uploads.map(
								({ _id, name, realm, time }) => (
									<CharacterUpload
										_id={_id}
										name={name}
										realm={realm}
										time={time}
										key={_id}
									/>
								)
							)}
						</div>
					);
				} else {
					sessionUploads = null;
				}
			} else {
				sessionUploads = null;
			}

			return (
				<div className="recent-uploads row">
					{globalUploads}
					{sessionUploads}
				</div>
			);
		} else {
			return null;
		}
	}
}

const mapStateToProps = (state, ownProps) => ({
	...ownProps,
	session: { ...state.session },
	global: { ...state.global }
});

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RecentUploads);
