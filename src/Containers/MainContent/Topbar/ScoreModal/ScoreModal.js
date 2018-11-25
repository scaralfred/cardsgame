import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './ScoreModal.css';
import star from '../../../../assets/star.png';

class ScoreModal extends Component {

    render() {

        const scores = (
            this.props.currentClass ? 
            this.props.classList[this.props.currentClass].map((el, i)=>{
                    return <PlayerScoreRow 
                    stars={this.props.starCounter}
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

const PlayerScoreRow = (props) => {
    
    const stars = () => {
        for (let i = 0; i <= props.stars; i++) {
           return ( <img
                    alt={""}
                    src={star}
                    className={classes.Stars}
                    />
                )
        }
} 

    return (

    <div className={classes.PlayerRow}>
        <div>
            {props.photo ?
            <img
                alt={props.playerName}
                src={props.photo}
                className={classes.PlayerImage}
            />
            : null}
        </div>
        <div>
            <div className={classes.PlayerName}>{props.playerName}</div>
            <div className={classes.Stars}>
                {stars()}
            </div>
        </div>
    </div>
    )
}

const mapStateToProps = state => {
    return {
        playerPhoto: state.classSettings.playerPhoto,
        classSettings: state.classSettings,
        auth: state.auth,
        classList: state.classSettings.classList,
        starCounter: state.classSettings.starCounter
    }
};


export default connect(mapStateToProps, null)(ScoreModal);