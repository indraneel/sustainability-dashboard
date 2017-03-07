import React, { Component } from 'react';
import style from './category-bar-section.style.js';
import Paper from 'material-ui/Paper';

class CategoryBarSection extends Component {

  render() {
    const color = this.props.color;

    return (
      <Paper style={{...style.root, color: color}}
        zDepth={0}
        onClick={this.props.handleSelectAction}>
        <div style={style.title}>{this.props.title}</div>
        <div style={style.percentage}>{this.props.percentage}</div>
      </Paper>
    )
  }
}

export default CategoryBarSection;
