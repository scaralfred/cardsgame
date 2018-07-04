import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClassInList from './ClassInList/ClassInList';
import classes from './ClassModal.css';
import axios from 'axios';

class ClassModal extends Component {

    state = {
        classInput: ""
    }

    componentWillReceiveProps(nextProps) {
        const newValue = nextProps.classSettings;
        const loggingOut = nextProps.auth.token;

        if (newValue !== this.props.classSettings && this.props.auth.token && loggingOut === this.props.auth.token ) {
            localStorage.setItem('classSettings', JSON.stringify(newValue));
            this.updateServer(newValue);
        }
    }

    updateServer(newSettings) {
        
        let classSettings = { classSettings:  newSettings}
        
        let id = this.props.auth.classSettingsID;
        let url = "https://cards-game-login-server.herokuapp.com/school/" + id;
        axios.patch(url, classSettings, { headers: { "X-Auth": this.props.auth.token } })
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
    }

    _classListHandler(del, item) {
        if (del === "add") {
            if (!Object.keys(this.props.classList).includes(this.state.classInput.toString().toUpperCase()) && this.state.classInput.trim() !== "") {
                this.setState({ ...this.state, classInput: "" });
                this.props.onAddClass(this.state.classInput);
                // this.updateServer();
            } else {
                return
            }

        } else {
            this.props.onRemoveClass(item);
            // this.updateServer();
        }
    }

    render() {

        const showClasses = Object.keys(this.props.classList).map((item, i) => {
            return <ClassInList
                key={item + i}
                className={item}
                classList={this.props.classList}
                updateUI={(playerName, className)=>this.props.updateUI(playerName, className)}
                playersArray={this.props.classList[item]}
                showPlayerList={() => this._playerList()}
                deleteClass={() => this._classListHandler("delete", item)}
                onAddPlayer={(playerName, className) => this.props.onAddPlayer(playerName, className)}
                onRemovePlayer={(playerName, className) => this.props.onRemovePlayer(playerName, className)}
            />
        });

        const noClasses = (
            <div className={classes.NoClasses}>Click on the green button<br /> to add a class</div>
        )

        return (
            <div className={classes.ClassModal}>
                <div className={classes.ClassesManager}>Classes manager</div>
                <form className={classes.ClassUploader} onSubmit={() => this._classListHandler("add")}>
                    <input
                        className={classes.ClassInput}
                        placeholder="Class name" 
                        value={this.state.classInput} 
                        onChange={(event) => this.setState({ ...this.state, classInput: event.target.value })} 
                    />
                    <div className={classes.AddClassButton} onClick={() => this._classListHandler("add")}>Add Class</div>
                </form>
                <div style={{padding: 10}}>
                    {Object.keys(this.props.classList).length > 0 ? showClasses : noClasses}
                </div>
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


export default connect(mapStateToProps, null)(ClassModal);