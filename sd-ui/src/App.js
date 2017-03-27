import React, { Component } from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router'
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
          <Redirect from='/' to='/dashboard/Haddonfield'/>
          <Route path='/dashboard/:municipalityName(/:displayActionId)' component={Dashboard} />
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
