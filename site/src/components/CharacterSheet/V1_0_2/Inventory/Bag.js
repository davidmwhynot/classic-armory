import React from 'react';

import Icon from '../Icon';

import '../../../../sass/CharacterSheet/V1_0_2/Inventory/Bag.scss';

export default ({ bag }) => {
	const { slot, items } = bag;

	let bagItems;
	if (items) {
		bagItems = (
			<div className="character-bag-items">
				{items.map(
					({ id, count, data: { quality, icon, tooltip } }, key) => {
						let qualityName;

						switch (quality) {
							case 0:
								qualityName = 'poor';
								break;
							case 1:
								qualityName = 'common';
								break;
							case 2:
								qualityName = 'uncommon';
								break;
							case 3:
								qualityName = 'rare';
								break;
							case 4:
								qualityName = 'epic';
								break;
							case 5:
								qualityName = 'legendary';
								break;
							default:
								qualityName = '';
								break;
						}

						return (
							<Icon
								id={id}
								count={count}
								rarity={qualityName}
								path={`${icon}.jpg`}
								tooltip={tooltip}
								key={key}
							/>
						);
					}
				)}
			</div>
		);
	} else {
		bagItems = '';
	}

	let bagContent;
	if (slot === 'BackpackSlot') {
		bagContent = <h4>Backpack</h4>;
	} else if (bag.data && slot !== -1) {
		const {
			id,
			data: { name, quality, icon, tooltip }
		} = bag;

		let qualityName;

		switch (quality) {
			case 0:
				qualityName = 'poor';
				break;
			case 1:
				qualityName = 'common';
				break;
			case 2:
				qualityName = 'uncommon';
				break;
			case 3:
				qualityName = 'rare';
				break;
			case 4:
				qualityName = 'epic';
				break;
			case 5:
				qualityName = 'legendary';
				break;
			default:
				qualityName = '';
				break;
		}

		bagContent = (
			<div className="character-bag-bag">
				<Icon
					id={id}
					rarity={qualityName}
					path={`${icon}.jpg`}
					tooltip={tooltip}
				/>

				<div className="character-bag-bag-description">
					<a
						href={`https://classic.wowhead.com/?item=${id}`}
						className={`character-equipped-item-name color-${qualityName}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						{name}
					</a>
				</div>
			</div>
		);
	} else {
		bagContent = '';
	}

	return (
		<div className="character-bag">
			{bagContent}

			{bagItems}
		</div>
	);
};
