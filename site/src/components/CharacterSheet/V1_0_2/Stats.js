import React from 'react';

import Auras from './Auras';

import '../../../sass/CharacterSheet/V1_0_2/Stats.scss';

export default ({ stats, buffs, debuffs }) => {
	const reducer = (acc, n) => acc + n;

	const strength = stats.strength.unit[0];
	const stamina = stats.agility.unit[0];
	const agility = stats.stamina.unit[0];
	const intellect = stats.intellect.unit[0];
	const spirit = stats.spirit.unit[0];
	const armor = stats.armor.unit[0];

	return (
		<div className="character-stats">
			{buffs.length > 0 || debuffs.length > 0 ? (
				<>
					<p className="character-stats-warning-auras text-muted font-italic">
						Character stats may be skewed from their base amounts
						due to the following buffs and/or debuffs.
					</p>
					<Auras buffs={buffs} debuffs={debuffs} />
				</>
			) : (
				''
			)}

			<div className="character-stats-tables">
				<table className="table table-borderless character-stats-general">
					<thead className="thead-dark">
						<tr>
							<th colspan="2">General</th>
						</tr>
					</thead>

					<tbody>
						<tr>
							<td>Strength</td>
							<td>{strength}</td>
						</tr>

						<tr>
							<td>Agility</td>
							<td>{agility}</td>
						</tr>

						<tr>
							<td>Stamina</td>
							<td>{stamina}</td>
						</tr>

						<tr>
							<td>Intellect</td>
							<td>{intellect}</td>
						</tr>

						<tr>
							<td>Spirit</td>
							<td>{spirit}</td>
						</tr>

						<tr>
							<td>Armor</td>
							<td>{armor}</td>
						</tr>
					</tbody>
				</table>

				<table className="table table-borderless character-stats-melee">
					<thead className="thead-dark">
						<tr>
							<th colspan="2">Melee</th>
						</tr>
					</thead>

					<tbody>
						<tr>
							<td>Hit</td>
							<td>{stats.hit.melee.chance}%</td>
						</tr>

						<tr>
							<td>Crit</td>
							<td>{Math.round(stats.crit.melee * 100) / 100}%</td>
						</tr>

						<tr>
							<td>Power</td>
							<td>
								{Math.round(
									stats.attackPower.melee.reduce(reducer)
								)}
							</td>
						</tr>

						<tr className="table-dark">
							<th colspan="2">Main Hand</th>
						</tr>

						<tr>
							<td>Damage</td>
							<td>
								{Math.round(stats.damage.melee[0])}-
								{Math.round(stats.damage.melee[1])}
							</td>
						</tr>

						<tr>
							<td>Speed</td>
							<td>
								{Math.round(stats.speed.melee[0] * 100) / 100}s
							</td>
						</tr>

						<tr className="table-dark">
							<th colspan="2">Off Hand</th>
						</tr>

						<tr>
							<td>Damage</td>
							<td>
								{Math.round(stats.damage.melee[2])}-
								{Math.round(stats.damage.melee[3])}
							</td>
						</tr>

						<tr>
							<td>Speed</td>
							<td>
								{Math.round(stats.speed.melee[1] * 100) / 100}s
							</td>
						</tr>
					</tbody>
				</table>

				<table className="table table-borderless character-stats-ranged">
					<thead className="thead-dark">
						<tr>
							<th colspan="2">Ranged</th>
						</tr>
					</thead>

					<tbody>
						<tr>
							<td>Hit</td>
							<td>{stats.hit.ranged.chance}%</td>
						</tr>

						<tr>
							<td>Crit</td>
							<td>
								{Math.round(stats.crit.ranged * 100) / 100}%
							</td>
						</tr>

						<tr>
							<td>Power</td>
							<td>
								{Math.round(
									stats.attackPower.ranged.reduce(reducer)
								)}
							</td>
						</tr>

						<tr>
							<td>Damage</td>
							<td>
								{Math.round(stats.damage.ranged[1])}-
								{Math.round(stats.damage.ranged[2])}
							</td>
						</tr>

						<tr>
							<td>Speed</td>
							<td>
								{Math.round(stats.speed.ranged * 100) / 100}s
							</td>
						</tr>
					</tbody>
				</table>

				<table className="table table-borderless character-stats-spell">
					<thead className="thead-dark">
						<tr>
							<th colspan="2">Spell</th>
						</tr>
					</thead>

					<tbody>
						<tr>
							<td>Hit</td>
							<td>{stats.hit.spell}%</td>
						</tr>

						<tr>
							<td>Crit</td>
							<td>{Math.round(stats.crit.spell * 100) / 100}%</td>
						</tr>

						<tr>
							<td>Mana Regen</td>
							<td>{stats.mpTick.casting}</td>
						</tr>

						<tr>
							<td>MP5</td>
							<td>{stats.mp5.casting}</td>
						</tr>

						<tr className="table-dark">
							<th colspan="2">Bonuses</th>
						</tr>

						<tr>
							<td>Healing</td>
							<td>{stats.healing}</td>
						</tr>

						<tr>
							<td>Holy</td>
							<td>{stats.spellDamage.holy}</td>
						</tr>

						<tr>
							<td>Arcane</td>
							<td>{stats.spellDamage.arcane}</td>
						</tr>

						<tr>
							<td>Nature</td>
							<td>{stats.spellDamage.nature}</td>
						</tr>

						<tr>
							<td>Fire</td>
							<td>{stats.spellDamage.fire}</td>
						</tr>

						<tr>
							<td>Frost</td>
							<td>{stats.spellDamage.frost}</td>
						</tr>

						<tr>
							<td>Shadow</td>
							<td>{stats.spellDamage.shadow}</td>
						</tr>
					</tbody>
				</table>

				<table className="table table-borderless character-stats-defense">
					<thead className="thead-dark">
						<tr>
							<th colspan="2">Defense</th>
						</tr>
					</thead>

					<tbody>
						<tr>
							<td>Dodge</td>
							<td>{Math.round(stats.dodge * 100) / 100}%</td>
						</tr>

						<tr>
							<td>Parry</td>
							<td>{Math.round(stats.parry * 100) / 100}%</td>
						</tr>

						<tr>
							<td>Block</td>
							<td>{stats.block.value}</td>
						</tr>

						<tr>
							<td>Block %</td>
							<td>
								{Math.round(stats.block.chance * 100) / 100}%
							</td>
						</tr>

						<tr>
							<td>Defense</td>
							<td>{stats.defense.total}</td>
						</tr>

						<tr className="table-dark">
							<th colspan="2">Resistances</th>
						</tr>

						<tr>
							<td>Arcane</td>
							<td>{stats.resist.arcane[1]}</td>
						</tr>

						<tr>
							<td>Nature</td>
							<td>{stats.resist.nature[1]}</td>
						</tr>

						<tr>
							<td>Fire</td>
							<td>{stats.resist.fire[1]}</td>
						</tr>

						<tr>
							<td>Frost</td>
							<td>{stats.resist.frost[1]}</td>
						</tr>

						<tr>
							<td>Shadow</td>
							<td>{stats.resist.shadow[1]}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};
