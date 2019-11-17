import React from 'react';

import '../sass/TwitterShare.scss';

export default ({ copy, url }) => {
	return (
		<a
			className="twitter"
			target="_blank"
			rel="noopener noreferrer"
			href={
				'https://twitter.com/intent/tweet?via=classicarmory&text=' +
				encodeURIComponent(copy + ' ' + url)
			}
		>
			<img
				src={process.env.PUBLIC_URL + '/media/twitter-icon.svg'}
				alt="Twitter"
			/>{' '}
			Tweet
		</a>
	);
};
