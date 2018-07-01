import React, { Component } from 'react';
import ClassInList from './ClassInList/ClassInList';
import classes from './ClassModal.css'

class ClassModal extends Component {

    state = {
        classInput: ""
    }

    _classListHandler(del, item) {
        if (del === "add") {
            if (!Object.keys(this.props.classList).includes(this.state.classInput.toString().toUpperCase()) && this.state.classInput.trim() !== "") {
                this.setState({ ...this.state, classInput: "" });
                this.props.onAddClass(this.state.classInput);
            } else {
                return
            }

        } else {
            this.props.onRemoveClass(item);
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

export default ClassModal;