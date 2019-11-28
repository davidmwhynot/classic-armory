import React from 'react';

import Bags from './Bags';
import Bank from './Bank';

import '../../../../sass/CharacterSheet/V1_0_2/Inventory/index.scss';

export default ({ bags, bank }) => {
	return (
		<div className="character-inventory">
			<h1>character-inventory</h1>
			<Bags bags={bags} />
			<Bank bank={bank} />
		</div>
	);
};
