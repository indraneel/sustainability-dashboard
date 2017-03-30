import React, { Component } from 'react';
import style from './placeholder.style.js';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class VisualizationPlaceholder extends Component {
  render() {
    return <div style={style.root}>
      <FlatButton
        label='Add a Visualization!'
        onTouchTap={(e) => setTimeout(this.props.handleBuildViz(this.props.id), 8000)}/>
    </div>
  }
}

export default VisualizationPlaceholder;
