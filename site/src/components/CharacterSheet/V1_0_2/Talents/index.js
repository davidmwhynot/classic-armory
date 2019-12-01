import React from 'react';

import Tree from './Tree';
import trees from './trees.json';

import '../../../../sass/CharacterSheet/V1_0_2/Talents/index.scss';

export default ({ talents }) => {
    console.log('talents', talents);
    console.log('trees', trees);

    return (
        <div className="character-talents">
            {talents.map((tree, key) => (
                <Tree
                    tree={
                        trees.warrior.find(
                            tr => tr.name === tree.name.toLowerCase()
                        ).talents
                    }
                    charData={tree}
                    key={key}
                />
            ))}
        </div>
    );
};
