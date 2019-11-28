import React from 'react';

import Talent from './Talent';

import '../../../../sass/CharacterSheet/V1_0_2/Talents/Tree.scss';

export default ({ tree }) => {
	return (
		<div className="character-talents-tree">
			<h1>character-talents-tree</h1>
			<pre>{JSON.stringify(tree, null, '\t')}</pre>
			{tree.talents.map(talent => (
				<Talent talent={talent} key={talent.name} />
			))}
		</div>
	);
};
