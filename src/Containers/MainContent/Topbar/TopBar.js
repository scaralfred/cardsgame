import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as currencyActions from '../../../store/actions/index';
import Button from '../../../Components/Button/Button';
import classes from './TopBar.css';
import MainLogo from '../../../assets/field-emei.jpg';
import DefaultFace from '../../../assets/Default-face.jpg';
import MiniStar from '../../../assets/mini-star.png';
import MiniStarRemove from '../../../assets/remove-mini-star.png';

class TopBar extends Component {

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

    onResetCards() {
        this.props.onResetStars();
        this.props.resetGame();
    }

    render() {

        const starRenderer = [];
       
        for (let i = 0; i < this.props.starCtr; i++) {
                starRenderer.push(<img key={i} alt="star" src={MiniStar} style={{height: 35, padding: 3}}/>)
            }
        
        return(
            <div className={classes.TopBar}>
                <div className={classes.LogoSection}>
                <div>Class</div>
                    <img alt="logo" src={MainLogo} />
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
                            <Button style={{ background: "#FF1493"}} onClick={()=>this.props.onResetStars()}>Reset Stars</Button>
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
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        starCtr: state.classSettings.starCounter
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddStar: () => dispatch(currencyActions.addStar()),
        onRemoveStar: () => dispatch(currencyActions.removeStar()),
        onResetStars: () => dispatch(currencyActions.resetStars())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);