import React from 'react';

import Icon from './Icon';

import '../../../../sass/CharacterSheet/V1_0_2/Equipped/Item.scss';

export default ({ item }) => {
	const { slot } = item;

	const slotName = slot.match(/(.+?)Slot/)[1].toLowerCase();

	let itemBody;

	if (item.id) {
		const {
			id,
			enchant,
			data: { name, quality, icon, tooltip }
		} = item;

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

		itemBody = (
			<>
				<Icon
					path={`${icon}.jpg`}
					rarity={qualityName}
					id={id}
					tooltip={tooltip}
				/>
				<div className="character-equipped-item-description">
					<a
						href={`https://classic.wowhead.com/?item=${id}`}
						className={`character-equipped-item-name color-${qualityName}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						{name}
					</a>
					{enchant ? (
						<div className="character-equipped-item-enchant color-rare">
							{enchant}
						</div>
					) : (
						''
					)}
				</div>
			</>
		);
	} else {
		itemBody = (
			<>
				<Icon path={`empty/${slotName.replace(/\d$/, '')}.png`} />
			</>
		);
	}

	return (
		<div
			className={`character-equipped-item character-equipped-item-${slotName}`}
		>
			{itemBody}
		</div>
	);
};
