import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';


class ImagesLoader extends Component {

    render() {

    const playersPhoto = (
        Object.keys(this.props.playerPhoto).map((className)=> {
            return Object.keys(this.props.playerPhoto[className])
                .filter((playerName) => { return this.props.playerPhoto[className][playerName]["photo"] !== null})
                .map((playerName, i)=> {
                return <img 
                        key={playerName + i} 
                        alt={""} 
                        src={this.props.playerPhoto[className][playerName]["photo"]} 
                        onLoad={() => this.props.onImageVisible(className, playerName)} 
                        />
            })
        })
    )

    const cardsImages = Object.keys(this.props.cat)
        .map((el)=>{ return Object.keys(this.props.cat[el])
        .map((item) => { return Object.values(this.props.cat[el][item])
        .map((obj, i) => { return <img key={obj + i} alt={obj} src={require(`../../assets/cards/${item}/${obj}.png`)} /> 
                })
            })
        });

        return (
            <div id="preload" style={{display: "none"}}>
               {cardsImages}
               {playersPhoto}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cat: state.categories.categories,
        playerPhoto: state.classSettings.playerPhoto
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onImageVisible: (className, playerName) => dispatch(actions.imageVisible(className, playerName))
       
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ImagesLoader);