import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom';
import $ from 'jquery';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Character from './components/Character';

class App extends Component {
	state = {
		loading: false
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
				this.setState({ loading: true });
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
					{/* <Route path="/:id" component={Character} /> */}
					<Route
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
				</div>
			);
		}

		return (
			<div className="App">
				<Navbar />
				{appBody}
			</div>
		);
	}
}

export default withRouter(App);
