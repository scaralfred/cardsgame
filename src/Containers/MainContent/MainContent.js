import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as currencyActions from '../../store/actions/index';
import TopBar from "./Topbar/TopBar";
import CategoryBlock from './CategoryBlock/CategoryBlock';
import LevelBlock from './LevelBlock/LevelBlock';
import Cards from './Cards/Cards';
import classes from './MainContent.css';
import StartButton from '../../Components/StartButton/StartButton';
import Button from '../../Components/Button/Button';

class MainContent extends Component {
 
    state = {
        gamePlay: true,
        selectLevel: false,
        memoryGame: false,
        cardShuffling: false,
        showAll: false,
        coverAll: false,
        showOne: false
    }

componentDidMount(){
    if (this.props.retrieveState) {
        this.props.onRetrieveState(this.props.retrieveState);
    } 
    if ( localStorage.getItem('classSettings') ) {
        this.props.onRetrieveState(JSON.parse(localStorage.getItem('classSettings')));
    }
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
   this.setState({...this.state, selectLevel: false });
   this.props.onClearCategories();
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
            <div className={classes.SelectCategory}>
                <div className={classes.Controls}>
                    <StartButton onClick={() => this.setState({ ...this.state, selectLevel: true })} className={classes.StartButton}>Back</StartButton>
                </div>
                <div style={{ display: "flex", flex: 1, flexWrap:"wrap", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    {categories}
                    <CategoryBlock
                        selected={this.props.memGame}
                        categoryName={"memory"}
                        selectCategory={()=>this.props.onMemoryGame()}
                    >memory <br />game</CategoryBlock>
                </div>
                <div className={classes.Controls}>
                    <StartButton onClick={() => this.dealCards()} className={classes.StartButton}>Start</StartButton>
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
            <div className={classes.SelectLevel}>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    {levels}
                </div>
                <div>
                    <StartButton onClick={() => this.activateLevel()} className={classes.StartButton}>Choose Level</StartButton>
                </div>
            </div>
        )

        const missingGameButtons = (
            <div style={{display: "flex", justifyContent: "center"}}>
                <Button className={classes.MissingGameButtons} onClick={()=>this.setState({...this.state, showAll: true})}>SHOW ALL</Button> 
                <Button className={classes.MissingGameButtons} onClick={() => this.setState({ ...this.state, showAll: false })}>COVER ALL</Button>
                <Button className={classes.MissingGameButtons} onClick={null}>SHOW ONE</Button>
            </div>
        );

        const playGame =  (!this.state.gamePlay ? selectCategory
            :
            <div style={{padding: 20}} className={classes.CardsContainer}>
            {this.props.whatsMiss ? missingGameButtons : null}
                <Cards
                    showAll={this.state.showAll}
                    coverAll={this.state.coverAll}
                    showOne={this.state.showOne}
                    cardShuffling={this.state.cardShuffling}
                    memGame={this.state.memoryGame}
                />
                <StartButton onClick={() => this.setState({ ...this.state, gamePlay: false })} className={classes.StartButton}>Change gategories</StartButton>
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
        memGame: state.categories.memoryGame,
        whatsMiss: state.categories.whatsMissing,
        classSettings: state.classSettings,
        auth: state.auth,
        retrieveState: state.classSettings.retrieveState
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddCategory: (categoryName) => dispatch(currencyActions.addCategory(categoryName)),
        onRemoveCategory: (categoryName) => dispatch(currencyActions.removeCategory(categoryName)),
        onAddLevel: (levelName) => dispatch(currencyActions.addLevel(levelName)),
        onMemoryGame: () => dispatch(currencyActions.memoryGame()),
        onWhatsMissing: () => dispatch(currencyActions.whatsMissing()),
        onRetrieveState: (newState) => dispatch(currencyActions.retrieveState(newState)),
        onClearCategories: () => dispatch(currencyActions.clearCategories())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);