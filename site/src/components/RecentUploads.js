import React from 'react';

import CharacterUpload from './CharacterUpload';

export default ({ uploads, border }) => {
	return (
		<div>
			{uploads.map(({ _id, name, realm, time }) => (
				<CharacterUpload
					_id={_id}
					name={name}
					realm={realm}
					time={time}
					border={border}
					key={_id}
				/>
			))}
		</div>
	);
};
