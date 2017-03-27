import React, { Component } from 'react';
import style from './big-text.style.js';

class BigTextVisualization extends Component {
  render() {
    return <div style={style.root}>
      <div style={style.text}>{this.props.data[0] ? this.props.data[0].line : null}</div>
      <div style={style.text}>{this.props.data[1] ? this.props.data[1].line : null}</div>
      <div style={style.text}>{this.props.data[2] ? this.props.data[2].line : null}</div>
    </div>
  }
}

export default BigTextVisualization;
