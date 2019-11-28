import React from 'react';

import Item from './Item';

import '../../../../sass/CharacterSheet/V1_0_2/Equipped/index.scss';

export default ({ equipped }) => {
	return (
		<div className="character-equipped">
			{equipped.map(item => (
				<Item item={item} key={item.slot} />
			))}
		</div>
	);
};
