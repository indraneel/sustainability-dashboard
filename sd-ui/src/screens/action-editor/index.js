import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Snackbar from 'material-ui/Snackbar';

import style from './action-editor.style.js';
import {
  actionEditorValueChanged,
  actionEditorSaving,
  actionEditorSaved
} from '../../redux/modules/actionEditor';

import Form from '../../containers/form';

class ActionEditor extends Component {
  constructor(props) {
    super(props);
    this.handleValueChanged = this.handleValueChanged.bind(this);
    this.handleSave = this.handleSave.bind(this);

  }

  componentWillMount() {
    this.setState({
      open: false
    });
  }

  handleValueChanged(key, value) {
    this.props.actionEditorValueChanged(key, value);
  }

  handleSave() {
    this.setState({
      open: true
    });
    this.props.actionEditorSaved(this.props.actionEditor.actionData);
  }

  render() {
    return (
      <div className={'Dash-ActionEditor'}>
        <Form
          actionData={this.props.actionEditor.actionData}
          handleValueChanged={this.handleValueChanged}
          handleSave={this.handleSave}
          categories={this.props.municipality.categories}/>
        <Snackbar
          open={this.state.open}
          message="Saving..."
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    municipality: state.municipality,
    actionEditor: state.actionEditor
  }
};

let mapDispatchToProps = (dispatch) => {
  return {
    actionEditorValueChanged: bindActionCreators(actionEditorValueChanged, dispatch),
    actionEditorSaved: bindActionCreators(actionEditorSaved, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionEditor);
