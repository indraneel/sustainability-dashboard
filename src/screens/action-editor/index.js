import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import style from './action-editor.style.js';
import {
  actionEditorValueChanged
} from '../../redux/modules/actionEditor';

import Form from '../../containers/form';

class ActionEditor extends Component {
  constructor(props) {
    super(props);
    this.handleValueChanged = this.handleValueChanged.bind(this);
  }

  handleValueChanged(key, value) {
    this.props.actionEditorValueChanged(key, value);
  }

  render() {
    return (
      <div className={'Dash-ActionEditor'}>
        <Form
          actionData={this.props.actionEditor.actionData}
          handleValueChanged={this.handleValueChanged}/>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    actionEditor: state.actionEditor
  }
};

let mapDispatchToProps = (dispatch) => {
  return {
    actionEditorValueChanged: bindActionCreators(actionEditorValueChanged, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionEditor);
