import React from 'react';

import '../../../../sass/CharacterSheet/V1_0_2/Skills/Skill.scss';

export default ({ skill }) => {
    const { name, modifier, description, maxRank, rank } = skill;

    let percent = Math.round(((rank + modifier) / maxRank) * 100);

    percent = percent > 100 ? 100 : percent;

    const percentString = `${percent}%`;

    console.log('percent', percent);

    return (
        <div className="character-skills-skill">
            <div className="character-skills-skill-name">{name}</div>

            <div className="character-skills-skill-progress">
                <div className="progress">
                    <div
                        className="progress-bar"
                        style={{
                            width: percentString
                        }}
                    ></div>

                    <div className="character-skills-skill-label">
                        {rank}&nbsp;&nbsp;
                        {modifier > 0 ? (
                            <span className="color-uncommon">
                                +&nbsp;&nbsp;
                                {modifier}
                                &nbsp;&nbsp;
                            </span>
                        ) : (
                            ''
                        )}
                        /&nbsp;&nbsp;
                        {maxRank}
                    </div>
                </div>
            </div>
        </div>
    );
};
