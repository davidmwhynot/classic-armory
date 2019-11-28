import React from 'react';

import Tree from './Tree';

import '../../../../sass/CharacterSheet/V1_0_2/Talents/index.scss';

export default ({ talents }) => {
	return (
		<div className="character-talents">
			<h1>character-talents</h1>
			{talents.map((tree, key) => (
				<Tree tree={tree} key={key} />
			))}
		</div>
	);
};
