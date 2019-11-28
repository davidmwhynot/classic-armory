import React from 'react';

import CopyURL from '../../CopyURL';
import TwitterShare from '../../TwitterShare';
import FacebookShare from '../../FacebookShare';

import '../../../sass/CharacterSheet/V1_0_2/Share.scss';

export default () => {
	return (
		<div className="character-share">
			<div className="character-copy-url">
				<CopyURL url={window.location.href} />
			</div>
			<div className="character-share-social">
				<div className="character-share-twitter">
					<TwitterShare
						url={window.location.href}
						copy="Check out my character's armory page!"
					/>
				</div>
				<div className="character-share-facebook">
					<FacebookShare url={window.location.href} />
				</div>
			</div>
		</div>
	);
};
