import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Cards.css';

class Cards extends Component {
   
    shuffleCards(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    render() {

        let longArray = [];

        this.props.selCat.map((el) => { return this.props.categ[this.props.lev][el] }).map((obj) => { return longArray = this.props.memGame ? longArray.concat(obj).concat(obj) : longArray.concat(obj) });

        const showCards = this.shuffleCards(longArray).map((item, i)=> {
            let categName;
            this.props.selCat.map((el)=> {
                return this.props.categ[this.props.lev][el].map((obj)=>{
                        if(obj === item) { return categName = el} else {return null}
                })
            })
            return <Card
                    cardsNumber={longArray.length}
                    key={item + i + Math.random()}
                    cardName={item}
                    categoryName={categName}
                />
        })

        return (
            <div>
                { showCards }
            </div>
        )
    }
};

class Card extends Component {
    
    state = {
        showCard: false
    }

    render() {

       const  cardWidth = () => {
           if (this.props.cardsNumber > 6 && this.props.cardsNumber <18) {
              return  {width: '12%'} 
           } else if (this.props.cardsNumber >= 18 && this.props.cardsNumber < 30) {
               return { width: '10%' }
           } else if (this.props.cardsNumber >= 30 && this.props.cardsNumber < 48) {
               return { width: '8%' }
           } else if (this.props.cardsNumber >= 48 ) {
               return { width: '6%' }
           }
        }
    

        return (
            <div 
            className={classes.Card}
            style={cardWidth()}
            onClick={()=>this.setState({...this.state.showCard, showCard: !this.state.showCard})}
            >
                <img
                    rel="preload"
                    alt={this.props.cardName}
                    src={this.state.showCard ?
                        require(`../../../assets/cards/${this.props.categoryName}/${this.props.cardName}.png`)
                        : require(`../../../assets/cards/card-back.png`)
                    }
                    style={{ width: "100%" }}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selCat: state.categories.categoriesArray,
        categ: state.categories.categories,
        lev: state.categories.levelsArray,
        memGame: state.categories.memoryGame
    }
};

// const mapDispatchToProps = dispatch => {
//     return {
//         // onAddCategory: (categoryName) => dispatch(currencyActions.addCategory(categoryName)),
//         // onRemoveCategory: (categoryName) => dispatch(currencyActions.removeCategory(categoryName))
//     }
// };

export default connect(mapStateToProps, null)(Cards);