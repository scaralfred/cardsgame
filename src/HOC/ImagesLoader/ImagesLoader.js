import React, { Component } from 'react';
import { connect } from 'react-redux';

class ImagesLoader extends Component {
    render() {

    const cardsImages = Object.keys(this.props.cat)
        .map((el)=>{ return Object.keys(this.props.cat[el])
        .map((item) => { return Object.values(this.props.cat[el][item])
        .map((obj) => { return <img src={require(`../../assets/cards/${item}/${obj}.png`)} /> 
                })
            })
        });

        return (
            <div id="preload" style={{display: "none"}}>
               {cardsImages}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cat: state.categories.categories
    }
};

export default connect(mapStateToProps, null)(ImagesLoader);