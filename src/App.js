import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import classes from './App.css';
import MainContent from './Containers/MainContent/MainContent';
import LogInPage from './Containers/LogInPage/LogInPage';
import NavBar from './Containers/NavBar/NavBar';

class App extends Component {

  render() {
    return (
    <div className={classes.AppContainer}>
      <NavBar />
      <Switch>
          <Route path="/" exact component={MainContent} />
          <Route path="/login" exact component={LogInPage} />
      </Switch>
    </div>
    );
  }
}

export default App;