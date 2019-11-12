import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import '../sass/Wowhead.scss';

class Item extends Component {
    state = {
        isStatsVisible: false
    };

    render() {
        const { empty, slot } = this.props;

        let itemBody = null;

        if (empty) {
            itemBody = (
                <div className="item-body">
                    {/* eslint-disable-next-line */}
                    <a href="#">
                        <img
                            src={
                                process.env.PUBLIC_URL +
                                '/icons/Empty/' +
                                slot.replace(/[0-3]/, '') +
                                '.png'
                            }
                            className="item-img"
                            alt={'icon for ' + slot}
                        />
                    </a>
                    <div className="item-description"></div>
                </div>
            );
        } else {
            const { iconUrl, itemName, quality, stats, link } = this.props;

            itemBody = (
                <div className="item-body">
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shader"
                        onMouseEnter={() => {
                            this.setState({ isStatsVisible: true });
                        }}
                        onMouseLeave={() => {
                            this.setState({ isStatsVisible: false });
                        }}
                    >
                        <img
                            src={iconUrl}
                            className={'item-img border-rarity-' + quality}
                            alt={'icon for ' + slot}
                        />
                    </a>
                    <div className="item-description">
                        <ReactCSSTransitionGroup
                            transitionEnterTimeout={0}
                            transitionLeaveTimeout={0}
                            transitionName="stats"
                        >
                            {this.state.isStatsVisible ? (
                                <div
                                    className={
                                        'item-stats border-rarity-' + quality
                                    }
                                    dangerouslySetInnerHTML={{ __html: stats }}
                                />
                            ) : (
                                ''
                            )}
                        </ReactCSSTransitionGroup>
                        <div className="item-name">
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={'color-rarity-' + quality}
                            >
                                {itemName}
                            </a>
                        </div>
                    </div>
                </div>
            );
        }

        return <div className={'item item-' + slot}>{itemBody}</div>;
    }
}

export default Item;
