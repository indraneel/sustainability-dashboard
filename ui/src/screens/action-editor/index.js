import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Snackbar from 'material-ui/Snackbar';

import {
  actionEditorValueChanged,
  actionEditorSaving,
  actionEditorSaved,
  actionEditorVisualizationValueChanged,
  toggleActionEditor
} from '../../redux/modules/actionEditor';
import { visualizationEditorTypeChanged } from '../../redux/modules/visualizationEditor';

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

    let payload = {
      actionData: this.props.actionEditor.actionData,
      visualization: this.props.visualizationEditor
    }
    this.props.actionEditorSaved(payload);
    this.props.toggleActionEditor();
  }

  render() {
    return (
      <div className={'Dash-ActionEditor'}>
        <Form
          actionData={this.props.actionEditor.actionData}
          handleValueChanged={this.handleValueChanged}
          handleSave={this.handleSave}
          visualizationEditor={this.props.visualizationEditor}
          visualizationEditorTypeChanged={this.props.visualizationEditorTypeChanged}
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
    actionEditor: state.actionEditor,
    visualizationEditor: state.visualizationEditor
  }
};

let mapDispatchToProps = (dispatch) => {
  return {
    toggleActionEditor: bindActionCreators(toggleActionEditor, dispatch),
    actionEditorValueChanged: bindActionCreators(actionEditorValueChanged, dispatch),
    actionEditorSaved: bindActionCreators(actionEditorSaved, dispatch),
    actionEditorVisualizationValueChanged: bindActionCreators(actionEditorVisualizationValueChanged, dispatch),
    visualizationEditorTypeChanged: bindActionCreators(visualizationEditorTypeChanged, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionEditor);
