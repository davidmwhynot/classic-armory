import React from 'react';
import moment from 'moment';

import '../../../sass/CharacterSheet/V1_0_2/Header.scss';

export default ({
	time,
	name,
	rank,
	region,
	realm,
	guild,
	level,
	race,
	sex,
	className
}) => {
	let sexLabel = '';

	switch (sex) {
		case 2:
			sexLabel = 'Male';
			break;
		case 3:
			sexLabel = 'Female';
			break;
		default:
			sexLabel = '';
			break;
	}

	let title;
	switch (rank) {
		case 5:
			title = 'Private';
			break;
		case 6:
			title = 'Private';
			break;
		case 7:
			title = 'Private';
			break;
		case 8:
			title = 'Private';
			break;
		case 9:
			title = 'Private';
			break;
		case 10:
			title = 'Private';
			break;
		case 11:
			title = 'Private';
			break;
		case 12:
			title = 'Private';
			break;
		case 13:
			title = 'Private';
			break;
		case 14:
			title = 'Private';
			break;
		case 15:
			title = 'Private';
			break;
		case 16:
			title = 'Private';
			break;
		case 17:
			title = 'Private';
			break;
		case 18:
			title = 'Private';
			break;
		case 19:
			title = 'Private';
			break;
		default:
			title = '';
			break;
	}

	let regionVal;
	switch (region) {
		case 1:
			regionVal = 'us';
			break;
		case 2:
			regionVal = 'kr';
			break;
		case 3:
			regionVal = 'eu';
			break;
		case 4:
			regionVal = 'tw';
			break;
		case 5:
			regionVal = 'cn';
			break;
		default:
			regionVal = '';
			break;
	}

	console.log(time);

	return (
		<div className="character-header">
			<div className="character-header-top">
				<div
					className={`character-header-name-container color-${className.toLowerCase()}`}
				>
					<h3>
						{rank > 0 ? title + ' ' : ''}
						{name} - {realm} - {regionVal.toUpperCase()}
					</h3>
				</div>

				<div className="character-header-class-container">
					<h3
						className={`character-header-class-name color-${className.toLowerCase()}`}
					>
						{className}
					</h3>

					<img
						src={`${
							process.env.PUBLIC_URL
						}/icons/classicon_${className.toLowerCase()}.jpg`}
						alt="Character class icon."
					/>
				</div>
			</div>

			<h3 className="character-header-guild color-uncommon">
				&lt;{guild}&gt;
			</h3>

			<div className="character-header-race-sex-container">
				<img
					src={`${
						process.env.PUBLIC_URL
					}/icons/achievement_character_${race
						.toLowerCase()
						.replace(' ', '')}_${sexLabel.toLowerCase()}.jpg`}
					alt="Character race icon."
				/>

				<h4 className="character-header-race-sex-label">
					<span className="character-header-race">{race}</span>{' '}
					<span className="character-header-sex">{sexLabel}</span>
				</h4>
			</div>

			<h4 className="character-header-level text-info">Level {level}</h4>

			<div className="character-header-bottom-right">
				<a
					href={`https://classic.warcraftlogs.com/character/${regionVal}/${realm}/${name}`}
					className="character-header-wcl"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src={`${process.env.PUBLIC_URL}/media/wcl.png`}
						alt="Warcraft Logs icon"
					/>{' '}
					Warcraft Logs
				</a>

				<div className="character-header-time text-muted font-italics">
					Uploaded:{' '}
					{moment(time, 'YYYY-MM-DDTHH:mm:ss.SSSZ').fromNow()}
				</div>
			</div>
		</div>
	);
};
