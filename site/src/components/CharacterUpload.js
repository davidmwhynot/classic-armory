import React from 'react';
import moment from 'moment';

import '../sass/CharacterUpload.scss';

export default ({ _id, name, realm, time }) => {
	return (
		<div className="character-upload" key={_id}>
			<a className="link-card" href={window.location.href + _id}>
				<div className="card mb-3 border-primary">
					<div className="card-body d-flex align-items-center p-2">
						<h6 className="mb-0 mr-3">
							{name} - {realm}
						</h6>
						<div className="ml-auto small text-muted">
							{moment(time, 'YYYY-MM-DDTHH:mm:ss.SSSZ').fromNow()}
						</div>
					</div>
				</div>
			</a>
		</div>
	);
};
