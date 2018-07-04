import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classes from './NavBar.css';
import Modal from '../../Components/Modal/Modal';
import * as actions from '../../store/actions/index';

class NavBar extends Component {

    state = {
        modal: false
    }
    
    _onLogOut () {
        this.props.onLogOut();
        this._onShowModal();
    }

    _onShowModal() {
        this.setState({ ...this.state, modal: !this.state.modal });
    }

    render() {

        const modalContent = (
            <div>
                <div style={{ textAlign: "center", fontSize: 20, }}>Are you sure you want to log out?</div>
                <div style={{textAlign: "center", display: "flex", flex: 1, alignItems: "center", justifyContent: "center"}}>
                  <div onClick={()=>this._onLogOut()} style={{fontWeight: "bold", fontSize: 20, padding: 10, cursor: "pointer"}}>Yes</div>
                    <div onClick={() => this._onShowModal()} style={{ fontWeight: "bold", fontSize: 20, padding: 10, cursor: "pointer"}}>No</div>
                </div>
            </div>
        )

        const userLoggedIn = (
        <div style={{display: "flex", flexDirection:"row", cursor: "pointer"}}>
            <div className={classes.NavBarLink}>Settings</div>
            <Link to="/" className={classes.NavBarLink} onClick={() => this._onShowModal()}>Logout</Link>
        </div>
        )
        
        return (

        <div className={classes.NavBar}>
                <div style={{display: "flex", flex: 1 }}>
                    <Link to="/" className={classes.NavBarLink}>Home</Link>
                </div>
                <div style={{ display: "flex" }}>
                    { this.props.userName !== null ?
                        <div className={classes.HelloUser}>Hello {this.props.userName}</div>
                        :
                        null
                    }  
                    { !this.props.logIn ?
                        <Link to="/authenticate" className={classes.NavBarLink}>Authenticate</Link>
                        :
                        userLoggedIn
                    }
                </div>
                <Modal show={this.state.modal} modalClosed={()=>this._onShowModal()}>{modalContent}</Modal>
        </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        logIn: state.auth.token !== null,
        userName: state.auth.userName
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLogOut: () => dispatch(actions.logout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);