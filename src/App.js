import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './App.css';
import MainContent from './Containers/MainContent/MainContent';
import LogInPage from './Containers/LogInPage/LogInPage';
import NavBar from './Containers/NavBar/NavBar';
import ImagesLoader from './HOC/ImagesLoader/ImagesLoader';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
    <div className={classes.AppContainer}>
      <NavBar />
      <Switch>
          <Route path="/" exact component={MainContent} />
          <Route path="/authenticate" exact component={LogInPage} />
      </Switch>
      <ImagesLoader />
    </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));