import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadCharacter } from '../../actions/characterActions';

// components
import Fade from '../../components/Fade';
import Loading from '../../components/Loading';
import RecentUploads from '../../components/RecentUploads';
import CharacterUploads from '../../components/CharacterSheet/V1_0_2/CharacterUploads';
import Nav from '../../components/CharacterSheet/V1_0_2/Nav';
import Inventory from '../../components/CharacterSheet/V1_0_2/Inventory';
import Reputations from '../../components/CharacterSheet/V1_0_2/Reputations';
import Skills from '../../components/CharacterSheet/V1_0_2/Skills';
import Stats from '../../components/CharacterSheet/V1_0_2/Stats';
import Talents from '../../components/CharacterSheet/V1_0_2/Talents';
import Equipped from '../../components/CharacterSheet/V1_0_2/Equipped/index';
import Header from '../../components/CharacterSheet/V1_0_2/Header';
import Pvp from '../../components/CharacterSheet/V1_0_2/Pvp';
import Share from '../../components/CharacterSheet/V1_0_2/Share';
import Xp from '../../components/CharacterSheet/V1_0_2/Xp';

import '../../sass/CharacterSheet/V1_0_2/index.scss';

class V1_0_2 extends Component {
	state = {
		active: 'equipped',
		transitionState: ''
	};

	changeTab = tab => {
		if (tab !== this.state.active) {
			this.setState({ transitionState: 'fading' });

			setTimeout(() => {
				this.setState({ active: tab, transitionState: '' });
			}, 100);
		}
	};

	render() {
		const {
			time,
			name,
			region,
			realm,
			guild,
			race,
			sex,
			level,
			class: className,
			money,
			xp,
			stats,
			talents,
			skills,
			reps,
			pvp,
			buffs,
			debuffs,
			items: { bags, equipped, bank }
		} = this.props.character;

		const { global, session, uploads } = this.props;
		let sessionUploads, globalUploads;

		if (global.loaded) {
			globalUploads = (
				<RecentUploads uploads={global.uploads} border="light" />
			);
		} else {
			globalUploads = <Loading />;
		}

		if (this.props.session.loaded) {
			if (this.props.session.uploads) {
				if (this.props.session.uploads.length > 0) {
					sessionUploads = (
						<div className="character-session-uploads">
							<h3>My Uploads</h3>
							<RecentUploads
								uploads={session.uploads}
								border="info"
							/>
						</div>
					);
				} else {
					sessionUploads = null;
				}
			} else {
				sessionUploads = null;
			}
		} else {
			sessionUploads = <Loading />;
		}

		let view;
		switch (this.state.active) {
			case 'equipped':
				view = <Equipped equipped={equipped} key={'equipped'} />;
				break;
			case 'stats':
				view = (
					<Stats
						stats={stats}
						buffs={buffs}
						debuffs={debuffs}
						key={'debuffs'}
					/>
				);
				break;
			case 'talents':
				view = <Talents talents={talents} key={'talents'} />;
				break;
			case 'inventory':
				view = (
					<Inventory
						bags={bags}
						bank={bank}
						money={money}
						key={'money'}
					/>
				);
				break;
			case 'pvp':
				view = <Pvp pvp={pvp} key={'pvp'} />;
				break;
			case 'reputation':
				view = <Reputations reputations={reps} key={'reps'} />;
				break;
			case 'skills':
				view = <Skills skills={skills} key={'skills'} />;
				break;
			default:
				view = <Equipped equipped={equipped} key={'equipped'} />;
				break;
		}

		return (
			<div className="character-v1-0-2 container">
				<div className="character-container">
					<div className="character-left">
						{sessionUploads}

						<div className="character-global-uploads">
							<h3>Recent Uploads</h3>

							{globalUploads}
						</div>
					</div>

					<div className="character-center">
						<Header
							time={time}
							name={name}
							rank={pvp.rank[0]}
							region={region}
							realm={realm}
							guild={guild}
							level={level}
							race={race}
							sex={sex}
							className={className}
						/>

						<Xp xp={xp} level={level} />

						<Nav
							name={name}
							active={this.state.active}
							changeTab={this.changeTab}
						/>

						<Fade transitionState={this.state.transitionState}>
							{view}
						</Fade>
					</div>

					<div className="character-right">
						<Share />

						<CharacterUploads uploads={uploads} />
					</div>
				</div>

				{/* <h1>Props</h1>
				<pre>{JSON.stringify(this.props, null, '\t')}</pre> */}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	...ownProps,
	session: state.session,
	global: state.global,
	character: state.character.data,
	uploads: state.character.uploads
});

const mapDispatchToProps = { loadCharacter };

export default connect(mapStateToProps, mapDispatchToProps)(V1_0_2);
