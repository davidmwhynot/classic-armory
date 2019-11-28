import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import '../../../sass/CharacterSheet/V1_0_2/Tooltip.scss';
import '../../../sass/Wowhead.scss';

export default ({ tooltip, visible, rarity }) => {
	return (
		<ReactCSSTransitionGroup
			transitionEnterTimeout={0}
			transitionLeaveTimeout={0}
			transitionName="fade"
		>
			{visible ? (
				<div
					className={`character-tooltip border-${rarity}`}
					dangerouslySetInnerHTML={{ __html: tooltip }}
				></div>
			) : (
				''
			)}
		</ReactCSSTransitionGroup>
	);
};
