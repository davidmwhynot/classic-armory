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

        let prereqDelta = 0;
        if (prereqs) {
            prereqDelta = tier + 1 - (prereqs.tier + 1);
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
                    <div
                        className="character-talents-talent-prereq"
                        style={{
                            height: `calc(${0.5 * prereqDelta}rem + ${45 *
                                (prereqDelta - 1)}px)`
                        }}
                    ></div>
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
