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
import SelectList from '../../../Components/SelectList/SelectList';

class TopBar extends Component {

    state = {
        classModal: false,
        selectedClass: undefined,
        selectedPlayer: undefined,

    }

    componentDidMount() {
        document.addEventListener('keydown', this.onKeyDown);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isLoggedIn !== nextProps.isLoggedIn) {
            this.setState({...this.state, selectedClass: undefined, selectedPlayer: undefined})
        }
    }

    onKeyDown = (event) => {
        if (!this.state.classModal) {
            if(event.code === 'Space') {
            this.props.onAddStar();
            event.preventDefault();
        } else if (event.key === 'Backspace') {
            this.props.onRemoveStar();
        }
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

    _onAddClass(className) {
        this.props.onAddClass(className);
        this.setState({ ...this.state, selectedClass: className.toString().toUpperCase(), selectedPlayer: undefined})
    }
    
    _onRemoveClass(className) {
        this.props.onRemoveClass(className);

        if (Object.keys(this.props.classList).length > 1) {
            if (this.state.selectedClass === className) {
                if (Object.keys(this.props.classList).length === 2 ) {
                    this.setState({ ...this.state, selectedClass: Object.keys(this.props.classList)[Object.keys(this.props.classList).length - 1], selectedPlayer: this.props.classList[Object.keys(this.props.classList)[Object.keys(this.props.classList).length - 1]][0] })
                } else {
                    this.setState({ ...this.state, selectedClass: Object.keys(this.props.classList)[Object.keys(this.props.classList).length - 2], selectedPlayer: this.props.classList[Object.keys(this.props.classList)[Object.keys(this.props.classList).length - 2]][0] })
                }
            }
        } else {
            return this.setState({ ...this.state, selectedClass: undefined, selectedPlayer: undefined })
        }
       
    }

    _onAddPlayer(playerName, className) {
        this.setState({ ...this.state, selectedClass: className});
        this.props.onAddPlayer(playerName, className);
    }

    _onRemovePLayer(playerName, className) {
        this.props.onRemovePlayer(playerName, className);
        if (this.props.classList[this.state.selectedClass].length > 1 ) {
            if(this.state.selectedPlayer === playerName) {
                if (this.props.classList[this.state.selectedClass].length === 2) {
                    return this.setState({ ...this.state, selectedPlayer: this.props.classList[this.state.selectedClass][this.props.classList[this.state.selectedClass].length - 1] })
                } else {
                    return this.setState({ ...this.state, selectedPlayer: this.props.classList[this.state.selectedClass][this.props.classList[this.state.selectedClass].length - 2] })
                }
                
            } 
        } else {
            if (className === this.state.selectedClass) {
                return this.setState({ ...this.state, selectedPlayer: undefined })
            }
        }
        
    }
   

    render() {

        const starRenderer = [];
       
        for (let i = 0; i < this.props.starCtr; i++) {
                starRenderer.push(<img key={i} alt="star" src={MiniStar} style={{height: 35, padding: 3}}/>)
            }

        const classDropDownMenu = (
            <div style={{ display: "flex", flexDirection: "row" }}>
                <SelectList 
                defaultValue={()=> this.setState({ ...this.state, selectedClass: Object.keys(this.props.classList)[0]})}  
                data={Object.keys(this.props.classList)} 
                value={this.state.selectedClass} 
                onChange={(event)=> this.setState({...this.state, selectedClass: event.target.value, selectedPlayer: this.props.classList[event.target.value][0]})}
                />
                {this.state.selectedClass !== null ? <div className={classes.ButtonAddClass} onClick={() => this._classModal()}>Add</div> : null } 
            </div>    
        );

        const addClassButton = (
            !this.state.classModal ?
                <div>Click <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => this._classModal()}>here</span><br /> to add a class</div>
            : null
        )

        const classUploader = ( 
         Object.keys(this.props.classList).length > 0 ? classDropDownMenu : addClassButton
        );

        const playersUploader = (
            <SelectList defaultValue={() => this.setState({ ...this.state, selectedPlayer: this.props.classList[this.state.selectedClass][0]})} data={this.props.classList[this.state.selectedClass]} value={this.state.selectedPlayer} onChange={(event) => this.setState({ ...this.state, selectedPlayer: event.target.value })} />
        )

        const photoModule = () => {
            if (!this.props.playerPhoto[this.state.selectedClass][this.state.selectedPlayer].photo || this.props.playerPhoto[this.state.selectedClass][this.state.selectedPlayer].photo === undefined) {
              return <div style={{ fontSize: 40, fontWeight: "600" }}>{this.state.selectedPlayer}</div>
            } else {
                if (this.props.playerPhoto[this.state.selectedClass][this.state.selectedPlayer].visible) {
                    return <img
                        alt={this.state.selectedPlayer}
                        src={this.props.playerPhoto[this.state.selectedClass][this.state.selectedPlayer].photo}
                        style={{maxHeight: "100%", maxWidth: "100%", borderRadius: "50%"}}
                    />
                } else {
                    return <div style={{ fontSize: 40, fontWeight: "600" }}>{this.state.selectedPlayer}</div>
                }
            }
        }

        const playerFace = (
            this.state.selectedPlayer === undefined ?
              <div style={{ fontSize: 30, fontWeight: "500" }}>No Players</div>
            : photoModule()
        )

        const faceImageBox = (
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", margin: 10, height: 150, borderRadius: "50%" }}>
                { (this.state.selectedPlayer === undefined && Object.keys(this.props.classList).length === 0) || !this.props.isLoggedIn ?
                <img alt="Face" src={DefaultFace} style={{maxHeight: "100%", maxWidth: "100%", borderRadius: "50%"}} />
                : playerFace
                }
            </div>
        )
        
        return (
            <div className={classes.TopBar}>
                <div className={classes.LogoSection}>
                {this.props.isLoggedIn ? classUploader : null}
                    <img alt="logo" width={160} src={MainLogo} />
                </div>
                <div className={classes.FaceSection}>
                    {faceImageBox}
                    {this.state.selectedClass !== undefined  ? playersUploader : null }
                    <div style={{display: "flex", margin: 5}}>
                        <Button style={{ backgroundColor: "#fff", margin: 6, padding: 7, paddingRight: 15, paddingLeft: 15, fontSize: 0 }} onClick={this.props.onAddStar}>
                            <img alt="star" src={MiniStar} height={30}/>
                        </Button>
                        <Button style={{ backgroundColor: "#fff", margin: 6, padding: 7, paddingRight: 15, paddingLeft: 15, fontSize: 0 }} onClick={this.props.onRemoveStar}>
                            <img alt="star" height={30} src={MiniStarRemove} />
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
                <Modal show={this.state.classModal} modalClosed={() => this._classModal()} style={{padding: 0}}>
                    <ClassModal 
                        classList={this.props.classList}
                        updateUI={(playerName, className)=> this.setState({...this.state, selectedPlayer: playerName, selectedClass: className})}
                        onAddClass={(className)=>this._onAddClass(className)}
                        onRemoveClass={(className) => this._onRemoveClass(className)}
                        onAddPlayer={(playerName, className) => this._onAddPlayer(playerName, className)}
                        onRemovePlayer={(playerName, className) => this._onRemovePLayer(playerName, className)}
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
        classList: state.classSettings.classList,
        playerPhoto: state.classSettings.playerPhoto
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