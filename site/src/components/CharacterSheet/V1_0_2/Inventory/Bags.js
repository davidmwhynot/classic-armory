import React from 'react';

import Bag from './Bag';

import '../../../../sass/CharacterSheet/V1_0_2/Inventory/Bags.scss';

export default ({ bags }) => {
	return (
		<div className="character-bags">
			<h3>Bags</h3>
			{bags.map(bag => (
				<Bag bag={bag} key={bag.slot} />
			))}
		</div>
	);
};
