import React from 'react';

import Aura from './Aura';

import '../../../../sass/CharacterSheet/V1_0_2/Auras/Buffs.scss';

export default ({ buffs }) => {
	if (buffs.length > 0) {
		return (
			<div className="character-auras-buffs">
				<h4>Buffs</h4>

				<div className="character-auras-group">
					{buffs.map(buff => (
						<Aura aura={buff} border="light" key={buff.id} />
					))}
				</div>
			</div>
		);
	} else {
		return '';
	}
};
