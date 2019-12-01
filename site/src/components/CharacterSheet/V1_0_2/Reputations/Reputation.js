import React from 'react';

import '../../../../sass/CharacterSheet/V1_0_2/Reputations/Reputation.scss';

export default ({ reputation }) => {
    const { name, standing, barMin, barMax, value } = reputation;

    let percent, max, val;
    if (value >= 0) {
        max = barMax;
        val = value;

        percent = `${Math.round((val / max) * 1000) / 10}%`;
    } else {
        max = Math.abs(barMin) - Math.abs(barMax);
        val = Math.abs(barMin) + value;

        percent = `${Math.round((val / max) * 1000) / 10}%`;
    }

    let label, color;
    switch (standing) {
        case 0:
            label = 'Unknown';
            color = 'light';
            break;
        case 1:
            label = 'Hated';
            color = 'danger';
            break;
        case 2:
            label = 'Hostile';
            color = 'danger';
            break;
        case 3:
            label = 'Unfriendly';
            color = 'danger';
            break;
        case 4:
            label = 'Neutral';
            color = 'warning';
            break;
        case 5:
            label = 'Friendly';
            color = 'success';
            break;
        case 6:
            label = 'Honored';
            color = 'success';
            break;
        case 7:
            label = 'Revered';
            color = 'success';
            break;
        case 8:
            label = 'Exalted';
            color = 'success';
            break;
        default:
            label = 'Unknown';
            color = 'light';
            break;
    }

    return (
        <div className="character-reputations-reputation">
            <div className="character-reputations-reputation-name">{name}</div>

            <div className="character-reputations-reputation-progress">
                <div className="progress">
                    <div
                        className={`progress-bar bg-${color}`}
                        style={{
                            width: percent
                        }}
                    ></div>

                    <div className="character-reputations-reputation-label">
                        {label}&nbsp;&nbsp;
                        {val.toLocaleString()}
                        &nbsp;&nbsp;/&nbsp;&nbsp;
                        {max.toLocaleString()}
                        &nbsp;&nbsp;{percent}
                    </div>
                </div>
            </div>
        </div>
    );
};

//   60.5%  -25,400  /  -42,000
//   97%  -2,911  /  -3,000
