import React, { Component } from 'react';
import './Character.scss';
import Item from './Item';

class Character extends Component {
	state = {
		loading: false,
		name: 'Charactername',
		race: 'Race',
		class: 'Class',
		level: 60,
		guild: 'Guild Name'
	};

	componentDidMount = () => {
		// let parsedData = null;
		try {
			console.log(this.props.match.params.id);
			// const uri = this.props;
			// this.setState(parsedData);
		} catch (e) {
			console.error(e);
		}
	};

	render() {
		const { loading, name, race, level, guild } = this.state;
		const { data } = this.props;
		// const { name: feetName, icon } = feet;
		// const iconUrl =
		// 	process.env.PUBLIC_URL + '/icons/Armor/' + icon[0]['_'] + '.png';

		// console.log('feet in char', feet);
		// console.log('icon', icon[0]['$']);
		// console.log('iconUrl', iconUrl);
		// console.log('feetName', feetName);
		return (
			<div className="character">
				{loading ? (
					<div className="character-loading">
						<h1>Loading...</h1>
					</div>
				) : (
					<div>
						<div className="character-header">
							<div className="character-names">
								<h1 className="character-name">{name}</h1>
								<h2 className="character-guild">&lt;{guild}&gt;</h2>
							</div>
							<div className="character-tagline">
								<div className="character-race-class">
									<h4 className="character-race">{race}</h4>
									<h4 className="character-class">{this.state.class}</h4>
								</div>
								<h4 className="character-level">{level}</h4>
							</div>
						</div>
						<div className="character-doll">
							{Object.keys(data).map(key => {
								if (data[key] === null) {
									return <Item slot={key} empty={true} key={key} />;
								} else {
									console.log('data[key]', key, data[key]);

									const {
										icon,
										jsonEquip,
										level,
										link,
										name: itemName,
										quality
									} = data[key];

									const rarity = quality[0]['_'].toLowerCase();

									const stats = [
										{
											name: 'test',
											value: 3
										}
									];

									const iconUrl =
										process.env.PUBLIC_URL + '/icons/' + icon[0]['_'] + '.png';

									return (
										<Item
											slot={key}
											empty={false}
											iconUrl={iconUrl}
											itemName={itemName[0]}
											rarity={rarity}
											stats={stats}
											link={link[0]}
											level={level[0]}
											key={key}
										/>
									);
								}
							})}
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default Character;
