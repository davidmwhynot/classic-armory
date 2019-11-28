import React from 'react';

import '../../../../sass/CharacterSheet/V1_0_2/Skills/Skill.scss';

export default ({ skill }) => {
	return (
		<div className="character-skills-skill">
			<h4>{skill.name}</h4>
			<p>{skill.rank}</p>
		</div>
	);
};
