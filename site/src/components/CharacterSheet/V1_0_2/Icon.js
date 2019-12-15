import React, { Component } from 'react';

import Tooltip from './Tooltip';

import '../../../sass/CharacterSheet/V1_0_2/Icon.scss';

class Icon extends Component {
	state = {
		isTooltipVisible: false
	};

	render = () => {
		const { path, rarity, id, tooltip, count } = this.props;

		const img = (
			<img
				className={`border-${rarity}`}
				src={`${process.env.PUBLIC_URL}/icons/${path}`}
				alt={path}
			/>
		);

		return (
			<div className="character-icon">
				{id ? (
					<>
						<Tooltip
							tooltip={tooltip}
							visible={this.state.isTooltipVisible}
							rarity={rarity}
						/>

						<a
							className="shader"
							target="_blank"
							rel="noopener noreferrer"
							href={`https://classic.wowhead.com/?item=${id}`}
							onMouseEnter={() =>
								this.setState({ isTooltipVisible: true })
							}
							onMouseLeave={() =>
								this.setState({ isTooltipVisible: false })
							}
						>
							{img}
						</a>

						{count > 1 ? (
							<div className="character-icon-count">{count}</div>
						) : (
							''
						)}
					</>
				) : (
					img
				)}
			</div>
		);
	};
}

export default Icon;
