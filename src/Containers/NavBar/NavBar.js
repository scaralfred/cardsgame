import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classes from './NavBar.css';
import Modal from '../../Components/Modal/Modal'
import * as actions from '../../store/actions/auth';

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
                  <div onClick={()=>this._onLogOut()} style={{ fontSize: 20, padding: 10}}>Yes</div>
                    <div onClick={() => this._onShowModal()} style={{ fontSize: 20, padding: 10}}>No</div>
                </div>
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
                    { !this.props.logIn !== null ?
                        <Link to="/authenticate" className={classes.NavBarLink}>Authenticate</Link>
                        :
                        null
                    }
                    { this.props.logIn !== null ?
                        <Link to="/" className={classes.NavBarLink} onClick={()=>this._onShowModal()}>Logout</Link>
                        :
                        null
                    }

                </div>
                <Modal show={this.state.modal} modalClosed={()=>this._onShowModal()}>{modalContent}</Modal>
        </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        logIn: state.auth.token,
        userName: state.auth.userName
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLogOut: () => dispatch(actions.logout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);