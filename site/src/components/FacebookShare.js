import React from 'react';

import '../sass/FacebookShare.scss';

export default ({ url }) => {
	url = 'https://wowclassicarmory.com';
	return (
		<div
			className="facebook"
			onClick={() => {
				window.open(
					'https://www.facebook.com/sharer/sharer.php?u=' +
						encodeURIComponent(url),
					'facebook-share-dialog',
					'width=626,height=436'
				);
			}}
		>
			<img
				src={process.env.PUBLIC_URL + '/media/facebook-icon.svg'}
				alt="Facebook"
			/>{' '}
			Share
		</div>
	);
};
