import React, { Component } from 'react';
import './Character.scss';
import Item from './Item';
import Error from './Error';

class Character extends Component {
	state = {
		loading: true,
		error: null
	};

	componentDidMount = async () => {
		try {
			console.log('this.props.match.params.id');
			console.log(this.props.match.params.id);

			const res = await (await fetch('/.netlify/functions/get', {
				method: 'POST',
				body: this.props.match.params.id,
				headers: { 'Content-Type': 'application/json' }
			})).json();

			this.setState({ ...res, loading: false });
		} catch (e) {
			this.setState({
				loading: false,
				error: 'Something went wrong. Please try again.'
			});
			console.error(e);
		}
	};

	render() {
		if (this.state.loading) {
			return (
				<div className="character">
					<div className="character-loading">
						<h1>Loading...</h1>
					</div>
				</div>
			);
		} else {
			const {
				name,
				realm,
				guild,
				race,
				class: characterClass,
				level,
				items
			} = this.state;
			return (
				<div>
					{this.state.error !== null ? <Error error={this.state.error} /> : ''}
					<div className="character">
						<div>
							<div className="character-header">
								<div className="character-names">
									<h1 className="character-name">
										{name} - {realm}
									</h1>
									<h2 className="character-guild">
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
									</h2>
								</div>
							</div>
							<div className="character-doll">
								{Object.keys(items).map(key => {
									if (items[key] === null) {
										return <Item slot={key} empty={true} key={key} />;
									} else {
										console.log('items[key]', key, items[key]);

										const {
											icon,
											level,
											link,
											name: itemName,
											htmlTooltip,
											quality
										} = items[key];

										const rarity = quality[0]['_'].toLowerCase();

										// const parsedJson = JSON.parse('{' + json + '}');
										// const parsedJsonEquip = JSON.parse('{' + jsonEquip + '}');
										// console.log('parsedJson', key, parsedJson);
										// console.log('parsedJsonEquip', key, parsedJsonEquip);
										// console.log('\n');

										// const statKeys = Object.keys(parsedJsonEquip);

										// const stats = [];
										// console.log('statKeys', statKeys);
										// statKeys.forEach(statKey => {
										// 	switch (statKey) {
										// 		case 'armor':
										// 			stats.push({
										// 				name: 'Armor:',
										// 				value: parsedJsonEquip[statKey]
										// 			});
										// 			break;
										// 		case 'sta':
										// 			stats.push({
										// 				name: 'Stamina:',
										// 				value: parsedJsonEquip[statKey]
										// 			});
										// 			break;
										// 		case 'str':
										// 			stats.push({
										// 				name: 'Strength:',
										// 				value: parsedJsonEquip[statKey]
										// 			});
										// 			break;
										// 		case 'int':
										// 			stats.push({
										// 				name: 'Intellect:',
										// 				value: parsedJsonEquip[statKey]
										// 			});
										// 			break;
										// 		case 'agi':
										// 			stats.push({
										// 				name: 'Agility:',
										// 				value: parsedJsonEquip[statKey]
										// 			});
										// 			break;
										// 	}
										// });

										// console.log('stats', stats);

										const iconUrl =
											process.env.PUBLIC_URL +
											'/icons/' +
											icon[0]['_'] +
											'.png';

										return (
											<Item
												slot={key}
												empty={false}
												iconUrl={iconUrl}
												itemName={itemName[0]}
												rarity={rarity}
												stats={htmlTooltip}
												link={link[0]}
												level={level[0]}
												key={key}
											/>
										);
									}
								})}
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
}

export default Character;
