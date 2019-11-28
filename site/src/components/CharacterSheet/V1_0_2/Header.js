import React from 'react';

import '../../../sass/CharacterSheet/V1_0_2/Header.scss';

export default ({ name, realm, guild, level, race, sex, className }) => {
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

	return (
		<div className="character-header">
			<div className="character-header-top">
				<div
					className={`character-header-name-container color-${className.toLowerCase()}`}
				>
					<h2>
						{name} - {realm}
					</h2>
				</div>

				<div className="character-header-class-container">
					<h2
						className={`character-header-class-name color-${className.toLowerCase()}`}
					>
						{className}
					</h2>

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
		</div>
	);
};
