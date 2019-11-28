import React from 'react';

import Group from './Group';

import '../../../../sass/CharacterSheet/V1_0_2/Skills/index.scss';

export default ({ skills }) => {
	return (
		<div className="character-skills">
			<h1>Skills</h1>
			{skills.map((group, key) => (
				<Group group={group} key={key} />
			))}
		</div>
	);
};
