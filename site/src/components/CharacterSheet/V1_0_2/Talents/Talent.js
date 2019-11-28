import React from 'react';

import '../../../../sass/CharacterSheet/V1_0_2/Talents/Tree.scss';

export default ({ talent }) => {
	return (
		<div className="character-talents-talent">
			<h1>character-talents-talent</h1>
			<pre>{JSON.stringify(talent, null, '\t')}</pre>
		</div>
	);
};
