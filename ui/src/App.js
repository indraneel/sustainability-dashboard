import React, { Component } from 'react';
import { Router, Route, Redirect, browserHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import './App.css';

import MunicipalitySelector from './screens/municipality-selector';
import Dashboard from './screens/dashboard';
import ActionEditor from './screens/action-editor';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router history={browserHistory}>
          <Route path='/' component={MunicipalitySelector} />
          <Route path='/dashboard/:municipalityName(/:displayActionId)' component={Dashboard} />
          <Redirect from='*' to="/" />
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
