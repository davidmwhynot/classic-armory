import React from 'react';

import '../../../../sass/CharacterSheet/V1_0_2/Item/index.scss';

export default ({ item }) => {
	return (
		<div className="character-item">
			<h1>character-item</h1>
			<pre>{JSON.stringify(item, null, '\t')}</pre>
		</div>
	);
};
