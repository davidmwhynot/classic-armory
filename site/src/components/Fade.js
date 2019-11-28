import React from 'react';

export default ({ children, transitionState }) => {
	return (
		<div className={`transition transition-${transitionState}`}>
			{children}
		</div>
	);
};
