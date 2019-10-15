import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom';
import $ from 'jquery';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Character from './components/Character';

class App extends Component {
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
				$('#area').focus();
			}
		});

		$('.capture-paste').keyup(async e => {
			if (ctrlDown && e.keyCode === vKey) {
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

					this.setState({ loading: false, data: res.items });
					this.props.history.push('/123');
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
		return (
			<div className="App">
				<Navbar />
				<div className="container" style={{ marginTop: 50 }}>
					<Route exact path="/" component={Home} />
					{/* <Route path="/:id" component={Character} /> */}
					<Route
						path="/:id"
						render={props => <Character {...props} data={this.state.data} />}
					/>
				</div>
			</div>
		);
	}
}

export default withRouter(App);
