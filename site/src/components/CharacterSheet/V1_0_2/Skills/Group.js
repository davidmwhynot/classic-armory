import React from 'react';

import Skill from './Skill';

import '../../../../sass/CharacterSheet/V1_0_2/Skills/Group.scss';

export default ({ group }) => {
	return (
		<div className="character-skills-group">
			<h2>{group.name}</h2>
			<div className="group">
				{group.skills.map((skill, key) => (
					<Skill skill={skill} key={key} />
				))}
			</div>
		</div>
	);
};
