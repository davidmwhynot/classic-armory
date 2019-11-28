import React from 'react';

import Item from '../Item';

import '../../../../sass/CharacterSheet/V1_0_2/Inventory/Bag.scss';

export default ({ bag }) => {
	return (
		<div className="character-bag">
			<h1>character-bag</h1>
			<pre>{JSON.stringify(bag, null, '\t')}</pre>
			{bag.items
				? bag.items.map((item, key) => <Item item={item} key={key} />)
				: ''}
		</div>
	);
};
