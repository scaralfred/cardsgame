import React, { Component } from 'react';
import ClassInList from './ClassInList/ClassInList';
import classes from './ClassModal.css'

class ClassModal extends Component {

    state = {
        classInput: ""
    }

    // componentDidMount() {
    //     document.addEventListener('keydown', this.onKeyDown);
    // }
    // onKeyDown = (event) => {
    //     if (event.code === 'Enter') {
    //         this._classListHandler("add");
    //         event.preventDefault();
    //     }
    // }

    // componentWillUnmount() {
    //     document.removeEventListener('keydown', this.onKeyDown);
    // }

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
                playersArray={this.props.classList[item]}
                showPlayerList={() => this._playerList()}
                deleteClass={() => this._classListHandler("delete", item)}
                onAddPlayer={(playerName, className) => this.props.onAddPlayer(playerName, className)}
                onRemovePlayer={(playerName, className) => this.props.onRemovePlayer(playerName, className)}
            />
        });

        return (
            <div>
                <form className={classes.ClassModal} onSubmit={() => this._classListHandler("add")}>
                    <input
                        className={classes.ClassInput}
                        placeholder="Class name" 
                        value={this.state.classInput} 
                        onChange={(event) => this.setState({ ...this.state, classInput: event.target.value })} 
                    />
                    <div className={classes.AddClassButton} onClick={() => this._classListHandler("add")}>Add Class</div>
                </form>
                <div>
                    {showClasses}
                </div>
            </div>
        )
    }
};

export default ClassModal;