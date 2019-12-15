import React from 'react';

import Talent from './Talent';

import '../../../../sass/CharacterSheet/V1_0_2/Talents/Tree.scss';

export default ({ charData, tree }) => {
	const { background, name, pointsSpent } = charData;

	const mergedTree = tree.map((talent, key) => ({
		// ...charData.talents.find(tal => tal.name === talent.name),
		...charData.talents[key],
		...talent
	}));

	console.log('mergedTree[0]', mergedTree[0]);

	return (
		<div className="character-talents-tree">
			<h3>
				{pointsSpent} - {name}
			</h3>

			<div className="character-talents-tree-grid">
				{mergedTree.map(talent => (
					<Talent talent={talent} key={talent.name} />
				))}
			</div>
		</div>
	);
};
