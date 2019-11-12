import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import '../sass/CharacterUpload.scss';

export default ({ _id, name, realm, time, border }) => {
	return (
		<div className="character-upload" key={_id}>
			<Link className="link-card" to={'/' + _id}>
				<div className={'card mb-3 border-' + border}>
					<div className="card-body d-flex align-items-center p-2">
						<h6 className="mb-0 mr-3">
							{name} - {realm}
						</h6>
						<div className="ml-auto small text-muted">
							{moment(time, 'YYYY-MM-DDTHH:mm:ss.SSSZ').fromNow()}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};
