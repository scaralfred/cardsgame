import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/index';
import classes from './ClassInList.css';
import { IoTrashA, IoArrowDownB, IoArrowLeftB } from 'react-icons/lib/io';
import PlayerRow from './PlayerRow/PlayerRow';

class ClassInList extends Component {

    state = {
        playerList: false,
        playerNameInput: ""
    }


    onShowPlayerList() {
        this.setState({ ...this.state, playerList: !this.state.playerList })
    }

    _addPlayer() {
        if (!this.props.playersArray.includes(this.state.playerNameInput.toString().toUpperCase()) && this.state.playerNameInput.trim() !== "") {
            this.setState({ ...this.state, playerNameInput: "" });
            this.props.onAddPlayer(this.state.playerNameInput.toString().toUpperCase(), this.props.className);
            this.props.updateUI(this.state.playerNameInput.toString().toUpperCase(), this.props.className);
        } else {
            return
        }
    }

    _removePlayer(item, className) {
        this.props.onRemovePlayer(item, className);
    }

    render() {

        

        const playerList = (
            this.props.classList[this.props.className].length > 0 ?
                this.props.playersArray.map((item, i) => {
                    return (
                        <PlayerRow 
                            key={item + i}
                            playerName={item}
                            className={this.props.className}
                            onRemovePlayer={() => this._removePlayer(item, this.props.className)}
                        />
                    )
                }) : <div style={{ margin: 10 }}>No players yet! Add a new one :)</div>
        )

        const addPlayerInput = (
            <div style={{marginTop: 8, marginBottom: 12}}>
                <form className={classes.AddPlayerInput} onSubmit={() => this._playersHandler("add")}>
                    <input className={classes.InputField} placeholder="Player name" value={this.state.playerNameInput} onChange={(event) => this.setState({ ...this.state, playerNameInput: event.target.value })} />
                    <div className={classes.AddPlayerButton} onClick={() => this._addPlayer()}>Add&nbsp;Player</div>
                </form>
            </div>
        ) 

        return (
            <div className={classes.Container}>
                <div onClick={() => this.onShowPlayerList()} className={classes.ClassName} style={!this.state.playerList ? {borderBottom: "none"} : null}>
                    <div>{this.props.className}</div>
                    <div  style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        {this.state.playerList ? <IoArrowLeftB className={classes.RemoveClassIcon} style={{ paddingTop: 7 }} /> : <IoArrowDownB className={classes.RemoveClassIcon} style={{paddingTop: 7}}/>}
                        <IoTrashA className={classes.RemoveClassIcon} onClick={this.props.deleteClass} />
                    </div>
                </div>
                {this.state.playerList ?
                <div className={classes.PlayerList}>
                        {playerList}
                        {addPlayerInput}
                </div>
                : null }
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        playerPhoto: state.classSettings.playerPhoto,
        classSettings: state.classSettings,
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onUploadPhoto: (className, playerName, fileURL) => dispatch(actions.uploadPhoto(className, playerName, fileURL)),
        onRemovePhoto: (className, playerName) => dispatch(actions.removePhoto(className, playerName))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassInList);