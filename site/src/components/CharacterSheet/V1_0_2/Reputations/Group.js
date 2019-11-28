import React from 'react';

import Reputation from './Reputation';

import '../../../../sass/CharacterSheet/V1_0_2/Reputations/Group.scss';

export default ({ group }) => {
	return (
		<div className="character-reputations-group">
			<h2>{group.name}</h2>
			<div className="group">
				{group.reps.map((reputation, key) => (
					<Reputation reputation={reputation} key={key} />
				))}
			</div>
		</div>
	);
};
