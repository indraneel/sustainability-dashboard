import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  PieVisualizationDataEntry,
  BarVisualizationDataEntry,
  LineVisualizationDataEntry
} from '../../components/visualization-editors';

import {
  visualizationEditorTypeChanged,
  visualizationEditorDataChanged,
  visualizationEditorDataAdded,
  visualizationEditorEntryFieldChanged
} from '../../redux/modules/visualizationEditor';

class VisualizationEditor extends Component {
  constructor(props) {
    super(props);
    this.handleVizDataChanged = this.handleVizDataChanged.bind(this);
    this.handleVizXAxisChanged = this.handleVizXAxisChanged.bind(this);
    this.handleVizYAxisChanged = this.handleVizYAxisChanged.bind(this);
  }

  handleVizDataChanged(e, key, payload) {
    this.props.handleVisualizationValueChanged('data', payload);
  }

  handleVizXAxisChanged(e, payload) {
    this.props.handleVisualizationValueChanged('xAxisTitle', payload);
  }

  handleVizYAxisChanged(e, payload) {
    this.props.handleVisualizationValueChanged('yAxisTitle', payload);
  }

  handleAddPair(e, payload) {

  }

  render() {
    let {
      type
    } = this.props.visualizationEditor;

    switch(type) {
      case 'pie':
        return <PieVisualizationDataEntry
          {...this.props}/>
      case 'bar':
        return <BarVisualizationDataEntry
          {...this.props}/>
      case 'line':
        return <LineVisualizationDataEntry
          {...this.props}/>
      default:
        return null;
    }
  }
}


let mapStateToProps = (state) => {
  return {
    visualizationEditor: state.visualizationEditor
  }
};

let mapDispatchToProps = (dispatch) => {
  return {
    visualizationEditorTypeChanged: bindActionCreators(visualizationEditorTypeChanged, dispatch),
    visualizationEditorDataChanged: bindActionCreators(visualizationEditorDataChanged, dispatch),
    visualizationEditorDataAdded: bindActionCreators(visualizationEditorDataAdded, dispatch),
    visualizationEditorEntryFieldChanged: bindActionCreators(visualizationEditorEntryFieldChanged, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisualizationEditor);
