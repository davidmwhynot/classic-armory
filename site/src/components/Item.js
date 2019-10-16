import React, { Component } from 'react';

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
			const { iconUrl, itemName, rarity, stats, link } = this.props;

			itemBody = (
				<div className="item-body">
					<a href={link}>
						<img
							src={iconUrl}
							className={'item-img border-rarity-' + rarity}
							onMouseEnter={() => {
								this.setState({ isStatsVisible: true });
							}}
							onMouseLeave={() => {
								this.setState({ isStatsVisible: false });
							}}
						/>
					</a>
					<div className="item-description">
						<div
							className={'item-stats border-rarity-' + rarity}
							dangerouslySetInnerHTML={{ __html: stats }}
							style={{ display: this.state.isStatsVisible ? 'block' : 'none' }}
						/>
						<div className="item-name">
							<a href={link} className={'color-rarity-' + rarity}>
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
