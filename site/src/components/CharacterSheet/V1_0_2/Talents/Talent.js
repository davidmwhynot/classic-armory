import React, { Component } from 'react';

import '../../../../sass/CharacterSheet/V1_0_2/Talents/Talent.scss';

class Talent extends Component {
	state = {
		isTooltipVisible: false
	};

	render = () => {
		const {
			prereqs,
			name,
			tooltip,
			icon,
			rank: { max, current },
			tier,
			column
		} = this.props.talent;

		let tooltipHTML = '';

		for (const line of tooltip) {
			tooltipHTML += `<div class="character-talents-talent-tooltip-line">${line}</div>`;
		}

		const isInactive = current === 0;

		// generate prereq indicators
		let prereqHasHori, prereqHasVert, prereqHori, prereqVert;
		if (prereqs) {
			const { tier: prereqTier, column: prereqColumn } = prereqs;

			prereqHasHori = prereqColumn - column !== 0;
			prereqHasVert = prereqTier - tier !== 0;

			if (prereqHasHori && prereqHasVert) {
				const prereqHoriDelta = column - prereqColumn;
				const prereqVertDelta = tier - prereqTier;

				prereqHori = {
					width: `calc(${0.5 * prereqHoriDelta}rem + ${27.5 *
						prereqHoriDelta}px)`,
					bottom: 'calc(150% + 0.5rem)',
					left: '-0.5rem',
					height: 10,
					transform: 'translateY(50%)'
					// borderTopWidth: 1,
					// borderBottomWidth: 1
				};

				prereqVert = {
					height: `calc(${0.5 * prereqVertDelta}rem + ${27.5 *
						prereqVertDelta}px)`,
					bottom: '100%',
					left: '50%',
					width: 10,
					transform: 'translateX(-50%)'
					// borderLeftWidth: 1,
					// borderRightWidth: 1
				};
			} else if (prereqHasHori) {
				const prereqHoriDelta = column - prereqColumn;

				prereqHori = {
					width: `calc(${0.5 * prereqHoriDelta}rem + ${45 *
						(prereqHoriDelta - 1)}px)`,
					top: '50%',
					right: '100%',
					height: 10,
					transform: 'translateY(-50%)'
					// borderTopWidth: 1,
					// borderBottomWidth: 1
				};
			} else {
				// vertical only
				const prereqVertDelta = tier - prereqTier;

				prereqVert = {
					height: `calc(${0.5 * prereqVertDelta}rem + ${45 *
						(prereqVertDelta - 1)}px)`,
					bottom: '100%',
					left: '50%',
					width: 10,
					transform: 'translateX(-50%)'
					// borderLeftWidth: 1,
					// borderRightWidth: 1
				};
			}
		}

		return (
			<div
				className="character-talents-talent"
				style={{
					gridRow: tier + 1,
					gridColumn: column + 1
				}}
			>
				<img
					className={`character-talents-talent-icon${
						isInactive
							? ' character-talents-talent-icon-inactive'
							: ''
					}`}
					onMouseEnter={() =>
						this.setState({ isTooltipVisible: true })
					}
					onMouseLeave={() =>
						this.setState({ isTooltipVisible: false })
					}
					src={`${process.env.PUBLIC_URL}/icons/${icon}.jpg`}
					alt="icon"
				></img>

				{prereqs ? (
					<>
						{prereqHasHori ? (
							<div
								className="character-talents-talent-prereq"
								style={prereqHori}
							></div>
						) : (
							''
						)}
						{prereqHasVert ? (
							<div
								className="character-talents-talent-prereq"
								style={prereqVert}
							></div>
						) : (
							''
						)}
					</>
				) : (
					''
				)}

				<div className="character-talents-talent-points">
					{current} / {max}
				</div>

				<div
					className="character-talents-talent-tooltip"
					style={{
						display: this.state.isTooltipVisible ? 'block' : 'none'
					}}
					dangerouslySetInnerHTML={{ __html: tooltipHTML }}
				></div>
			</div>
		);
	};
}

export default Talent;
