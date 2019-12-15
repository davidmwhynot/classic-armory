import React from 'react';

import Bags from './Bags';
import Bank from './Bank';

import '../../../../sass/CharacterSheet/V1_0_2/Inventory/index.scss';

export default ({ bags, bank, money }) => {
	const copper = money % 100;
	const silver = ((money - copper) % 10000) / 100;
	const gold = (money - (copper + silver * 100)) / 100 / 100;

	return (
		<div className="character-inventory">
			<div className="character-inventory-money">
				<span>
					<span>{gold}</span>
					<img src="/media/money-gold.gif" />
				</span>
				<span>
					<span>{silver}</span>
					<img src="/media/money-silver.gif" />
				</span>
				<span>
					<span>{copper}</span>
					<img src="/media/money-copper.gif" />
				</span>
			</div>

			<Bags bags={bags} />

			<Bank bank={bank} />
		</div>
	);
};
