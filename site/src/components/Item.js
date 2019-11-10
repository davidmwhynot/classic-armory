import React, { Component } from 'react';
import './Wowhead.scss';

class Item extends Component {
	state = {
		isStatsVisible: false
	};

	render() {
		const { empty, slot } = this.props;

		let itemBody = null;

		if (empty) {
			itemBody = (
				<div className="item-body">
					<a href="#">
						<img
							src={
								process.env.PUBLIC_URL +
								'/icons/Empty/' +
								slot.replace(/[0-3]/, '') +
								'.png'
							}
							className="item-img"
						/>
					</a>
					<div className="item-description"></div>
				</div>
			);
		} else {
			const { iconUrl, itemName, quality, stats, link } = this.props;

			let style = this.state.isStatsVisible
				? { display: 'block' }
				: { display: 'none' };

			itemBody = (
				<div className="item-body">
					<a
						href={link}
						target="_blank"
						className="shader"
						onMouseEnter={() => {
							this.setState({ isStatsVisible: true });
						}}
						onMouseLeave={() => {
							this.setState({ isStatsVisible: false });
						}}
					>
						<img
							src={iconUrl}
							className={'item-img border-rarity-' + quality}
						/>
					</a>
					<div className="item-description">
						<div
							className={'item-stats border-rarity-' + quality}
							dangerouslySetInnerHTML={{ __html: stats }}
							style={style}
						/>
						<div className="item-name">
							<a
								href={link}
								target="_blank"
								className={'color-rarity-' + quality}
							>
								{itemName}
							</a>
						</div>
					</div>
				</div>
			);
		}

		return <div className={'item item-' + slot}>{itemBody}</div>;
	}
}

export default Item;
