import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './ScoreModal.css';

class ScoreModal extends Component {

    render() {

        const scores = (
            this.props.currentClass ? 
            this.props.classList[this.props.currentClass].map((el, i)=>{
                    return <PlayerScoreRow 
                    key={el +i} 
                    playerName={el} 
                    photo={this.props.playerPhoto[this.props.currentClass][el]["photo"] ? this.props.playerPhoto[this.props.currentClass][el]["photo"] : null }
                    />
            })
            : null
        )
        
        return (
            <div>
                <p style={{fontSize: 30, fontWeight: "600"}}>SCORES</p>
              {scores}
            </div>
        )
    }
};

const PlayerScoreRow = (props) => (
    <div className={classes.PlayerRow}>
        <p>
            {props.photo ?
            <img
                alt={props.playerName}
                src={props.photo}
                className={classes.PlayerImage}
            />
            : null}
        </p>
        <p>{props.playerName}</p>
    </div>
)

const mapStateToProps = state => {
    return {
        playerPhoto: state.classSettings.playerPhoto,
        classSettings: state.classSettings,
        auth: state.auth,
        classList: state.classSettings.classList
    }
};


export default connect(mapStateToProps, null)(ScoreModal);