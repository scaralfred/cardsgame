import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayerRow from '../ClassModal/ClassInList/PlayerRow/PlayerRow';

class ScoreModal extends Component {

    render() {

        return (
            <div>
              <PlayerScoreRow />
            </div>
        )
    }
};

const PlayerScoreRow = (props) => (
    <div>Coming Soon!
    </div>
)

const mapStateToProps = state => {
    return {
        playerPhoto: state.classSettings.playerPhoto,
        classSettings: state.classSettings,
        auth: state.auth
    }
};


export default connect(mapStateToProps, null)(ScoreModal);