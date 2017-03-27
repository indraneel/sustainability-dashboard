import React, { Component } from 'react';
import style from './placeholder.style.js';
import RaisedButton from 'material-ui/RaisedButton';


class VisualizationPlaceholder extends Component {
  render() {
    return <div style={style.root}>
      <RaisedButton
        label='Build Visualization'
        secondary={true}
        onTouchTap={(e) => this.props.handleBuildViz(this.props.id)}/>
    </div>
  }
}

export default VisualizationPlaceholder;
