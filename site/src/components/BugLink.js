import React from 'react';

import '../sass/BugLink.scss';

const BugLink = () => {
	return (
		<a
			href="https://github.com/davidmwhynot/classic-armory/issues/new?assignees=davidmwhynot&labels=bug&template=bug_report.md&title=Bug+-+"
			className="bug-link btn btn-danger btn-sm btn-block shadow"
			target="_blank"
		>
			Report a Bug!
		</a>
	);
};

export default BugLink;
