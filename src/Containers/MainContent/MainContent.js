import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as currencyActions from '../../store/actions/index';
import TopBar from "./Topbar/TopBar";
import CategoryBlock from './CategoryBlock/CategoryBlock';
import LevelBlock from './LevelBlock/LevelBlock';
import Cards from './Cards/Cards';
import classes from './MainContent.css';
import StartButton from '../../Components/StartButton/StartButton';

class MainContent extends Component {

    state = {
        gamePlay: false,
        selectLevel: true,
        memoryGame: false,
        cardShuffling: false
    }


onSelectCategory(el) {
if (!this.props.selCat.includes(el)) {
    this.props.onAddCategory(el)
} else {
    this.props.onRemoveCategory(el)
}
};


dealCards() {
    if (this.props.selCat.length > 0) {
        this.setState({...this.state, gamePlay: true})
    } else {
        alert('Please select at least one category!')
    }
}

onResetGame(){
    this.setState({...this.state, cardShuffling: !this.state.cardShuffling})
}

activateLevel() {
   this.setState({...this.state, selectLevel: false }) 
}

    render() {

        const categories = (
        Object.keys(this.props.lev[this.props.currentLevel]).map((el,i) => { 
            return (<CategoryBlock
                key={el + i}
                selected={this.props.selCat.includes(el) ? true : false}
                categoryName={el}
                selectCategory={() => this.onSelectCategory(el)}
            />)
        })
    );

        const selectCategory = (
            <div>
                <div style={{ display: "flex", flexWrap:"wrap", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    {categories}
                    <CategoryBlock
                        selected={this.props.memGame}
                        categoryName={"memory"}
                        selectCategory={()=>this.props.onMemoryGame()}
                    >memory <br />game</CategoryBlock>
                </div>
                <div>
                    <StartButton onClick={() => this.dealCards()} className={classes.StartButton}>Start Game</StartButton>
                </div>
            </div>
        )

        const levels = Object.keys(this.props.lev).map((el, i) => {
            return (<LevelBlock
                key={el + i}
                selected={this.props.currentLevel.includes(el) ? true : false}
                levelName={el}
                selectLevel={() => this.props.onAddLevel(el)}
            />)
        });

        const selectLevel = (
            <div>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    {levels}
                </div>
                <div>
                    <StartButton onClick={() => this.activateLevel()} className={classes.StartButton}>Choose Level</StartButton>
                </div>
            </div>
        )

        const playGame =  (!this.state.gamePlay ? selectCategory
            :
            <div style={{padding: 20}}>
                <Cards
                    cardShuffling={this.state.cardShuffling}
                    memGame={this.state.memoryGame}
                />
            </div>
            )
    
        
        return (
            <div className={classes.MainContent} >
                <TopBar resetGame={() => this.onResetGame()}/>
                { this.state.selectLevel ? selectLevel : playGame}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        selCat: state.categories.categoriesArray,
        lev: state.categories.categories,
        currentLevel: state.categories.levelsArray,
        memGame: state.categories.memoryGame
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddCategory: (categoryName) => dispatch(currencyActions.addCategory(categoryName)),
        onRemoveCategory: (categoryName) => dispatch(currencyActions.removeCategory(categoryName)),
        onAddLevel: (levelName) => dispatch(currencyActions.addLevel(levelName)),
        onMemoryGame: () => dispatch(currencyActions.memoryGame())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);