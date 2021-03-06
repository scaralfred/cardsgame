import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Cards.scss';

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
                    showAllCards={this.props.showAll}
                    key={item + i + Math.random()}
                    cardName={item}
                    categoryName={categName}
                />
        })

        const showFunnyAnimals = (
            <div className={classes.FunnyAnimal}>
                <img className={classes.FaceImage} alt="John" src={require('../../../assets/kids/Class1/John.jpg')} />
                <img
                    rel="preload"
                    alt={"mouse"}
                    src={require(`../../../assets/cards/funnyAnimals/mouse-cut.png`)}
                    style={{ width: "100%", zIndex: 10, position: "relative" }}
                />
            </div>
        )

        return (
            <div className={classes.CardsContainer}>
                { !this.props.selCat.includes("funnyAnimals") ? showCards : showFunnyAnimals }
            </div>
        )
    }
};

class Card extends Component {
    
    state = {
        showCard: false,
        showAll: this.props.showAllCards
    }

    render() {

       const  cardWidth = () => {
           if (this.props.cardsNumber > 6 && this.props.cardsNumber < 18) {
              return  {width: '12%'} 
           } else if (this.props.cardsNumber >= 18 && this.props.cardsNumber < 30) {
               return { width: '11%' }
           } else if (this.props.cardsNumber >= 30 && this.props.cardsNumber < 48) {
               return { width: '10%' }
           } else if (this.props.cardsNumber >= 48 ) {
               return { width: '9%' }
           }
        }
    

        return (
            <div 
            className={!this.state.showCard ? classes.Card : classes.Card__Back}
            style={cardWidth()}
            onMouseDown={()=>this.setState({...this.state.showCard, showCard: !this.state.showCard})}
            >
                <img
                    rel="preload"
                    alt={this.props.cardName}
                    src={this.state.showCard || this.state.showAll ?
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

export default connect(mapStateToProps, null)(Cards);