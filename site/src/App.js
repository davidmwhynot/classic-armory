import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom';
import $ from 'jquery';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Character from './components/Character';
import Error from './components/Error';
// import Admin from './components/Admin';
import BugLink from './components/BugLink';

class App extends Component {
	state = {
		loading: false,
		error: null
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
			appBody = <h1>Loading</h1>;
		} else {
			appBody = (
				<div className="container-fluid mt-3">
					<Route exact path="/" component={Home} />
					{/* <Route exact path="/admin/get" component={Admin} /> */}
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
				<div className="container">
					<div
						className="alert alert-warning my-3 mx-auto"
						role="alert"
					>
						<h3>Urgent News</h3>
						<h6 className="my-1">
							At this time, uploading new characters will not
							work.
						</h6>
						<p className="my-1">
							Once of the key pieces that allows Classic Armory to
							work was powered by a WoW Head item API that was
							deprecated on November 8th.
						</p>
						<p className="my-1">
							Unfortunately, the decision to deprecate this API
							was beyond our control. It happened suddenly and
							without any warning.
						</p>
						<p className="my-1">
							We would greatly appreciate if you added your voice
							to{' '}
							<a
								href="https://www.wowhead.com/forums&topic=296141"
								target="_blank"
							>
								this forum thread on WoW Head
							</a>
							. Let them know that you use Classic Armory and are
							disappointed that this feature was removed.
						</p>
						<p className="my-1">
							We are currently working on a replacement for this
							functionality and will have an updated version of
							the site up as soon as possible. In the meantime,
							check for updates to the Addon via the curse client
							regularly as the fix may require an updated addon
							version.
						</p>
						<p className="mb-0">
							We will post updates to the situation right here as
							they become available. Stay tuned, and thank you for
							using Classic Armory.
						</p>
					</div>
				</div>
				{appBody}
			</div>
		);
	}
}

export default withRouter(App);
