import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import './App.css';

import Dashboard from './screens/dashboard';
import ActionEditor from './screens/action-editor';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router history={hashHistory}>
          <Route path="/" component={Dashboard} />
          <Route path="/new" component={ActionEditor} />
        </Router>
      </MuiThemeProvider>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    municipality: state.municipality,
    actionEditor: state.actionEditor
  }
};

let mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
