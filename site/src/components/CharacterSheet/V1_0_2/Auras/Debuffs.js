import React from 'react';

import Aura from './Aura';

import '../../../../sass/CharacterSheet/V1_0_2/Auras/Debuffs.scss';

export default ({ debuffs }) => {
	if (debuffs.length > 0) {
		return (
			<div className="character-auras-debuffs">
				<h4>Debuffs</h4>

				<div className="character-auras-group">
					{debuffs.map(debuff => (
						<Aura aura={debuff} border="debuff" key={debuff.id} />
					))}
				</div>
			</div>
		);
	} else {
		return '';
	}
};
