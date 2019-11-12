import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loading from './Loading';
import RecentUploads from './RecentUploads';

class Home extends Component {
    render() {
        const { global, session } = this.props;
        let sessionUploads, globalUploads;

        if (global.loaded) {
            globalUploads = (
                <RecentUploads
                    uploads={global.uploads.reverse()}
                    border="light"
                />
            );
        } else {
            globalUploads = <Loading />;
        }

        if (this.props.session.loaded) {
            if (this.props.session.uploads) {
                if (this.props.session.uploads.length > 0) {
                    sessionUploads = (
                        <div className="my-uploads col-md-6 col-lg-5">
                            <h4>My Uploads</h4>
                            <RecentUploads
                                uploads={session.uploads.reverse()}
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

        return (
            <div className="home container">
                <p className="lead">
                    Press <kbd>ctrl</kbd>+<kbd>v</kbd> anywhere on this page to
                    create a shareable armory page for your character.
                </p>
                <h3>How does this work?</h3>
                <h6>
                    1. Download the addon{' '}
                    <a
                        href="https://www.curseforge.com/wow/addons/classic-armory"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        here
                    </a>
                    .
                </h6>
                <h6>
                    2. Press <kbd>C</kbd> to open the character menu and click{' '}
                    <em className="text-success">Upload</em>.
                </h6>
                <h6>
                    3. Press <kbd>ctrl + c</kbd> in WoW.
                </h6>
                <h6>
                    4. Press <kbd>ctrl + v</kbd> anywhere on this website.
                </h6>
                <h6>5. Share your characters URL anywhere!</h6>

                <div className="uploads row">
                    <div className="global-uploads col-md-6 col-lg-5">
                        <h4>Recent Uploads</h4>
                        {globalUploads}
                    </div>
                    {sessionUploads}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    session: { ...state.session },
    global: { ...state.global }
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
