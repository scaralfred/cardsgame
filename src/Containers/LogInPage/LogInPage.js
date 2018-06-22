import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as currencyActions from '../../store/actions/index';
import classes from './LogInPage.css'

class LogInPage extends Component {

    render() {

        return (
            <div className={classes.LogInPage}>
                <div style={{}}>
                </div>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        selCat: state.categories.categoriesArray
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddCategory: (categoryName) => dispatch(currencyActions.addCategory(categoryName))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);