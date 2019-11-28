import React, { Component } from 'react';

import Tooltip from '../Tooltip';

import '../../../../sass/CharacterSheet/V1_0_2/Auras/Aura.scss';

class Aura extends Component {
	state = {
		isTooltipVisible: false
	};

	render = () => {
		const { icon, buff, id } = this.props.aura;

		const img = (
			<img
				className={`border-${this.props.border}`}
				src={`${process.env.PUBLIC_URL}/icons/${icon}.jpg`}
				alt={buff}
			/>
		);

		return (
			<>
				<div className="character-auras-aura">
					{id ? (
						<>
							<Tooltip
								tooltip={buff}
								visible={this.state.isTooltipVisible}
								rarity={this.props.border}
							/>

							<a
								className="shader"
								target="_blank"
								rel="noopener noreferrer"
								href={`https://classic.wowhead.com/?spell=${id}`}
								onMouseEnter={() =>
									this.setState({ isTooltipVisible: true })
								}
								onMouseLeave={() =>
									this.setState({ isTooltipVisible: false })
								}
							>
								{img}
							</a>
						</>
					) : (
						img
					)}
				</div>
			</>
		);
	};
}

export default Aura;
