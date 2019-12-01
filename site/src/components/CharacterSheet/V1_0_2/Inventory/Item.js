import React from 'react';

import Icon from '../Icon';

import '../../../../sass/CharacterSheet/V1_0_2/Inventory/Item.scss';

export default ({ item }) => {
    if (item.id) {
        const {
            id,
            enchant,
            data: { name, quality, icon, tooltip }
        } = item;

        let qualityName;

        switch (quality) {
            case 0:
                qualityName = 'poor';
                break;
            case 1:
                qualityName = 'common';
                break;
            case 2:
                qualityName = 'uncommon';
                break;
            case 3:
                qualityName = 'rare';
                break;
            case 4:
                qualityName = 'epic';
                break;
            case 5:
                qualityName = 'legendary';
                break;
            default:
                qualityName = '';
                break;
        }

        return (
            <>
                <Icon
                    path={`${icon}.jpg`}
                    rarity={qualityName}
                    id={id}
                    tooltip={tooltip}
                />
            </>
        );
    }
};
