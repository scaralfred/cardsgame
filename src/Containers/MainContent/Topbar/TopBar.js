import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Button from '../../../Components/Button/Button';
import classes from './TopBar.css';
import MainLogo from '../../../assets/card-game-logo.png';
import DefaultFace from '../../../assets/Default-face.jpg';
import MiniStar from '../../../assets/mini-star.png';
import MiniStarRemove from '../../../assets/remove-mini-star.png';
import Modal from '../../../Components/Modal/Modal';
import ClassModal from './ClassModal/ClassModal';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class TopBar extends Component {

    state = {
        classModal: false
    }

    componentDidMount() {
        document.addEventListener('keydown', this.onKeyDown);
    }
    onKeyDown = (event) => {
        if (event.code === 'Space') {
            this.props.onAddStar();
            event.preventDefault();
        } else if (event.key === 'Backspace') {
            this.props.onRemoveStar();
        }
    }

    componentWillUnmount(){
        document.removeEventListener('keydown', this.onKeyDown);
    }

    onResetCards() {
        this.props.onResetStars();
        this.props.resetGame();
    }

    _classModal(){
        this.setState({...this.state, classModal: !this.state.classModal});
        if (this.state.classModal) {
            document.addEventListener('keydown', this.onKeyDown);
        } else {
            document.removeEventListener('keydown', this.onKeyDown);
        }
    }

    render() {

        const starRenderer = [];
       
        for (let i = 0; i < this.props.starCtr; i++) {
                starRenderer.push(<img key={i} alt="star" src={MiniStar} style={{height: 35, padding: 3}}/>)
            }

        const classDropDownMenu = (
            <div style={{ display: "flex", flexDirection: "row" }}>
                <Dropdown options={Object.keys(this.props.classList)}  placeholder="Select an option" />
                <span onClick={()=>this._classModal()}>&nbsp;+</span>
            </div>    
        );

        const classUploader = ( 
        Object.keys(this.props.classList).length > 0 || this.state.classModal ? classDropDownMenu 
        : <div>Click <span style={{textDecoration: "underline", cursor: "pointer"}} onClick={()=>this._classModal()}>here</span><br /> to add a class</div>
        );
        
        return (
            <div className={classes.TopBar}>
                <div className={classes.LogoSection}>
                {this.props.isLoggedIn ? classUploader : null}
                    <img alt="logo" width={160} src={MainLogo} />
                </div>
                <div className={classes.FaceSection}>
                    <img alt="Face" src={DefaultFace} style={{height: 150, borderRadius: "50%"}}/>
                    <div style={{display: "flex", marginTop: 15}}>
                        <Button style={{ backgroundColor: "#fff", margin: 6, padding: 7, paddingRight: 15, paddingLeft: 15, fontSize: 0 }} onClick={this.props.onAddStar}>
                            <img alt="star" src={MiniStar} height={40}/>
                        </Button>
                        <Button style={{ backgroundColor: "#fff", margin: 6, padding: 7, paddingRight: 15, paddingLeft: 15, fontSize: 0 }} onClick={this.props.onRemoveStar}>
                            <img alt="star" height={40} src={MiniStarRemove} />
                        </Button>
                    </div>
                </div>
                <div className={classes.StarSection}>
                    <div style={{ display: "flex", alignItems: "center"}}>
                        <div style={{flex: 1, textAlign: "center", fontSize: "2rem", fontWeight: 700 }}>Class</div>
                        <div>
                            <Button style={{ background: "#FF1493"}} onClick={()=>this.props.onResetStars()}>RESET STARS</Button>
                        </div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <div style={{display: "flex", flex: 1, padding: 10}}>
                           <div style={{textAlign: "left"}}>
                                {starRenderer}
                           </div>
                        </div>
                        <div style={{ textAlign: "center", fontSize: "5rem", fontWeight: 700, paddingRight: 25 }}>
                            {this.props.starCtr}
                        </div>
                    </div>
                </div>
                <div className={classes.ButtonsSection}>
                    <Button style={{backgroundColor: "dodgerblue"}} onClick={()=> this.onResetCards()}>RESET CARDS</Button>
                    <Button style={{ backgroundColor: "#FFC107" }}>RESET GAME</Button>
                    <Button style={{ backgroundColor: "#5F9EA0"}}>SCORES</Button>
                 </div>
                <Modal show={this.state.classModal} modalClosed={() => this._classModal()}>
                    <ClassModal 
                        classList={this.props.classList}
                        onAddClass={(className)=>this.props.onAddClass(className)}
                        onRemoveClass={(className) => this.props.onRemoveClass(className)}
                        onAddPlayer={(playerName, className) => this.props.onAddPlayer(playerName, className)}
                        onRemovePlayer={(playerName, className) => this.props.onRemovePlayer(playerName, className)}
                    />
                </Modal>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        starCtr: state.classSettings.starCounter,
        isLoggedIn: state.auth.token !== null,
        classList: state.classSettings.classList
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddStar: () => dispatch(actions.addStar()),
        onRemoveStar: () => dispatch(actions.removeStar()),
        onResetStars: () => dispatch(actions.resetStars()),
        onAddClass: (className) => dispatch(actions.addClass(className)),
        onRemoveClass: (className) => dispatch(actions.removeClass(className)),
        onAddPlayer: (playerName, className) => dispatch(actions.addPlayer(playerName, className)),
        onRemovePlayer: (playerName, className) => dispatch(actions.removePlayer(playerName, className))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);