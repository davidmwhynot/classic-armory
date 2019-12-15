import React from 'react';

import '../../../sass/CharacterSheet/V1_0_2/Pvp.scss';

export default ({
	pvp: {
		stats: {
			lifetimeStats,
			sessionStats,
			rankProgress,
			lastWeekStats,
			yesterdayStats,
			thisWeekStats
		},
		rank
	}
}) => {
	const rankPercent = `${Math.round(rankProgress[0] * 1000) / 10}%`;

	let title;
	switch (rank[0]) {
		case 5:
			title = 'Private';
			break;
		case 6:
			title = 'Corporal';
			break;
		case 7:
			title = 'Sergeant';
			break;
		case 8:
			title = 'Master Sergeant';
			break;
		case 9:
			title = 'Sergeant Major';
			break;
		case 10:
			title = 'Knight';
			break;
		case 11:
			title = 'Knight-Lieutenant';
			break;
		case 12:
			title = 'Knight-Captain';
			break;
		case 13:
			title = 'Knight-Champion';
			break;
		case 14:
			title = 'Lieutenant Commander';
			break;
		case 15:
			title = 'Commander';
			break;
		case 16:
			title = 'Marshal';
			break;
		case 17:
			title = 'Field Marshal';
			break;
		case 18:
			title = 'Grand Marshal';
			break;
		default:
			title = '';
			break;
	}

	const rankNumber = rank[0] > 0 ? rank[0] - 4 : 0;

	return (
		<div className="character-pvp">
			<h3>
				Standing:{' '}
				<span className="text-info">
					{lastWeekStats[3].toLocaleString()}
				</span>
			</h3>

			<div className="character-pvp-rank progress">
				<div
					className="progress-bar"
					style={{
						width: rankPercent
					}}
				></div>

				<div className="character-pvp-rank-label">
					{rank[0] > 0 ? (
						<>
							{title}&nbsp;&nbsp;-&nbsp;&nbsp;Rank {rankNumber}
							&nbsp;&nbsp;-&nbsp;&nbsp;
							{rankPercent}
						</>
					) : (
						''
					)}
				</div>
			</div>
			{/* <pre>{JSON.stringify(pvp, null, '\t')}</pre> */}
		</div>
	);
};
