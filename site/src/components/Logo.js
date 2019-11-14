import React from 'react';

import '../sass/Logo.scss';

export default () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			data-name="Layer 1"
			viewBox="0 0 1000 1000"
		>
			<defs>
				<symbol
					id="a"
					data-name="classic armory icon"
					viewBox="0 0 800 811.617"
				>
					<path
						fill="#375a7f"
						d="M0 0c0 672.01 400 811.617 400 811.617V0z"
					></path>
					<path
						d="M400 811.617S800 672.01 800 0H400z"
						opacity="0.05"
					></path>
				</symbol>
			</defs>
			<path
				fill="#375a7f"
				d="M500.5 905.5s400-139.607 400-811.617h-400z"
			></path>
			<use
				width="800"
				height="811.617"
				transform="translate(100.5 93.883)"
				xlinkHref="#a"
			></use>
		</svg>
	);
};
