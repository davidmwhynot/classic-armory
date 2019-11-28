import React from 'react';

import '../../../../sass/CharacterSheet/V1_0_2/Reputations/Reputation.scss';

export default ({ reputation }) => {
	return (
		<div className="character-reputations-reputation">
			<h4>{reputation.name}</h4>
			<p>{reputation.value}</p>
		</div>
	);
};
