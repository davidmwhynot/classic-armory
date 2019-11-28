import React from 'react';

import Bag from './Bag';

import '../../../../sass/CharacterSheet/V1_0_2/Inventory/Bank.scss';

export default ({ bank }) => {
	return (
		<div className="character-bank">
			<h1>character-bank</h1>
			{bank.map(bag => (
				<Bag bag={bag} key={bag.slot} />
			))}
		</div>
	);
};
