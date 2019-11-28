import React from 'react';

import RecentUploads from '../../RecentUploads';

import '../../../sass/CharacterSheet/V1_0_2/CharacterUploads.scss';

export default ({ uploads }) => {
	return (
		<div className="character-uploads">
			<RecentUploads uploads={uploads} border={'light'} />
		</div>
	);
};
