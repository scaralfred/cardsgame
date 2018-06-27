import React, { Component } from 'react';
import classes from './ClassInList.css';
import { IoTrashA, IoCamera, IoClose } from 'react-icons/lib/io';

class ClassInList extends Component {

    state = {
        playerList: false,
        addPlayer: false,
        playerNameInput: ""
    }

    onShowPlayerList() {
        this.setState({ ...this.state, playerList: !this.state.playerList })
    }

    _addPlayer() {
        if (!this.props.playersArray.includes(this.state.playerNameInput.toString().toUpperCase()) && this.state.playerNameInput.trim() !== "") {
            this.setState({ ...this.state, playerNameInput: "" });
            this.props.onAddPlayer(this.state.playerNameInput, this.props.className);
        } else {
            return
        }
    }

    render() {

        const playerList = this.props.playersArray.map((item) => {
            return <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", margin: 5, marginRight: 38, }}>
                <div className={classes.PlayerName}>{item}</div>
                <IoCamera className={classes.PhotoIcon} onClick={null} />
                <IoClose className={classes.RemovePlayerIcon} onClick={() => this.props.onRemovePlayer(item, this.props.className)} />
            </div>
        })

        const addPlayerInput = (
            <div>
                <form className={classes.AddPlayerInput} onSubmit={() => this._playersHandler("add")}>
                    <input placeholder="Player name" value={this.state.playerNameInput} onChange={(event) => this.setState({ ...this.state, playerNameInput: event.target.value })} />
                    <div onClick={() => this._addPlayer()}>&nbsp;&nbsp;&nbsp;Add</div>
                </form>
            </div>
        )

        return (
            <div style={{margin: 5}}>
                <div className={classes.ClassName}>
                    <div onClick={() => this.onShowPlayerList()}>{this.props.className}</div>
                    {this.state.playerList ? <div className={classes.AddPlayerButton} onClick={() => this.setState({ ...this.state, addPlayer: !this.state.addPlayer })}>&nbsp;Add Player</div> : null}
                    <IoTrashA className={classes.RemoveClassIcon} onClick={this.props.deleteClass} />
                </div>
                {this.state.addPlayer && this.state.playerList || this.state.playerList && this.props.playersArray.length === 0 ? addPlayerInput : null}
                {this.state.playerList ? playerList : null}
            </div>
        )
    }
};

export default ClassInList;