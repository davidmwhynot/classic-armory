import React from 'react';

const Home = props => {
	const { error } = props;
	return (
		<div className="container">
			<div className="alert alert-danger my-3 mx-auto" role="alert">
				{error}
			</div>
		</div>
	);
};

export default Home;
