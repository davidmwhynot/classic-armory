import React from 'react';

import '../../../sass/CharacterSheet/V1_0_2/Xp.scss';

export default ({ xp: { current, max }, level }) => {
	if (level === 60) {
		return '';
	} else {
		const percent = `${Math.round((current / max) * 1000) / 10}%`;

		return (
			<div className="character-xp progress">
				<div
					className="progress-bar"
					style={{
						width: percent
					}}
				></div>

				<div className="character-xp-label">
					XP:&nbsp;&nbsp;{percent}&nbsp;&nbsp;
					{current.toLocaleString()}
					&nbsp;&nbsp;/&nbsp;&nbsp;
					{max.toLocaleString()}
				</div>
			</div>
		);
	}
};
