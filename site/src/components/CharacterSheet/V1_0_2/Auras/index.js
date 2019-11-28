import React from 'react';

import Buffs from './Buffs';
import Debuffs from './Debuffs';

import '../../../../sass/CharacterSheet/V1_0_2/Auras/index.scss';

export default ({ buffs, debuffs }) => {
	return (
		<div className="character-auras">
			<Buffs buffs={buffs} />
			<Debuffs debuffs={debuffs} />
		</div>
	);
};
