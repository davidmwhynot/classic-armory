import React from 'react';

import '../../../sass/CharacterSheet/V1_0_2/Pvp.scss';

export default ({ pvp }) => {
	return (
		<div className="character-pvp">
			<h1>character-pvp</h1>
			<pre>{JSON.stringify(pvp, null, '\t')}</pre>
		</div>
	);
};
