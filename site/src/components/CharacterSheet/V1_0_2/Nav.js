import React from 'react';

import '../../../sass/CharacterSheet/V1_0_2/Nav.scss';

export default ({ name, active, changeTab }) => {
	return (
		<div className="character-nav">
			<ul
				className="nav nav-pills"
				id="characterSheetTabs"
				role="tablist"
			>
				<li className="nav-item">
					<button
						className={`nav-link${
							active === 'equipped' ? ' active' : ''
						}`}
						onClick={() => changeTab('equipped')}
					>
						{name}
					</button>
				</li>
				<li className="nav-item">
					<button
						className={`nav-link${
							active === 'stats' ? ' active' : ''
						}`}
						onClick={() => changeTab('stats')}
					>
						Stats
					</button>
				</li>
				<li className="nav-item">
					<button
						className={`nav-link${
							active === 'talents' ? ' active' : ''
						}`}
						onClick={() => changeTab('talents')}
					>
						Talents
					</button>
				</li>
				<li className="nav-item">
					<button
						className={`nav-link${
							active === 'inventory' ? ' active' : ''
						}`}
						onClick={() => changeTab('inventory')}
					>
						Inventory
					</button>
				</li>
				<li className="nav-item">
					<button
						className={`nav-link${
							active === 'pvp' ? ' active' : ''
						}`}
						onClick={() => changeTab('pvp')}
					>
						PvP
					</button>
				</li>
				<li className="nav-item">
					<button
						className={`nav-link${
							active === 'reputation' ? ' active' : ''
						}`}
						onClick={() => changeTab('reputation')}
					>
						Reputation
					</button>
				</li>
				<li className="nav-item">
					<button
						className={`nav-link${
							active === 'skills' ? ' active' : ''
						}`}
						onClick={() => changeTab('skills')}
					>
						Skills
					</button>
				</li>
			</ul>
		</div>
	);
};
