import React from 'react';

import Group from './Group';

import '../../../../sass/CharacterSheet/V1_0_2/Reputations/index.scss';

export default ({ reputations }) => {
    return (
        <div className="character-reputations">
            {reputations.map((group, key) => (
                <Group group={group} key={key} />
            ))}
        </div>
    );
};
