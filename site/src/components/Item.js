import React from 'react';

const Item = props => {
	console.log('props', props);

	const { empty, slot } = props;

	let itemBody = null;

	if (empty) {
		itemBody = (
			<div className="item-body">
				<img
					src={
						process.env.PUBLIC_URL +
						'/icons/Empty/' +
						slot.replace(/[0-3]/, '') +
						'.png'
					}
				/>
			</div>
		);
	} else {
		const { iconUrl, itemName, rarity, stats, link, level } = props;

		itemBody = (
			<div className="item-body">
				<img src={iconUrl} />
				<div className="item-description">
					<div class={'item-name color-rarity-' + rarity}>{itemName}</div>
					<div className="item-stats">
						{stats.map(stat => {
							return (
								<div className="item-stat">
									<div className="item-stat-label">{stat.name}</div>
									<div className="item-stat-value">{stat.value}</div>
								</div>
							);
						})}
					</div>
					<div className="item-level">Level: {level}</div>
					<div className="item-link">
						<a href={link}>Wowhead Link</a>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={'item item-' + slot}>
			<div className="item-header">{slot}</div>
			{itemBody}
		</div>
	);
};

export default Item;
